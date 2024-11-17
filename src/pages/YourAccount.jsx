import { useState } from "react";
import "./pages-styles/YourAccount.styles.css";
import EditPersonalinfo from "./EditPersonalinfo";
import axios from "axios";
import { accountInfoApis } from "../common";
import { useNavigate } from "react-router-dom";

// import { useAuth } from "../context/AuthContext";

import { logout } from "../common/axiosInstance";


const YourAccount = () => {
  // const [showModal, setShowModal] = useState(false);


  // const { setAuthenticationState } = useAuth();

  const goToUserInfo = () => {
    history(`/get-user-info/${localStorage.getItem("id")}`);
    // setShowModal(true);
    // getUserData()
  }
  const history = useNavigate();
  const goToAddress = () => {
    // console.log('clicked')
    history("/your-address")
  }
  const goToOrders = () => {
    history("/your-orders")
  }

  const goToCoupons = () => {
    history("/coupons")
  }



  const handleLogOut = () => {
    // localStorage.removeItem('accessToken');
    // localStorage.removeItem('id');
    // localStorage.removeItem('userName');
    // localStorage.removeItem('email');
    // localStorage.removeItem('phoneNumber');

    // Clear refreshToken from cookies
    // document.cookie = 'refreshToken=; Max-Age=0; path=/'; // Clears the cookie

    // Call logout function to prevent token refresh
    logout();

    // Refresh the page
    // history('/login')
    // window.location.reload(); // Ensures the app reloads fresh
    // history('/auth')

  }


  return (
    <div className="your-account-screen">
      <div className="container-fluid">
        <span className="your-account">Your Account</span>
        <div className="row" style={{ display: 'flex', alignContent: 'center' }}>
          <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
            <div className="info-card" onClick={goToUserInfo}>
              <div className="acc-icons">
                <img src="/images/accountInfo/boy-icon 1.png" alt="" />
              </div>
              <div>
                <h4>Personal Information</h4>
                <p>Edit your personal information</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 mb-4" onClick={goToOrders}>
            <div className="info-card">
              <div className="acc-icons">
                <img src="/images/accountInfo/Group 483.png" alt="" />
              </div>
              <div>
                <h4>Orders</h4>
                <p>View your order history or track your orders</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 mb-4" onClick={goToAddress} >
            <div className=" info-card" >
              <div className="acc-icons">
                <img src="/images/accountInfo/address-icon 1.png" alt="" />
              </div>
              <div>
                <h4>Your Addresses</h4>
                <p>Edit your previous addresses</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
            <div className="info-card">
              <div className="acc-icons">
                <img src="/images/accountInfo/helpdesk-icon 1.png" alt="" />
              </div>
              <div>
                <h4>Support</h4>
                <p>24/7 customer support</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 mb-4" onClick={goToCoupons}>
            <div className="info-card">
              <div className="acc-icons">
                <img src="/images/accountInfo/gift-voucher.png" alt="" />
              </div>
              <div>
                <h4>Coupons</h4>
                <p>Get your coupons</p>
              </div>
            </div>
          </div>
        </div>
        <div className="log-out">
          <button type="btn" className="btn btn-danger fs-3" onClick={handleLogOut}>Log out</button>
        </div>
        {/* showModal={showModal} setShowModal={setShowModal} */}
        {/* <EditPersonalinfo userData={userData} /> */}

      </div>
    </div>
  );
};

export default YourAccount;
