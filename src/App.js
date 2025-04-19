import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      emailField: "",
      passwordField: "",
      loginMessage: ""
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
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
        <text>
          {this.state.loginMessage}
        </text>
      </div>
    );
  }

  loginForm() {
    return (
      <div className='login-form'>

        <input
          type="text"
          size="20"
          name="email"
          placeholder="Email"
          onChange={(e) => this.handleEmailChange(e)}
        />

        <input
          type="password"
          size="20"
          name="password"
          placeholder="Senha"
          onChange={(e) => this.handlePasswordChange(e)}
        />

        <button type="button" onClick={() => this.handleLogin()}>Acessar</button>
      </div>
    );
  }

  handleEmailChange(event) {
    let state = this.state;
    state.emailField = event.target.value
    this.setState(state);
  }

  handlePasswordChange(event) {
    let state = this.state;
    state.passwordField = event.target.value
    this.setState(state);
  }

  handleLogin() {
    let state = this.state;

    let email = state.emailField
    let password = state.passwordField

    console.log("Email:", email);
    console.log("Senha:", password);

    if (!email || !password) {
      state.loginMessage = "Por favor, preencha todos os campos!";
      this.setState(state);
      return;
    }

    if (email == "eduardo.lino@pucpr.br" && password == "123456") {
      state.loginMessage = "Acessado com sucesso!";
      this.setState(state);
      return;
    } else {
      state.loginMessage = "Usuário ou senha incorretos!";
      this.setState(state);
      return;
    }
  }
}

export default App;
