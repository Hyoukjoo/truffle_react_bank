import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'

import '../css/Statement.css'

class Statement extends Component {
  constructor(props) {
    super(props)

    this.state = { count : 5, time : '' }
  }

  componentDidMount = () => {
    const _showCount = setInterval(this._getCount, 1000)
    
    setTimeout(() => { 
      clearInterval(_showCount)
      this.props.history.push('/') 
    }, 5000)

    this._getDate()
  }

  componentWillUnmount = () => this.props.logout()

  _getCount = () => {
    let _count = this.state.count
    _count -= 1
    this.setState({ count : _count })
  }

  _getDate = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = ("0" + (date.getMonth() + 1)).slice(-2)
    const day = ("0" + date.getDate()).slice(-2)
    const hours = ("0" + date.getHours()).slice(-2)
    const minutes = ("0" + date.getMinutes()).slice(-2)
    const seconds = ("0" + date.getSeconds()).slice(-2)
    this.setState({ time : `${year}.${month}.${day} ${hours}:${minutes}:${seconds}` })
  }

  _redirectLogin = () => {
    console.log('고객 정보가 없습니다.')
    return <Redirect to='/' />
  }

  render() {
    return(
      <div className='statementDiv'>
        {this.props.contract === null && <Redirect to='/' />}

        <div className='statementTitle'><span>명세서</span></div>
        <div className='statementItem'>구분 : {this.props.match.params.purpose === 'deposit' ? '입금' : '출금'}</div>
        <div className='statementItem'>날짜 : {this.state.time}</div>
        {/* this.props.contract가 null이면 우선적으로 에러가 일어나 조건을 주고 있을 시에만 표현하도록 했다. */}
        <div className='statementItem'>계좌 : {this.props.contract.address && this.props.contract.address }</div> 
        <div className='statementItem'>금액 : {localStorage.getItem('amount').replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
        <div className='statementItem'>수수료 : 0</div>
        <div className='statementItem'>잔액 : {localStorage.getItem('balance').replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>

        <p>{this.state.count}초 후에 종료됩니다.</p> 
      </div>
    )
  }
}

export default withRouter(Statement)