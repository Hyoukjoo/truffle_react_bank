import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import '../css/Remit.css'
import { BANKS } from '../DB'

class Remit extends Component {
  constructor(props) {
    super(props)

    this.state = {
      bank : '',
      isBankList : false
    }

    this.addressInput = React.createRef()
  }
  
  _getBankList = () => {
    return (
      <div className='bankListBack'>
        <div className='bankListDiv'>
          {BANKS.map(bank => 
            (<div className='bankList' key={bank} onClick={() => this._selectBank(bank)}><span>{bank}</span></div>))
          }
        </div>
      </div>
    )
  }
  
  _selectBank = bank => {
    this.setState({ bank, isBankList : false })
    localStorage.setItem('bank', bank)
  }
  
  _submit = async () => {
    const { bank } = this.state
    const address = this.addressInput.current.value
    try{
      const receiver = await this.props.info.contract.checkAccount.call(bank, address, { from : this.props.info.accounts[0] })
      localStorage.setItem('receiver', receiver)
      localStorage.setItem('receiverAddress', address)
      this.props.history.push('/entermoney/remit')
    } catch(error) {
      console.log(error)
    }

  }
  render() {
    const { bank, isBankList } = this.state
    const { redirect, logout } = this.props
    const { _getBankList, _submit } = this
    const isLogin = localStorage.getItem('isLogin')

    return ( 
      <div className='remit'>
        {isLogin !== "true" && redirect()}
        {isBankList === true ? _getBankList() : ''}

        <div className='selectBank' onClick={() => this.setState({ isBankList : true })}>
          <span>{bank === '' ? '은행선택' : `${bank}`}</span>
        </div>
        <div>
          <input 
            ref={this.addressInput}
            className='addressInput' 
            placeholder='Input receiver wallet address' 
          ></input>
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
    )
  }
}

export default withRouter(Remit)