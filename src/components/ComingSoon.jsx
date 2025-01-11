import React from "react";
import { Link } from "react-router-dom";

const ComingSoon = () => {
  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-center">
      <div className="p-4 bg-white rounded shadow">
        <h1 className="display-3 fw-bold text-danger">Coming Soon</h1>
        <p className="text-secondary fs-5 mt-3">
          We're working hard to bring you something amazing. Stay tuned!
        </p>
        <Link to="/" className="btn btn-primary btn-lg mt-4 px-4">
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ComingSoon;
