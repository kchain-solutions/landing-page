require('dotenv').config({path:'../.env.local'});
const fs = require("fs-extra");
const path = require("path");
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');

const GameContract = fs.readJSONSync(
    path.resolve(__dirname, '../ethereum', 'build', 'GameContract.json')
)

const GameAbi = fs.readJSONSync(
    path.resolve(__dirname, '../ethereum', 'build', 'GameAbi.json')
)

const infuraEndpoint = process.env.RINKEBY_INFURA_ENDPOINT
const walletPassphrase = process.env.WALLET_PASSPHRASE

const provider = new HDWalletProvider(
    walletPassphrase,
    infuraEndpoint
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    depolyResult = await new web3.eth.Contract(GameAbi)
        .deploy({
            data: GameContract.object,
            arguments: ["KarmaTokenTest", "KTT", "10000000000000000", "10", "3", "30", "20"]
        })
        .send({ from: accounts[0], gas: '7000000' });

    console.log('Contract deployed at: ', depolyResult.options.address);
    provider.engine.stop();
};

deploy();