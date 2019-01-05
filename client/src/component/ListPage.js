import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ListPage extends Component {
  render(){
    return (
      <div>
        <Link to="/deposit">입금하기</Link>
        <Link to="/deposit">출금하기</Link>
        <Link to="/deposit">송금하기</Link>
        <Link to="/deposit">조회하기</Link>
      </div>
    )
  }
}

export default ListPage