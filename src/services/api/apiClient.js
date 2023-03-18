import axios from 'axios';
import { KEYS, SP } from '../session';
const session = new SP();

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  config => {
    const token = session.get(KEYS.token);
    config.headers['Content-Type'] = 'application/json';
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  });

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    let res = error.response;
    console.error(`Looks like there was a problem.Status Code: ${res.status}`);
    return Promise.reject(error);
  }
);

