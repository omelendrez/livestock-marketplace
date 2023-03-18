import { axiosClient } from "./apiClient";

export function getProfiles() {
  return axiosClient.get('/api/profiles');
}
