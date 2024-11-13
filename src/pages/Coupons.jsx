import React, { useState, useEffect } from 'react';
import axiosInstance from '../common/axiosInstance';
import { accountInfoApis } from '../common';
import LoadingComponent from '../common/components/LoadingComponent';

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

    return (
        <>
            {
                loading ? (
                    <LoadingComponent></LoadingComponent >
                ) :
                    (
                        <div className="container">
                            <h2 className="my-4">Coupons</h2>
                            <ul className="nav nav-tabs mb-3">
                                <li className="nav-item">
                                    <button
                                        className={`nav-link ${activeTab === 'pending' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('pending')}
                                    >
                                        Pending
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className={`nav-link ${activeTab === 'expired' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('expired')}
                                    >
                                        Expired
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className={`nav-link ${activeTab === 'used' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('used')}
                                    >
                                        Used
                                    </button>
                                </li>
                            </ul>

                            <div className="row">
                                {filteredCoupons.length > 0 ? (
                                    filteredCoupons.map((coupon) => (
                                        <div className="col-md-4 mb-4" key={coupon.couponCode}>
                                            <div className="card">
                                                <div className="card-body">
                                                    <h5 className="card-title">{coupon.couponCode}</h5>
                                                    <p className="card-text">Discount: {coupon.discountPercentage}%</p>
                                                    <p className="card-text">Expiry Date: {new Date(coupon.expiryDate).toLocaleDateString()}</p>
                                                    {coupon.status === 'used' && (
                                                        <p className="card-text">Used Date: {new Date(coupon.usedDate).toLocaleDateString()}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col">
                                        <p>No coupons available.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )
            }
        </>


    );
};

export default Coupons;
