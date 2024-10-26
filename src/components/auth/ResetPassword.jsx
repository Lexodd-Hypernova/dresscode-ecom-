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

    const [token, setToken] = useState();
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const redirectPath = queryParams.get('redirect') || '/account-info';

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        setToken(token);
    }, [])


    return (
        <div className='auth-screen'>
            <div className='auth-container'>
                <div className='auth-inner'>
                    <Link to="/" className='auth-logo'>
                        <img src={Logo} alt="DressCode logo" className='w-100' />
                    </Link>
                    <div className="sign-up-header mt-3">
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
                                    newPassword: values.password
                                });
                                console.log(response.data);


                                if (response.status === 201) {
                                    Swal.fire({
                                        title: 'Success!',
                                        text: 'You have updated password successfully',
                                        icon: 'success',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                    navigate("/login")
                                    console.log(response.data);
                                }

                            } catch (error) {

                                Swal.fire({
                                    title: 'Reset Failed!',
                                    text: "Something went wrong, please try later",
                                    icon: 'error',
                                    showConfirmButton: false,
                                    timer: 1500
                                })

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
                                        <label htmlFor="password" className="form-label form-labels">New Password</label>

                                        <div className='input-group'>
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.password}
                                                className="auth-input form-control form-control-sm"
                                                id="password"
                                                name='password'
                                                aria-describedby="passwordHelp" />
                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"
                                                    }`}></i>
                                            </button>
                                        </div>


                                        {touched.password && errors.password ? (
                                            <p className='text-danger'>{errors.password}</p>
                                        ) : null}
                                    </div>
                                    <div className="">
                                        <label htmlFor="confirmPassword" className="form-label form-labels">Confirm Password</label>

                                        <div className='input-group'>
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.confirmPassword}
                                                className="auth-input form-control form-control-sm"
                                                id="confirmPassword"
                                                name='confirmPassword'
                                                aria-describedby="confirmPasswordHelp" />
                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"
                                                    }`}></i>
                                            </button>
                                        </div>


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