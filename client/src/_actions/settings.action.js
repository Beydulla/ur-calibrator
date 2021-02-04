import { billingConstants, accountConstants } from '../_constants';
import { settingsService } from '../_services';
import { alertActions } from './';
import {userActions} from "../_actions";
import {history} from "../_helpers";



export const settingsAction = {
    addBilling,
    getBillingByUserId,
    updateBillingById,
    getBillingHistory,
    resetPassword,
    deleteAccount
};


function deleteAccount(){
    return dispatch => {
        settingsService.deleteAccount().then(
            res => {
                if(res.data.error){
                    dispatch(alertActions.error(res.data.message.toString()))
                }else{
                    dispatch(userActions.logout());
                }
            },
            error => { console.log(error.toString)}
        )
    }
}

function addBilling(data){
    return dispatch => {
        dispatch(request);
        settingsService.addBilling(data)
        .then(
            res =>{
                if(res.data.error){
                    dispatch(alertActions.error(res.data.message.toString()))
                }else{
                    dispatch(success(res.data.billing))
                    dispatch(alertActions.success('Billing data added successfully!'));
                }
            },
            error => { console.log(error.toString)}
        )
    };

    function success(billing){ return {type: billingConstants.ADD_BILLING, billing}}
    function request(){ return {type: billingConstants.ADD_BILLING_REQUEST}}
}

function updateBillingById(id, data){
    return dispatch => {
        dispatch(request());
        settingsService.updateBilling(id, data)
        .then(
            res =>{
                if(res.data.error){
                    dispatch(alertActions.error(res.data.message.toString()))
                }else{
                    dispatch(success(res.data.billing))
                    dispatch(alertActions.success('Billing data updated successfully!'));
                }
            },
            error => { console.log(error.toString)}
        )
    }
    function success(billing){ return {type: billingConstants.UPDATE_BILLING, billing}}
    function request(){ return {type: billingConstants.UPDATE_BILLING_REQUEST}}
}

function getBillingByUserId(userId){
    return dispatch => {
        dispatch(request());
        settingsService.getBillingByUserId(userId)
            .then(
                res => {
                    if(res.data.error){
                        dispatch(alertActions.error(res.data.message.toString()))
                    }else{
                       dispatch(success(res.data.billing));
                    } 
                },
                error => {
                    console.log(error.toString);
                }
            );
    };
    function success(billing) { return { type: billingConstants.GET_BILLING, billing } }
    function request() { return { type: billingConstants.GET_BILLING_REQUEST } }
}


function getBillingHistory(){
    return dispatch => {
        settingsService.getBillingHistory()
            .then(
                res => {
                    if(res.data.error){
                        dispatch(alertActions.error(res.data.message.toString()))
                    }else{
                       dispatch(success(res.data.billingHistory));
                    } 
                },
                error => {
                    console.log(error.toString);
                }
            );
    };
    function success(billingHistory) { return { type: accountConstants.GET_BILLING_HISTORY, billingHistory } }
}

function resetPassword(oldPassword, newPassword){
    return dispatch => {
        settingsService.resetPassword(oldPassword, newPassword)
            .then(
                res =>{
                    if(res.data.error){
                        dispatch(alertActions.error(res.data.message.toString()))
                    }else{
                        dispatch(userActions.logout());
                        dispatch(alertActions.success('Your password has been reset successfully!'));
                    }
                },
                error => {
                    dispatch(alertActions.error("Something went wrong. Password might not be reset. Please, relogin again! "))
                    console.log(error.toString)
                }
            )
    };

}