import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import '../css/InputMoney.css'

class InputMoney extends Component {
  constructor(props) {
    super(props)

    this.state = { fifty: 0, ten: 0, five: 0, one: 0 }
  }

  _addBill = amount => {
    const sumBill = this.state.fifty + this.state.ten + this.state.five + this.state.one 
    
    if(sumBill > 100) console.log("최대 100장까지 넣으실 수 있습니다.")
    else 
      switch (amount) {
        case 50000:
          this.setState({ fifty: this.state.fifty + 1 })
          break
        case 10000:
          this.setState({ ten: this.state.ten + 1 })
          break
        case 5000:
          this.setState({ five: this.state.five + 1 })
          break
        case 1000:
          this.setState({ one: this.state.one + 1 })
          break
        default:
          break
      }
  }

  _subBill = amount => {
    switch (amount) {
      case 50000:
        if(this.state.fifty > 0) this.setState({ fifty: this.state.fifty - 1 })
        else console.log("넣으신 지폐가 0장 입니다.")
        break
      case 10000:
        if(this.state.ten > 0) this.setState({ ten: this.state.ten - 1 })
        else console.log("넣으신 지폐가 0장 입니다.")
        break
      case 5000:
        if(this.state.five > 0) this.setState({ five: this.state.five - 1 })
        else console.log("넣으신 지폐가 0장 입니다.")
        break
      case 1000:
        if(this.state.one > 0) this.setState({ one: this.state.one - 1 })
        else console.log("넣으신 지폐가 0장 입니다.")
        break
      default:
        break
    }
  }

  _submit = () => {
    const { fifty, ten, five, one } = this.state
    localStorage.setItem('fifty', fifty)
    localStorage.setItem('ten', ten)
    localStorage.setItem('five', five)
    localStorage.setItem('one', one)

    if(localStorage.getItem('fifty') === '0' && localStorage.getItem('ten') === '0' 
      && localStorage.getItem('five') === '0' && localStorage.getItem('one') === '0') console.log('돈을 넣으십쇼.')
    else this.props.history.push('/submit/deposit')
  }

  render() {
    return (
      <div>
        <div className="billDiv">
          <p style={{ 
            marginBottom:"40px", 
            fontSize:"30px", 
            fontFamily:"'Do Hyeon', sans-serif"}}> 입금할 금액을 넣어주세요 </p>

          <div className="billBox">
            <div className="billSide left add" 
              onClick={() => this._addBill(50000)}><span>+</span></div>
            <div className="center fifty">
              <span>{this.state.fifty ? this.state.fifty : "50,000"}</span></div>
            <div className="billSide right sub"
              onClick={() => this._subBill(50000)}><span>-</span></div>
          </div>

          <div className="billBox">
            <div className="billSide left add"
              onClick={() => this._addBill(10000)}><span>+</span></div>
            <div className="center ten">
              <span>{this.state.ten ? this.state.ten : "10,000"}</span></div>
            <div className="billSide right sub"
              onClick={() => this._subBill(10000)}><span>-</span></div>
          </div>

          <div className="billBox">
            <div className="billSide left add"
              onClick={() => this._addBill(5000)}><span>+</span></div>
            <div className="center five">
              <span>{this.state.five ? this.state.five : "5,000"}</span></div>
            <div className="billSide right sub"
              onClick={() => this._subBill(5000)}><span>-</span></div>
          </div>

          <div className="billBox">
            <div className="billSide left add"
              onClick={() => this._addBill(1000)}><span>+</span></div>
            <div className="center one">
              <span>{this.state.one ? this.state.one : "1,000"}</span></div>
            <div className="billSide right sub"
              onClick={() => this._subBill(1000)}><span>-</span></div>
          </div>
        </div>

        <div className="submitDiv" style={{ marginTop:"40px"}}>
          <div className="submit confirmButton" onClick={this._submit}>
            <span>확 인</span>
          </div>
          <div className="space"></div>
          <div className="submit cancelButton" onClick={this.props.logout}>
            <span>취 소</span>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(InputMoney)