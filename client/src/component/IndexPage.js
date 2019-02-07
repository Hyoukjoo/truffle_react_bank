import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import '../css/IndexPage.css'

class IndexPage extends Component {
  constructor(props){
    super(props)
    this.userAddress = React.createRef()
  }

  _login = () => {
    if(this.userAddress.current.value === '') console.log('주소를 입력하세요.')
    else this.props.login(this.userAddress.current.value)
  }

  render(){
    const { _login } = this
    const { init } = this.props

    return(
      <div className="indexPage">
        <p className="title" onClick={init}>ATM</p>
        <p className="subTitle">BY BLOCKCHAIN</p>
        <div className='login'>
          <input className="addressInput" ref={this.userAddress} placeholder='Input your wallet address'></input>
          <div className="card" onClick={_login}>
            <div className="arrow">↑&nbsp;</div>
            <span>INSERT WALLET</span>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(IndexPage)