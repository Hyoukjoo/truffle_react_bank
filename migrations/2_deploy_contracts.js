var ATM = artifacts.require("./ATM.sol")

module.exports = function(deployer) {
  let ownerAddress = web3.eth.accounts[0]
  deployer.deploy(ATM, ownerAddress)
}
