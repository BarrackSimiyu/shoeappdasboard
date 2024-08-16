import axios from 'axios';

// Create an axios instance without default headers
const axiosInstance = axios.create({
    baseURL: 'https://shoeapp2.pythonanywhere.com/api', // Replace with your API's base URL
    timeout: 30000, // Adjust the timeout as needed (in milliseconds)
    headers: {
        'Content-Type': 'application/json', // Set the default content type for requests
    }
});

// Interceptor to set the Authorization header dynamically
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
