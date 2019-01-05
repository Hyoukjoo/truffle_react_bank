import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class Deposit extends Component {
  constructor(props){
    super(props);

    //connect input dom
    this.amountInput = React.createRef()

    this.state = {
      contract: this.props.info.contract,
      balance: this.props.info.balance,
      myAccount: this.props.info.accounts[0],
      isFirstPage: true,
      amount: {
        fiftyThousands: 0,
        tenThousands: 0,
        fiveThousands: 0,
        oneThousand: 0
      }
    }
  }

  componentDidMount = () => this.amountInput.current.focus()

  deposit = async () => {
    const amount = Number(this.amountInput.current.value)
    
    if(isNaN(amount)){
      console.log("Only Number")
    } else if(amount === 0){
      console.log('It is empty')
    } else {
      try{
        //call deposit from constant
        await this.state.contract.deposit(amount, { from: this.state.myAccount })

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
    if(e.key === 'Enter') this.deposit()
  }

  _inputMoney = money => {
    switch (money) {
      case 50000:
        this.setState({
          amount:{
            fiftyThousands: this.state.amount.fiftyThousands + 1,
            tenThousands: this.state.amount.tenThousands,
            fiveThousands: this.state.amount.fiveThousands,
            oneThousand: this.state.amount.oneThousand
          }
        })
        break
      case 10000:
      this.setState({
        amount:{
          fiftyThousands: this.state.amount.fiftyThousands,
          tenThousands: this.state.amount.tenThousands + 1,
          fiveThousands: this.state.amount.fiveThousands,
          oneThousand: this.state.amount.oneThousand
        }
      })
      break
      case 5000:
        this.setState({
          amount:{
            fiftyThousands: this.state.amount.fiftyThousands,
            tenThousands: this.state.amount.tenThousands,
            fiveThousands: this.state.amount.fiveThousands + 1,
            oneThousand: this.state.amount.oneThousand
          }
        })
        break
      case 1000:
        this.setState({
          amount:{
            fiftyThousands: this.state.amount.fiftyThousands,
            tenThousands: this.state.amount.tenThousands,
            fiveThousands: this.state.amount.fiveThousands,
            oneThousand: this.state.amount.oneThousand + 1
          }
        })
        break
      default:
        break
    }
    setTimeout(()=>{console.log(this.state.amount)}, 10)
  }

  render(){
    return(
      <div className="article">
        {!this.state.contract && this._redirectLogin() }

        <p id='balance'>{this._checkBalance()} won</p>

        <div>
          <input 
            type="number" 
            className="amountInput"
            placeholder="0"
            ref={this.amountInput}
            onKeyPress={this._handleKeyPress}
          ></input>

          <div className="submit" onClick={this.deposit} >
            <span>ENTER</span>
          </div>

          <div className="billDiv">
            <div 
              className='bill' 
              style={{backgroundColor:"rgb(233, 192, 59)"}}
              onClick={() => this._inputMoney(50000)}
            ><span>50,000</span></div>
            <div 
              className='bill' 
              style={{backgroundColor:"rgb(155, 231, 152)"}}
              onClick={() => this._inputMoney(10000)}
            ><span>10,000</span></div>
            <div 
              className='bill' 
              style={{backgroundColor:"rgb(236, 169, 148)"}}
              onClick={() => this._inputMoney(5000)}
            ><span>5,000</span></div>
            <div 
              className='bill' 
              style={{backgroundColor:"rgb(152, 200, 231)"}}
              onClick={() => this._inputMoney(1000)}
            ><span>1,000</span></div>
          </div>
        </div>
      </div>
    )
  }
}

export default Deposit;