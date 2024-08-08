import { useState } from "react";
import "./pages-styles/YourAccount.styles.css";
import EditPersonalinfo from "./EditPersonalinfo";
import axios from "axios";
import { accountInfoApis } from "../common";
import { useNavigate } from "react-router-dom";
const YourAccount = () => {
  // const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState(null); // State to hold user data


  const getUserData = async () => {
    const userId = localStorage.getItem("id");
    const token = localStorage.getItem("token"); // Replace with your actual token key

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    try {
      const response = await axios.get(accountInfoApis.getAccountInfo(userId), config);
      console.log(response.data);
      setUserData(response.data.userDetails
      );
      return response.data;

    } catch (error) {
      console.error('Error fetching account info:', error);
      throw error; // Handle errors or propagate them as needed
    }
  };
  const goToUserInfo = () => {
    // router.navigate(`/get-user-info/${localStorage.getItem("id")}`);
    // setShowModal(true);
    getUserData()

  }
  const history = useNavigate();
  const goToAddress = () => {
    console.log('clicked')
    history("/your-address")
  }
  const goToOrders = () => {
    history("/your-orders")
  }

  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('userName');
    history('/auth')

  }


  return (


    <div className="your-account-screen">
      <div className="container-fluid">
        <span className="your-account">Your Account</span>
        <div className="row" style={{ display: 'flex', alignContent: 'center', justifyContent: 'space-between' }}>
          <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
            <div className=" info-card" onClick={goToUserInfo} data-bs-toggle="modal"
              data-bs-target="#infoModal">
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
        </div>
        <div className="log-out">
          <button type="btn" className="btn btn-danger fs-3" onClick={handleLogOut}>Log out</button>
        </div>
        {/* showModal={showModal} setShowModal={setShowModal} */}
        <EditPersonalinfo userData={userData}// Set user data in state
        />

      </div>
    </div>
  );
};

export default YourAccount;
