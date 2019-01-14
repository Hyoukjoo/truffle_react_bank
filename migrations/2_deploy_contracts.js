// var ATM = artifacts.require("./ATM.sol")
const Bank = artifacts.require('./Bank.sol')

module.exports = function(deployer) {
  // let ownerAddress = web3.eth.accounts[0]
  deployer.deploy(Bank)
}
