import React, { Component } from "react";
import PropTypes from 'prop-types';
import getWeb3 from "./utils/getWeb3";
import truffleContract from "truffle-contract";
import BankContract from "./contracts/BankContract.json";

import "./App.css";
import Bank from './component/Bank';

class App extends Component {
  state = { web3: null, accounts: null, contract: null, balance: 10000};

  static propTypes = {
    balance: PropTypes.number
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Set web3, accounts 
      this.setState({ web3, accounts});
      console.log(this.state);
      console.log("balance : " + await web3.eth.getBalance(accounts[0]));
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.log(error);
    }
  };

  login = async () => {
    try{
      // Get the contract instance.
      const Contract = truffleContract(BankContract);
      Contract.setProvider(this.state.web3.currentProvider);
      const instance = await Contract.deployed();
      this.setState({
        contract: instance
      });
    } catch(error) {
      console.log(error);
    }
    console.log(await this.state);
  }

  handleDeposit = (amount) => {
    this.setState({
      balance: this.state.balance + amount
    });
    
    setTimeout(() => this.getBalance(), 10);
    this.login();
  }

  handleWithdraw = (amount) => {
    this.setState({
      balance: this.state.balance - amount
    });
    
    setTimeout(() => this.getBalance(), 10);
  }

  getBalance = () => console.log(this.state.balance) ;


  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <Bank 
          handleDeposit={this.handleDeposit} 
          handleWithdraw={this.handleWithdraw} 
          balance={this.state.balance}
          login={this.login}
        ></Bank>
      </div>
    );
  }
} 

export default App;
