const USERS = new Map()

const BANKS = [ 'TRUFFLE', 'KB', 'WOORI', 'SINHAN', 'KAKAO', 'K BANK', 'IDK', 'SC', 'CITY', 'KEB' ] 

const insertTransaction = (userAddress, transaction) => {
  USERS.get(userAddress).transactions.unshift(transaction)
}

const getTransaction = userAddress => USERS.get(userAddress).transactions

const insertUser = (userAddress, userInfo) => USERS.set(userAddress, userInfo)

export { USERS, BANKS, insertTransaction, getTransaction, insertUser }