import React, { Component } from 'react'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'

import getWeb3 from './utils/getWeb3'
import truffleContract from 'truffle-contract'
import Bank from './contracts/Bank.json'

import IndexPage from './component/IndexPage'
import ListPage from './component/ListPage'
import InputMoney from './component/InputMoney'
import Submit from './component/Submit'
import Statement from './component/Statement'
import CheckPassword from './component/CheckPassword'
import Remit from './component/Remit'
import EnterMoney from './component/EnterMoney'
import ViewTransactions from './component/ViewTransactions'

import "./css/App.css"
import { USERS } from './DB/DB'
import { Kane, Trout, Kershow, Johnson } from './DB/UserInfo'

class App extends Component {
  state = { 
    web3: null, 
    accounts: null, 
    contract: null, 
    userAddress: null
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
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
        )
        console.log(error)
    }

    const { accounts } = this.state

    USERS.set(accounts[1], Kane)
    USERS.set(accounts[2], Trout)
    USERS.set(accounts[3], Kershow)
    USERS.set(accounts[4], Johnson)

  }
    
  //Add user informations in the contract
  _initUser = async () => {  
    const { accounts } = this.state

    const Kane = USERS.get(accounts[1])
    const Trout = USERS.get(accounts[2])
    const Kershow = USERS.get(accounts[3])
    const Johnson = USERS.get(accounts[4])

    const userInfo = [ Kane, Trout, Kershow, Johnson ]

    for(let i=0; i<userInfo.length; i++){
      userInfo[i].userAddress = accounts[i+1]

      const {userBank, userName, password, userAddress, balanceOf} = userInfo[i]
      
      console.log("App_initUser : ", userAddress)
      
      await this.state.contract.addUser(userBank, userName, password, userAddress, balanceOf, { from: this.state.accounts[0] })
    }
  }
  
  _login = async address => {
    const { contract, accounts } = this.state

    try{
      //Set user in the contract
      await contract.setUser(address, { from : accounts[0] })

      const userName = await contract.getUserName()

      const userAddress = address

      this.setState({ userAddress })

      if(userName === '') {
        console.log("Input your address correctly")

        this.props.history.push('/')
      } else {
        //set balance in localStorage
        localStorage.setItem('isLogin', "true")
  
        this.props.history.push('/listpage')
      }
    } catch(error) {
      console.log(error);
    }
  }

  _logout = async () => {
    //Initialize user in the contract
    await this.state.contract.initUser({ from : this.state.accounts[0] })

    //Set the balance for null in state
    this.setState({ balance : 0, userName : ''})

    //Clear localStorage
    localStorage.clear()

    this.props.history.push('/')
  }

  _redirectLogin = () => {
    console.log('고객 정보가 없습니다.')
    return <Redirect to='/' />
  }

  render() {
    const {_login, _logout, _redirectLogin, _initUser, state} = this

    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>
    }
    return (
      <div className="App">
        <Switch>
          <Route exact path='/'
            render={() => (<IndexPage info={state} login={_login} init={_initUser} />)}
          />
          <Route path="/listpage" 
            render={() => (<ListPage info={state} logout={_logout} redirect={_redirectLogin} />)} 
          />
          <Route path='/inputmoney' 
            render={() => (<InputMoney logout={_logout} redirect={_redirectLogin} />)} 
          />
          <Route path='/checkpassword/:purpose'
            render={()=> (<CheckPassword info={state} logout={_logout} redirect={_redirectLogin} />)} 
          />
          <Route path='/submit/:purpose' 
            render={() => (<Submit info={state} logout={_logout} redirect={_redirectLogin} />)} 
          />
          <Route path='/statement/:purpose' 
            render={() => (<Statement contract={state.contract} logout={_logout} redirect={_redirectLogin} />)} 
          />
          <Route path='/remit' 
            render={() => (<Remit info={state} logout={_logout} redirect={_redirectLogin} />)} 
          />
          <Route path='/entermoney/:purpose' 
            render={() => (<EnterMoney logout={_logout} redirect={_redirectLogin} />)} 
          />
          <Route path='/viewtransactions'
            render={() => (<ViewTransactions info={state} logout={_logout} redirect={_redirectLogin} />)}
          />
        </Switch>
      </div>
    )
  }
} 

export default withRouter(App)
