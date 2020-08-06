import * as actionTypes from './actionTypes';
import axios from 'axios';
import key from './auth_key';


export const authInit = () => {
    return {
        type: actionTypes.AUTH_INIT,
    }
}
export const authRequest = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authInit());
        const authData = {
            email:email,
            password:password,
            returnSecureToken: true,
        }
        //Sign up request
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+key;
        if (!isSignUp) {
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+key;
        }
        axios.post(url,
        authData)
        .then(response => {
            
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expirationDate', new Date(new Date().getTime() + (response.data.expiresIn * 1000)));
            localStorage.setItem('userId', response.data.localId);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        }).catch(error => {
            dispatch(authFailure(error));
        });
    };
}

export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => dispatch(authLogout()), expirationTime * 1000);
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token:token,
        userId:userId,
    }
}

export const authFailure = (error) => {
    return {
        type: actionTypes.AUTH_FAILURE,
        error:error
    }
}

export const authCheckState= () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(authLogout());
        } else {
            const expiry = new Date(localStorage.getItem('expirationDate'));
            if(expiry > new Date()) {
                dispatch(authSuccess(token, localStorage.getItem('userId')));
                dispatch(checkAuthTimeout((expiry.getTime() - new Date().getTime()/1000)));
            }
            else {
                dispatch(authLogout());
            }
            
        }
    }
}