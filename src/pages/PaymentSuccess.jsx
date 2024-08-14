import React from "react";
import { Link } from "react-router-dom";
import InvoiceDownload from "../components/InvoiceDownload";

const PaymentSuccess = () => {
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
          <InvoiceDownload />
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
