import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import '../css/IndexPage.css'

class IndexPage extends Component {
  render(){
    return(
      <div className="indexPage">
        <p className="title">ATM</p>
        <p className="subTitle">BY BLOCKCHAIN</p>
        <div className='login'>
          <div className="hole"></div>
          <div className="card" onClick={this.props.login}>
            <div className="arrow">↑</div>
            <span>CARD</span>
          </div>
        </div>
        {/* <div className="pull">
          {this.props.info.contract &&
            <div onClick={this.props.logout}>
              <span>카드 빼기</span>
            </div>
          }
        </div> */}
      </div>
    )
  }
}

export default withRouter(IndexPage)