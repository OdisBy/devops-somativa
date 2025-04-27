import React, { Component } from 'react';
import { Link, useNavigate } from 'react-router';
import firebase from '../../Firebase';
import './sign_in.css';

class SignIn extends Component {

    constructor(props) {
        super(props);

        this.state = {
            emailField: "",
            nameField: "",
            lastNameField: "",
            birthDateField: "",
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
                <h1>Página de Login</h1>
                {this.loginForm()}
                <p>
                    {this.state.loginMessage}
                </p>
                <Link to="/cadastro">
                    <button type="button" className="button-cadastro">
                        Cadastre-se
                    </button>
                </Link>
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
                    data-testid="email-input"
                    onChange={(e) => this.handleEmailChange(e)}
                />

                <input
                    type="password"
                    size="20"
                    name="password"
                    placeholder="Senha"
                    data-testid="password-input"
                    onChange={(e) => this.handlePasswordChange(e)}
                />

                <button
                    type="button"
                    data-testid="submit-button"
                    onClick={() => this.handleLogin()}
                >
                    Acessar
                </button>
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

        let email = state.emailField;
        let password = state.passwordField;

        console.log("Email:", email);
        console.log("Senha:", password);

        if (!email || !password) {
            state.loginMessage = "Por favor, preencha todos os campos!";
            this.setState(state);
            return;
        }

        this.authenticateUser(email, password).then((userId) => {
            if (userId) {
                this.props.navigate('/home', { state: { userId: userId } });
            }
        });
    }

    async authenticateUser(email, password) {
        try {
            const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
            console.log("Usuário autenticado com sucesso:", userCredential.user.uid);
            return userCredential.user.uid;
        } catch (error) {
            // Tratar erro de autenticação
            if (error.code === 'auth/user-not-found') {
                console.error("Usuário não encontrado:", error.message);
                let state = this.state;
                state.loginMessage = "Usuário não encontrado. Verifique seu email e senha.";
                this.setState(state);
            } else if (error.code === 'auth/wrong-password') {
                console.error("Senha incorreta:", error.message);
                let state = this.state;
                state.loginMessage = "Senha incorreta. Tente novamente.";
                this.setState(state);
            } else {
                console.error("Erro ao autenticar usuário:", error.message);
                let state = this.state;
                state.loginMessage = "Erro ao autenticar usuário. Tente novamente.";
                this.setState(state);
            }
        }
    }

}

export default function SignInWrapper() {
    const navigate = useNavigate();
    return <SignIn navigate={navigate} />;
};
