import axios from "axios";
import * as SecureStore from "expo-secure-store";

const api = axios.create();

// Inject baseURL dynamically before every request
api.interceptors.request.use(async (config) => {
  const server = await SecureStore.getItemAsync("serverAddress");
  if (!server) {
    throw new Error("Server address not set");
  }

  config.baseURL = `${server}/api`;

  const token = await SecureStore.getItemAsync("jwt");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 401) {
      await SecureStore.deleteItemAsync("jwt");
    }
    return Promise.reject(err);
  }
);

export default api;
