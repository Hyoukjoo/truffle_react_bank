import React, { Component } from 'react';

import '../css/Balance.css';

class Balance extends Component {
  replaceNumber = () => {
    return this.props.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  render(){
    return (
      <div className="balanceDiv">
        <span>{this.replaceNumber()}</span>
      </div>
    )
  }
}

export default Balance ;