import React, { Component, Fragment } from 'react'
import { withRouter, Redirect } from 'react-router-dom'

import '../css/Statement.css'

class Statement extends Component {
  state = { count : 3, date : '', amount : '', balance : '' }

  componentDidMount = () => {
    const _showCount = setInterval(this._getCount, 1000)
    
    setTimeout(() => { 
      clearInterval(_showCount)

      this.props.logout()
    }, 3000)

    this.setState({
      date : localStorage.getItem('date'),
      amount : localStorage.getItem('amount'),
      balance : localStorage.getItem('balance')
    })
  }

  _getCount = () => {
    let { count } = this.state

    count -= 1

    this.setState({ count })
  }

  _getPurpose = () => {
    const { purpose } = this.props.match.params
    
    switch (purpose) {
      case 'deposit' : return '입금'
      case 'withdraw' : return '출금'
      case 'remit' : return '송금'
      default : break
    }
  }

  _getReceiverInfo = () => {
    const receiverName = localStorage.getItem('receiverName')
    const receiverAddress = localStorage.getItem('receiverAddress')

    return (
      <div>
        <div className='statementItem'>수신인명 : {receiverName}</div> 
        <div className='statementItem'>수신계좌 : {receiverAddress}</div> 
      </div>
    )
  }

  render() {
    const { _getPurpose, _getReceiverInfo } = this
    const { count, date, amount, balance } = this.state
    const { purpose } = this.props.match.params
    const inThousandsAmount = amount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    const inThousandsBalance = balance.replace(/\B(?=(\d{3})+(?!\d))/g, ",")

    if(localStorage.getItem('isLogin') !== 'true') {
      console.log('고객 정보가 없습니다.')
      return <Redirect to='/' />
    }

    return(
      <Fragment>
        <div className='statementDiv'>
          <div className='statementTitle'><span>명세서</span></div>
          <div className='statementItem'>[{_getPurpose()}]</div>
          <div className='statementItem'>일시 : {date}</div>
          <div className='statementItem'>요청금액 : {inThousandsAmount}</div>
          <div className='statementItem'>거래후 잔액 : {inThousandsBalance}</div>
          <div className='statementItem'>수수료 : 0</div>
          {purpose === 'remit' && _getReceiverInfo()}
        </div>
        <div className='count'><span>{count}초 후에 종료됩니다.</span></div> 
      </Fragment>
    )
  }
}

export default withRouter(Statement)