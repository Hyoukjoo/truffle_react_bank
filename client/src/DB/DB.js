import { Kane, Trout, Kershow, Johnson } from './UserInfo'

const USERS = new Map()

USERS.set('0xCA2a5fB5C0D024c2dE66482883C8C3E1f7AdE001', Kane)

USERS.set('0x0A597b0FFF74f0c25Ca40463ec65ad4fe6796784', Trout)

USERS.set('0xF26ac7a182428C2A5059cfB4Faf6b2C162e7bf34', Kershow)

USERS.set('0x01C9b80104ee4CFD48C065d18b9b10F220540446', Johnson)

const BANKS = [
    'TRUFFLE', 'KB', 'WOORI', 'SINHAN', 'KAKAO', 'K BANK', 'IDK', 'SC', 'CITY', 'KEB'
]

const insertTransaction = (userAddress, transaction) => {
  USERS.get(userAddress).transactions.push(transaction)
}

const getTransaction = userAddress => USERS.get(userAddress).transactions

const insertUser = (userAddress, userInfo) => USERS.set(userAddress, userInfo)

export { USERS, BANKS, insertTransaction, getTransaction, insertUser }