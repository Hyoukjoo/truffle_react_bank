var BankContract = artifacts.require("./BankContract.sol");

module.exports = function(deployer) {
  deployer.deploy(BankContract);
};
