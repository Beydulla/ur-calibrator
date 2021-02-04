import {
    projectConstants
} from '../_constants';

const initialState = {
    project: {}
};

export function project(state = initialState, action) {
    switch (action.type) {
        case projectConstants.NEW_PROJECT:
            return {
                project: action.project
            };
        case projectConstants.INIT_PROJECT:
            return {
                project: action.project
            };
        case projectConstants.UPLOAD_PROJECT:
            return {
                project: action.project
            };
        case projectConstants.UPDATE_PROJECT_REQUEST:
            return {
                loading: true
            };
        case projectConstants.GET_PROJECT_REQUEST:
            return {
                loading: true
            };
        case projectConstants.GET_PROJECT:
            return {
                project: action.project
            };
        default:
            return state
    }
}