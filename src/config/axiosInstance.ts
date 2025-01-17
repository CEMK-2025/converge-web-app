import axios from 'axios';

// Create an Axios instance with base URL and default headers
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Ensure this is defined in your .env file
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Include credentials for cross-origin requests
});

// Add an interceptor to include the Authorization header
axiosInstance.interceptors.request.use((config) => {
  // Extract token from cookies directly (no need to remove 'authToken=' part)
  const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('authToken='))
    ?.split('=')[1]; // Extract the token value after '='

  if (token) {
    // Set Authorization header with the token
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.warn("No token found in cookies.");
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
