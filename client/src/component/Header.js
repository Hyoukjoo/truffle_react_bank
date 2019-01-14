import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import '../css/Header.css'

class Header extends Component {
  render(){
    return (
      <div className='Header'>
        <div className='back'><Link to="#" onClick={this.props.history.goBack}>뒤로</Link></div>
        <div className='title'>
        </div>
        <div className='home'><Link to="/listpage">처음</Link></div>
      </div>
    )
  }
}

export default withRouter(Header)