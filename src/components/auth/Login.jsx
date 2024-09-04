import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Logo from "../../assets/logo.svg";
import "../Header/navbar.css";
import "./auth.styles.css";
import { authUrls } from '../../common';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { auth, googleProvider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";

// import { authUrls } from '../../common';


// const BaseURL = "https://dresscode-updated.onrender.com";


const SignInSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(8, 'Too Short! must be 8 or more than 8 char.').required('Required'),
});

const Login = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const redirectPath = queryParams.get('redirect') || '/account-info';



    const [loading, setLoading] = useState(false);


    const handleGoogleSignIn = async () => {
        setLoading(true);
        try {
            const result = await signInWithPopup(auth, googleProvider);
            console.log(result);
            const token = await result.user.getIdToken();

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${token}`
                }
            };


            const response = await fetch(authUrls.signInWithGoogle, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            });

            const userData = await response.json();


            // const response = await axios.post(authUrls.signInWithGoogle, config);

            if (userData.message === "Success") {
                console.log("User Data:", userData);
                localStorage.setItem("token", userData.data.accessToken)
                localStorage.setItem("id", userData.data.userId)
                localStorage.setItem("userName", result.user.displayName)
                Swal.fire({
                    title: 'Success!',
                    text: 'Logged in successfully',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                })
                const googleAuthRedirectPath = queryParams.get('redirect') || `/get-user-info/${localStorage.getItem("id")}`;
                // router.navigate("/account-info")
                navigate(googleAuthRedirectPath);

            }



        } catch (error) {
            console.error("Error during sign-in:", error);
        } finally {
            setLoading(false)
        }
    };


    return (
        <div className='auth-screen'>
            <div className='auth-container'>
                <div className='auth-inner'>
                    <Link to="/" className='auth-logo'>
                        <img src={Logo} alt="DressCode logo" className='w-100' />
                    </Link>

                    <p className="welcome-back">Welcome back !!!</p>
                    <h3 className="sign-in">Sign in</h3>
                    <div>
                        <Formik
                            initialValues={{ email: '', password: '' }}
                            validationSchema={SignInSchema}
                            onSubmit={async (values) => {
                                setLoading(true)
                                try {
                                    const response = await axios.post(authUrls.login, {
                                        email: values.email,
                                        password: values.password
                                    });
                                    console.log(response.data);
                                    if (response.data.message === "Success") {
                                        localStorage.setItem("token", response.data.data.accessToken)
                                        localStorage.setItem("id", response.data.data.userId)
                                        localStorage.setItem("userName", response.data.data.name)
                                        localStorage.setItem("phoneNumber", response.data.data.phoneNumber)
                                        localStorage.setItem("email", response.data.data.email)
                                        Swal.fire({
                                            title: 'Success!',
                                            text: 'Logged in successfully',
                                            icon: 'success',
                                            showConfirmButton: false,
                                            timer: 1500
                                        })
                                        // router.navigate("/account-info")
                                        navigate(redirectPath);
                                    }
                                } catch (error) {
                                    Swal.fire({
                                        title: 'Login Failed!',
                                        text: 'Please check your email and password or something went wrong',
                                        icon: 'error',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                    console.error('Error logging in:', error.response.data);
                                } finally {
                                    setLoading(false)
                                }
                            }}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                /* and other goodies */
                            }) => (
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label form-labels">Email address</label>
                                        <input
                                            type="email"
                                            className="form-control auth-input"
                                            id="email"
                                            name='email'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.email}
                                            aria-describedby="emailHelp" />
                                        {touched.email && errors.email ? (
                                            <p className='text-danger'>{errors.email}</p>
                                        ) : null}
                                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label form-labels">Password</label>
                                        <input
                                            type="password"
                                            className="form-control auth-input"
                                            id="password"
                                            name='password'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.password} />
                                        {touched.password && errors.password ? (
                                            <p className='text-danger'>{errors.password}</p>
                                        ) : null}
                                    </div>
                                    <div className="auth-btn">
                                        <button type="submit" className="">
                                            {loading ? <div className="spinner-border " style={{ color: 'oragne' }} role="status">
                                                <span className="sr-only"></span>
                                            </div> : "Sign in"}
                                        </button>
                                    </div>
                                    <div className="under-label">
                                        <p>I don’t have an account? <Link to="/register" style={{ color: "orange", cursor: "pointer" }}>Sign up</Link></p>
                                    </div>
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
                <div className='auth_third-party'>
                    <button className='' onClick={handleGoogleSignIn}>Sign in with Google</button>
                </div>
            </div>

            <div className='auth-banner'>
                <div className='auth-banner-img'>
                    <img src="/images/auth/home-page-men.png" alt="" />
                </div>
            </div>
        </div>
    )
}

export default Login