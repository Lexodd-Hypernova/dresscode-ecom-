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

const AuthSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phoneNumber: Yup.string().required('Required').matches(/^\d{10}$/, 'Phone number is not valid'),
  password: Yup.string().min(8, 'Too Short! must be 8 or more than 8 char.').required('Required'),
  confirmPassword: Yup.string().required('Required').oneOf([Yup.ref('password'), null], 'Passwords must match')
});

const Auth = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const redirectPath = queryParams.get('redirect') || '/account-info';


  const [formType, setFormType] = useState('one');
  // const [hideBanner, setHideBanner] = useState(false);
  // const [width, setWidth] = useState(window.innerWidth)
  const [loading, setLoading] = useState(false);
  // const [formData, setFormData] = useState({
  //   firstName: '',
  //   lastName: '',
  //   email: '',
  //   gender: '',
  //   phoneNumber: '',
  //   password: '',
  //   confirmPassword: ''
  // });

  // const [errors, setErrors] = useState({});

  // const handleInputChange = (e) => {
  //   console.log(e)
  //   setFormData({
  //     ...formData,
  //     [e.target.id]: e.target.value
  //   });
  // };



  // const validateForm = () => {
  //   const newErrors = {};

  //   if (!formData.firstName) {
  //     newErrors.firstName = "First name is required"
  //   } else {
  //     newErrors.firstName = ""
  //   }

  //   if (!formData.lastName) {
  //     newErrors.lastName = "Last name is required"
  //   } else {
  //     newErrors.lastName = ""
  //   }

  //   if (!formData.email) {
  //     newErrors.email = "Email is required"
  //   }
  //   else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)) {
  //     newErrors.email = "Invalid email address"
  //   }

  //   if (!formData.phoneNumber) {
  //     newErrors.phoneNumber = "Phone number is required"
  //   } else {
  //     if (formData.phoneNumber.match(/^\d{10}$/)) {
  //       newErrors.phoneNumber = ""
  //     }
  //     else {
  //       newErrors.phoneNumber = "Phone number must be 10 digit"
  //     }
  //   }

  //   if (!formData.password) {
  //     newErrors.password = 'Password is required';
  //   } else if (formData.password.length < 8) {
  //     newErrors.password = 'Password must be at least 8 characters';
  //   }

  //   if (!formData.confirmPassword) {
  //     newErrors.confirmPassword = 'Confirm password is required';
  //   } else if (formData.confirmPassword !== formData.password) {
  //     newErrors.confirmPassword = 'Passwords do not match';
  //   }

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };


  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (validateForm()) {
  //     if (formType === 'one') {
  //       // Login
  //       setLoading(true);
  //       try {
  //         const response = await axios.post(authUrls.login, {
  //           email: formData.email,
  //           password: formData.password
  //         });
  //         console.log(response.data);
  //         if (response.data.message === "Success") {
  //           localStorage.setItem("token", response.data.data.accessToken)
  //           localStorage.setItem("id", response.data.data.userId)
  //           localStorage.setItem("userName", response.data.data.firstName)
  //           Swal.fire({
  //             title: 'Success!',
  //             text: 'Logged in successfully',
  //             icon: 'success',
  //             showConfirmButton: false,
  //             timer: 1500
  //           })
  //           // router.navigate("/account-info")
  //           navigate(redirectPath);
  //         }
  //       } catch (error) {
  //         Swal.fire({
  //           title: 'Login Failed!',
  //           text: 'Please check your email and password or something went wrong',
  //           icon: 'error',
  //           showConfirmButton: false,
  //           timer: 1500
  //         })
  //         console.error('Error logging in:', error.response.data);
  //       }
  //       finally {
  //         setLoading(false)
  //       }
  //     } else {
  //       // Signup
  //       try {
  //         const response = await axios.post(authUrls.signup, {
  //           firstName: formData.firstName,
  //           lastName: formData.lastName,
  //           email: formData.email,
  //           gender: formData.gender,
  //           phoneNumber: formData.phoneNumber,
  //           password: formData.password
  //         });
  //         setFormType("one")
  //         console.log(response.data);
  //       } catch (error) {
  //         console.error('Error signing up:', error.response.data);
  //       }
  //     }
  //   }

  // };



  const renderForms = () => {
    switch (formType) {
      case 'one':
        return (
          <div className='auth-container'>
            <div className='auth-inner'>
              <Link to="/" className='auth-logo'>
                <img src={Logo} alt="DressCode logo" className='w-100' />
              </Link>

              <p className="welcome-back">Welcome back !!!</p>
              <h3 className="sign-in">Sign in</h3>



              <Formik
                initialValues={{ email: '', password: '' }}

                validationSchema={AuthSchema}

                // validate={values => {
                //   const errors = {};
                //   if (!values.email) {
                //     errors.email = "Email is required"
                //   }
                //   else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                //     errors.email = "Invalid email address"
                //   }
                //   if (!values.password) {
                //     errors.password = 'Password is required';
                //   } else if (values.password.length < 8) {
                //     errors.password = 'Password must be at least 8 characters';
                //   }
                //   return errors;
                // }}
                onSubmit={async (values) => {
                  // setTimeout(() => {
                  //   alert(JSON.stringify(values, null, 2));
                  //   setSubmitting(false);
                  // }, 400);
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
                      localStorage.setItem("userName", response.data.data.firstName)
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
                      <p>I don’t have an account? <span style={{ color: "orange", cursor: "pointer" }} onClick={() => setFormType('two')}>Sign up</span></p>
                    </div>
                  </form>
                )}
              </Formik>



              {/* <div>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label form-labels">Email address</label>
                    <input type="email" className="form-control auth-input" id="email" value={formData.email} onChange={handleInputChange} aria-describedby="emailHelp" />
                    {errors.email && <p className='text-danger'>{errors.email}</p>}
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label form-labels">Password</label>
                    <input type="password" className="form-control auth-input" id="password" value={formData.password} onChange={handleInputChange} />
                    {errors.password && <p className='text-danger'>{errors.password}</p>}
                  </div>
                  <div className="auth-btn">
                    <button type="submit" className="" style={{

                    }}>
                      {loading ? <div className="spinner-border " style={{ color: 'oragne' }} role="status">
                        <span className="sr-only"></span>
                      </div> : "Sign in"}
                    </button>
                  </div>
                  <div className="under-label">
                    <p>I don’t have an account? <span style={{ color: "orange", cursor: "pointer" }} onClick={() => setFormType('two')}>Sign up</span></p>
                  </div>
                </form>
              </div> */}
            </div>
          </div>
        );
      case 'two':
        return (
          <div className='auth-container'>
            <div className='auth-inner'>
              <div className="sign-up-header">
                Welcome to Dresscode
              </div>


              <Formik
                initialValues={
                  {
                    firstName: '',
                    lastName: '',
                    email: '',
                    gender: '',
                    phoneNumber: '',
                    password: '',
                    confirmPassword: '',
                  }
                }
                validationSchema={AuthSchema}
                // validate={values => {
                //     var errors = {};

                //     if (!values.firstName) {
                //         errors.firstName = "First name is required"
                //     }

                //     if (!values.lastName) {
                //         errors.lastName = "Last name is required"
                //     }

                //     if (!values.email) {
                //         errors.email = "Email is required"
                //     }
                //     else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                //         errors.email = "Invalid email address"
                //     }

                //     if (!values.phoneNumber) {
                //         errors.phoneNumber = "Phone number is required"
                //     } else {
                //         if (values.phoneNumber.match(/^\d{10}$/)) {
                //             errors.phoneNumber = ""
                //         }
                //         else {
                //             errors.phoneNumber = "Phone number must be 10 digit"
                //         }
                //     }

                //     if (!values.password) {
                //         errors.password = 'Password is required';
                //     } else if (values.password.length < 8) {
                //         errors.password = 'Password must be at least 8 characters';
                //     }

                //     if (!values.confirmPassword) {
                //         errors.confirmPassword = 'Confirm password is required';
                //     } else if (values.confirmPassword !== values.password) {
                //         errors.confirmPassword = 'Passwords do not match';
                //     }

                //     return errors;
                // }}
                onSubmit={async (values) => {
                  console.log(values)
                  setLoading(true)
                  try {
                    const response = await axios.post(authUrls.signup, {
                      firstName: values.firstName,
                      lastName: values.lastName,
                      email: values.email,
                      gender: values.gender,
                      phoneNumber: values.phoneNumber,
                      password: values.password
                    });
                    // console.log(response.data);


                    if (response.data.message === "Success") {
                      Swal.fire({
                        title: 'Success!',
                        text: 'Registered successfully',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500
                      })
                      setFormType("one")
                      console.log(response.data);
                    }

                  } catch (error) {
                    Swal.fire({
                      title: 'Register Failed!',
                      text: error.response.data.message,
                      icon: 'error',
                      showConfirmButton: false,
                      timer: 1500
                    })
                    console.error('Error signing up:', error.response.data);
                  } finally {
                    setLoading(false)
                  }
                  // setTimeout(() => {
                  //   alert(JSON.stringify(values, null, 2));
                  //   setSubmitting(false);
                  // }, 400);
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
                        <label htmlFor="firstName" className="form-label form-labels">First Name</label>
                        <input
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.firstName}
                          className="auth-input form-control form-control-sm"
                          id="firstName"
                          name='firstName'
                          aria-describedby="firstNameHelp" />
                        {touched.firstName && errors.firstName ? (
                          <p className='text-danger'>{errors.firstName}</p>
                        ) : null}
                      </div>
                      <div className="">
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
                      </div>
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



              {/* <div>
                <div className="">
                  <label htmlFor="firstName" className="form-label form-labels">First Name</label>
                  <input value={formData.firstName} onChange={handleInputChange} type="text" className="auth-input form-control form-control-sm" id="firstName" aria-describedby="firstNameHelp" />
                  {errors.firstName && <p className='text-danger'>{errors.firstName}</p>}
                </div>
                <div className="">
                  <label htmlFor="lastName" className="form-label form-labels">Last Name</label>
                  <input value={formData.lastName} onChange={handleInputChange} type="text" className="auth-input form-control form-control-sm" id="lastName" aria-describedby="lastNameHelp" />
                  {errors.lastName && <p className='text-danger'>{errors.lastName}</p>}

                </div>
                <div className="">
                  <label htmlFor="email" className="form-label form-labels">Email address</label>
                  <input value={formData.email} onChange={handleInputChange} type="email" className="auth-input form-control form-control-sm" id="email" aria-describedby="emailHelp" />
                  {errors.email && <p className='text-danger'>{errors.email}</p>}

                </div>
                <div className="">
                  <label htmlFor="gender" className="form-label form-labels">Gender</label>
                  <select value={formData.gender} onChange={handleInputChange} className="form-control form-control-sm" id="gender" >
                    <option value="">Select Gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
                <div className="">
                  <label htmlFor="phoneNumber" className="form-label form-labels">Phone Number</label>
                  <input value={formData.phoneNumber} onChange={handleInputChange} type="tel" className="auth-input form-control form-control-sm" id="phoneNumber" aria-describedby="phoneNumberHelp" />
                  {errors.phoneNumber && <p className='text-danger'>{errors.phoneNumber}</p>}

                </div>
                <div className="">
                  <label htmlFor="password" className="form-label form-labels">Password</label>
                  <input value={formData.password} onChange={handleInputChange} type="password" className="auth-input form-control form-control-sm" id="password" aria-describedby="passwordHelp" />
                  {errors.password && <p className='text-danger'>{errors.password}</p>}

                </div>
                <div className="">
                  <label htmlFor="confirmPassword" className="form-label form-labels">Confirm Password</label>
                  <input value={formData.confirmPassword} onChange={handleInputChange} type="password" className="auth-input form-control form-control-sm" id="confirmPassword" aria-describedby="confirmPasswordHelp" />
                  {errors.confirmPassword && <p className='text-danger'>{errors.confirmPassword}</p>}

                </div>
                <div className='auth-btn'>
                  <button type="submit" className="btn" style={{
                    background: "#F47458",
                    color: "white",
                  }}
                    onClick={handleSubmit}>
                    Sign up
                  </button>
                </div>

              </div> */}
            </div>
            <div className='auth-back' onClick={() => setFormType('one')}>
              <img src="/images/auth/back-arrow.svg" alt="" />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className='auth-screen'>
      {renderForms()}

      <div className='auth-banner'>
        <div className='auth-banner-img'>
          <img src="/images/auth/home-page-men.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Auth;