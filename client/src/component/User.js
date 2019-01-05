import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class User extends Component {
  _logout = () => {
    localStorage.removeItem('loginInfo')
    
    this.props.history.push(`/`)
  }

  render(){
    return(
      <div>
        <p>WELCOME</p>
        <button onClick={this._logout}>LOGOUT</button>
      </div>
    )
  }
}

export default withRouter(User)