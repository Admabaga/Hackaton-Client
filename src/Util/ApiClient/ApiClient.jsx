import axios from 'axios';

const baseUrl = 'http://localhost:8000';

const ApiClient = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default ApiClient;