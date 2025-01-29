import React, { useState } from 'react';
import "./CouponSection.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import axiosInstance from '../common/axiosInstance';
import DressCodeApi from '../common';


const CouponSection = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("accessToken"));

    const nav = useNavigate();

    const handleButtonClick = () => {
        nav(`/login`);
    };


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
            nav(`/login`);
        }
    };



    return (
        <div className='cpn-section'>
            <div className='cpn-inner'>
                <div className='cpn-text'>
                    <div className='cpn-ttl'>
                        Spin to Win!
                    </div>
                    <div className='cpn-p1'>
                        Spin the wheel for a chance to win exclusive
                        discount coupons on your first Dress-code Order!
                    </div>
                    <div className='cpn-p2'>
                        You only get one spin, so make it count.
                        If you win, Claim your coupon instantly and start shopping!
                    </div>

                    {isLoggedIn ? (
                        <div className='cpn-btn'>
                            <button onClick={getCoupon}>Try your luck!</button>
                        </div>
                    ) : (
                        <div className='cpn-btn'>
                            <button onClick={handleButtonClick}>Try your luck!</button>
                        </div>
                    )}



                </div>
            </div>
        </div>
    )
}

export default CouponSection
