import React, { Component } from 'react'

import '../css/IndexPage.css'

class IndexPage extends Component {
  _isLoginInfo = () => {
    //Check loginInfo 
    if(this.props.info.contract === null) return false 
    else return true
  }

  render(){
    return(
      <div className="article">
        <p id="title">ATM</p>
        <p id="subTitle">BY BLOCKCHAIN</p>
        <div className='login'>
          <div className="hole"></div>
          <div className="card" onClick={()=>this.props.login()}><span>CARD</span></div>
        </div>
        {/* {this._isLoginInfo()
          ? <div onClick={()=>this.props.logout()}>LOGOUT</div>
          : <div onClick={()=>this.props.login()}>LOGIN</div>
        } */}
      </div>
    )
  }
}

export default IndexPage