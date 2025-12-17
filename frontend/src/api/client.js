import axios from 'axios';

const client = axios.create({
    baseURL: '/api/v1',
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
