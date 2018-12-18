import React, {Component} from 'react';

class Bank extends Component {
  render(){
    return (
      <div className="Bank">
        <Deposit></Deposit>
        <Withdraw></Withdraw>
        <CheckAcc></CheckAcc>
        <AccTransfer></AccTransfer>
      </div>
    );
  }
}

function Deposit() {
  return (
    <div className="deposit">
      <input type="text"></input>
      <button>DEPOSIT</button>
    </div>
  );
}

function Withdraw(){
  return (
    <div className="withdraw">
      <input type="text"></input>
      <button>WITHDRAW</button>
    </div>
  )
}

function CheckAcc(){
  return(
    <div className="checkAcc">
      <input type="text"></input>
      <button>CHECK</button>
    </div>
  )
}

function AccTransfer(){
  return(
    <div className="AccTransfer">
      <input type="text"></input>
      <input type="text"></input>
      <button>TRANSFER</button>
    </div>
  )
}

export default Bank ;