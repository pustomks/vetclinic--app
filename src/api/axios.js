import axios from "axios";
import { store } from "../store";
import { logout } from "../store/slices/tokenSlice";
import { deleteUserRole } from "../store/slices/roleSlice";

const api = axios.create({
  baseUrl: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const { token } = store.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logout());
      store.dispatch(deleteUserRole());
      // window.location.href = "/auth";
    }
    return Promise.reject(error);
  },
);

export default api;
