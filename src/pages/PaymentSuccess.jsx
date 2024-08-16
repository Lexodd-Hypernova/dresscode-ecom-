import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import InvoiceDownload from "../components/InvoiceDownload";
import axios from "axios";

const PaymentSuccess = ({ orderID }) => {
  const BaseURL = "https://dresscode-test.onrender.com";
  orderID = "23C1F3";

  // useEffect(() => {
  //   getOrderDetails();
  // }, []);

  //API to get order details using order id
  const getOrderDetails = async () => {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      //add get order by order id path
      const response = await axios.get(``, config);
      console.log(response, "25");
      return response.data;
    } catch (error) {
      console.error("Error fetching account info:", error);
    }
  };

  const orderDetails = {
    invoiceNumber: "123456",
    date: "2024-08-14",
    soldBy: {
      name: "Seller Name",
      address: "123 Seller St",
      city: "Seller City",
      state: "Seller State",
      zip: "12345",
      pan: "AAKL",
      gst: "er3536dbdcjh73",
      orderNumber: orderID,
      orderDate: "20-07-2024",
    },
    billingAddress: {
      name: "Buyer Name",
      address: "456 Buyer Ave",
      city: "Buyer City",
      state: "Buyer State",
      zip: "67890",
    },
    items: [
      {
        description: "Item 1",
        unitPrice: 10.0,
        discount: 1.0,
        quantity: 2,
        netAmt: 18.0,
        totalAmt: 20.0,
      },
      {
        description: "Item 2",
        unitPrice: 20.0,
        discount: 2.0,
        quantity: 1,
        netAmt: 18.0,
        totalAmt: 20.0,
      },
    ],
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
        <div
          className="btn fs-4 text-white"
          style={{ backgroundColor: "#F47458" }}
        >
          <InvoiceDownload data={orderDetails} />
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
