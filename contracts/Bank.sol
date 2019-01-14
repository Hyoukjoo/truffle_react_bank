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
    
    event SetUser (address _userAddr);
    event FailSetUser (address _userAddr);
    event InitUser (address user);
    
    modifier onlyOwner() { require(msg.sender == bank); _; }
    modifier onlyUser(address _userAddr) { 
        require(account[_userAddr].etherAccount == _userAddr); 
        _; 
        emit FailSetUser(_userAddr);
    }
    
    constructor() public{
        bank = msg.sender;
    }
    
    function addUser(Account memory _AccountInfo) public onlyOwner {
        if(account[_AccountInfo.etherAccount].etherAccount == _AccountInfo.etherAccount) revert();
        
        account[_AccountInfo.etherAccount].userBank = _AccountInfo.userBank;
        account[_AccountInfo.etherAccount].userName = _AccountInfo.userName;
        account[_AccountInfo.etherAccount].password = _AccountInfo.password;
        account[_AccountInfo.etherAccount].etherAccount = _AccountInfo.etherAccount;
        account[_AccountInfo.etherAccount].balanceOf = _AccountInfo.balanceOf;
    }
    
    function setUser(address _user) public {
        user = _user;
    } 
    
    function initUser() public {
        user = address(0x0);
    }
    
    function getBalance() public onlyOwner view returns (uint) {
        return Bank.account[user].balanceOf;
    }
    
    function deposit(uint _amount) public onlyOwner {
        require(_amount > 0);
        Bank.account[user].balanceOf += _amount;
    }
    
    function withdraw(uint _amount) public onlyOwner {
        require(_amount > 0);
        require(Bank.account[user].balanceOf > _amount);
        Bank.account[user].balanceOf -= _amount;
    }
    
    function checkPassword(string memory _password) public view {
        if(keccak256(Bank.account[user].password) != keccak256(_password)) revert();
    }
    
    function remit(uint _amount, address _receiver) public {
        require(_amount > 0);
        require(Bank.account[user].balanceOf > _amount);
        Bank.account[user].balanceOf -= _amount;
        Bank.account[_receiver].balanceOf += _amount;
    }
}

