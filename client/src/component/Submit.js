import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'

import { USERS, insertTransaction } from '../DB/DB'
import '../css/Submit.css'

class Submit extends Component {
  state = {
    contract : this.props.info.contract,
    bankAccount : this.props.info.accounts[0],
    userAddress : this.props.info.userAddress,
    amount : 0,
    charge : 0,
    date : ''
  }

  componentWillMount = () => {
    let amount = 0
    const { purpose } = this.props.match.params

    if(purpose === 'deposit'){
      amount = parseInt(localStorage.getItem('deposit_amount'), 10)
    } else if(purpose === 'withdraw') {
      amount = parseInt(localStorage.getItem('withdraw_amount'), 10)
    } else if(purpose === 'remit') {
      amount = parseInt(localStorage.getItem('remit_amount'), 10)
    }

    this.setState({ amount })
  }

  _submit = async () => {
    const { bankAccount, amount, contract, userAddress, charge } = this.state
    let { purpose } = this.props.match.params
    const receiverName = localStorage.getItem('receiverName')
    const receiverAddress = localStorage.getItem('receiverAddress')
    const userName = USERS.get(userAddress).userName
    
    if(isNaN(amount)) console.log("숫자만 입력할 수 있습니다.") 
    else if(amount === 0) console.log('금액을 입력하세요')
    else if(purpose !== ''){
      try{
        //Call deposit or withdraw from constant according to the purpose
        switch(purpose) {
          case 'deposit' : 
            await contract.deposit(amount, { from : bankAccount }) 
            purpose = '입금'
            break
          case 'withdraw' : 
            await contract.withdraw(amount, { from : bankAccount }) 
            purpose = '출금'
            break
          case 'remit' : 
            await contract.remit(amount, receiverAddress, { from : bankAccount }) 
            purpose = '송금'
            break
          default : break
        }
        const date = this._getDate()

        //Set balance in state
        const userbalance = await contract.getBalance(userAddress, { from : bankAccount })

        const transaction = this._makeTransaction(purpose, userName, date, amount, charge, userbalance.words[0], receiverName, receiverAddress)

        //Insert the transaction in DB
        insertTransaction(userAddress, transaction)

        if(purpose === '송금') {
          const receiverBalance = await contract.getBalance(receiverAddress, { from : bankAccount })
          const receiverTransaction = this._makeTransaction(purpose, userName, date, amount, charge, receiverBalance.words[0], receiverName, receiverAddress)
          insertTransaction(receiverAddress, receiverTransaction)
        }

        USERS.get(userAddress).balance = userbalance.words[0]

        //Set amount, balance, date in localStorage
        localStorage.setItem('amount', amount)
        localStorage.setItem('balance', userbalance)
        localStorage.setItem('date', date)

        this.props.history.push(`/statement/${this.props.match.params.purpose}`)
      } catch(error) {
        console.log(error)
      }
    }
  }

  _getDate = () => {
    const DATE = new Date()
    const year = DATE.getFullYear()
    const month = ("0" + (DATE.getMonth() + 1)).slice(-2)
    const day = ("0" + DATE.getDate()).slice(-2)
    const hours = ("0" + DATE.getHours()).slice(-2)
    const minutes = ("0" + DATE.getMinutes()).slice(-2)
    const seconds = ("0" + DATE.getSeconds()).slice(-2)
    const date = `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`

    this.setState({ date })

    return date
  }

  _makeTransaction = (purpose, userName, date, amount, charge, balance, receiverName, receiverAddress) => {
    const transaction = {
      purpose : purpose,
      userName : userName,
      date : date,
      amount : amount,
      charge : charge,
      balance : balance,
      receiverName : receiverName,
      receiverAddress : receiverAddress
    }

    return transaction
  }

  _checkPurpose = () => {
    const receiverName = localStorage.getItem('receiverName')
    const { purpose } = this.props.match.params

    switch (purpose) {
      case 'deposit': return "입금할 금액이 맞습니까 ?"
      case 'withdraw' : return "출금할 금액이 맞습니까 ?"
      case 'remit' : return `${receiverName}님께 송금할 금액이 맞습니까 ?`
      default : break
    }
  }

  render(){
    const { logout } = this.props
    const { _checkPurpose, _submit } = this
    const inThousandsAmount = this.state.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

    if(localStorage.getItem('isLogin') !== 'true') {
      console.log('고객 정보가 없습니다.')
      return <Redirect to='/' />
    }

    return(
      <div className="submit">
        <p className='checkAmount'>{_checkPurpose()}</p>

        <div style={{ marginTop:"30px" }}>
          <div className="amount">
            <span>￦ {inThousandsAmount}</span>
          </div>

          <div className="submitDiv">
            <div className="submitButton confirmButton" onClick={_submit}>
              <span>확 인</span>
            </div>
            <div className="submitButton cancelButton" onClick={logout}>
              <span>취 소</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Submit)