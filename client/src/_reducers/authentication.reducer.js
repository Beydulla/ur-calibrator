import { userConstants } from '../_constants';

const initialState = { loggedIn: false, user:{} };

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return initialState;
    case userConstants.LOGOUT:
      return initialState;
    default:
      return state
  }
}