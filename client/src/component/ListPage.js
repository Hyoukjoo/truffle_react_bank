import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import '../css/ListPage.css'

class ListPage extends Component {

  render(){
    const { redirect, logout } = this.props
    const isLogin = localStorage.getItem('isLogin')

    return (
      <div className="ListPage">
        {isLogin !== "true" && redirect()}

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
          <Link to="/">조  회</Link>
        </div>
        <div className="list pull">
          <Link to="#" onClick={logout}>취  소</Link>
        </div>
      </div>
    )
  }
}

export default withRouter(ListPage)