import React, { Component, Fragment } from 'react'
import { withRouter, Redirect } from 'react-router-dom'

import '../css/CheckPassword.css'

class CheckPassword extends Component {
  state = { password : '', count : 0 }

  _inputPassword = inputedNum => {
    const { password } = this.state

    if(password.length >= 4) console.log("비밀번호는 네자리입니다.")
    else this.setState({ password : password + inputedNum })
  }

  _subPassword = () => {
    const password = this.state.password.slice(0, -1)

    this.setState({ password })
  }

  _showPassword = length => {
    let coveredPassword = ''

    for(let i = 0; i < length; i++){
      coveredPassword += '*'
    }
    
    return coveredPassword
  }

  _submit = async () => {
    let count = this.state.count
    const { purpose } = this.props.match.params
    const { password } = this.state
    const { contract, accounts } = this.props.info

    if(password.length < 4) console.log('비밀번호는 네자리입니다.')
    else {
      try{
        await contract.checkPassword(password, { from : accounts[0] })
        if(purpose === 'withdraw') this.props.history.push('/entermoney/withdraw')
        else if(purpose === 'remit') this.props.history.push('/remit')
      } catch(error) {
        if(count === 4) {
          console.log("비밀번호를 5번 틀렸습니다. 처음으로 돌아갑니다.")
          this.props.logout()
        } else {
          count++
          console.log(`비밀번호를 ${count}번 틀렸습니다.`)
          this.setState({ password : '', count })
        }
      }
    }
  }

  render(){
    const { password } = this.state
    const { logout } = this.props
    const { _showPassword, _inputPassword, _subPassword, _submit } = this
    
    if(localStorage.getItem('isLogin') !== 'true') {
      console.log('고객 정보가 없습니다.')
      return <Redirect to='/' />
    }

    return (
      <Fragment>
        <p className='guidance'> 비밀번호를 입력하세요 </p>

        <div className="password">
          <span>{_showPassword(password.length)}</span>
        </div>

        <div className="inputAmount">
          <div className="numberDiv">
            <div className="number" onClick={() => _inputPassword('1')}><span>1</span></div>
            <div className="number middle" onClick={() => _inputPassword('2')}><span>2</span></div>
            <div className="number" onClick={() => _inputPassword('3')}><span>3</span></div>
            <div className="number" onClick={() => _inputPassword('4')}><span>4</span></div>
            <div className="number middle" onClick={() => _inputPassword('5')}><span>5</span></div>
            <div className="number" onClick={() => _inputPassword('6')}><span>6</span></div>
            <div className="number" onClick={() => _inputPassword('7')}><span>7</span></div>
            <div className="number middle" onClick={() => _inputPassword('8')}><span>8</span></div>
            <div className="number" onClick={() => _inputPassword('9')}><span>9</span></div>
            <div className="number" onClick={() => this.setState({ password : '' })}><span>정정</span></div>
            <div className="number middle" onClick={() => _inputPassword('0')}><span>0</span></div>
            <div className="number" onClick={_subPassword}><span>←</span></div>
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

export default withRouter(CheckPassword)