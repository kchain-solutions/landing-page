const KarmaContractFactory = artifacts.require("KarmaContractFactory");

const NFT_NAME='karma';
const SYMBOL = 'krm';
const DESCRIPTION = 'karma token'
const PRODUCT_PRICE = '1000';
const MINTING_LIMIT = '3';
const TOKEN_MAX_USAGE = '2';
const CAMPAIGN_ROYALTIES= '10';
const CAMPAIGN_CASHBACK = '5';

contracts('Karma factory', (accounts) => {
    it('Deploy test', async () => {
        const karmaContractFactoryInstance = await KarmaContractFactory.deployed();
        karmaContractFactoryInstance.createKarmaContract(
            NFT_NAME, SYMBOL, DESCRIPTION, PRODUCT_PRICE, MINTING_LIMIT, 
            TOKEN_MAX_USAGE, CAMPAIGN_ROYALTIES, CAMPAIGN_CASHBACK
        ).sendTransaction(accounts[0]);
        assert.OK(true);
    });
   
})