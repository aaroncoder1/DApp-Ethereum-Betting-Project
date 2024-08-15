const CryptoPredictionMarket = artifacts.require("CryptoPredictionMarket");

module.exports = function (deployer) {
  deployer.deploy(CryptoPredictionMarket);
};
