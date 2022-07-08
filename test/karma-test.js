const assert = require('assert');
const ganache = require('ganache');
const GAS = 100000000;
const GAS_LIMIT = 500000000;
const options = { gasLimit: GAS_LIMIT, verbosity: 4 };
const Web3 = require('Web3');
const path = require('path');
const fs = require('fs-extra');

const CampaignScarsityFactoryBuild = fs.readJSONSync(
    path.resolve(__dirname, '../build', 'contracts', 'CampaignScarsityFactory.json'));

const CampaignNoLimitFactoryBuild = fs.readJSONSync(
    path.resolve(__dirname, '../build', 'contracts', 'CampaignNoLimitFactory.json'));

const CampaignScarsityBuild = fs.readJSONSync(
    path.resolve(__dirname, '../build', 'contracts', 'CampaignScarsity.json'));

const CampaignNoLimitBuild = fs.readJSONSync(
    path.resolve(__dirname, '../build', 'contracts', 'CampaignNoLimit.json'));


const web3 = new Web3(ganache.provider(options));


let campaignScarsityFactory = undefined;
let campaignNoLimitFactory = undefined;
let noLimitDeployedCampaigns = undefined;
let scarsityDeployedCampaigns = undefined;


let accounts = [];
let admin = '';
let artist = '';
let visibilityProvider = '';
let customer = '';


//SCARSITY PARAMETERS
const URI = "uri.com"

const NFT_NAME = 'karma';
const SYMBOL = 'krm';
const PRODUCT_PRICE = Web3.utils.toWei('1', 'ether');;
const MINTING_LIMIT = '3';
const TOKEN_MAX_USAGE = '2';
const CAMPAIGN_ROYALTIES = '10';
const CAMPAIGN_CASHBACK = '5';

//NO_LIMIT PARAMETERS
const NFT_NAME_NOLIMIT = 'karma2';
const SYMBOL_NOLIMIT = 'krm2';
const PRODUCT_PRICE_NOLIMIT = Web3.utils.toWei('1', 'ether');
const REMANING_OFFERS_NOLIMIT = '3';
const CAMPAIGN_ROYALTIES_NOLIMIT = '20';
const CAMPAIGN_CASHBACK_NOLIMIT = '20';

beforeEach(async () => {

    accounts = await web3.eth.getAccounts();
    admin = accounts[0];
    artist = accounts[1];
    visibilityProvider = accounts[2];
    customer = accounts[3];

    campaignNoLimitFactory = await new web3.eth.Contract(CampaignNoLimitFactoryBuild.abi)
        .deploy({
            data: CampaignNoLimitFactoryBuild.bytecode,
        })
        .send({ from: admin, gas: GAS });

    campaignScarsityFactory = await new web3.eth.Contract(CampaignScarsityFactoryBuild.abi)
        .deploy({
            data: CampaignScarsityFactoryBuild.bytecode,
        })
        .send({ from: admin, gas: GAS });

    await campaignScarsityFactory.methods.createCampaign(
        NFT_NAME, SYMBOL, URI, PRODUCT_PRICE, MINTING_LIMIT,
        TOKEN_MAX_USAGE, CAMPAIGN_ROYALTIES, CAMPAIGN_CASHBACK
    ).send({
        from: admin,
        gas: GAS
    });

    await campaignNoLimitFactory.methods.createCampaign(
        NFT_NAME_NOLIMIT, SYMBOL_NOLIMIT, URI, PRODUCT_PRICE_NOLIMIT, REMANING_OFFERS_NOLIMIT,
        CAMPAIGN_ROYALTIES_NOLIMIT, CAMPAIGN_CASHBACK_NOLIMIT
    ).send({
        from: admin,
        gas: GAS
    });

    noLimitDeployedCampaigns = await campaignNoLimitFactory.methods.getCampaigns().call(
        { from: admin }
    );

    scarsityDeployedCampaigns = await campaignScarsityFactory.methods.getCampaigns().call(
        { from: admin }
    );

    campaignNoLimitInstance = await new web3.eth.Contract(CampaignNoLimitBuild.abi, noLimitDeployedCampaigns[0]);

});


describe('Contract deploy test', async () => {

    it('Nolimit deployed campaign test', async () => {
        let adminDeployedContracts = await await campaignNoLimitFactory.methods.getCampaigns().call(
            { from: admin }
        );
        assert.equal(adminDeployedContracts.length, 1);
    });

    it('Scarsity deployed campaign test', async () => {
        let adminDeployedContracts = await campaignScarsityFactory.methods.getCampaigns().call(
            { from: admin }
        );
        assert.equal(adminDeployedContracts.length, 1);
    });

    it('Campaign owners tests', async () => {
        campaignNoLimitInstance = await new web3.eth.Contract(CampaignNoLimitBuild.abi, noLimitDeployedCampaigns[0]);
        campaignScarsityInstance = await new web3.eth.Contract(CampaignScarsityBuild.abi, scarsityDeployedCampaigns[0]);
        let adminRis = await campaignNoLimitInstance.methods.admin().call({from: visibilityProvider, gas: '1000000'});
        let adminRis1 = await campaignScarsityInstance.methods.admin().call({ from: visibilityProvider, gas: '1000000' });
        assert.equal(adminRis, admin);
        assert.equal(adminRis1, admin);
    });
});

