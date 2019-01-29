import React, { Component, Fragment } from 'react'
import { withRouter, Redirect } from 'react-router-dom'

import '../css/EnterMoney.css'

class EnterMoney extends Component {
  state = { num : '', amount: '' }

  _inputAmount = inputedNum => {
    let { num } = this.state
    const { purpose } = this.props.match.params

    if(purpose === 'withdraw'){
      if(parseInt((num + inputedNum), 10) > 500) num = '500'
      else num = num + inputedNum
    } else if(purpose === 'remit'){
      if(parseInt((num + inputedNum), 10) > 5000000) num = '5000000'
      else num = num + inputedNum
    }
    
    if(purpose === 'withdraw') this.setState({ num, amount : (num*10000).toString() })
    else if(purpose === 'remit') this.setState({ num, amount : num })
  }

  _subPassword = () => {
    const { purpose } = this.props.match.params
    
    if(purpose === 'withdraw'){
      const num = this.state.num.slice(0,-1)
      this.setState({ num, amount : (num*10000).toString() })
    }else if(purpose === 'remit'){
      const num = this.state.num.slice(0,-1)
      this.setState({ num, amount : num })
    }
  }

  _submit = () => {
    const { amount } = this.state
    const { purpose } = this.props.match.params

    if(amount !== '0' && amount !== '') {
      if(purpose === 'withdraw'){
        localStorage.setItem('withdraw_amount', amount)
        this.props.history.push('/submit/withdraw')
      } else if(purpose === 'remit'){
        localStorage.setItem('remit_amount', amount)
        this.props.history.push('/submit/remit')
      }
    } else {
      if(purpose === 'withdraw'){
        console.log('출금할 금액을 입력하세요')
      } else if(purpose === 'remit'){
        console.log('송금할 금액을 입력하세요')
      }
    }
  }

  render(){
    const { amount } = this.state
    const { _inputAmount, _subPassword, _submit } = this
    const { logout } = this.props
    const { purpose } = this.props.match.params
    const inThousandsAmount = amount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    
    if(localStorage.getItem('isLogin') !== 'true') {
      console.log('고객 정보가 없습니다.')
      return <Redirect to='/' />
    }

    return (
      <Fragment>
        { purpose === 'withdraw' && <p className="guidance"> 출금할 금액을 입력하세요 </p> }
        { purpose === 'remit' && <p className="guidance"> 송금할 금액을 입력하세요 </p> }

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
            <div className="number" onClick={() => this.setState({ num : '', amount: '' })}><span>정정</span></div>
            <div className="number middle" onClick={() => _inputAmount('0')}><span>0</span></div>
            <div className="number" onClick={() => _subPassword()}><span>←</span></div>
          </div>
        </div>

        <div className="submitDiv">
          <div className="submitButton confirmButton" onClick={_submit}>
            <span>확 인</span>
          </div>
          <div className="submitButton cancelButton" onClick={logout}>
            <span>취 소</span>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(EnterMoney)