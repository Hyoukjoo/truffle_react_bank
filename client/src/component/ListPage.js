import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

import '../css/ListPage.css'

class ListPage extends Component {

  _redirectLogin = () => {
    console.log('Login Please!')
    return <Redirect to='/' />
  }

  render(){
    return (
      <div className="ListPage">
        {!this.props.info.contract && this._redirectLogin()}

        <div className="list">
          <Link to="/inputmoney">입  금</Link>
        </div>
        <div className="list">
          <Link to="/outputmoney">출  금</Link>
        </div>
        <div className="list">
          <Link to="/">송  금</Link>
        </div>
        <div className="list">
          <Link to="/">조  회</Link>
        </div>
        <div className="list pull">
          <Link to="#" onClick={this.props.logout}>취  소</Link>
        </div>
      </div>
    )
  }
}

export default ListPage