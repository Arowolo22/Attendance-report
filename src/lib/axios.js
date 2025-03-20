// lib/axios.js
import axios from "axios";
import { ENDPOINTS } from "@/app/constants/endpoint";

// Create axios instance
const createAxiosClient = (options = {}) => {
  const client = axios.create({
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...options.headers,
    },
    ...options,
  });

  // Request interceptor for adding token
  client.interceptors.request.use(
    (config) => {
      // In App Router, we might get the token from a different source depending on
      // whether we're on the client or server side
      const token =
        options.token ||
        (typeof window !== "undefined" ? localStorage.getItem("token") : null);

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor for handling token refresh
  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // If error is 401 and not retried yet
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // Get refresh token
          const refreshToken =
            typeof window !== "undefined"
              ? localStorage.getItem("refreshToken")
              : null;

          if (!refreshToken) {
            throw new Error("No refresh token available");
          }

          // Request new access token
          const response = await axios.post(ENDPOINTS.AUTH.REFRESH_TOKEN, {
            refreshToken,
          });

          // Update local storage with new token
          if (typeof window !== "undefined") {
            localStorage.setItem("token", response.data.token);
          }

          // Update authorization header
          originalRequest.headers.Authorization = `Bearer ${response.data.token}`;

          // Retry original request
          return client(originalRequest);
        } catch (err) {
          // Redirect to login if refresh fails
          if (typeof window !== "undefined") {
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            window.location.href = "/login";
          }
          return Promise.reject(error);
        }
      }

      return Promise.reject(error);
    }
  );

  return client;
};

// Client-side axios instance (to be used in components)
export const axiosClient = createAxiosClient();

// Function to create a server-side axios instance with a token
export const createServerAxiosClient = (token) => {
  return createAxiosClient({ token });
};

export default axiosClient;
