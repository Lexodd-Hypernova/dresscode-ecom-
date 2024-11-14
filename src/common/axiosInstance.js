import axios from 'axios';
import { authUrls } from '.'; // Ensure correct path
import { useNavigate } from "react-router-dom";


const axiosInstance = axios.create({

    // testing
    // baseURL: 'https://dresscode-updated.onrender.com',

    const baseUrl = "https://dresscode-bck-final.onrender.com";

    // production
    // baseURL: 'https://dresscode-bck.onrender.com',

    withCredentials: true, // Ensures cookies (refresh token) are sent with requests
});

let isLoggedOut = false; // Track logout state

// Function to refresh access token
const refreshAccessToken = async () => {
    if (isLoggedOut) {
        return null; // Prevent refreshing tokens if the user has logged out
    }

    try {
        const response = await axios.post(authUrls.generateAccessToken, {}, { withCredentials: true });
        const { accessToken } = response.data;

        if (!isLoggedOut) {
            // Only save the new access token if the user isn't logged out
            localStorage.setItem('accessToken', accessToken);
        }

        return accessToken;
    } catch (error) {
        console.error('Failed to refresh access token:', error);
        throw error;
    }
};


axiosInstance.interceptors.request.use(async (config) => {
    if (isLoggedOut) {
        return Promise.reject('User is logged out. No API requests should be made.');
    }

    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});



// Request interceptor to attach access token
axiosInstance.interceptors.request.use(async (config) => {
    if (isLoggedOut) {
        return Promise.reject('User is logged out. No requests should be made.');
    }

    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});



// Response interceptor to handle expired tokens
axiosInstance.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    if (isLoggedOut) {
        return Promise.reject('User is logged out. No token refresh should happen.');
    }

    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // Prevent endless retries

        try {
            const newAccessToken = await refreshAccessToken();
            if (newAccessToken) {
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest); // Retry the request with the new token
            }
        } catch (refreshError) {
            console.error('Refresh token expired or invalid:', refreshError);
        }
    }

    return Promise.reject(error);
});


// Function to call on logout
export const logout = () => {
    // Set logged out state globally
    isLoggedOut = true;

    // Clear accessToken and other user data from localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('id');
    localStorage.removeItem('userName');
    localStorage.removeItem('email');
    localStorage.removeItem('phoneNumber');
    localStorage.removeItem('authToken');

    // Clear refreshToken cookie
    document.cookie = 'refreshToken=; Max-Age=0; path=/'; // Clears the refreshToken cookie
    document.cookie = 'accessToken=; Max-Age=0; path=/'; // Clears accessToken if stored in cookies

    // Optionally force a page reload to clear any state
    setTimeout(() => {
        window.location.reload(); // Refresh to reset state after clearing tokens
    }, 100); // Short delay to ensure everything is cleared before reload

    // Redirect to login page after logout
    history('/login');
};



export default axiosInstance;
