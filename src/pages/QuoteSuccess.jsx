import React from 'react';
import { Link } from 'react-router-dom';

const QuoteSuccess = () => {
    return (
        <div className="w-100vw h-100vh d-flex flex-column justify-content-center align-items-center">
            <h1 className="fs-2 mt-5 mb-5 text-center">
                Your details has been successfully Sent
            </h1>
            <div style={{ width: "500px" }}>
                <img src="images/quote_success.png" className="w-100" alt="" />
            </div>
            <p className="fs-3 mt-5 mb-5 text-center">
                Wait for our team to respond.<br></br>Mean while, visit our homepage
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
            </div>
        </div>
    )
}

export default QuoteSuccess