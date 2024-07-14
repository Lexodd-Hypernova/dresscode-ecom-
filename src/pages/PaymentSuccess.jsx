import React from 'react';
import { Link } from 'react-router-dom';

const PaymentSuccess = () => {
    return (
        <div className='w-100vw h-100vh d-flex flex-column justify-content-center align-items-center'>
            <h1 className='fs-2 mt-5 mb-5 text-center'>Your Order has been successfully placed</h1>
            <div style={{ width: "500px" }}>
                <img src="images/truck.png" className='w-100' alt="" />
            </div>
            <p className='fs-3 mt-5 mb-5 text-center'>If you want to place more orders,<br></br> visit our homepage</p>
            <Link to="/" type='btn' className='btn fs-4 text-white' style={{ backgroundColor: "#F47458" }}>Home page</Link>
        </div>
    )
}

export default PaymentSuccess