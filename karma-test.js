const assert = require('assert');
const ganache = require('ganache-cli');
const GAS = 10000000;
const GAS_LIMIT = 100000000;
const options = { gasLimit: GAS_LIMIT };
const Web3 = require('Web3');
const path = require('path');
const fs = require('fs-extra');





const KarmaContractFactoryBuild = fs.readJSONSync(
    path.resolve(__dirname, '../build', 'contracts', 'KarmaContractFactory.json'));

    // const kfactory = fs.readJSONSync(
    //     path.resolve(__dirname, '../build', 'contracts', 'kfactory.json'));

const KarmaContractBuild = fs.readJSONSync(
    path.resolve(__dirname, '../build', 'contracts', 'KarmaContract.json'));

const web3 = new Web3(ganache.provider(options));


let karmaContract = undefined;
let karmaContractFactory = undefined;

let accounts = [];
let admin = '' ;
let artist = '';
let visibilityProvider = '';
    

const NFT_NAME='karma';
const SYMBOL = 'krm';
const DESCRIPTION = 'karma token'
const PRODUCT_PRICE = '1000';
const MINTING_LIMIT = '3';
const TOKEN_MAX_USAGE = '2';
const CAMPAIGN_ROYALTIES= '10';
const CAMPAIGN_CASHBACK = '5';

beforeEach(async () => {
    // get a list of the account
    accounts = await web3.eth.getAccounts();
    admin = accounts[0];
    artist= accounts[1];
    visibilityProvider=accounts[2];

    //web3.eth.getBalance(admin).then(console.log);
    //console.log('bytecode\n',KarmaContractFactoryBuild.bytecode);

    console.log('block information')
    let blockNum = await web3.eth.getBlockNumber();
    let blockinfo = await web3.eth.getBlock(blockNum);
    console.log(blockinfo);

    karmaContractFactory = await new web3.eth.Contract(KarmaContractFactoryBuild.abi)
        .deploy({
            data: KarmaContractFactoryBuild.bytecode,
        })
        .send({from: admin, gas: GAS});


    await karmaContractFactory.methods.createKarmaContract(
        NFT_NAME, SYMBOL, DESCRIPTION, PRODUCT_PRICE, MINTING_LIMIT, 
        TOKEN_MAX_USAGE, CAMPAIGN_ROYALTIES, CAMPAIGN_CASHBACK
    ).send({
        from: admin,
        gas: GAS
    });
}); 


describe('Contract deploy test', async () => {
    it('Factory deploy test', async () => {
        let adminDeployedContracts = await karmaContractFactory.methods.getDeployedKarmaContractForAddress().call(
            {from: admin}
        );
        console.log(adminDeployedContracts);
        assert.ok(adminDeployedContracts[0]);
    });
});