describe('NO LIMIT campaign', () => {

    it('Mint a nolimit token', async () => {

        await campaignNoLimitInstance.methods.mintNFT().send({ from: visibilityProvider, gas: '1000000' });
        await campaignNoLimitInstance.methods.mintNFT().send({ from: visibilityProvider, gas: '1000000' });
        let tokenIdsVisibilityProvider = await campaignNoLimitInstance.methods.getValidNFTs().call({ from: visibilityProvider, gas: '1000000' });
        assert.equal(tokenIdsVisibilityProvider[0], 0);
        assert.equal(tokenIdsVisibilityProvider[1], 1);
        let tokenIdsVisibilityAdmin = await campaignNoLimitInstance.methods.getValidNFTs().call({ from: admin, gas: '1000000' });
        assert.equal(tokenIdsVisibilityAdmin.length, 0);
    });

    it("Test campaign data detail", async () => {
        noLimitDeployedCampaigns = await campaignNoLimitFactory.methods.getCampaigns().call(
            { from: admin }
        );
        campaignNoLimitInstance = await new web3.eth.Contract(CampaignNoLimitBuild.abi, noLimitDeployedCampaigns[0]);
        let name = await campaignNoLimitInstance.methods.name().call({from:admin});
        let symbol = await campaignNoLimitInstance.methods.symbol().call({from:admin});
        let tokenURI = await campaignNoLimitInstance.methods.URI().call({from:admin});
        assert.equal(name, NFT_NAME_NOLIMIT);
        assert.equal(symbol, SYMBOL_NOLIMIT);
        assert.equal(tokenURI, URI);

    });

    it('Payment process test', async () => {

        let customerBalanceBefore = await web3.eth.getBalance(customer);
        let visibilityProviderBalanceBefore = await web3.eth.getBalance(visibilityProvider);
        let adminBalanceBefore = await web3.eth.getBalance(admin);

        //Token minintg
        await campaignNoLimitInstance.methods.mintNFT().send({ from: visibilityProvider, gas: '1000000' });
        await campaignNoLimitInstance.methods.mintNFT().send({ from: visibilityProvider, gas: '1000000' });
        //Account balance
        let tokenIds = await campaignNoLimitInstance.methods.getValidNFTs().call({from:visibilityProvider});
        assert.equal(tokenIds.length, 2);
        //Token transfer
        await campaignNoLimitInstance.methods.transfer(customer, tokenIds[1]).send({from:visibilityProvider, gas: '1000000'});
        let tokenIdsTransfered = await campaignNoLimitInstance.methods.getValidNFTs().call({from:customer });
        assert.equal(tokenIdsTransfered[0], 1);



        //Payment
        await campaignNoLimitInstance.methods.payWithNft(tokenIdsTransfered[0]).send({value:PRODUCT_PRICE_NOLIMIT, from:customer, gas: '400000000'});

        let customerBalanceLater = await web3.eth.getBalance(customer);
        let customerVisibilityProviderLater = await web3.eth.getBalance(visibilityProvider);
        let differenceBalanceCustomer =  customerBalanceBefore + PRODUCT_PRICE_NOLIMIT - customerBalanceLater;
        let differenceBalanceVisibilityProvider =  customerVisibilityProviderLater - visibilityProviderBalanceBefore;  

        //Verifying cashback and royalties
        assert.equal(differenceBalanceCustomer >  Web3.utils.toWei('0.15', 'ether'), true);
        assert.equal(differenceBalanceVisibilityProvider > Web3.utils.toWei('0.15', 'ether'), true);

        //Check is valid
        let notValidNfts = await campaignNoLimitInstance.methods.getNotValidNFTs().call({from:customer });
        let validNfts = await campaignNoLimitInstance.methods.getValidNFTs().call({from:customer });
        assert.equal(notValidNfts[0], 1);
        assert.equal(validNfts.length, 0);

        //Check cash out
        await campaignNoLimitInstance.methods.cashOut().send({from:admin});
        let adminBalanceLater = await web3.eth.getBalance(admin);
        assert.equal(adminBalanceLater - adminBalanceBefore >  Web3.utils.toWei('0.5', 'ether'), true);
    });

    it('Pay without NFT test', async () => {
        let adminBalanceBefore = await web3.eth.getBalance(admin);
        await campaignNoLimitInstance.methods.pay().send({from:customer, value:PRODUCT_PRICE_NOLIMIT});
        await campaignNoLimitInstance.methods.pay().send({from:customer, value:PRODUCT_PRICE_NOLIMIT});
        await campaignNoLimitInstance.methods.cashOut().send({from:admin});
        
        let adminBalanceLater = await web3.eth.getBalance(admin);
        let finalBalance = adminBalanceLater - adminBalanceBefore;
        let thresholdExpected = (PRODUCT_PRICE_NOLIMIT * 2) - Web3.utils.toWei('0.1', 'ether')
        assert.equal(finalBalance > thresholdExpected, true);
    });

});

describe('SCARSITY test', () => {
    it('Mint a scarsity token', async () => {

    });

});

