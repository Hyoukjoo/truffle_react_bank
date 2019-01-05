import React, { Component } from 'react'

import '../css/Header.css'

export const Header = () => {
  return (
    <div className='Header'>
      <div className='back'>BACK</div>
      <div className='title'>
        {localStorage.getItem('pageInfo') === 'deposit' && 
          <span>DEPOSIT</span>
        }
        {localStorage.getItem('pageInfo') === 'withdraw' && 
          <span>WITHDRAW</span>
        }
      </div>
      <div className='home'>HOME</div>
    </div>
  )
}