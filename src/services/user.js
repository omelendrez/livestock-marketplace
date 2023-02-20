import { axiosClient } from "./apiClient";

export function login(payload) {
  return axiosClient.post('/api/users/login', payload);
}

export function getUsers() {
  return axiosClient.get('/api/users');
}
