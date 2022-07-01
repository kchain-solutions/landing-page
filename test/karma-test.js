const assert = require('assert');
const ganache = require('ganache');
const GAS = 10000000;
const GAS_LIMIT = 100000000;
const options = { gasLimit: GAS_LIMIT, verbosity:4 };
const Web3 = require('Web3');
const path = require('path');
const fs = require('fs-extra');





const KarmaContractFactoryBuild = fs.readJSONSync(
    path.resolve(__dirname, '../build', 'contracts', 'KarmaContractFactory.json'));

const KarmaContractBuild = fs.readJSONSync(
    path.resolve(__dirname, '../build', 'contracts', 'KarmaContract.json'));

const web3 = new Web3(ganache.provider(options));


let karmaContractInstance = undefined;
let karmaContractFactory = undefined;

let adminDeployedContracts = undefined;


let accounts = [];
let admin = '' ;
let artist = '';
let visibilityProvider = '';
    

const NFT_NAME='karma';
const SYMBOL = 'krm';
const PRODUCT_PRICE = '1000';
const MINTING_LIMIT = '3';
const TOKEN_MAX_USAGE = '2';
const CAMPAIGN_ROYALTIES= '10';
const CAMPAIGN_CASHBACK = '5';

const NFT_NAME2='karma2';
const SYMBOL2 = 'krm2';
const PRODUCT_PRICE2 = '1000';
const MINTING_LIMIT2 = '3';
const TOKEN_MAX_USAGE2 = '2';
const CAMPAIGN_ROYALTIES2= '10';
const CAMPAIGN_CASHBACK2 = '5';

beforeEach(async () => {

    accounts = await web3.eth.getAccounts();
    admin = accounts[0];
    artist= accounts[1];
    visibilityProvider=accounts[2];

    karmaContractFactory = await new web3.eth.Contract(KarmaContractFactoryBuild.abi)
        .deploy({
            data: KarmaContractFactoryBuild.bytecode,
        })
        .send({from: admin, gas: GAS});

    await karmaContractFactory.methods.createKarmaContract(
        NFT_NAME, SYMBOL, PRODUCT_PRICE, MINTING_LIMIT, 
        TOKEN_MAX_USAGE, CAMPAIGN_ROYALTIES, CAMPAIGN_CASHBACK
    ).send({
        from: admin,
        gas: GAS
    });

    await karmaContractFactory.methods.createKarmaContract(
        NFT_NAME2, SYMBOL2, PRODUCT_PRICE2, MINTING_LIMIT2, 
        TOKEN_MAX_USAGE2, CAMPAIGN_ROYALTIES2, CAMPAIGN_CASHBACK2
    ).send({
        from: admin,
        gas: GAS
    });

    adminDeployedContracts = await karmaContractFactory.methods.getDeployedKarmaContractForAddress().call(
        {from: admin}
    );

    karmaContractInstance = await new web3.eth.Contract(KarmaContractBuild.abi, adminDeployedContracts[0]);

}); 


describe('Contract deploy test', async () => {

    it('Check karma contract instance', async () => {
        assert.ok(karmaContractInstance);
    });

    it('Factory deploy test from admin', async () => {
        let adminDeployedContracts = await karmaContractFactory.methods.getDeployedKarmaContractForAddress().call(
            {from: admin}
        );
        assert.equal(adminDeployedContracts.length, 2);
    });

    it('Factory deploy test from visibility provider', async () => {
        let adminDeployedContracts = await karmaContractFactory.methods.getDeployedKarmaContractForAddress().call(
            {from: visibilityProvider}
        );
        assert.equal(adminDeployedContracts.length, 0);
    });
});

describe('Karma contract instance', () => {
    
    it('Verify contract owner', async () => {
        let adminRis = await karmaContractInstance.methods.admin().call({from: visibilityProvider});
        assert.equal(adminRis, admin);
    });

    it('Create a NFT test', async () => {

    });

    it('Cash out test', async () => {

    });

    it('Transfer token test', async () => {

    });

    it('', async () => {

    });

    it('', async () => {

    });
});

