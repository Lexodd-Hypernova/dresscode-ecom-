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

const SignupSchema = Yup.object().shape({
    password: Yup.string().min(8, 'Too Short! must be 8 or more than 8 char.').required('Required'),
    confirmPassword: Yup.string().required('Required').oneOf([Yup.ref('password'), null], 'Passwords must match')
});

function ResetPassword() {

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const redirectPath = queryParams.get('redirect') || '/account-info';

    const [loading, setLoading] = useState(false);


    return (
        <div className='auth-screen'>
            <div className='auth-container'>
                <div className='auth-inner'>
                    <div className="sign-up-header">
                        Set a new password
                    </div>

                    <Formik
                        initialValues={
                            {
                                password: '',
                                confirmPassword: '',
                            }
                        }
                        validationSchema={SignupSchema}
                        onSubmit={async (values) => {
                            console.log(values)
                            setLoading(true)
                            try {
                                const response = await axios.post(authUrls.resetPassword, {
                                    token: token,
                                    password: values.password
                                });
                                console.log(response.data);


                                // if (response.status === 201) {
                                //     Swal.fire({
                                //         title: 'Success!',
                                //         text: 'Registered successfully',
                                //         icon: 'success',
                                //         showConfirmButton: false,
                                //         timer: 1500
                                //     })
                                //     navigate("/login")
                                //     console.log(response.data);
                                // }

                            } catch (error) {
                                // if (error.response.status === 400) {
                                //     Swal.fire({
                                //         title: 'Register Failed!',
                                //         text: "Email or Phone number is already used",
                                //         icon: 'error',
                                //         showConfirmButton: false,
                                //         timer: 1500
                                //     })
                                // } else if (error.response.status === 500) {
                                //     Swal.fire({
                                //         title: 'Register Failed!',
                                //         text: "Something went wrong, please try later",
                                //         icon: 'error',
                                //         showConfirmButton: false,
                                //         timer: 1500
                                //     })
                                // }
                                console.error('Error signing up:', error);

                                // console.error('Error signing up:', error.response.data);
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
                            // isSubmitting,
                            /* and other goodies */
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <div className="">
                                        <label htmlFor="password" className="form-label form-labels">Password</label>
                                        <input
                                            type="password"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.password}
                                            className="auth-input form-control form-control-sm"
                                            id="password"
                                            name='password'
                                            aria-describedby="passwordHelp" />
                                        {touched.password && errors.password ? (
                                            <p className='text-danger'>{errors.password}</p>
                                        ) : null}
                                    </div>
                                    <div className="">
                                        <label htmlFor="confirmPassword" className="form-label form-labels">Confirm Password</label>
                                        <input
                                            type="password"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.confirmPassword}
                                            className="auth-input form-control form-control-sm"
                                            id="confirmPassword"
                                            name='confirmPassword'
                                            aria-describedby="confirmPasswordHelp" />
                                        {touched.confirmPassword && errors.confirmPassword ? (
                                            <p className='text-danger'>{errors.confirmPassword}</p>
                                        ) : null}
                                    </div>
                                    <div className='auth-btn'>

                                        <button type="submit" className="btn" style={{
                                            background: "#F47458",
                                            color: "white",
                                        }}
                                        >
                                            {loading ? <div className="spinner-border " style={{ color: 'oragne' }} role="status">
                                                <span className="sr-only"></span>
                                            </div> : "Update Password"}
                                        </button>
                                    </div>

                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
                {/* <Link to="/login" className='auth-back'>
                    <img src="/images/auth/back-arrow.svg" alt="" />
                </Link> */}
            </div>
            <div className='auth-banner'>
                <div className='auth-banner-img'>
                    <img src="/images/auth/home-page-men.png" alt="" />
                </div>
            </div>
        </div >
    )
}

export default ResetPassword