import React from 'react';
import './Login.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';
import { checkValidity } from '../../hoc/shared/utility';

class Login extends React.Component {

    state = {
        loginForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email address',
                    autoComplete:"username"
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'password',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password',
                    autoComplete:"current-password"
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 13,
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        isSignUp: true,
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedloginForm = {
            ...this.state.loginForm
        };
        const updatedFormElement = {
            ...updatedloginForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedloginForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedloginForm) {
            formIsValid = updatedloginForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({ loginForm: updatedloginForm, formIsValid: formIsValid });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.signUp(this.state.loginForm.email.value, this.state.loginForm.password.value, this.state.isSignUp);
    }
    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return { isSignUp: !prevState.isSignUp }
        });
    }

    render() {

        let redirect= null;
        if (this.props.isLoggedIn) {
            redirect = <Redirect to="/"/>;
        }

        const formElementsArray = [];
        for (let key in this.state.loginForm) {
            formElementsArray.push({
                id: key,
                config: this.state.loginForm[key]
            });
        }
        let form = (
            <form onSubmit={this.handleSubmit}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>SUBMIT</Button>
            </form>

        );

        if (this.props.loading) {
            form = <Spinner />;
        }
        
        
        let errorMsg=null;
        if (this.props.error){
            errorMsg= <p style={{color:"red"}}>Error {this.props.error.message}</p>;
        } 
        let instructions = null;
        if (this.state.isSignUp){
            instructions = <h3>Please sign up below</h3>;
        } else {
            instructions = <h3>Please enter in your login details</h3>;
        }

        return (
            <div className="Login">
                {redirect}
                {instructions}
                {form}
                {errorMsg}
                <Button btnType="Danger"
                    clicked={this.switchAuthModeHandler}>
                    SWITCH TO {this.state.isSignUp ? 'LOGIN' : 'SIGNUP'}</Button>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isLoggedIn: state.auth.token !==null,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signUp: (email, password, isSignUp) => dispatch(actions.authRequest(email, password, isSignUp)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);