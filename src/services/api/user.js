import { api } from "./apiClient";

export const login = (payload) =>
  api.post('/api/users/login', payload);

export const getUsers = () =>
  api.get('/api/users');

