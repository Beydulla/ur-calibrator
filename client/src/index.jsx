import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { setAuthToken } from './_helpers';
import { store } from './_helpers';
import { userConstants, projectsConstants } from './_constants';
import jwt_decode from 'jwt-decode';
import { App } from './App';


if(localStorage.getItem('jwtToken')){
    setAuthToken();
    store.dispatch({ type: userConstants.LOGIN_SUCCESS, user:jwt_decode(localStorage.getItem('jwtToken')) });
}

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);