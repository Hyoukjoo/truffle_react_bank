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
    
    modifier onlyOwner() { require(msg.sender == bank); _; }
    
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
    
    function getUser() public onlyOwner view returns (string) {
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
        require(account[user].balanceOf > _amount);
        account[user].balanceOf -= _amount;
    }
    
    function checkPassword(string memory _password) public onlyOwner view {
        if(keccak256(Bank.account[user].password) != keccak256(_password)) revert();
    }
    
    function remit(uint _amount, address _receiver) public onlyOwner {
        require(_amount > 0);
        require(Bank.account[user].balanceOf >= _amount);
        account[user].balanceOf -= _amount;
        account[_receiver].balanceOf += _amount;
    }
}

