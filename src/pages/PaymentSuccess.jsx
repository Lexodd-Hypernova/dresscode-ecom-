import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./pages-styles/success.style.css";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import InvoiceGenerate from "../components/InvoiceGenerate";
// import { shoppingInfoApis } from "../common";

const PaymentSuccess = () => {
  // const location = useLocation();
  // const orderId = location?.state?.orderId;
  // const BaseURL = "https://dresscode-updated.onrender.com";
  // const [orderDetails, setOrderDetails] = useState({});

  // useEffect(() => {
  //   getOrderDetails();
  // }, []);

  //API to get order details using order id
  // const getOrderDetails = async () => {
  //   console.log(orderId);

  //   if (orderId == undefined) {
  //     console.log("order ID is undefined show proper message to user");
  //     return;
  //   }

  //   const token = localStorage.getItem("token");

  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   };

  //   try {
  //     const response = await axios.get(

  //       shoppingInfoApis.getOrderDetails(orderId),
  //       config
  //     );
  //     setOrderDetails(response?.data?.orderDetails);
  //   } catch (error) {
  //     console.error("Error fetching account info:", error);
  //   }
  // };

  return (
    <div className="w-100vw h-100vh d-flex flex-column justify-content-center align-items-center success_screen">
      <h1 className="fs-2 mt-5 mb-5 text-center">
        Your Order has been successfully placed
      </h1>
      <div className="suc_Img">
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
        {/* {Object.keys(orderDetails).length > 0 && (
          <InvoiceGenerate data={orderDetails} />
        )} */}
      </div>
    </div>
  );
};

export default PaymentSuccess;
