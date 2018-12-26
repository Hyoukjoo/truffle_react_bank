import React from 'react'

class Login extends React.Component {
  constructor(props){
    super(props);
    this.hash = React.createRef();
  }

  login= () => {
    this.props.login();
  }
  render(){
    return(
      <div className="Login">
        <span>HASH : </span>
        <input type="text" ref={this.hash}></input>
        <br></br>
        <button onClick={this.props.login}>LOGIN</button>
      </div>
    )
  }
}

export default Login;