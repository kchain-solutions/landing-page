var CampaignNoLimitFactory = artifacts.require("CampaignNoLimitFactory");

module.exports = function(deployer) {
  
  deployer.deploy(CampaignNoLimitFactory);
};