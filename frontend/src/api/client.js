
import axios from 'axios';
import API_BASE_URL from '../config/api';

const client = axios.create({
    baseURL: API_BASE_URL + '/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Response interceptor for error handling
client.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.error || error.response?.data?.errors?.join(', ') || 'An unexpected error occurred';
        console.error('API Error:', message);
        return Promise.reject({ ...error, message });
    }
);

export default client;
