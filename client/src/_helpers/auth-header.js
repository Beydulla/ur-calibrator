import axios from 'axios';

export function setAuthToken() {
    let token = localStorage.getItem('jwtToken');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}
