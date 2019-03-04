## TRUFFLE과 REACT를 이용한 ATM 구현
#### - 개요 : 블록체인을 이용하여 ATM 기능을 구현, 실제 ATM 기기와 최대한 같도록 구현
#### - 사용기술  
  - BACKEND : NODEJS, GANACHE-CLI, SOLIDITY 
  - FRONTEND : JAVASCRIPT
  - FRAMEWORK : TRUFFLE, REACT
#### - 주요기능 
  - BANK-CONTRACT : ATM 기능을 블록체인으로 구현
  - LOGIN : contract에 등록되어 있는 유저의 이더리움 account 주소를 입력하여 ATM에 접근
  - DEPOSIT(입금) 
    1. 지폐를 입력(최대 100장으로 제한)
    2. 금액을 확인하고 입금 submit
    3. 명세표 확인 후 3초 지나면 첫 화면으로 복귀(유저 정보 초기화)
  - WITHDRAW(출금) 
    1. contract에 저장되어 있는 유저의 비밀번호와 일치하는지 확인
    2. 금액을 입력, 잔액보다 많거나 0원이면 reject(단위는 10,000원)
    3. 금액을 확인하고 출금 submit
    4. 명세표 확인 후 3초 지나면 첫 화면으로 복귀(유저 정보 초기화)
  - REMIT(송금)
    1. contract에 저장되어 있는 유저의 비밀번호와 일치하는지 확인
    2. 은행과 받는 사람의 이더리움 account 주소를 입력, contract에 저장되어 있는 유저의 정보와 일치하지 않거나 본인 주소일 시 reject
    3. 금액을 입력, 잔액보다 많거나 0원이면 reject
    4. 금액을 확인하고 송금 submit 
    5. 명세표 확인 후 3초 지나면 첫 화면으로 복귀(유저 정보 초기화)
  - CHECK TRANSACTION(거래내역 확인)
    1. 최근 거래내역 순으로 거래 내역 표현 
    2. 4건마다 페이징 처리 
#### - 기대효과
  - 블록체인을 통해 저비용으로 거래의 신뢰를 보장
#### - 보완점
  - DB 연동
  - reject를 consolo이 아닌 다른 방법으로 구현 
  - 유저의 private key를 이용하여 접근하도록 구현
#### - 동영상(Click)
  [![동영상 LINK](https://img.youtube.com/vi/5__ZYqnjHRQ/0.jpg)](https://youtu.be/5__ZYqnjHRQ/?target=_blank)
