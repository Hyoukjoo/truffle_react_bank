import React, { Component, Fragment } from 'react'
import { withRouter, Redirect } from 'react-router-dom'

import { getTransaction } from '../DB/DB'
import '../css/ViewTransactions.css'

class ViewTransactions extends Component {
  constructor(props){
    super(props)
    
    const { userAddress } = props.info
    let transaction = null

    if(userAddress !== null) {
      transaction = getTransaction(userAddress)
    } else {
      props.history.push('/')
    }

    this.state = { pageNumber : 0, transaction }
  }

  showPage = () => {
    const { transaction, pageNumber } = this.state
    const showNumber = pageNumber
    let showTransactions = []

    for(let i = pageNumber; i < showNumber + 4; i++){
      if(transaction[i] !== undefined) showTransactions.push(transaction[i])
      else break
    }

    return showTransactions
  }

  pageButton = arrow => {
    let { pageNumber, transaction } = this.state

    if(arrow === 'up'){
      if(pageNumber - 4 < 0) console.log('첫 거래내역입니다.')
      else {
        pageNumber -= 4
        this.setState({ pageNumber })
        this.showPage()
      }
    }else if(arrow === 'down'){
      if(pageNumber + 4 >= transaction.length) console.log('거래내역이 더 존재하지 않습니다.')
      else {
        pageNumber += 4
        this.setState({ pageNumber })
        this.showPage()
      }
    }
  }

  render() {
    const { userAddress } = this.props.info
    const { logout } = this.props
    const { showPage, pageButton } = this

    let transactions = undefined

    if(userAddress === null) {
      console.log('고객 정보가 없습니다.')
      return <Redirect to='/' />
    } else {
      transactions = showPage()
    }

    return (
      <Fragment>
        <table className='transactionTable'>
          <caption className='tableTitle'>거래 내역</caption>
          <thead>
            <tr>
              <td>날짜</td>
              <td>내용</td>
              <td>출금</td>
              <td>입금</td>
              <td>잔액</td>
            </tr>
          </thead>
          <tbody>
          {transactions.map((transaction, index) => {
            const { purpose, date, balance, amount, receiverAddress } = transaction
            const splitedDate = date.split(' ')[0].split('.')
            const inThousandsAmount = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            const inThousandsBalance = balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

            return (
              <Fragment key={index}>
                <tr className='transaction'>
                  <td>{`${splitedDate[1]}/${splitedDate[2]}`}</td>
                  <td>{purpose}</td>
                  <td>
                    {purpose === '입금' && 0}
                    {purpose === '출금' && inThousandsAmount}
                    {(purpose === '송금' && userAddress === receiverAddress) && 0}
                    {(purpose === '송금' && userAddress !== receiverAddress) && inThousandsAmount}
                  </td>
                  <td>
                    {purpose === '입금' && inThousandsAmount}
                    {purpose === '출금' && 0}
                    {(purpose === '송금' && userAddress === receiverAddress) && inThousandsAmount}
                    {(purpose === '송금' && userAddress !== receiverAddress) && 0}
                  </td>
                  <td>{inThousandsBalance}</td>
                </tr>
              </Fragment>
            )
          })}
          </tbody>
        </table>
        <div className='pageButtonDiv'>
          <div className='pageButton' onClick={() => pageButton('up')}><span>△</span></div>
          <div className='pageButton' onClick={() => pageButton('down')}><span>▽</span></div>
        </div>
        <div className="transactionSubmitDiv">
          <div className="submitButton confirmButton" onClick={logout}>
            <span>확 인</span>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(ViewTransactions)