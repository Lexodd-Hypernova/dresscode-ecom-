import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Logo from "../../assets/logo.svg";
import "../Header/navbar.css";
import "./auth.styles.css";
import { authUrls } from '../../common';
// import router from '../../routes/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Link, useNavigate, useLocation } from 'react-router-dom';
const Auth = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const redirectPath = queryParams.get('redirect') || '/account-info';


  const [formType, setFormType] = useState('one');
  // const [hideBanner, setHideBanner] = useState(false);
  // const [width, setWidth] = useState(window.innerWidth)
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    console.log(e)
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (formType === 'one') {
      // Login
      try {
        const response = await axios.post(authUrls.login, {
          email: formData.email,
          password: formData.password
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
      }
    } else {
      // Signup
      try {
        const response = await axios.post(authUrls.signup, {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          gender: formData.gender,
          phoneNumber: formData.phoneNumber,
          password: formData.password
        });
        setFormType("one")
        console.log(response.data);
      } catch (error) {
        console.error('Error signing up:', error.response.data);
      }
    }
  };



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
              <div>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label form-labels">Email address</label>
                    <input type="email" className="form-control auth-input" id="email" value={formData.email} onChange={handleInputChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label form-labels">Password</label>
                    <input type="password" className="form-control auth-input" id="password" value={formData.password} onChange={handleInputChange} />
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
              </div>
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
              <div>
                <div className="">
                  <label htmlFor="firstName" className="form-label form-labels">First Name</label>
                  <input value={formData.firstName} onChange={handleInputChange} type="text" className="auth-input form-control form-control-sm" id="firstName" aria-describedby="firstNameHelp" />
                </div>
                <div className="">
                  <label htmlFor="lastName" className="form-label form-labels">Last Name</label>
                  <input value={formData.lastName} onChange={handleInputChange} type="text" className="auth-input form-control form-control-sm" id="lastName" aria-describedby="lastNameHelp" />
                </div>
                <div className="">
                  <label htmlFor="email" className="form-label form-labels">Email address</label>
                  <input value={formData.email} onChange={handleInputChange} type="email" className="auth-input form-control form-control-sm" id="email" aria-describedby="emailHelp" />
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
                </div>
                <div className="">
                  <label htmlFor="password" className="form-label form-labels">Password</label>
                  <input value={formData.password} onChange={handleInputChange} type="password" className="auth-input form-control form-control-sm" id="password" aria-describedby="passwordHelp" />
                </div>
                <div className="">
                  <label htmlFor="confirmPassword" className="form-label form-labels">Confirm Password</label>
                  <input value={formData.confirmPassword} onChange={handleInputChange} type="password" className="auth-input form-control form-control-sm" id="confirmPassword" aria-describedby="confirmPasswordHelp" />
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

              </div>
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
