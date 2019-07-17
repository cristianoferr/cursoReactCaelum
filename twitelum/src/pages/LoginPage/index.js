import React, { Component, Fragment } from 'react'
import Cabecalho from '../../components/Cabecalho'
import Widget from '../../components/Widget'

import './loginPage.css'

class LoginPage extends Component {
    constructor() {
        super();
        this.state = {
            errorMsg: '',
        }
    }

    verificaLogin = (dadosDoUsuario) => {
        return dadosDoUsuario.login !== "" && dadosDoUsuario.senha !== "";
    }

    fazerLogin = (event) => {
        event.preventDefault();
        const dadosDoUsuario = {
            login: this.refs.inputLogin.value,
            senha: this.refs.inputSenha.value
        };
        if (!this.verificaLogin(dadosDoUsuario)) {
            this.setState({ errorMsg: "Login invalido!" });
            return;
        }

        fetch('http://twitelum-api.herokuapp.com/login', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dadosDoUsuario)
        }).then(response => {
            console.log(response);
            if (!response.ok) {
                throw Error(`${response.status} - ${response.statusText}`);
            }
            return response.json();
        }).then(resObj => {
            this.setState({ errorMsg: "" });
            const token = resObj.token;
            localStorage.setItem('TOKEN', token);
            this.props.history.push('/');
        }).catch(responseError => {
            this.setState({ errorMsg: responseError.message });
            console.error(`Meu erro foi ${responseError.message}`);
        });
    }
    render() {
        return (
            <Fragment>
                <Cabecalho />
                <div className="loginPage">
                    <div className="container">
                        <Widget>
                            <h2 className="loginPage__title">Seja bem vindo!</h2>
                            <form className="loginPage__form" action="/" onSubmit={this.fazerLogin}>
                                <div className="loginPage__inputWrap">
                                    <label className="loginPage__label" htmlFor="login">Login</label>
                                    <input ref="inputLogin" className="loginPage__input" type="text" id="login" name="login" />
                                </div>
                                <div className="loginPage__inputWrap">
                                    <label className="loginPage__label" htmlFor="senha">Senha</label>
                                    <input ref="inputSenha" className="loginPage__input" type="password" id="senha" name="senha" />
                                </div>
                                <div className="loginPage__errorBox" hidden={this.state.errorMsg === ""}>
                                    Erro: {this.state.errorMsg}
                                </div>
                                <div className="loginPage__inputWrap">
                                    <button className="loginPage__btnLogin" type="submit">
                                        Logar
                                    </button>
                                </div>
                            </form>
                        </Widget>
                    </div>
                </div>
            </Fragment>
        )
    }
}


export default LoginPage