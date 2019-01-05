import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'


class Withdraw extends Component {
  constructor(props){
    super(props);

    //connect input Dom
    this.amountInput = React.createRef()

    this.state = {
      contract: this.props.info.contract,
      balance: this.props.info.balance,
      myAccount: this.props.info.accounts[0],
      isFirstPage: true
    }
  }

  componentDidMount = () => this.amountInput.current.focus()

  withdraw = async () => {
    const amount = Number(this.amountInput.current.value)

    if(isNaN(amount)){
      console.log("Only Number")
    } else if(amount === 0){
      console.log("It is empty")
    } else if(this.state.balance < amount) {
      console.log("You don't have enough money")
    } else {
      try{
        //call deposit from constant
        await this.state.contract.withdraw(amount, { from: this.state.myAccount })

        //set balance in state
        const balance = await this.state.contract.getBalance()
        this.setState({ balance: balance.words[0], isFirstPage: false })

        //set balance in localStorage
        localStorage.setItem('balance', this.state.balance)
      } catch(error) {
        console.log(error)
      }
    }

    //Reset and focus input element 
    this.amountInput.current.value = ''
    this.amountInput.current.focus()
  }

  _redirectLogin = () => {
    console.log('Login Please!')
    localStorage.removeItem('pageInfo')
    return <Redirect to='/' />
  }

  _checkBalance = () => {
    if(this.state.isFirstPage){
      return localStorage.getItem('balance').replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    } else {
      return this.state.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
  }

  _handleKeyPress = e => {
    if(e.key === 'Enter') this.withdraw()
  }

  render(){
    return(
      <div className="article">
        { !this.state.contract && this._redirectLogin() }

        <p id='balance'>{this._checkBalance()} won</p>

        <div>
          <input 
            type="number" 
            className="amountInput"
            placeholder="0"
            ref={this.amountInput}
            onKeyPress={this._handleKeyPress}
          ></input>

          <div className="submit" onClick={this.withdraw} >
            <span>ENTER</span>
          </div>

          <div className="billDiv">
            <div className='bill' style={{backgroundColor:"rgb(233, 192, 59)"}}><span>50,000</span></div>
            <div className='bill' style={{backgroundColor:"rgb(155, 231, 152)"}}><span>10,000</span></div>
            <div className='bill' style={{backgroundColor:"rgb(236, 169, 148)"}}><span>5,000</span></div>
            <div className='bill' style={{backgroundColor:"rgb(152, 200, 231)"}}><span>1,000</span></div>
          </div>
        </div>
      </div>
    )
  }
}

export default Withdraw;