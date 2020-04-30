const Marketplace = artifacts.require('./Marketplace.sol');

contract('Marketplace', accounts => {
  it('...should store the value 90.', async () => {
    const marketPlaceInstance = await Marketplace.deployed();

    // Set value of 89
    await marketPlaceInstance.set(90, { from: accounts[0] });

    // Get stored value
    const storedData = await marketPlaceInstance.get.call();

    assert.equal(storedData, 90, 'The value 89 was not stored.');
  });
});
