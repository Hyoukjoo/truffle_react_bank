import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import '../css/Check.css'

class Check extends Component {
  constructor(props) {
    super(props)

    this.state = { password : '', count : 0 }
  }

  _inputPassword = password => {
    const pass = this.state.password
    if(pass.length >= 4) console.log("비밀번호는 네자리입니다.")
    else this.setState({ password : pass + password})
  }

  _subPassword = () => {
    const pass = this.state.password.slice(0, -1)
    this.setState({ password : pass })
  }

  _showPassword = length => {
    let pass = ''
    for(let i = 0; i < length; i++){
      pass += '*'
    }
    return pass
  }

  _submit = async () => {
    let count = this.state.count
    if(this.state.password.length < 4) console.log('비밀번호는 네자리입니다.')
    else {
      try{
        await this.props.info.contract.checkPassword(this.state.password, { from : this.props.info.accounts[0] })
        this.props.history.push('/outputmoney')
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
    return (
      <div>
        {localStorage.getItem('isLogin') !== "true" && this.props.redirect()}

        <p style={{ 
          display:"inline-block", 
          marginTop: "20px", marginBottom:"0", 
          fontSize:"30px", 
          fontFamily:"'Do Hyeon', sans-serif"}}> 비밀번호를 입력하세요 </p>

        <div className="password">
          <span>
            {this._showPassword(this.state.password.length)}
          </span>
        </div>

        <div className="inputAmount">
          <div className="numberDiv">
            <div className="number" onClick={() => this._inputPassword('1')}><span>1</span></div>
            <div className="number middle" onClick={() => this._inputPassword('2')}><span>2</span></div>
            <div className="number" onClick={() => this._inputPassword('3')}><span>3</span></div>
            <div className="number" onClick={() => this._inputPassword('4')}><span>4</span></div>
            <div className="number middle" onClick={() => this._inputPassword('5')}><span>5</span></div>
            <div className="number" onClick={() => this._inputPassword('6')}><span>6</span></div>
            <div className="number" onClick={() => this._inputPassword('7')}><span>7</span></div>
            <div className="number middle" onClick={() => this._inputPassword('8')}><span>8</span></div>
            <div className="number" onClick={() => this._inputPassword('9')}><span>9</span></div>
            <div className="number" onClick={() => this.setState({ password : '' })}><span>정정</span></div>
            <div className="number middle" onClick={() => this._inputPassword('0')}><span>0</span></div>
            <div className="number" onClick={this._subPassword}><span>←</span></div>
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

export default withRouter(Check)