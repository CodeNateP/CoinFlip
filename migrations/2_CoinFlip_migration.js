const CoinFlip = artifacts.require("CoinFlip");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(CoinFlip);
};