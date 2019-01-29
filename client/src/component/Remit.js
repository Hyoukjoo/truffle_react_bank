import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'

import '../css/Remit.css'
import { BANKS } from '../DB/DB'

class Remit extends Component {
  state = { bank : '', isBankList : false }

  constructor(props) {
    super(props)
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
    const receiverAddress = this.addressInput.current.value
    const { contract, accounts } = this.props.info

    try{
      const receiverName = await contract.checkAccount.call(bank, receiverAddress, { from : accounts[0] })

      localStorage.setItem('receiverName', receiverName)
      localStorage.setItem('receiverAddress', receiverAddress)
      
      this.props.history.push('/entermoney/remit')
    } catch(error) {
      console.log(error)
    }

  }
  render() {
    const { bank, isBankList } = this.state
    const {  logout } = this.props
    const { _getBankList, _submit } = this

    if(localStorage.getItem('isLogin') !== 'true') {
      console.log('고객 정보가 없습니다.')
      return <Redirect to='/' />
    }

    return ( 
      <div className='remit'>
        {isBankList === true ? _getBankList() : ''}

        <div className='selectBank' onClick={() => this.setState({ isBankList : true })}>
          <span>{bank === '' ? '은행선택' : `${bank}`}</span>
        </div>
        <div>
          <input 
            ref={this.addressInput}
            className='addressInput' 
            placeholder='Input receiver wallet address' 
            // onChange={() => {localStorage.setItem('receiverAddress', this.addressInput.current.value)}}
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