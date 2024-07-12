import React, { useState } from 'react';
import axios from 'axios';
import Logo from "../../assets/logo.svg";
import "../Header/navbar.css";
import "./auth.styles.css";
import {authUrls} from '../../common';
import router from '../../routes/router';
const Auth = () => {
  const [formType, setFormType] = useState('one');
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
    if (formType === 'one') {
      // Login
      try {
        const response = await axios.post(authUrls.login, {
          email: formData.email,
          password: formData.password
        });
        console.log(response.data);
        if(response.data.message==="Success"){
            localStorage.setItem("token", response.data.data.accessToken)
            localStorage.setItem("id", response.data.data.userId)
            localStorage.setItem("userName", response.data.data.firstName)
            router.navigate("/account-info")
        }
      } catch (error) {
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
          <div style={{
            width: "50%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
            <div style={{
              width: "70%",
              boxShadow: "0px 19.335px 40.705px 0px",
              borderRadius: "2%",
              height: "80%",
              marginLeft: "30%",
              padding: "0px 50px 0px 50px",
            }}>
              <img src={Logo} alt="DressCode logo" style={{ width: "150.1px", height: "80px" }} />
              <p className="welcome-back">Welcome back !!!</p>
              <h3 className="sign-in">Sign in</h3>
              <div>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label form-labels">Email address</label>
                    <input type="email" className="form-control" id="email" value={formData.email} onChange={handleInputChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label form-labels">Password</label>
                    <input type="password" className="form-control" id="password" value={formData.password} onChange={handleInputChange} />
                  </div>
                  <div className="button">
                    <button type="submit" className="btn" style={{
                      background: "#F47458",
                      color: "white",
                      borderRadius: "23.405px",
                      width: "152px",
                      height: "45px",
                    }}>
                      Submit
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
          <div style={{
            width: "50%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
          }}>
            <div style={{
              width: "70%",
              boxShadow: "0px 19.335px 40.705px 0px rgba(0, 0, 0, 0.05) inset",
              borderRadius: "2%",
              height: "95%",
              marginLeft: "30%",
              paddingTop: "50px",
              paddingBottom: "100px",
              display: "flex",
              flexDirection: "column",
            }}>
              <div className="sign-up-header">
                Welcome to Dresscode
              </div>
              <div style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
              }}>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label form-labels">First Name</label>
                  <input value={formData.firstName} onChange={handleInputChange} type="text" className="form-control form-control-sm" id="firstName" aria-describedby="firstNameHelp" style={{ height: "20px", width: "350px" }} />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label form-labels">Last Name</label>
                  <input value={formData.lastName} onChange={handleInputChange} type="text" className="form-control form-control-sm" id="lastName" aria-describedby="lastNameHelp" style={{ height: "20px", width: "350px" }} />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label form-labels">Email address</label>
                  <input value={formData.email} onChange={handleInputChange} type="email" className="form-control form-control-sm" id="email" aria-describedby="emailHelp" style={{ height: "20px", width: "350px" }} />
                </div>
                <div className="mb-3">
                  <label htmlFor="gender" className="form-label form-labels">Gender</label>
                  <select value={formData.gender} onChange={handleInputChange} className="form-control form-control-sm" id="gender" style={{ height: "20px", width: "350px" }}>
                    <option value="">Select Gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="phoneNumber" className="form-label form-labels">Phone Number</label>
                  <input value={formData.phoneNumber} onChange={handleInputChange} type="tel" className="form-control form-control-sm" id="phoneNumber" aria-describedby="phoneNumberHelp" style={{ height: "20px", width: "350px" }} />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label form-labels">Password</label>
                  <input value={formData.password} onChange={handleInputChange} type="password" className="form-control form-control-sm" id="password" aria-describedby="passwordHelp" style={{ height: "20px", width: "350px" }} />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label form-labels">Confirm Password</label>
                  <input value={formData.confirmPassword} onChange={handleInputChange} type="password" className="form-control form-control-sm" id="confirmPassword" aria-describedby="confirmPasswordHelp" style={{ height: "20px", width: "350px" }} />
                </div>
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
        );
      default:
        return null;
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: "100vh",
      width: "100%",
    }}>
      {renderForms()}
      <div></div>
      <div style={{
        width: "30%",
        background: "#FFEDE1",
        position: "relative",
        height: "100%",
      }}>
        <img src="/images/auth/home-page-men.png" alt="" style={{
          width: "70%",
          height: "75%",
          position: "absolute",
          bottom: "50px",
          right: "50%",
        }} />
      </div>
    </div>
  );
};

export default Auth;
