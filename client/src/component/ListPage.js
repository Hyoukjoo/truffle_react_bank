import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import '../css/ListPage.css'

class ListPage extends Component {

  componentDidUpdate = () => {
    console.log("Listpage_componentUpdate :", this.props.info)
  }

  render(){
    return (
      <div className="ListPage">
        {localStorage.getItem('isLogin') !== "true" && this.props.redirect()}

        <div className="list">
          <Link to="/inputmoney">입  금</Link>
        </div>
        <div className="list">
          <Link to="/checkpassword">출  금</Link>
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

export default withRouter(ListPage)