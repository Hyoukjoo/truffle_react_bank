import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import '../css/OutputMoney.css'

class OutputMoney extends Component {
  constructor(props) {
    super(props)

    this.state = { amount: '' }
  }

  _inputAmount = inputedAmount => {
    let { amount } = amount

    if(parseInt((amount + inputedAmount), 10) > 500) amount = '500'
    else amount = amount + inputedAmount

    this.setState({ amount })
  }

  _submit = () => {
    const { amount } = this.state
    if(amount !== '0' && amount !== '') {
      localStorage.setItem('withdraw_sum', amount)
      this.props.history.push('/submit/withdraw')
    } else {
      console.log('출금할 금액을 입력해 주세요.')
    }
  }

  render() {
    const { amount } = this.state
    const { redirect, logout } = this.props
    const { _inputAmount, _submit, setState } = this
    const isLogin = localStorage.getItem('isLogin')
    const inThousandsAmount = (amount * 10000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

    return (
      <div>
        {isLogin !== "true" && redirect()}

        <p className='guidance'> 출금할 금액을 입력하세요 </p>

        <div className="amount">
          <span>
            ￦ {amount === '' ? '0' : inThousandsAmount}
          </span>
        </div>

        <div className="inputAmount">
          <div className="numberDiv">
            <div className="number" onClick={() => _inputAmount('1')}><span>1</span></div>
            <div className="number middle" onClick={() => _inputAmount('2')}><span>2</span></div>
            <div className="number" onClick={() => _inputAmount('3')}><span>3</span></div>
            <div className="number" onClick={() => _inputAmount('4')}><span>4</span></div>
            <div className="number middle" onClick={() => _inputAmount('5')}><span>5</span></div>
            <div className="number" onClick={() => _inputAmount('6')}><span>6</span></div>
            <div className="number" onClick={() => _inputAmount('7')}><span>7</span></div>
            <div className="number middle" onClick={() => _inputAmount('8')}><span>8</span></div>
            <div className="number" onClick={() => _inputAmount('9')}><span>9</span></div>
            <div className="number" onClick={() => setState({ amount: '' })}><span>정정</span></div>
            <div className="number middle" onClick={() => _inputAmount('0')}><span>0</span></div>
            <div className="number" onClick={() => _inputAmount('00')}><span>00</span></div>
          </div>
        </div>

        <div className="submitDiv" style={{ marginTop:"35px"}}>
          <div className="submit confirmButton" onClick={_submit}>
            <span>확 인</span>
          </div>
          <div className="space"></div>
          <div className="submit cancelButton" onClick={logout}>
            <span>취 소</span>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(OutputMoney)