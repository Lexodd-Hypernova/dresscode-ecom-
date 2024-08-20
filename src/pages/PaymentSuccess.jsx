import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import InvoiceGenerate from "../components/InvoiceGenerate";

const PaymentSuccess = ({ orderID }) => {
  const BaseURL = "https://dresscode-updated.onrender.com";
  const [orderDetails, setOrderDetails] = useState({});

  useEffect(() => {
    getOrderDetails();
  }, []);

  //API to get order details using order id
  const getOrderDetails = async () => {
    let orderID = "9E34C5";
    //on orderId undefined show msg to user
    if (orderID == undefined) {
      console.log("order ID is undefined show proper message to user");
      return;
    }

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.get(
        `${BaseURL}/dashboard/getOrderDetails/${orderID}`,
        config
      );
      setOrderDetails(response?.data?.orderDetails);
    } catch (error) {
      console.error("Error fetching account info:", error);
    }
  };

  return (
    <div className="w-100vw h-100vh d-flex flex-column justify-content-center align-items-center">
      <h1 className="fs-2 mt-5 mb-5 text-center">
        Your Order has been successfully placed
      </h1>
      <div style={{ width: "500px" }}>
        <img src="images/truck.png" className="w-100" alt="" />
      </div>
      <p className="fs-3 mt-5 mb-5 text-center">
        If you want to place more orders,<br></br> visit our homepage
      </p>
      <div style={{ display: "flex", flexDirection: "row", gap: 5 }}>
        <Link
          to="/"
          type="btn"
          className="btn fs-4 text-white"
          style={{ backgroundColor: "#F47458" }}
        >
          Home page
        </Link>
        {Object.keys(orderDetails).length > 0 && (
          <InvoiceGenerate data={orderDetails} />
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
