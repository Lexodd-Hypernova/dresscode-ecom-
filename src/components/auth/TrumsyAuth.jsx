import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { useNavigate } from 'react-router-dom';
import { ProgressBar } from 'primereact/progressbar';
import { authUrls } from '../../common';

const TrumsyAuth = () => {
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hasRedirected, setHasRedirected] = useState(false);

    const navigate = useNavigate();

    const logInWithTrumsy = async () => {
        setLoading(true);
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const newToken = urlParams.get('token');

            if (!newToken) {
                throw new Error('Token not found');
            }

            setToken(newToken);
            localStorage.setItem("authToken", newToken); // Store token for later use if needed

            const response = await fetch(`${authUrls.signInWithGoogle}/redirection`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: newToken,
                },
            });

            const userData = await response.json();

            if (userData.message === "Success") {
                console.log("User Data:", userData);
                localStorage.setItem("accessToken", userData.data.accessToken);
                localStorage.setItem("id", userData.data.userId);
                localStorage.setItem("userName", userData.data.name);
                localStorage.setItem("email", userData.data.email);

                Swal.fire({
                    title: 'Success!',
                    text: 'Logged in successfully',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                });

                const redirectPath = `/get-user-info/${userData.data.userId}`;
                setHasRedirected(true);
                navigate(redirectPath);
            } else {
                throw new Error('Login failed');
            }
        } catch (error) {
            console.error("Error during sign-in:", error);
            Swal.fire({
                title: 'Login Failed!',
                text: 'Something went wrong',
                icon: 'error',
                showConfirmButton: false,
                timer: 1500,
            });
            navigate('/login');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Only call login if not redirected yet
        if (!hasRedirected && !token) {
            logInWithTrumsy();
        }
    }, [hasRedirected, token]);

    return (
        <>
            {loading && <ProgressBar mode="indeterminate" style={{ height: '6px' }} />}
        </>
    );
};

export default TrumsyAuth;
