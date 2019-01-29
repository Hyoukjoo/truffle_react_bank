"use strict";
exports.__esModule = true;
var User = /** @class */ (function () {
    function User(userBank, userName, userIndex, password, userAddress, balaceOf, transaction) {
        this.userBank = userBank;
        this.userName = userName;
        this.userIndex = userIndex;
        this.password = password;
        this.userAddress = userAddress;
        this.balaceOf = balaceOf;
        this.transactions = transaction;
    }
    return User;
}());
exports.User = User;
var Transaction = /** @class */ (function () {
    function Transaction(purpose, userName, date, amount, charge, receiverName, receiverAddress) {
        this.purpose = purpose;
        this.userName = userName;
        this.date = date;
        this.amount = amount;
        this.charge = charge;
        this.receiverName = receiverName;
        this.receiverAddress = receiverAddress;
    }
    return Transaction;
}());
exports.Transaction = Transaction;
var USERS = [];
exports.USERS = USERS;
var Trout = new User('TRUFFLE', 'Trout', 0, '1234', '', 200000, []);
var Kane = new User('TRUFFLE', 'Kane', 1, '1234', '', 100000, []);
var transaction1 = new Transaction('입금', 'Trout', 'Today', 1000, 0);
var insertUser = function (user) {
    USERS.push(user);
};
exports.insertUser = insertUser;
var insertTransaction = function (userIndex, transaction) {
    USERS[userIndex].transaction.push(transaction);
};
insertUser(Trout);
insertUser(Kane);
insertTransaction(0, transaction1);
console.log(USERS);
