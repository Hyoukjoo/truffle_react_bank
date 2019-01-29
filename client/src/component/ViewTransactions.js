import React, { Component, Fragment } from 'react'
import { withRouter, Redirect } from 'react-router-dom'

import { getTransaction } from '../DB/DB'
import '../css/ViewTransactions.css'

class ViewTransactions extends Component {
  render() {
    const { userAddress } = this.props.info
    const { logout } = this.props

    let transactions = undefined

    if(userAddress === null) {
      console.log('고객 정보가 없습니다.')
      return <Redirect to='/' />
    } else {
      transactions = getTransaction(userAddress)
    }

    return (
      <Fragment>
        <table className='transactionTable'>
          <caption className='tableTitle'>거래 내역</caption>
          <thead>
            <tr>
              <th>날짜</th>
              <th>내용</th>
              <th>출금</th>
              <th>입금</th>
              <th>잔액</th>
            </tr>
          </thead>
          <tbody>
          {transactions.map((transaction, index) => {
            const { purpose, date, balance, amount, receiverAddress } = transaction
            const splitedDate = date.split(' ')[0].split('.')
            const inThousandsAmount = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            const inThousandsBalance = balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

            return (
              <Fragment>
                <tr key={index}>
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
        <div className="submitDiv">
          <div className="submitButton confirmButton" onClick={logout}>
            <span>확 인</span>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(ViewTransactions)