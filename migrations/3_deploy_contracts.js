var Marketplace = artifacts.require('./Marketplace.sol');

module.exports = function(deployer) {
  const name = 'cites';
  const symbol = 'CITES';
  deployer.deploy(Marketplace, name, symbol);
};
