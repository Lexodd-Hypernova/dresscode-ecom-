import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Logo from "../../assets/logo.svg";
import "../Header/navbar.css";
import "./auth.styles.css";
import { authUrls } from '../../common';
// import router from '../../routes/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';



const SignupSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    phoneNumber: Yup.string().required('Required').matches(/^\d{10}$/, 'Phone number is not valid'),
    password: Yup.string().min(8, 'Too Short! must be 8 or more than 8 char.').required('Required'),
    confirmPassword: Yup.string().required('Required').oneOf([Yup.ref('password'), null], 'Passwords must match')
});

const Register = () => {

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
                        Welcome to Dresscode
                    </div>

                    <Formik
                        initialValues={
                            {
                                name: '',
                                email: '',
                                gender: '',
                                phoneNumber: '',
                                password: '',
                                confirmPassword: '',
                            }
                        }
                        validationSchema={SignupSchema}
                        onSubmit={async (values) => {
                            console.log(values)
                            setLoading(true)
                            try {
                                const response = await axios.post(authUrls.signup, {
                                    name: values.name,
                                    email: values.email,
                                    gender: values.gender,
                                    phoneNumber: values.phoneNumber,
                                    password: values.password
                                });
                                // console.log(response.data);


                                if (response.status === 201) {
                                    Swal.fire({
                                        title: 'Success!',
                                        text: 'Registered successfully',
                                        icon: 'success',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                    navigate("/login")
                                    console.log(response.data);
                                }

                            } catch (error) {
                                if (error.response.status === 400) {
                                    Swal.fire({
                                        title: 'Register Failed!',
                                        text: "Email or Phone number is already used",
                                        icon: 'error',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                } else if (error.response.status === 500) {
                                    Swal.fire({
                                        title: 'Register Failed!',
                                        text: "Something went wrong, please try later",
                                        icon: 'error',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                }
                                console.error('Error signing up:', error);

                                console.error('Error signing up:', error.response.data);
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
                                        <label htmlFor="name" className="form-label form-labels">Name</label>
                                        <input
                                            type="text"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.name}
                                            className="auth-input form-control form-control-sm"
                                            id="name"
                                            name='name'
                                            aria-describedby="NameHelp" />
                                        {touched.name && errors.name ? (
                                            <p className='text-danger'>{errors.name}</p>
                                        ) : null}
                                    </div>
                                    {/* <div className="">
                                        <label htmlFor="lastName" className="form-label form-labels">Last Name</label>
                                        <input
                                            type="text"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.lastName}
                                            className="auth-input form-control form-control-sm"
                                            id="lastName"
                                            name='lastName'
                                            aria-describedby="lastNameHelp" />
                                        {touched.lastName && errors.lastName ? (
                                            <p className='text-danger'>{errors.lastName}</p>
                                        ) : null}
                                    </div> */}
                                    <div className="">
                                        <label htmlFor="email" className="form-label form-labels">Email address</label>
                                        <input
                                            type="email"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.email}
                                            className="auth-input form-control form-control-sm"
                                            id="email"
                                            name='email'
                                            aria-describedby="emailHelp" />
                                        {touched.email && errors.email ? (
                                            <p className='text-danger'>{errors.email}</p>
                                        ) : null}
                                    </div>
                                    <div className="">
                                        <label htmlFor="gender" className="form-label form-labels">Gender</label>
                                        <select
                                            onChange={handleChange}
                                            value={values.gender}
                                            className="form-control form-control-sm"
                                            id="gender"
                                            name='gender'>
                                            <option value="">Select Gender</option>
                                            <option value="MALE">Male</option>
                                            <option value="FEMALE">Female</option>
                                            <option value="OTHER">Other</option>
                                        </select>
                                    </div>
                                    <div className="">
                                        <label htmlFor="phoneNumber" className="form-label form-labels">Phone Number</label>
                                        <input
                                            type="text"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.phoneNumber}
                                            className="auth-input form-control form-control-sm"
                                            id="phoneNumber"
                                            name='phoneNumber'
                                            aria-describedby="phoneNumberHelp" />
                                        {touched.phoneNumber && errors.phoneNumber ? (
                                            <p className='text-danger'>{errors.phoneNumber}</p>
                                        ) : null}
                                    </div>
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
                                            </div> : "Sign up"}
                                        </button>
                                    </div>

                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
                <Link to="/login" className='auth-back'>
                    <img src="/images/auth/back-arrow.svg" alt="" />
                </Link>
            </div>
            <div className='auth-banner'>
                <div className='auth-banner-img'>
                    <img src="/images/auth/home-page-men.png" alt="" />
                </div>
            </div>
        </div >
    )
}

export default Register