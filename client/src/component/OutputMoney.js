import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import '../css/OutputMoney.css'

class OutputMoney extends Component {
  constructor(props) {
    super(props)

    this.amountSpan = new React.createRef()

    this.state = { amount: '' }
  }

  _inputAmount = inputAmount => {
    let amount = this.state.amount

    if(parseInt((amount + inputAmount), 10) > 500) amount = '500'
    else amount = amount + inputAmount

    this.setState({ amount: amount })
  }

  _submit = () => {
    if(this.state.amount !== '0' && this.state.amount !== '') {
      localStorage.setItem('withdraw_sum', this.state.amount)
      this.props.history.push('/submit/withdraw')
    } else {
      console.log('출금할 금액을 입력해 주세요.')
    }
  }

  render() {
    return (
      <div>
        <p style={{ 
          display:"inline-block", 
          marginTop: "20px", marginBottom:"0", 
          fontSize:"30px", 
          fontFamily:"'Do Hyeon', sans-serif"}}> 출금할 금액을 입력하세요 </p>

        <div className="amount">
          <span ref={this.amountSpan}>
            ￦ {this.state.amount === '' ? '0' : (this.state.amount * 10000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </span>
        </div>

        <div className="inputAmount">
          <div className="numberDiv">
            <div className="number" onClick={() => this._inputAmount('1')}><span>1</span></div>
            <div className="number middle" onClick={() => this._inputAmount('2')}><span>2</span></div>
            <div className="number" onClick={() => this._inputAmount('3')}><span>3</span></div>
            <div className="number" onClick={() => this._inputAmount('4')}><span>4</span></div>
            <div className="number middle" onClick={() => this._inputAmount('5')}><span>5</span></div>
            <div className="number" onClick={() => this._inputAmount('6')}><span>6</span></div>
            <div className="number" onClick={() => this._inputAmount('7')}><span>7</span></div>
            <div className="number middle" onClick={() => this._inputAmount('8')}><span>8</span></div>
            <div className="number" onClick={() => this._inputAmount('9')}><span>9</span></div>
            <div className="number" onClick={() => this.setState({ amount: '' })}><span>정정</span></div>
            <div className="number middle" onClick={() => this._inputAmount('0')}><span>0</span></div>
            <div className="number" onClick={() => this._inputAmount('00')}><span>00</span></div>
          </div>
        </div>

        <div className="submitDiv" style={{ marginTop:"35px"}}>
          <div className="submit confirmButton" onClick={this._submit}>
            <span>확 인</span>
          </div>
          <div className="space"></div>
          <div className="submit cancelButton" onClick={this.props.logout}>
            <span>취 소</span>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(OutputMoney)