import React, { Component } from 'react'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

import getWeb3 from './utils/getWeb3'
import truffleContract from 'truffle-contract'
import Bank from './contracts/Bank.json'

import IndexPage from './component/IndexPage'
import ListPage from './component/ListPage'
import InputMoney from './component/InputMoney'
import Submit from './component/Submit'
import OutputMoney from './component/OutputMoney'
import Statement from './component/Statement'

import "./css/App.css"
import{ USERS } from './DB'
import Check from './component/Check';

class App extends Component {
  state = { web3: null, accounts: null, contract: null, balance: 0, user: ''}

  static propTypes = {
    balance: PropTypes.number
  }
  
  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3()
      
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts()
      
      // Deploy Contract
      const Contract = truffleContract(Bank)
      Contract.setProvider(web3.currentProvider)
      const instance = await Contract.deployed()
      
      // Set web3, accounts, contract in state
      this.setState({ web3, accounts, contract : instance })
      
      //Clear localStorage
      localStorage.clear()

      //Set initial user informations in the contract
      this._addUser()

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
        )
        console.log(error)
      }
    }
    
  //Add user informations in the contract
  _addUser = async () => {
    for(let i=0; i<USERS.length; i++){
      USERS[i].etherAccount = this.state.accounts[i+1]
      const {userBank, userName, password, etherAccount, balanceOf} = USERS[i]
      console.log("App_addUser : ", etherAccount)
      await this.state.contract.addUser(userBank, userName, password, etherAccount, balanceOf, { from: this.state.accounts[0] })
    }
  }
  
  _getUser = async () => {
    const user = await this.state.contract.getUser()
    if(user === '') {
      console.log("Input your address correctly")
      this.props.history.push('/')
    } else {
      this.setState({ user : user })
    }
  }
  
  _getBalance = async () => {
    const balance = await this.state.contract.getBalance()
    this.setState({ balance : balance.words[0] })
  }

  _login = async account => {
    try{
      //Set user in the contract
      await this.state.contract.setUser(account, { from: this.state.accounts[0] })

      //Get balance of user from the cantract
      this._getUser()
      this._getBalance()

      //set balance in localStorage
      localStorage.setItem('isLogin', "true")

      this.props.history.push('/listpage')

    } catch(error) {
      console.log(error);
    }
  }

  _logout = async () => {
    //Initialize user in the contract
    await this.state.contract.initUser({ from : this.state.accounts[0] })

    //Set the balance for null in state
    this.setState({ balance : 0, user : ''})

    //Clear localStorage
    localStorage.clear()

    this.props.history.push('/')
  }

  _redirectLogin = () => {
    console.log('고객 정보가 없습니다.')
    return <Redirect to='/' />
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
            render={() => (<IndexPage info={this.state} login={this._login} init={this._addUser} />)}
          />
          <Route 
            path="/listpage" 
            render={() => (<ListPage info={this.state} logout={this._logout} redirect={this._redirectLogin} />)} 
          />
          <Route 
            path='/inputmoney' 
            render={() => (<InputMoney logout={this._logout} redirect={this._redirectLogin} />)} 
          />
          <Route path='/checkpassword'
            render={()=> (<Check info={this.state} logout={this._logout} redirect={this._redirectLogin} />)} 
          />
          <Route path='/outputmoney'
            render={() => (<OutputMoney logout={this._logout} redirect={this._redirectLogin} />)} 
          />
          <Route 
            path='/submit/:purpose' 
            render={() => (<Submit info={this.state} logout={this._logout} redirect={this._redirectLogin} />)} 
          />
          <Route 
            path='/statement/:purpose' 
            render={() => (<Statement contract={this.state.contract} logout={this._logout} redirect={this._redirectLogin} />)} 
          />
          
        </Switch>
      </div>
    );
  }
} 

export default withRouter(App)
