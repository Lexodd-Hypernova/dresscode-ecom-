import { useState, useEffect } from 'react';
import Logo from '../assets/logo.svg';
// import axios from 'axios';
import axiosInstance from "../common/axiosInstance";
import { accountInfoApis } from '../common';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { Link } from 'react-router-dom';
import "./pages-styles/editProfile.style.css";

const EditPersonalinfo = () => {

  const [userData, setUserData] = useState(null); // State to hold user data


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    phoneNumber: ''
  });

  useEffect(() => {
    getUserData();
  }, [])

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || '',
        email: userData.email || '',
        gender: userData.gender || '',
        phoneNumber: userData.phoneNumber || ''
      });
    }
  }, [userData]);


  const getUserData = async () => {
    const userId = localStorage.getItem("id");

    try {
      const response = await axiosInstance.get(accountInfoApis.getAccountInfo(userId),
        {
          withCredentials: true // Ensure cookies are sent with the request
        }
      );
      console.log(response.data);
      setUserData(response.data.userDetails);
      return response.data;

    } catch (error) {
      console.error('Error fetching account info:', error);
      throw error; // Handle errors or propagate them as needed
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success me-3",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: true,
    });

    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, save it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "Saved!",
          text: "Your details has been saved.",
          icon: "success",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1000,
        });
        try {
          const response = await axiosInstance.patch(accountInfoApis.updateAccountInfo(localStorage.getItem("id")),
            formData,
            {
              withCredentials: true // Ensure cookies are sent with the request
            },
          );
          console.log(response.data);
        } catch (error) {
          console.error("Error updating account info:", error);
        }
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "",
          icon: "error",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
  };

  return (
    <div className='edit_profile-screen container mt-3'>

      <Link to="/account-info" className=''>
        <img src="/images/auth/back-arrow.svg" alt="" />
      </Link>

      <div className='edit_inner'>
        <div className=''>
          <h5>Edit Profile</h5>
        </div>

        <div className="">
          <form>
            <div className="mb-3 col-lg-6">
              <label htmlFor="Name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 col-lg-6">
              <label className="form-label d-block">Gender</label>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="male"
                  value="MALE"
                  checked={formData.gender === 'MALE'}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="male">Male</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="female"
                  value="FEMALE"
                  checked={formData.gender === 'FEMALE'}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="female">Female</label>
              </div>
            </div>
            <div className="mb-3 col-lg-6">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 col-lg-6">
              <label htmlFor="phoneNumber" className="form-label">Mobile Number</label>
              <input
                type="text"
                className="form-control"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
          </form>

          {/* <hr className="mt-4 mb-4" /> */}

          <div>
            <h4>FAQs</h4>
            <p><strong>What happens when I update my email address (or mobile number)?</strong></p>
            <p>Your login email id (or mobile number) changes, likewise. You'll receive all your account related communication on your updated email address (or mobile number).</p>

            <p><strong>When will my Dresscode account be updated with the new email address (or mobile number)?</strong></p>
            <p>It happens as soon as you confirm the verification code sent to your email (or mobile) and save the changes.</p>

            <p><strong>What happens to my existing Dresscode account when I update my email address (or mobile number)?</strong></p>
            <p>Updating your email address (or mobile number) doesn't invalidate your account. Your account remains fully functional. You'll continue seeing your Order history, saved information and personal details.</p>

            <p><strong>Does my Seller account get affected when I update my email address?</strong></p>
            <p>Dresscode has a 'single sign-on' policy. Any changes will reflect in your Seller account also.</p>
          </div>
          <div className="d-grid" style={{ width: '150px' }}>
            <button type='submit' className='btn btn-primary' onClick={handleSubmit}>Save</button>
          </div>
        </div>
      </div>




    </div>

  );
};

export default EditPersonalinfo;

