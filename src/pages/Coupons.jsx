import React, { useState, useEffect } from 'react';
import axiosInstance from '../common/axiosInstance';
import { accountInfoApis } from '../common';
import LoadingComponent from '../common/components/LoadingComponent';
import DressCodeApi from '../common';
import { Link } from 'react-router-dom';

const Coupons = () => {
    const [coupons, setCoupons] = useState([]);
    const [activeTab, setActiveTab] = useState('pending');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCoupons = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get(accountInfoApis.getCoupons(localStorage.getItem("id")), { withCredentials: true });
                setCoupons(response.data.coupons);
            } catch (error) {
                console.log(error);
            }
            finally {
                setLoading(false)
            }
        };
        fetchCoupons();
    }, []);

    const filteredCoupons = coupons.filter(coupon => {
        if (activeTab === 'pending') return coupon.status === 'pending';
        if (activeTab === 'expired') return coupon.status === 'expired';
        if (activeTab === 'used') return coupon.status === 'used';
        return false;
    });

    const getCoupon = async () => {
        try {
            // Retrieve values from localStorage
            let uid = localStorage.getItem("uid");
            const userId = localStorage.getItem("id");
            const name = localStorage.getItem("userName");
            const email = localStorage.getItem("email");
            const gLogin = localStorage.getItem("gLogin") === 'true';

            // Check if uid is null or empty; if so, use userId instead
            if (!uid || uid === 'null') {
                uid = userId;
            }

            // Make the API call to get the token
            const tokenRes = await axiosInstance.post(DressCodeApi.generateThirdToken.url, {
                uid,
                name,
                email,
                gLogin
            });

            // Check if token is received
            const token = tokenRes.data.token; // Adjust according to your actual response structure
            if (token) {
                // Show success message
                // console.log("Token generated successfully!");

                // Smoothly redirect to the URL with token
                const redirectUrl = `https://offers.dress-code.in/64589430-a974-438a-b09d-8ab6ea344ca3/auth/login-third?token=${token}`;
                setTimeout(() => {
                    window.location.href = redirectUrl;
                }, 100); // Add a short delay for smoothness if needed
            } else {
                throw new Error("Failed to generate token");
            }
        } catch (error) {
            // Show error message
            console.error("Error generating third token:", error);
            alert("An error occurred while generating the coupon.");
        }
    };




    return (
        <>
            {
                loading ? (
                    <LoadingComponent></LoadingComponent >
                ) :
                    (
                        <div className="container">
                            <h2 className="my-4 text-center">Coupons</h2>

                            {/* Tabs */}
                            <ul className="nav nav-tabs mb-4 justify-content-center">
                                <li className="nav-item">
                                    <button
                                        className={`nav-link ${activeTab === 'pending' ? 'active bg-primary text-white' : ''}`}
                                        onClick={() => setActiveTab('pending')}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        Pending
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className={`nav-link ${activeTab === 'expired' ? 'active bg-danger text-white' : ''}`}
                                        onClick={() => setActiveTab('expired')}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        Expired
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className={`nav-link ${activeTab === 'used' ? 'active bg-success text-white' : ''}`}
                                        onClick={() => setActiveTab('used')}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        Used
                                    </button>
                                </li>
                            </ul>

                            {/* Coupon Cards */}
                            <div className="row">
                                {filteredCoupons.length > 0 ? (
                                    filteredCoupons.map((coupon) => (
                                        <div className="col-md-4 mb-4" key={coupon.couponCode}>
                                            <div className="card h-100 shadow-sm border-0">
                                                <div className="card-body text-center">
                                                    <h5 className="card-title text-primary">{coupon.couponCode}</h5>
                                                    <p className="card-text">Discount: <strong>{coupon.discountPercentage}%</strong></p>
                                                    <p className="card-text">Expiry Date: <span className="text-muted">{new Date(coupon.expiryDate).toLocaleDateString()}</span></p>
                                                    {coupon.status === 'used' && (
                                                        <p className="card-text text-success">Used Date: {new Date(coupon.usedDate).toLocaleDateString()}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col">
                                        <p className="text-center text-muted">No coupons available.</p>
                                    </div>
                                )}
                            </div>

                            {/* Bottom Buttons */}
                            <div className="row mt-4 justify-content-center">
                                <div className="col-lg-3 mb-2">
                                    <Link to="/" className="btn btn-primary w-100 py-2 text-white text-decoration-none">Shop</Link>
                                </div>
                                <div className="col-lg-3 mb-2">
                                    <button className="btn btn-secondary w-100 py-2" onClick={getCoupon}>Get Coupon</button>
                                </div>
                            </div>
                        </div>

                    )
            }
        </>


    );
};

export default Coupons;
