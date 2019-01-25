import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import '../css/Submit.css'

class Submit extends Component {
  constructor(props){
    super(props);

    this.state = {
      contract : this.props.info.contract,
      bankAccount : this.props.info.accounts[0],
      amount : 0,
      date : ''
    }
  }

  componentWillMount = () => {
    let amount = 0
    const { purpose } = this.props.match.params
    if(purpose === 'deposit'){
      const fifty = parseInt(localStorage.getItem('fifty'), 10) * 50000
      const ten = parseInt(localStorage.getItem('ten'), 10) * 10000
      const five = parseInt(localStorage.getItem('five'), 10) * 5000
      const one = parseInt(localStorage.getItem('one'), 10) * 1000
      
      amount = fifty + ten + five + one
    } else if(purpose === 'withdraw') {
      amount = localStorage.getItem('withdraw_sum')
    } else if(purpose === 'remit') {
      amount = localStorage.getItem('remit_amount')
    }

    this.setState({ amount })
  }

  _submit = async () => {
    const { bankAccount, amount, contract } = this.state
    const { purpose } = this.props.match.params
    const receiverAddress = localStorage.getItem('receiverAddress')
    
    if(isNaN(amount)) console.log("숫자만 입력할 수 있습니다.") 
    else if(amount === 0) console.log('금액을 입력하세요')
    else if(purpose !== '')
      try{
        //Call deposit or withdraw from constant according to the purpose
        switch(purpose) {
          case 'deposit' : 
            await contract.deposit(amount, { from : bankAccount }) 
            break
          case 'withdraw' : 
            await contract.withdraw(amount, { from : bankAccount }) 
            break
          case 'remit' : 
            await contract.remit(amount, receiverAddress, { from : bankAccount }) 
            break
          default : break
        }

        if(purpose === 'deposit')
          await contract.deposit(amount, { from : bankAccount })
        else if(purpose === 'withdraw')
          await contract.withdraw(amount, { from : bankAccount })
        else if(purpose === 'remit')
          await contract.remit(amount, receiverAddress, { from : bankAccount })

        //Set date in state 
        this._getDate()
        const { date } = this.state

        //Set balance in state
        const balance = await contract.getBalance()

        //Set amount, balance, date in localStorage
        localStorage.setItem('amount', amount)
        localStorage.setItem('balance', balance)
        localStorage.setItem('date', date)

        this.props.history.push(`/statement/${purpose}`)
      } catch(error) {
        console.log(error)
      }
  }

  _getDate = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = ("0" + (date.getMonth() + 1)).slice(-2)
    const day = ("0" + date.getDate()).slice(-2)
    const hours = ("0" + date.getHours()).slice(-2)
    const minutes = ("0" + date.getMinutes()).slice(-2)
    const seconds = ("0" + date.getSeconds()).slice(-2)
    this.setState({ date : `${year}.${month}.${day} ${hours}:${minutes}:${seconds}` })
  }

  _checkPurpose = () => {
    const receiver = localStorage.getItem('receiver')
    const { purpose } = this.props.match.params

    switch (purpose) {
      case 'deposit': return "입금할 금액이 맞습니까 ?"
      case 'withdraw' : return "출금할 금액이 맞습니까 ?"
      case 'remit' : return `${receiver}님께 송금할 금액이 맞습니까 ?`
      default : break
    }
  }

  render(){
    const { redirect, logout } = this.props
    const { _checkPurpose, _submit } = this
    const isLogin = localStorage.getItem('isLogin')
    const inThousandsAmount = this.state.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

    return(
      <div className="submit">
        {isLogin !== "true" && redirect()}

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