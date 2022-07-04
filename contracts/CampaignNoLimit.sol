pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract CampaignNoLimitFactory {
    

    address[] public campaignsCollection;


    function createCampaign(
        string memory name,
        string memory symbol,
        uint96 productprice,
        uint256 remaningOffers,
        uint96 campaignRoyaltiesPerc,
        uint96 campaignCashbackPerc
    ) public payable {
        address contractAddress;

        contractAddress = address(
            new CampaignNoLimit(
                msg.sender,
                name,
                symbol,
                productprice,
                remaningOffers,
                campaignRoyaltiesPerc,
                campaignCashbackPerc
            )
        );

        campaignsCollection.push(contractAddress);
    }

    function getCampaigns()
        public
        view
        returns (address[] memory)
    {
        return campaignsCollection;
    }
}

contract CampaignNoLimit is ERC721URIStorage, AccessControl {
    //Limited offer for infinite NFT

    using Counters for Counters.Counter;
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant VISIBILITY_PROVIDER_ROLE =
        keccak256("VISIBILITY_PROVIDER_ROLE");
    address payable public admin;
    Counters.Counter private _tokenIds;
    uint256 public productPrice;
    uint96 public royaltiesPerc;
    uint96 public cashbackPerc;
    uint256 public remaningOffers;
    uint256 public mintingPrice;

    mapping(uint256 => address payable) public royaltiesAddressMapper;

    uint256 public mintingLimit;

    constructor(
        address owner,
        string memory nftName,
        string memory symbol,
        uint256 productprice,
        uint256 remaningOffers,
        uint96 campaignRoyaltiesPerc,
        uint96 campaignCashbackPerc
    ) payable ERC721(nftName, symbol) {
        _setupRole(ADMIN_ROLE, owner);
        _setupRole(MINTER_ROLE, owner);

        productPrice = productprice;
        royaltiesPerc = campaignRoyaltiesPerc;
        cashbackPerc = campaignCashbackPerc;
        remaningOffers = remaningOffers;

        admin = payable(owner);
    }

    function mintItem(address player, string memory uri)
        public
        returns (uint256)
    {
        uint256 newItemId = _tokenIds.current();

        _mint(player, newItemId);
        _setTokenURI(newItemId, uri);
        royaltiesAddressMapper[newItemId] = payable(player);
        _tokenIds.increment();
        return newItemId;
    }

    function cashOut() public payable {
        require(hasRole(ADMIN_ROLE, msg.sender), "Only ADMIN can do cashout");
        admin.transfer(address(this).balance);
    }

    function pay() public payable {}

    function payWithNft(uint256 tokenId) public payable {
        require(msg.value >= productPrice, "not enought money sent");
        require(
            ownerOf(tokenId) == msg.sender,
            "You're not the owner of the Item"
        );
        // When the remaningOffers reach zero the campaign is closed
        require(remaningOffers > 0, "This offer is closed");

        uint256 cashback = (msg.value * cashbackPerc) / 100;
        uint256 royalties = (msg.value * royaltiesPerc) / 100;

        royaltiesAddressMapper[tokenId].transfer(royalties);
        address payable cashbackAddress = payable(msg.sender);
        remaningOffers = remaningOffers - 1;
        cashbackAddress.transfer(cashback);
    }

    function transfer(address recipient, uint256 tokenId)
        public
        payable
        returns (bool)
    {
        _transfer(_msgSender(), recipient, tokenId);
        return true;
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
