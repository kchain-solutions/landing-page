//var KarmaContract = artifacts.require("KarmaContract");
var KarmaContractFactory = artifacts.require("KarmaContractFactory");

module.exports = function(deployer) {
  // deployment steps
  //deployer.deploy(KarmaContract, "KarmaTokenTest", "KTT", "10000000000000000", "10", "3", "30", "20");
  deployer.deploy(KarmaContractFactory);
};