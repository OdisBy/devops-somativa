import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      emailField: "",
      passwordField: ""
    };
  }

  render() {
    return (
      <div className="app-container">
        {this.loginSection()}
      </div>
    );
  }

  loginSection() {
    return (
      <div>
        <h1>Login</h1>
        {this.loginForm()}
      </div>
    );
  }

  loginForm() {
    return (
      <div className='login-form'>
        <input type="text" size="20" name="email" />
        <input type="password" size="20" name="password" />
      </div>
    );
  }

}

export default App;
