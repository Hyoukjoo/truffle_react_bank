export class User {
  public userBank:String
  public userName:String
  public userIndex:number
  private password:String
  public userAddress:String
  public balaceOf:number
  public transactions:[Transaction]

  constructor(
    userBank:String,
    userName:String,
    userIndex:number,
    password:String,
    userAddress:String,
    balaceOf:number,
    transaction:[Transaction?] = []
  ) {
    this.userBank = userBank
    this.userName = userName
    this.userIndex = userIndex
    this.password = password
    this.userAddress = userAddress
    this.balaceOf = balaceOf
    this.transactions.push(transaction)
  }
}

class Transaction {
  public purpose:String
  public userName:String
  public date:String
  public amount:number
  public charge:number
  public receiverName:String
  public receiverAddress:String

  constructor(
    purpose:String,
    userName:String,
    date:String,
    amount:number,
    charge:number,
    receiverName?:String,
    receiverAddress?:String
  ) {
    this.purpose = purpose
    this.userName = userName
    this.date = date
    this.amount = amount
    this.charge = charge
    this.receiverName = receiverName
    this.receiverAddress = receiverAddress
  }
}

const USERS = []

const Trout = new User('TRUFFLE', 'Trout', 0, '1234', '', 200000, [])
const Kane = new User('TRUFFLE', 'Kane', 1, '1234', '', 100000, [])

const transaction1 = new Transaction('입금', 'Trout', 'Today', 1000, 0)

const insertUser = (user:User) => {
  USERS.push(user)
}

const insertTransaction = (userIndex:number, transaction:Transaction) => {
  USERS[userIndex].transaction.push(transaction)
}

insertUser(Trout)
insertUser(Kane)

insertTransaction(0, transaction1)

console.log(USERS)

export {Transaction, USERS, insertUser}