import { api } from "./apiClient";

export const getProfiles = () =>
  api.get('/api/profiles');

