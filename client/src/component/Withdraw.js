import React, { Component } from 'react';
import Balance from './Balance';


class Withdraw extends Component {
  constructor(props){
    super(props);
    this.amountInput = React.createRef();
    // this.withdraw = this.withdraw.bind(this);
  }

  withdraw = () => {
    const amount = Number(this.amountInput.current.value);
    if(!isNaN(amount)){
      this.props.handleWithdraw(amount);
    } else {
      alert("Only Number");
    }
    this.amountInput.current.value = '';
  }

  render(){
    return(
      <div className="withdraw">
        <Balance balance={this.props.balance} />
        <div className="withdrawDiv">
          <input type="text" ref={this.amountInput}></input>
          <button onClick={this.withdraw}>WITHDRAW</button>
        </div>
      </div>
    )
  }
}

export default Withdraw;