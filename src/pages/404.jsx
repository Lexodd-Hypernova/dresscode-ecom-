import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <div className=" container d-flex flex-column justify-content-center align-items-center vh-100">
            <h1 className="display-1 text-danger">404</h1>
            <h2 className="mb-4">Page Not Found</h2>
            <p className="lead text-center">
                Oops! The page you are looking for does not exist.
            </p>
            <Link
                to="/"
                className="btn btn-primary mt-3"
                style={{ cursor: "pointer" }}
            >
                Go Back to Home
            </Link>
        </div>
    )
}

export default PageNotFound;