import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';
import { setAuthToken } from '../_helpers'
import jwt_decode from 'jwt-decode'


export const userActions = {
    confirm,
    login,
    register,
    getAll,
    delete: _delete,
    logout,
    forgotPassword,
    resetForgottenPassword
};

function resetForgottenPassword(key, password){
    return dispatch => {
        userService.resetForgottenPassword(key, password).then(
            res => {
                if (res.data.error) {
                    dispatch(alertActions.error(res.data.message))
                } else {
                    history.push('/');
                    dispatch(alertActions.success(res.data.message));
                }
            },
            error => {
                console.log(error);
                dispatch(alertActions.error(error.toString()));
            }
        );
    }
}


function forgotPassword(email){
    return dispatch => {
        userService.forgotPassword(email).then(
            res => {
                if (res.data.error) {
                    dispatch(alertActions.error(res.data.message))
                } else {
                    history.push('/');
                    dispatch(alertActions.success(res.data.message));
                }
            },
            error => {
                console.log(error);
                dispatch(alertActions.error(error.toString()));
            }
        );
    }
}

function confirm(key) {
    return dispatch => {
     userService.confirm(key)
     .then(
        succes => {
            console.log(succes);
            history.push('/');
            dispatch(alertActions.success(succes.message));
        },
        error => {
            console.log(error);
            dispatch(failure(error.toString()));
            dispatch(alertActions.error(error.toString()));
        }
    );

    };
}

function login(email, password) {
    return dispatch => {
        dispatch(request({ email }));

        userService.login(email, password)
            .then(
                res => {
                    if(res.data.error){
                        dispatch(failure(res.data.message.toString()));
                        dispatch(alertActions.error(res.data.message.toString()))
                    }else{
                        localStorage.setItem("jwtToken", res.data.token);
                        dispatch(success(jwt_decode(res.data.token)));
                        setAuthToken();
                        history.push('/');
                        dispatch(alertActions.success("Logined succesfully"));
                    } 
                },
                error => {
                    console.log(error);
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

export function logout() {
    return dispatch => {
        userService.logout();
        setAuthToken();
        dispatch({ type: userConstants.LOGOUT });
        history.push("/login")
    }
}

function register(user) {
    
    return dispatch => {
        dispatch(request(user));
        console.log(user);
        userService.register(user)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}