import React, { Component } from 'react'
import PropTypes from 'prop-types'
import getWeb3 from './utils/getWeb3'
import truffleContract from 'truffle-contract'
import ATM from './contracts/ATM.json'
import { Route, Switch, withRouter } from 'react-router-dom'

import Deposit from './component/Deposit'
import IndexPage from './component/IndexPage'
import Withdraw from './component/Withdraw';

import "./css/App.css"
import { Header } from './component/Header';
import ListPage from './component/ListPage';

class App extends Component {
  state = { web3: null, accounts: null, contract: null, balance: 0};

  static propTypes = {
    balance: PropTypes.number
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3()

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts()

      // Set web3, accounts in state
      this.setState({ web3, accounts })

      //Initailize loginInfo in localStorage
      if(this.state.contract === null) localStorage.removeItem('loginInfo')

      console.log(this.state)

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.log(error)
    }
  };

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

      this.props.history.push(`/`)
    } catch(error) {
      console.log(error);
    }
    console.log(await this.state)
  }

  _logout = () => {
    //set null at contract in state
    this.setState({
      contract: null,
    })

    //Remove loginInfo in localStorage
    localStorage.removeItem('loginInfo')
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>
    }
    return (
      <div className="App">
        {this.props.history.location.pathname !== '/' && <Header />}
        <Switch className='article'>
          <Route 
            exact path='/' 
            render={() => (
              <IndexPage 
                info={this.state} 
                login={this._login} 
                logout={this._logout}
              />
            )} 
          />
          <Route 
            exact path="/listPage" 
            componnet={ListPage}
          />
          <Route 
            exact path='/deposit' 
            render={() => (<Deposit info={this.state} />)} 
          />
          <Route 
            exact path='/withdraw' 
            render={() => (<Withdraw info={this.state} />)} 
          />
          <Route exact path='/transfer' component={IndexPage} />
        </Switch>
        {/* <Footer contract={this.state.contract} /> */}
      </div>
    );
  }
} 

export default withRouter(App)
