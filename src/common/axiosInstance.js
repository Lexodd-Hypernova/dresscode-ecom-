import axios from 'axios';
import { authUrls } from '.'; // Ensure correct path
import { useNavigate } from "react-router-dom";


const axiosInstance = axios.create({

    // testing
    // baseURL: 'https://dresscode-updated.onrender.com',

    // production
    baseURL: 'https://dresscode-bck-final.onrender.com',

    withCredentials: true, // Ensures cookies (refresh token) are sent with requests
});

// let isLoggedOut = localStorage.getItem("isLoggedIn"); // Track logout state

// Function to refresh access token
const refreshAccessToken = async () => {

    const testLog = localStorage.getItem("isLoggedIn");
    // console.log("testLog", testLog);

    const isLoggedOut = localStorage.getItem("isLoggedIn") !== "true";

    if (isLoggedOut) {
        return null; // Prevent refreshing tokens if the user has logged out
    }

    // const redirectOccurred = localStorage.getItem("redirectOccurred");

    // if (redirectOccurred) {
    //     return null; // Do not attempt to refresh again
    // }

    try {
        const response = await axios.post(authUrls.generateAccessToken, {}, { withCredentials: true });
        const { accessToken } = response.data;
        localStorage.setItem('accessToken', accessToken);

        // localStorage.removeItem('redirectOccurred');

        // if (!isLoggedOut) {
        //     // Only save the new access token if the user isn't logged out
        //     localStorage.setItem('accessToken', accessToken);
        // }

        return accessToken;
    } catch (error) {
        console.error('Failed to refresh access token:', error);

        localStorage.setItem('redirectOccurred', 'true');

        localStorage.removeItem('accessToken');
        localStorage.removeItem('id');
        localStorage.removeItem('userName');
        localStorage.removeItem('email');
        localStorage.removeItem('phoneNumber');
        localStorage.removeItem('authToken');
        localStorage.removeItem("uid");
        localStorage.removeItem("gLogin");
        localStorage.setItem("isLoggedIn", "false");
        // window.location.reload();
        // window.location.href = "/login"
        throw error;
    }
};

axiosInstance.interceptors.request.use(
    async (config) => {
        const isLoggedOut = localStorage.getItem("isLoggedIn") !== "true"; // Check logout state
        if (isLoggedOut) {
            return Promise.reject(new Error('User is logged out. No API requests should be made.'));
        }

        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error); // Forward the error for handling in API calls
    }
);



// Response interceptor to handle expired tokens
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const isLoggedOut = localStorage.getItem("isLoggedIn") !== "true"; // Check logout state

        // console.log("isLoggedIn", localStorage.getItem("isLoggedIn"))


        if (isLoggedOut) {
            return Promise.reject(new Error('User is logged out. No token refresh should happen.'));
        }

        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Prevent endless retries

            try {
                const newAccessToken = await refreshAccessToken();
                // console.log("newAccessToken", newAccessToken)
                if (newAccessToken) {
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return axiosInstance(originalRequest); // Retry the request with the new token
                }
            } catch (refreshError) {
                console.error('Refresh token expired or invalid:', refreshError);
                // Optionally redirect to login page or show an appropriate message to the user
            }
        }

        return Promise.reject(error);
    }
);



// Function to call on logout
export const logout = () => {
    // Set logged out state globally
    // isLoggedOut = true;

    // Clear accessToken and other user data from localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('id');
    localStorage.removeItem('userName');
    localStorage.removeItem('email');
    localStorage.removeItem('phoneNumber');
    localStorage.removeItem('authToken');
    localStorage.removeItem("uid");
    localStorage.removeItem("gLogin");
    localStorage.setItem("isLoggedIn", "false");

    // Clear refreshToken cookie
    document.cookie = 'refreshToken=; Max-Age=0; path=/'; // Clears the refreshToken cookie
    document.cookie = 'accessToken=; Max-Age=0; path=/'; // Clears accessToken if stored in cookies

    window.location.href = "/login";


};



export default axiosInstance;
