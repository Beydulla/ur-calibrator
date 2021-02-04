import config from 'config';
import axios from 'axios';

export const projectService = {
    getProjectsById,
    getProjectsByUserid,
    deleteProjectById,
    newProject,
    updateProject,
    getFilesByProjectId,
    downloadFile,
    startPayment,
    downloadInvoice
};


function downloadInvoice(id) {
    return axios.get(`${config.apiUrl}/payment/download/${id}`, {
    }).then(res => {
        return res;
    })
}

function startPayment(projectId, redirectUrl) {
    return axios.get(`${config.apiUrl}/payment/startPayment/${projectId}`, {
        params: {
            redirectUrl: redirectUrl
        }
    }).then(res => {
        return res;
    })
}

function downloadFile(fileName) {
    return axios.get(`${config.apiUrl}/files/download/${fileName}`, {
    }).then(res => {
        return res;
    })
}

function getFilesByProjectId(projectId) {
    return axios.get(`${config.apiUrl}/projects/files`, {
        params: {
            project_id: projectId
        }
    }).then(res => {
        return res;
    })
}

function updateProject(id, data) {
    return axios.post(`${config.apiUrl}/projects/update`, { data }, { params: { id } }).then(res => {
        return res;
    })
}

function newProject() {
    return axios.post(`${config.apiUrl}/projects/new`, { 'status': 'init' }).then(res => {
        return res;
    })
}

function getProjectsById(id) {
    return axios.get(`${config.apiUrl}/projects/`, {
        params: {
            id: id
        }
    }).then(res => {
        return res;
    })
}

function getProjectsByUserid(userId) {
    return axios.get(`${config.apiUrl}/projects/user`, {
        params: {
            user_id: userId
        }
    }).then(res => {
        return res;
    })
}

function deleteProjectById(id) {
    return axios.delete(`${config.apiUrl}/projects/delete`, {
        data: {
            id: id
        }
    }).then(res => {
        return res;
    })
}