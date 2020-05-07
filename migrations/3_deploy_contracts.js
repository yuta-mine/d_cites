var Marketplace = artifacts.require('./Marketplace.sol');

module.exports = function(deployer) {
  const name = 'SimpleAsset';
  const symbol = 'SA';
  deployer.deploy(Marketplace, name, symbol);
};
