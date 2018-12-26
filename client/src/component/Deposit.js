import React, { Component } from 'react';
import Balance from './Balance';

class Deposit extends Component {
  constructor(props){
    super(props);
    this.amountInput = React.createRef();
    // this.deposit = this.deposit.bind(this);
  }

  deposit = () => {
    const amount = Number(this.amountInput.current.value);
    if(!isNaN(amount)){
      this.props.handleDeposit(amount);
    } else {
      alert("Only Number");
    }
    this.amountInput.current.value = '';
  }

  render(){
    return(
      <div className="deposit">
        <Balance balance={this.props.balance} />
        <div className="depositDiv">
          <input type="text" ref={this.amountInput}></input>
          <button onClick={this.deposit}>DEPOSIT</button>
        </div>
      </div>
    )
  }
}

export default Deposit;