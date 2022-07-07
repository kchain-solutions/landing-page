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
const PRODUCT_PRICE = '1000';
const MINTING_LIMIT = '3';
const TOKEN_MAX_USAGE = '2';
const CAMPAIGN_ROYALTIES = '10';
const CAMPAIGN_CASHBACK = '5';

//NO_LIMIT PARAMETERS
const NFT_NAME2 = 'karma2';
const SYMBOL2 = 'krm2';
const PRODUCT_PRICE2 = '100000';
const REMANING_OFFERS2 = '3';
const CAMPAIGN_ROYALTIES2 = '10';
const CAMPAIGN_CASHBACK2 = '5';

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
        NFT_NAME2, SYMBOL2, URI, PRODUCT_PRICE2, REMANING_OFFERS2,
        CAMPAIGN_ROYALTIES2, CAMPAIGN_CASHBACK2
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

});


describe('Contract deploy test', async () => {

    // it('Check karma contract instance', async () => {
    //     assert.ok(campaignNoLimitInstance);
    //     assert.ok(campaignScarsityInstance);
    // });

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

    it('Test name and symbol', async () =>{
        campaignNoLimitInstance = await new web3.eth.Contract(CampaignNoLimitBuild.abi, noLimitDeployedCampaigns[0]);
        let name = await campaignNoLimitInstance.methods.name().call({ from: visibilityProvider});
        let symbol = await campaignNoLimitInstance.methods.symbol().call({ from: visibilityProvider});
        assert.equal(name, NFT_NAME2);
        assert.equal(symbol, SYMBOL2);
    });

    it('Mint a nolimit token', async () => {

        campaignNoLimitInstance = await new web3.eth.Contract(CampaignNoLimitBuild.abi, noLimitDeployedCampaigns[0]);
        let tokenId = await campaignNoLimitInstance.methods.mintNFT().send({ from: visibilityProvider, gas: '1000000' });
        let tokenId1 = await campaignNoLimitInstance.methods.mintNFT().send({ from: visibilityProvider, gas: '1000000' });
        let balance = await campaignNoLimitInstance.methods.balanceOf(visibilityProvider).call({ from: visibilityProvider, gas: '1000000' });
        assert.equal(balance, 2);

    });

    it('Test a offer limit', async () => {
        // let exceptionFlag = false;
        // let tokenIDs = [];
        // for(let i = 0; i<REMANING_OFFERS2 + 1; i++){
        //     tokenIDs[i] = await campaignNoLimitInstance.methods.mintItem().call({from:visibilityProvider});
        //     await campaignNoLimitInstance.methods.transfer(customer, tokenIDs[i]).call({from:visibilityProvider});
        // }
        // try{
        //     for(let i = 0; i<REMANING_OFFERS2 + 1; i++){
        //         await campaignNoLimitInstance.methods.payWithNFT(tokenIDs[i]).send({from: customer, value: PRODUCT_PRICE2});
        //     }

        // }catch{
        //     exceptionFlag = true
        // }
        // assert.equal(exceptionFlag, true);

    });

    it('Pay with NFT test process', async () => {
        // let tokenId = await campaignNoLimitInstance.methods.mintItem().send({ from: visibilityProvider, gasLimit:GAS });
        // console.log("tokenId1 ", tokenId);

        // tokenId = await campaignNoLimitInstance.methods.mintItem().send({ from: visibilityProvider,gasLimit:GAS });
        // console.log("tokenId2 ", tokenId);
        // let firstOwner = await campaignNoLimitInstance.methods.ownerOf(tokenId).call({ from: visibilityProvider});
        // assert.equal(firstOwner, visibilityProvider);

        // console.log("LOG1 ", firstOwner);
        // await campaignNoLimitInstance.methods.transfer(customer, tokenId).call({ from: visibilityProvider });
        // let secondOwner = await campaignNoLimitInstance.methods.ownerOf(tokenId).call({ from: visibilityProvider });
        // console.log("LOG2 ", secondOwner);
        // assert.equal(secondOwner, customer);
        // await campaignNoLimitInstance.methods.payWithNFT(tokenId).send({ from: customer, value: PRODUCT_PRICE2 });
        // let isUsed = await campaignNoLimitInstance.methods.tokenIsUsed(tokenId).call({ from: customer });
        // assert.equal(isUsed, true);
    });

    it('', async () => {

    });
});

describe('SCARSITY test', () => {
    it('Mint a scarsity token', async () => {

    });

});

