import axios from 'axios';

const getToken = () => {
    return localStorage.getItem("access_token");
};

const axiosInstance = axios.create({
    baseURL: 'https://shoeapp2.pythonanywhere.com/api',
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the token in each request
axiosInstance.interceptors.request.use(config => {
    const token = getToken();
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default axiosInstance;
