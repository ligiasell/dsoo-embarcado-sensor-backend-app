import React, { Component } from 'react';
import logo from '../../images/vacininha.png';
// Import FirebaseAuth and firebase.
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Alert from '../../components/Alert';
import firebase from "firebase/app";
import "firebase/auth";

// Redux
import { connect } from 'react-redux';
import * as actions from './actions';

export class Login extends Component {
  
    constructor(props){
        super(props);
        this.state = {
            showAlert: true
        };
    }

    handleLogin() {
        this.props.checkLogin();
    }

    render() {
        let props = this.props;
        // Configure FirebaseUI.
        const uiConfig = {
            signInFlow: 'popup',
            credentialHelper: 'none',
            callbacks: {
                signInSuccessWithAuthResult: function(authResult, redirectUrl) {
                    console.log(authResult);
                    props.login(authResult).then(() =>{
                        props.history.push(`/carteiras/`); 
                    });
                    return false;
                  }
            },
            // We will display Google and Facebook as auth providers.
            signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID
            ]
        };
        return (
            <div className="main-home">
                <Alert
                    theme="warning"
                    visible={this.state.showAlert}
                    fixed="top-right"
                    onClose={this.closeAlertHandler.bind(this)}>
                        <strong>Você deve logar para acessar o conteúdo</strong>
                </Alert>
                <div className="home-left">
                    <img src={logo} />
                    <div className="home-texto">
                        <h1>O que é a Vacininha?</h1>
                        <p>Além de informar todas as datas de vacinação,
                        a Vacininha também faz o acompanhamento do 
                        crescimento do seu filho (peso e altura).
                        O melhor é que tudo fica disponível na plataforma
                        para você acessar de onde e quando você quiser!
                        </p>   
                    </div>
                </div>
                <div className="home-right">
                    <div className="botoes-login">
                        <span id="titulo">Acesse já:</span>
                        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
                    </div>
                </div>
            </div>
        );
    }

    closeAlertHandler() {
        this.setState({ showAlert: false });
    }
}

export default connect((store) => ({ 
    eventKey: store.login.eventKey,
    loginIsSuccess: store.login.isSuccess,
    loginIsRecoverSuccess :store.login.isRecoverSuccess
}), actions)(Login);