var KarmaContract = artifacts.require("KarmaContract");
var KarmaContractFactory = artifacts.require("KarmaContractFactory");

module.exports = function(deployer) {
  
  deployer.deploy(KarmaContractFactory);
};