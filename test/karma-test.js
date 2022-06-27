const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('Web3');
const path = require('path');
const fs = require('fs-extra');


const KarmaContractFactoryBuild = fs.readJSONSync(
    path.resolve(__dirname, '../build', 'contracts', 'KarmaContractFactory.json'));

const KarmaContractBuild = fs.readJSONSync(
    path.resolve(__dirname, '../build', 'contracts', 'KarmaContract.json'));