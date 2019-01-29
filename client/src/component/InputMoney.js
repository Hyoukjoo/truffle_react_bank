import React, { Component, Fragment } from 'react'
import { withRouter, Redirect } from 'react-router-dom'

import '../css/InputMoney.css'

class InputMoney extends Component {
  state = { fifty: 0, ten: 0, five: 0, one: 0 }

  _addBill = amount => {
    const { fifty, ten, five, one } = this.state
    const sumBill = fifty + ten + five + one 
    
    if(sumBill > 100) console.log("최대 100장까지 넣으실 수 있습니다.")
    else 
      switch (amount) {
        case 50000:
          this.setState({ fifty : fifty + 1 })
          break
        case 10000:
          this.setState({ ten : ten + 1 })
          break
        case 5000:
          this.setState({ five : five + 1 })
          break
        case 1000:
          this.setState({ one : one + 1 })
          break
        default:
          break
      }
  }

  _subBill = amount => {
    const { fifty, ten, five, one } = this.state
    
    switch (amount) {
      case 50000:
        if(fifty > 0) this.setState({ fifty : fifty - 1 })
        else console.log("넣으신 지폐가 0장 입니다.")
        break
      case 10000:
        if(ten > 0) this.setState({ ten : ten - 1 })
        else console.log("넣으신 지폐가 0장 입니다.")
        break
      case 5000:
        if(five > 0) this.setState({ five : five - 1 })
        else console.log("넣으신 지폐가 0장 입니다.")
        break
      case 1000:
        if ( one > 0) this.setState({ one :   one - 1 })
        else console.log("넣으신 지폐가 0장 입니다.")
        break
      default:
        break
    }
  }

  _submit = () => {
    const { fifty, ten, five, one } = this.state
    const sum = fifty + ten + five + one 

    if(sum === 0) console.log('돈을 넣으십쇼.')
    else {
      const amount = fifty*50000 + ten*10000 + five*5000 + one*1000
      localStorage.setItem('deposit_amount', amount)
      this.props.history.push('/submit/deposit')
    }
  }

  render() {
    const { one, five, ten, fifty } = this.state
    const { logout } = this.props
    const { _submit, _addBill, _subBill } = this
    
    if(localStorage.getItem('isLogin') !== 'true') {
      console.log('고객 정보가 없습니다.')
      return <Redirect to='/' />
    }
    
    return (
      <Fragment>
        <div className="billDiv">
          <p className="guidance"> 입금할 금액을 넣어주세요 </p>

          <div className='billBoxDiv'>
            <div className="billBox">
              <div className="billSide left add" 
                onClick={() => _addBill(50000)}><span>+</span></div>
              <div className="center fifty">
                <span>{fifty ? fifty : "50,000"}</span></div>
              <div className="billSide right sub"
                onClick={() => _subBill(50000)}><span>-</span></div>
            </div>

            <div className="billBox">
              <div className="billSide left add"
                onClick={() => _addBill(10000)}><span>+</span></div>
              <div className="center ten">
                <span>{ten ? ten : "10,000"}</span></div>
              <div className="billSide right sub"
                onClick={() => _subBill(10000)}><span>-</span></div>
            </div>

            <div className="billBox">
              <div className="billSide left add"
                onClick={() => _addBill(5000)}><span>+</span></div>
              <div className="center five">
                <span>{five ? five : "5,000"}</span></div>
              <div className="billSide right sub"
                onClick={() => _subBill(5000)}><span>-</span></div>
            </div>

            <div className="billBox">
              <div className="billSide left add"
                onClick={() => _addBill(1000)}><span>+</span></div>
              <div className="center one">
                <span>{one ? one : "1,000"}</span></div>
              <div className="billSide right sub"
                onClick={() => _subBill(1000)}><span>-</span></div>
            </div>
          </div>
        </div>

        <div className="submitDiv">
          <div className="submitButton confirmButton" onClick={_submit}>
            <span>확 인</span>
          </div>
          <div className="submitButton cancelButton" onClick={logout}>
            <span>취 소</span>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(InputMoney)