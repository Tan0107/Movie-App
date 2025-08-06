import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

const API = axios.create({
  baseURL,
  timeout: 8000,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  console.log('[API Request]', config.method.toUpperCase(), config.baseURL + config.url);
  return config;
});

API.interceptors.response.use(
  (res) => res,
  (err) => {
    console.warn('[API Response Error]', err.message, err.response ? {
      status: err.response.status,
      data: err.response.data,
    } : 'no response (network-level)');
    return Promise.reject(err);
  }
);

export default API;
