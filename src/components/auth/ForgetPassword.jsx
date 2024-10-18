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

const SignInSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
});

function ForgetPassword() {

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const redirectPath = queryParams.get('redirect') || '/account-info';

    const [loading, setLoading] = useState(false);

    const [notification, setNotification] = useState(""); // State for notification message


    return (
        <div className='auth-screen'>

            {notification && (
                <div className="notification">
                    <p>{notification}</p>
                    {/* <button onClick={handleCloseNotification}>Close</button> */}
                </div>
            )}

            <div className='auth-container'>
                <div className='auth-inner'>
                    <Link to="/" className='auth-logo'>
                        <img src={Logo} alt="DressCode logo" className='w-100' />
                    </Link>
                    <div className='mt-3 mb-3'>
                        <Link className='' to="/login">
                            <img src="/images/back.png" alt="" width={30} />
                        </Link>
                    </div>
                    <h3 className="sign-in">Forgot Password</h3>
                    <p className="reset-p">Please enter your email to reset the password</p>
                    <div>
                        <Formik
                            initialValues={{ email: '' }}
                            validationSchema={SignInSchema}
                            onSubmit={async (values) => {
                                setLoading(true)
                                try {
                                    const response = await axios.post(authUrls.forgotPassword, {
                                        email: values.email,
                                    });
                                    // { withCredentials: true }
                                    console.log(response.data);
                                    if (response.status === 200) {
                                        Swal.fire({
                                            title: 'Success!',
                                            text: 'Password reset request sent successfully to admin.',
                                            icon: 'success',
                                            showConfirmButton: false,
                                            timer: 1500
                                        })

                                        setNotification("We've sent a password reset link to your email! Please check your inbox (and spam folder, just in case) for an email from us. It may take a few minutes to arrive. Once you receive it, click the link to reset your password. If you don’t see the email shortly, please try again or contact support for assistance.");
                                        // router.navigate("/account-info")
                                        // navigate(redirectPath);
                                    }
                                } catch (error) {
                                    console.log("error", error)
                                    Swal.fire({
                                        title: 'Failed!',
                                        text: 'Please check your email or something went wrong',
                                        icon: 'error',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                    // console.error('Error logging in:', error.response.data);
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
                                    </div>
                                    <div className="auth-btn">
                                        <button type="submit" className="">
                                            {loading ? <div className="spinner-border " style={{ color: 'oragne' }} role="status">
                                                <span className="sr-only"></span>
                                            </div> : "Submit"}
                                        </button>
                                    </div>
                                    {/* <div className="under-label">
                                        <p>I don’t have an account? <Link to="/register" style={{ color: "orange", cursor: "pointer" }}>Sign up</Link></p>
                                    </div>
                                    <div className="under-label">
                                        <p><Link to="/register" style={{ color: "orange", cursor: "pointer" }}>Forget Password?</Link></p>
                                    </div> */}
                                </form>
                            )}
                        </Formik>
                    </div>
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

export default ForgetPassword