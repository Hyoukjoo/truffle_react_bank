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
        address userAddress;
        uint balanceOf;
    }
    
    modifier onlyOwner() { 
        require(msg.sender == bank, "Only Owner");
        _;
    }
    
    event IncorrectInformation(string _userBank, address _userAddress);
    event SendMe(address user);
    
    constructor() public{
        bank = msg.sender;
    }
    
    function addUser(
        string memory _userBank,
        string memory _userName,
        string memory _password,
        address _userAddress,
        uint _balanceOf
    ) public onlyOwner {
        // if(account[_userAddress].userAddress == _userAddress) revert("Already saved");
        
        account[_userAddress] = Account({
            userBank : _userBank,
            userName : _userName,
            password : _password,
            userAddress : _userAddress,
            balanceOf : _balanceOf
        });
    }
    
    function setUser(address _userAddress) public onlyOwner {
        user = _userAddress;
    } 
    
    function getUserName() public onlyOwner view returns (string memory) {
        return account[user].userName;
    }
    
    function initUser() public onlyOwner {
        user = address(0x0);
    }
    
    function getBalance(address _userAddress) public onlyOwner view returns (uint) {
        return account[_userAddress].balanceOf;
    }
    
    function deposit(uint _amount) public onlyOwner {
        require(_amount > 0, "0 is not allowed");
        account[user].balanceOf += _amount;
    }
    
    function withdraw(uint _amount) public onlyOwner {
        require(_amount > 0, "0 is not allowed");
        require(account[user].balanceOf >= _amount, "It is not enough");
        account[user].balanceOf -= _amount;
    }
    
    function checkPassword(string memory _password) public onlyOwner view {
        if(keccak256(account[user].password) != keccak256(_password)) revert("Password is disagreement");
    }
    
    function checkAccount(string memory _userBank, address _userAddress) public onlyOwner returns (string memory) {
        if(account[_userAddress].userAddress != _userAddress || 
            keccak256(account[_userAddress].userBank) != keccak256(_userBank)
        ) {
            emit IncorrectInformation(_userBank, _userAddress);
            revert("Bank or Address is wrong.");
        }
        if(keccak256(user) == keccak256(_userAddress)){
            emit SendMe(user);
            revert("It is you.");
        }
        return account[_userAddress].userName;
    }
    
    function remit(uint _amount, address _receiverAddress) public onlyOwner {
        require(_amount > 0, "0 is not allowed");
        require(account[user].balanceOf >= _amount, "It is not enough");
        account[user].balanceOf -= _amount;
        account[_receiverAddress].balanceOf += _amount;
    }
}

