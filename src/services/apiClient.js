import axios from 'axios'
import LS, { KEYS } from '../helpers/localStorage';
const local = new LS()

export const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

axiosClient.interceptors.request.use(
  config => {
    const token = local.get(KEYS.token)
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    // config.headers['Content-Type'] = 'application/json';
    return config;
  },
  error => {
    Promise.reject(error)
  });

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    let res = error.response;
    // if (res.status === 401) {
    //   window.location.href = '/login';
    // }
    console.error(`Looks like there was a problem.Status Code: ${res.status}`);
    return Promise.reject(error);
  }
);

