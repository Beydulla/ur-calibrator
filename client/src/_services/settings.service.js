import config from 'config';
import axios from 'axios';

export const settingsService = {
    getBillingByUserId,
    addBilling,
    updateBilling,
    getBillingHistory,
    resetPassword,
    deleteAccount
};

function deleteAccount() {
    return axios.post(`${config.apiUrl}/settings/delete-account`).then(res => {
        return res;
    })
}

function getBillingByUserId(userId) {
    return axios.get(`${config.apiUrl}/settings/${userId}`).then(res => {
        return res;
    })
}

function updateBilling(id, data) {
    return axios.post(`${config.apiUrl}/settings/updatebilling/${id}`, {data}).then(res=>{
        return res;
    })
} 

function addBilling(data) {
    return axios.post(`${config.apiUrl}/settings/addbilling`, {data}).then(res=>{
        return res;
    })
}


function getBillingHistory() {
    return axios.get(`${config.apiUrl}/payment/billing-history`).then(res => {
        return res;
    })
}

function resetPassword(oldPassword, newPassword){
    return axios.post(`${config.apiUrl}/users/reset-password`, {oldPassword: oldPassword, newPassword: newPassword}).then(res => {
        return res;
    })
}
