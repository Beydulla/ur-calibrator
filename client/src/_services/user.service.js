import config from 'config';
import axios from 'axios';

export const userService = {
    confirm,
    login,
    logout,
    register,
    delete: _delete,
    forgotPassword,
    resetForgottenPassword
};


function resetForgottenPassword(key, password){
    return axios.post(`${config.apiUrl}/users/reset-forgotten-password`, {'resetKey':key, 'password':password}).then(res=>{
        return res;
    })
}

function forgotPassword(email){
    return axios.post(`${config.apiUrl}/users/forgot-password`, {'email':email}).then(res=>{
        return res;
    })
}

function confirm(key) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key })
    };

    return fetch(`${config.apiUrl}/users/confirm/${key}`, requestOptions)
        .then(handleResponse)
        .then(message => {
            return message;
        });
}

function login(email, password) {
    return axios.post(`${config.apiUrl}/users/authenticate`, {'email':email, 'password':password}).then(res=>{
        return res;
    })
}

function logout() {
    localStorage.removeItem('jwtToken');
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    console.log(user);
    return fetch(`${config.apiUrl}/users/add`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                //location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}