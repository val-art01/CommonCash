import axios from 'axios';


const apiClient = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {
        'Content-Type':  'application/json'
    },
});

export default {
    fetchData() {
        return apiClient.get('/');
    },
    postData(data) {
        return apiClient.post('/users/register', data);
    },
    login(data) {
        return apiClient.post('/auth/login', data);
    },
}

