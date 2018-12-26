import React, {Component} from 'react';
import Deposit from './Deposit';
import Withdraw from './Withdraw';
import Login from './Login';

import '../css/Bank.css';

class Bank extends Component {
  constructor(props){
    super(props);
    this.state = { page : '' };
  }

  insertPage = (e) => {
    this.setState({
      page : e.target.innerHTML
    })
  }

  render(){
    return (
      <div className="Bank">
        <div className="FunctionList">
          <button onClick={this.insertPage}>D</button>
          <button onClick={this.insertPage}>W</button>
          <button onClick={this.insertPage}>T</button>
          <button onClick={this.insertPage}>C</button>
        </div>
        <ShowPage 
          page={this.state.page} 
          handleDeposit={this.props.handleDeposit} 
          handleWithdraw={this.props.handleWithdraw} 
          balance={this.props.balance} 
          login={this.props.login}
        />
      </div>
    );
  }
}

function ShowPage(props) {
  switch (props.page) {
    case "D":
      return <Deposit handleDeposit={props.handleDeposit} balance={props.balance} />
    case "W":
      return <Withdraw handleWithdraw={props.handleWithdraw} balance={props.balance} />
    default:
      return <IndexPage login={props.login} />
  }
}

function IndexPage(props){
  return (
    <div className="Index">
      <p id="title">ATM</p>
      <p id="subTitle">BY BLOCKCHAIN</p>
      <Login login={props.login} />
    </div>
  )
}

export default Bank ;