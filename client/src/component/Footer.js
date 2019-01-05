import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import '../css/Footer.css'

class Footer extends Component {
  constructor(props){
    super(props)

    this.state = {
      contract: this.props.contract
    }
  }

  _updateBalance = async () => {
    const balance = await this.state.contract.getBalance()
    localStorage.setItem('balance', balance.words[0])
  }

  _

  render(){

    return(
      <div className="Footer">
        <Link 
          to='/deposit'
          onClick={() => {
            if(this.state.contract){
              this._updateBalance()
              localStorage.setItem('pageInfo', 'deposit')
            }
          }}
        ><span>D</span></Link>
        <Link 
          to='/withdraw'
          onClick={() => {
            if(this.state.contract){
              this._updateBalance()
              localStorage.setItem('pageInfo', 'withdraw')}
          }}
        ><span>W</span></Link>
        <Link 
          to="/" 
          onClick={() => localStorage.removeItem('pageInfo')}
        ><span>T</span></Link>
        <Link 
          to="/" 
          onClick={() => localStorage.removeItem('pageInfo')}
        ><span>My</span></Link>
      </div>
    )
  }
}

export default Footer