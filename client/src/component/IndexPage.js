import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import '../css/IndexPage.css'

class IndexPage extends Component {
  constructor(props){
    super(props)

    this.userAddress = React.createRef()
  }

  _login = () => {
    if(this.userAddress.current.value === '') console.log('Input your address')
    else this.props.login(this.userAddress.current.value)
  }

  render(){
    return(
      <div className="indexPage">
        <p className="title" onClick={this.props.init}>ATM</p>
        <p className="subTitle">BY BLOCKCHAIN</p>
        <div className='login'>
          <input className="hole" ref={this.userAddress} placeholder='Input your wallet address'></input>
          <div className="card" onClick={this._login}>
            <div className="arrow">↑&nbsp;</div>
            <span>INSERT WALLET</span>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(IndexPage)