import React, { Component } from 'react'
import { Link, withRouter, Redirect } from 'react-router-dom'

import '../css/ListPage.css'

class ListPage extends Component {
  render(){
    const { logout } = this.props

    if(localStorage.getItem('isLogin') !== 'true') {
      console.log('고객 정보가 없습니다.')
      return <Redirect to='/' />
    }

    return (
      <div className="ListPage">
        <div className="list">
          <Link to="/inputmoney">입  금</Link>
        </div>
        <div className="list">
          <Link to="/checkpassword/withdraw">출  금</Link>
        </div>
        <div className="list">
          <Link to="/checkpassword/remit">송  금</Link>
        </div>
        <div className="list">
          <Link to="/viewtransactions">조  회</Link>
        </div>
        <div className="list pull">
          <Link to="#" onClick={logout}>취  소</Link>
        </div>
      </div>
    )
  }
}

export default withRouter(ListPage)