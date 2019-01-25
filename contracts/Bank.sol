pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

contract Bank {
    address private bank;
    address public user;
    mapping (address => Account) public account;
    
    struct Account {
        string userBank;
        string userName;
        string password;
        address etherAccount;
        uint balanceOf;
    }
    
    modifier onlyOwner() { 
        require(msg.sender == bank);
        _;
    }
    
    event IncorrectInformation(string _userBank, address _etherAccount);
    event SendMe(address user);
    
    constructor() public{
        bank = msg.sender;
    }
    
    function addUser(string _userBank, string _userName, string _password, address _etherAccount, uint _balanceOf) public onlyOwner {
        if(account[_etherAccount].etherAccount == _etherAccount) revert();
        
        account[_etherAccount] = Account({
            userBank : _userBank,
            userName : _userName,
            password : _password,
            etherAccount : _etherAccount,
            balanceOf : _balanceOf
        });
    }
    
    function setUser(address _user) public onlyOwner {
        user = _user;
    } 
    
    function getUser() public onlyOwner view returns (string memory) {
        return account[user].userName;
    }
    
    function initUser() public onlyOwner {
        user = address(0x0);
    }
    
    function getBalance() public onlyOwner view returns (uint) {
        return account[user].balanceOf;
    }
    
    function deposit(uint _amount) public onlyOwner {
        require(_amount > 0);
        account[user].balanceOf += _amount;
    }
    
    function withdraw(uint _amount) public onlyOwner {
        require(_amount > 0);
        require(account[user].balanceOf >= _amount);
        account[user].balanceOf -= _amount;
    }
    
    function checkPassword(string memory _password) public onlyOwner view {
        if(keccak256(account[user].password) != keccak256(_password)) revert("Password is disagreement");
    }
    
    function checkAccount(string memory _userBank, address _etherAccount) public onlyOwner returns (string memory) {
        if(account[_etherAccount].etherAccount != _etherAccount || 
            keccak256(account[_etherAccount].userBank) != keccak256(_userBank)
        ) {
            emit IncorrectInformation(_userBank, _etherAccount);
            revert("Bank or Address is wrong.");
        }
        if(keccak256(user) == keccak256(_etherAccount)){
            emit SendMe(user);
            revert("It is you.");
        }
        return account[_etherAccount].userName;
    }
    
    function remit(uint _amount, address _receiver) public onlyOwner {
        require(_amount > 0);
        require(Bank.account[user].balanceOf >= _amount);
        account[user].balanceOf -= _amount;
        account[_receiver].balanceOf += _amount;
    }
}

