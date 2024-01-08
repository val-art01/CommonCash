import axios from 'axios';

const apiClient = axios.create({

    baseURL: 'http://localhost:5173/api',
    headers: {
        'Content-Type':  'application/json'
    },


});

export default {
    fetchData() {
        return apiClient.get('/data');
    },
    postData(data) {
        return apiClient.post('/data', data);

    },
    

}

