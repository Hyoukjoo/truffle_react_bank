import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import getWeb3 from './utils/getWeb3'
import truffleContract from 'truffle-contract'
import ATM from './contracts/ATM.json'
import Bank from './contracts/Bank.json'

import IndexPage from './component/IndexPage'
import ListPage from './component/ListPage'
import InputMoney from './component/InputMoney'
import Submit from './component/Submit'
import OutputMoney from './component/OutputMoney'
import Statement from './component/Statement'

import "./css/App.css"

class App extends Component {
  state = { web3: null, accounts: null, contract: null, balance: 0}

  static propTypes = {
    balance: PropTypes.number
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3()

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts()

      const Contract = truffleContract(Bank)
      Contract.setProvider(this.state.web3.currentProvider)
      const instance = await Contract.deployed()

      // Set web3, accounts in state
      this.setState({ web3, accounts, instance })

      //Initailize loginInfo in localStorage
      if(this.state.contract === null) localStorage.removeItem('loginInfo')

      localStorage.clear()
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      )
      console.log(error)
    }
  }

  _login = async () => {
    try{
      // Get the contract instance.
      const Contract = truffleContract(ATM)
      Contract.setProvider(this.state.web3.currentProvider)
      const instance = await Contract.deployed()

      //Get balance of owner from cantract
      const balance = await instance.getBalance()

      // Set contract, balance in state
      this.setState({ contract: instance, balance: balance.words[0] })

      //set balance, loginInfo in localStorage
      localStorage.setItem('loginInfo', instance.address)
      localStorage.setItem('balance', this.state.balance)

      this.props.history.push('/listpage')
    } catch(error) {
      console.log(error);
    }
  }

  _logout = () => {
    //Set null at contract in state
    this.setState({ contract: null, balance: 0 })

    //Clear localStorage
    localStorage.clear()

    this.props.history.push('/')
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>
    }
    return (
      <div className="App">
        <Switch>
          <Route
            exact path='/'
            render={() => (<IndexPage info={this.state} login={this._login} />)}
          />
          <Route 
            path="/listpage" 
            render={() => (<ListPage info={this.state} logout={this._logout} />)} 
          />
          <Route 
            path='/inputmoney' 
            render={() => (<InputMoney logout={this._logout} />)} 
          />
          <Route path='/outputmoney'
            render={() => (<OutputMoney logout={this._logout} />)} />
          <Route 
            path='/submit/:purpose' 
            render={() => (<Submit info={this.state} logout={this._logout} />)} 
          />
          <Route 
            path='/statement/:purpose' 
            render={() => (<Statement contract={this.state.contract} logout={this._logout} />)} 
          />
        </Switch>
      </div>
    );
  }
} 

export default withRouter(App)
