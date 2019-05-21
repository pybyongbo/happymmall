import axios from 'axios';
import { Message } from 'element-ui';
// import store from '../store';
import router from '../router';

const service = axios.create({
    baseURL: process.env.BASE_API,
    timeout: 15000
});
service.defaults.headers.post['Content-Type'] = 'form-data';
service.interceptors.request.use(

    config => {
        if (true) {
            config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        }
        return config;
    },
    error => {
        console.log(error);
        Promise.reject(error);
    }
);

service.interceptors.response.use(
    response => response,
    error => {
        const response = error.response;
        Message({
            message: response.data.msg,
            type: 'error'
        });
    
        return Promise.reject(error);
    }
);

export default service;
