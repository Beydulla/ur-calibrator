import { accountConstants } from '../_constants';

const initialState = { settings: {} };

export function account(state = initialState, action) {
    switch (action.type) {
        case accountConstants.GET_BILLING_HISTORY:
            return {
                billingHistory: action.billingHistory
            };
        default:
            return state
    }
}