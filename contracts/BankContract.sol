pragma solidity ^0.4.24;

contract BankContract{
    
    mapping (address => uint) balanceOf;
    address public owner;
    
    event Deposit(address onwer, uint amount);
    event Withdraw(address onwer, uint amount);
    
    modifier onlyOwner() {
        assert(owner == msg.sender);    
        _;
    }
    
    constructor() public {
        owner = msg.sender;
        balanceOf[owner] = 10000;
    }
    
    // function start() public {
    //     owner = msg.sender;
    //     balanceOf[owner] = 10000;
    // }
    
    function getBalance() public onlyOwner view returns (uint) {
        return balanceOf[owner];
    }
    
    function deposit(uint _amount) public onlyOwner {
        balanceOf[owner] += _amount;
        emit Deposit(owner, _amount);
    }
    
    function withdraw(uint _amount) public onlyOwner {
        balanceOf[owner] -= _amount;
        emit Withdraw(owner, _amount);
    }
}