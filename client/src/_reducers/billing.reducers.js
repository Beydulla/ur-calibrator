import { billingConstants } from '../_constants';

const initialState = {billing:{} };

export function billing(state = initialState, action) {
  switch (action.type) {
    case billingConstants.ADD_BILLING_REQUEST:
      return {
        loading: true,
        billing:{}
      };
    case billingConstants.ADD_BILLING:
      return {
        billing: action.billing
      };
    case billingConstants.UPDATE_BILLING_REQUEST:
      return {
        loading: true,
        billing: state.billing
      };
    case billingConstants.UPDATE_BILLING:
      return {
        billing: action.billing
      };
    case billingConstants.GET_BILLING_REQUEST:
      return {
        billing: state.billing
      };
    case billingConstants.GET_BILLING:
      return {
        billing: action.billing
      };
    default:
      return state
  }
}