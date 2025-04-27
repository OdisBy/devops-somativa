import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import firebase from '../../Firebase';
import './sign_up.css';

class SignUp extends Component {

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
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleBirthDateChange = this.handleBirthDateChange.bind(this);
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
                <h1>Página de cadastro</h1>
                {this.loginForm()}
                <p>
                    {this.state.loginMessage}
                </p>
                <Link to="/login">
                    <button type="button" className="button-cadastro">
                        Ir para o Login
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
                    onChange={(e) => this.handleEmailChange(e)}
                />

                <input
                    type="text"
                    size="20"
                    name="name"
                    placeholder="Nome"
                    onChange={(e) => this.handleNameChange(e)}
                />


                <input
                    type="text"
                    size="20"
                    name="lastName"
                    placeholder="Sobrenome"
                    onChange={(e) => this.handleLastNameChange(e)}
                />


                <input
                    type="date"
                    size="20"
                    name="birthDate"
                    placeholder="Data de Nascimento"
                    onChange={(e) => this.handleBirthDateChange(e)}
                />


                <input
                    type="password"
                    size="20"
                    name="password"
                    placeholder="Senha"
                    onChange={(e) => this.handlePasswordChange(e)}
                />

                <button type="button" onClick={() => this.handleLogin()}>Cadastrar</button>
            </div>
        );
    }

    handleEmailChange(event) {
        let state = this.state;
        state.emailField = event.target.value
        this.setState(state);
    }

    handleNameChange(event) {
        let state = this.state;
        state.nameField = event.target.value
        this.setState(state);
    }

    handleLastNameChange(event) {
        let state = this.state;
        state.lastNameField = event.target.value
        this.setState(state);
    }

    handleBirthDateChange(event) {
        let state = this.state;
        state.birthDateField = event.target.value
        this.setState(state);
    }

    handlePasswordChange(event) {
        let state = this.state;
        state.passwordField = event.target.value
        this.setState(state);
    }

    async handleLogin() {
        let success = true;

        let state = this.state;

        let email = state.emailField
        let password = state.passwordField
        let birthDateField = state.birthDateField

        console.log("Email:", email);
        console.log("Senha:", password);

        if (!email || !password) {
            state.loginMessage = "Por favor, preencha todos os campos!";
            this.setState(state);
            return;
        }

        if (password.length < 6) {
            state.loginMessage = "A senha deve ter pelo menos 6 caracteres!";
            this.setState(state);
            return;
        }

        if (birthDateField.length < 10) {
            state.loginMessage = "A data de nascimento deve ter o formato dd/mm/yyyy!";
            this.setState(state);
            return;
        }

        let uuid;

        try {
            uuid = await this.authenticateUser(email, password);
        } catch (error) {
            success = false;
        }

        if (success) {
            try {
                await this.addUserToDatabase(uuid, state.nameField, state.lastNameField, state.birthDateField);
            } catch (error) {
                success = false;
            }
        }

        if (success) {
            alert("Usuário cadastrado com sucesso! Você será redirecionado para a página de login.");
            window.location.href = "/login";
        }
        else {
            state.loginMessage = "Erro ao cadastrar usuário!";
            this.setState(state);
        }
    }

    async authenticateUser(email, password) {
        try {
            const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
            const uuid = userCredential.user.uid;
            console.log("Usuário cadastrado com sucesso: ", uuid);
            return uuid;
        } catch (error) {
            console.error("Erro no firebase ao autenticar: ", error);
            throw error;
        }
    }

    async addUserToDatabase(uuid, name, lastName, birthDate) {
        try {
            console.log("Adicionando usuário ao banco de dados: ", uuid, name, lastName, birthDate);
            await firebase.firestore().collection("users").doc(uuid).set({
                name: name,
                lastName: lastName,
                birthDate: birthDate
            });
        } catch (error) {
            console.error("Erro no firebase ao adicionar usuário: ", error);
            throw error;
        }
    }
}

export default SignUp;
