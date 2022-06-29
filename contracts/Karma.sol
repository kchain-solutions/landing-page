pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract KarmaContractFactory{

    address contractOwner;

    struct KarmaContractDetails{
        uint256 price;
        string name;
        address contractAddress;
        uint96 royaltiesPerc;
        uint96 cashbackPerc;
        bool isOpened;
    }

    mapping(address => KarmaContractDetails[]) public karmaContractDetailsMapper;

    constructor() payable{
        contractOwner = msg.sender;
    }

    function createKarmaContract(string memory aname, string memory asymbol,
        uint96 aproductprice, uint256 asetupMintingLimit, uint96 atokenMaxUsage,
        uint96 acampaignRoyaltiesPerc, uint96 acampaignCashbackPerc) public payable returns (address){

        address karmaContractAddress = address(new KarmaContract(contractOwner, aname, asymbol, aproductprice, asetupMintingLimit, atokenMaxUsage, acampaignRoyaltiesPerc, acampaignCashbackPerc));

        KarmaContractDetails memory kcd = KarmaContractDetails({
           price: aproductprice,
           name: aname, 
           contractAddress: karmaContractAddress, 
           royaltiesPerc: acampaignRoyaltiesPerc,
           cashbackPerc: acampaignCashbackPerc,
           isOpened: true
        });

        KarmaContractDetails[] storage KarmaContractDetailsCollection = karmaContractDetailsMapper[contractOwner];
        KarmaContractDetailsCollection.push(kcd);

        return karmaContractAddress;
    }

    function getDeployedKarmaContractForAddress() public view returns (KarmaContractDetails[] memory ){
        return karmaContractDetailsMapper[msg.sender];
    }
}

contract KarmaContract is ERC721URIStorage, AccessControl  {
    using Counters for Counters.Counter;
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant VISIBILITY_PROVIDER_ROLE = keccak256("VISIBILITY_PROVIDER_ROLE");
    address payable public admin;
    Counters.Counter private _tokenIds;
    string public productName;
    uint public productPrice;
    uint96 public royaltiesPerc;
    uint96 public cashbackPerc;
    uint96 public tokenMaxUsages;

    struct TokenInstance {
        uint256 maxUsages;
        uint256 usageCounter;
    }

    mapping(uint256 => address payable) public royaltiesAddressMapper;
    mapping(uint256 => TokenInstance) public tokenInstanceMapper;
    
    uint256 public mintingLimit;

    constructor(address aowner, string memory anftName, string memory asymbol,
        uint256 aproductprice, uint256 asetupMintingLimit, uint96 atokenMaxUsage,
        uint96 acampaignRoyaltiesPerc, uint96 acampaignCashbackPerc) 
            ERC721(anftName, asymbol) payable {
                _setupRole(ADMIN_ROLE, msg.sender);
                _setupRole(MINTER_ROLE, msg.sender);
                
                productPrice = aproductprice;
                tokenMaxUsages= atokenMaxUsage;
                royaltiesPerc = acampaignRoyaltiesPerc;
                cashbackPerc = acampaignCashbackPerc;

                admin = payable(aowner);
                mintingLimit = asetupMintingLimit;
    }

    function mintItem(address player, string memory uri) 
        public returns (uint256){
            require(hasRole(MINTER_ROLE, msg.sender), "Caller is not a MINTER");
            require(mintingLimit > _tokenIds.current() + 1, 'Minted items limit reached');
            uint256 newItemId = _tokenIds.current();

            tokenInstanceMapper[newItemId] = TokenInstance({
                maxUsages: tokenMaxUsages,
                usageCounter: 0
            });

            
            _mint(player, newItemId);
            _setTokenURI(newItemId, uri);
            royaltiesAddressMapper[newItemId] = payable(player);
            _tokenIds.increment();
            return newItemId;
    }

    function cashOut() public payable{
        require(hasRole(ADMIN_ROLE, msg.sender), "Only ADMIN can do cashout");
        admin.transfer(address(this).balance);
    }

    function pay() public payable{

    }

    function payWithNft(uint256 tokenId) public payable{
        require(msg.value >= productPrice, "not enought money sent");
        require(ownerOf(tokenId) == msg.sender, "You're not the owner of the Item");
        TokenInstance storage ti = tokenInstanceMapper[tokenId]; 
        require(ti.usageCounter < ti.maxUsages, "The nft is not valid anymore. Maxusages reached");
        //handle the cashback
        ti.usageCounter = ti.usageCounter + 1; 

        uint256 cashback = msg.value * cashbackPerc / 100;
        uint256 royalties = msg.value * royaltiesPerc / 100;

        royaltiesAddressMapper[tokenId].transfer(royalties);
        address payable cashbackAddress = payable(msg.sender);
        cashbackAddress.transfer(cashback);

    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}