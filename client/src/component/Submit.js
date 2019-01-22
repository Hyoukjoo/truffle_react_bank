import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import '../css/Submit.css'

class Submit extends Component {
  constructor(props){
    super(props);

    this.state = {
      contract: this.props.info.contract,
      balance: this.props.info.balance,
      myAccount: this.props.info.accounts[0],
      sum: 0,
    }
  }

  componentWillMount = () => {
    let sum = 0

    if(this.props.match.params.purpose === 'deposit'){
      const fifty = parseInt(localStorage.getItem('fifty'), 10) * 50000
      const ten = parseInt(localStorage.getItem('ten'), 10) * 10000
      const five = parseInt(localStorage.getItem('five'), 10) * 5000
      const one = parseInt(localStorage.getItem('one'), 10) * 1000
      
      sum = fifty + ten + five + one
    } else if(this.props.match.params.purpose === 'withdraw') {
      sum = localStorage.getItem('withdraw_sum') * 10000
    }

    this.setState({ sum: sum })
  }

  _submit = async () => {
    const amount = this.state.sum
    
    if(isNaN(amount)) console.log("Only Number") 
    else if(amount === 0) console.log('It is empty')
    else if(this.props.match.params.purpose !== '')
      try{
        //Call deposit or withdraw from constant according to the purpose
        if(this.props.match.params.purpose === 'deposit')
          await this.state.contract.deposit(amount, { from: this.state.myAccount })
        else if(this.props.match.params.purpose === 'withdraw')
          await this.state.contract.withdraw(amount, { from: this.state.myAccount })

        //Set balance in state
        const balance = await this.state.contract.getBalance()
        this.setState({ balance: balance.words[0] })

        //Set balance in localStorage
        localStorage.setItem('amount', amount)
        localStorage.setItem('balance', balance)

        this.props.history.push(`/statement/${this.props.match.params.purpose}`)
      } catch(error) {
        console.log(error)
      }
  }

  _checkPurpose = () => {
    switch (this.props.match.params.purpose) {
      case 'deposit': return "입금할 금액이 맞습니까 ?"
      case 'withdraw' : return "출금할 금액이 맞습니까 ?"
      default : break
    }
  }

  render(){
    return(
      <div className="article">
        {localStorage.getItem('isLogin') !== "true" && this.props.redirect()}

        <p className='checkAmount'>{this._checkPurpose()}</p>

        <div style={{ marginTop:"30px" }}>
          <div className="amount">
            <span>￦ {this.state.sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
          </div>

          <div className="submitDiv">
            <div className="submit confirmButton" onClick={this._submit}>
              <span>확 인</span>
            </div>
            <div className="space"></div>
            <div className="submit cancelButton" onClick={this.props.logout}>
              <span>취 소</span>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default withRouter(Submit)