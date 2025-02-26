import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = error.response?.data || 'An error occurred';
    return Promise.reject(new Error(typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage)));
  }
);

export default apiClient;
