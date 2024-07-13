import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const BASE_URL = 'https://dresscode-test.onrender.com';

const Billing = () => {

    const [paymentId, setPaymentId] = useState('');
    const [group, setGroup] = useState('ELITE');
    const [productId, setProductId] = useState('6F698F');
    const [color, setColor] = useState('WHITE');
    const [size, setSize] = useState('S');
    const [quantityOrdered, setQuantityOrdered] = useState(1);
    const [price, setPrice] = useState(195);
    const [logoUrl, setLogoUrl] = useState(null);
    const [logoPosition, setLogoPosition] = useState(null);
    const [deliveryCharges, setDeliveryCharges] = useState(20);
    const [discountPercentage, setDiscountPercentage] = useState(10);
    const [TotalPriceAfterDiscount, setTotalPriceAfterDiscount] = useState(108);

    const [address, setAddress] = useState({});

    const navigate = useNavigate();

    const handlePayment = async () => {
        try {
            const amountInPaise = 108; // Example amount in paise (i.e., 1000 paise = 10 INR)

            if (amountInPaise < 100) {
                alert('Amount should be at least 100 paise.');
                return;
            }

            // Define the headers including the Authorization token
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTk5OTAxNDYsImV4cCI6MTc1MTU0Nzc0NiwiYXVkIjoiNjY4NGVmZWI5NzViZmYwMDg4NzFmMDYxOkpvaG4iLCJpc3MiOiJEcmVzc0NvZGVBcHBsaWNhdGlvbiJ9.euKYW-LRW_0NJk7t3nPYnXhvsQrrvQ9j2V5bk7SNWF4'
            };

            console.log("Creating payment order with amount:", amountInPaise);

            // Step 1: Create a payment order on your server
            const { data: orderData } = await axios.post(
                `${BASE_URL}/payment/checkout`,
                { amount: amountInPaise }, // Amount in paise
                { headers }
            );

            console.log("Order data received:", orderData);

            if (!orderData.success) {
                throw new Error('Order creation failed');
            }

            // Step 2: Initialize Razorpay
            const options = {
                key: 'rzp_test_xMaFmOwuo05QVV', // Replace with your actual Razorpay key
                amount: orderData.order.amount.toString(),
                currency: 'INR',
                name: 'Your App Name',
                description: 'Test Transaction',
                order_id: orderData.order.id, // This is the order ID created in the previous step
                handler: async (response) => {
                    console.log("Payment successful, verifying payment:", response);
                    const verifyPayload = {
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_signature: response.razorpay_signature,
                    };

                    const requestOptions = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTk5OTAxNDYsImV4cCI6MTc1MTU0Nzc0NiwiYXVkIjoiNjY4NGVmZWI5NzViZmYwMDg4NzFmMDYxOkpvaG4iLCJpc3MiOiJEcmVzc0NvZGVBcHBsaWNhdGlvbiJ9.euKYW-LRW_0NJk7t3nPYnXhvsQrrvQ9j2V5bk7SNWF4',
                        },
                        body: JSON.stringify(verifyPayload),
                    };

                    const responseData = await fetch(`${BASE_URL}/payment/verifyPayment`, requestOptions);
                    const verifyData = await responseData.json();


                    console.log("Payment verification response:", verifyData);

                    if (verifyData.success) {
                        // Step 4: Create the order on your server
                        const myHeaders = {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTk5OTAxNDYsImV4cCI6MTc1MTU0Nzc0NiwiYXVkIjoiNjY4NGVmZWI5NzViZmYwMDg4NzFmMDYxOkpvaG4iLCJpc3MiOiJEcmVzc0NvZGVBcHBsaWNhdGlvbiJ9.euKYW-LRW_0NJk7t3nPYnXhvsQrrvQ9j2V5bk7SNWF4'
                        };

                        const raw = JSON.stringify({
                            paymentId: response.paymentId,
                            group: 'ELITE',
                            productId: '6F698F',
                            color: 'WHITE',
                            size: 'S',
                            quantityOrdered: 1,
                            price: 195,
                            logoUrl: null,
                            logoPosition: null,
                            deliveryCharges: 20,
                            discountPercentage: 10,
                            TotalPriceAfterDiscount: 108
                        });

                        const requestOptions = {
                            method: 'POST',
                            headers: myHeaders,
                            body: raw,
                        };

                        console.log("Creating order with data:", raw);

                        const finalResponse = await fetch(`${BASE_URL}/order/createOrder/user/6684efeb975bff008871f061/address/668501dec402ab3920e3a232`, requestOptions);
                        if (!finalResponse.ok) {
                            throw new Error('Network response was not ok');
                        }
                        else {
                            const result = await finalResponse.json();
                            console.log("Order creation response:", result);
                            alert('Order created successfully!');
                            navigate("/success");
                        }


                    } else {
                        alert('Payment verification failed!');
                    }
                },
                prefill: {
                    name: 'John Doe',
                    email: 'john.doe@example.com',
                    contact: '9999999999',
                },
                notes: {
                    address: 'Razorpay Corporate Office'
                },
                theme: {
                    color: '#F37254',
                },
            };

            console.log("Razorpay options:", options);

            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', function (response) {
                console.error("Payment failed:", response.error);
                alert('Payment failed. Please try again.');
            });
            rzp.open();
        } catch (error) {
            console.error('Error in payment process:', error);
            alert('Payment process failed!');
        }
    };


    useEffect(() => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTk5OTAxNDYsImV4cCI6MTc1MTU0Nzc0NiwiYXVkIjoiNjY4NGVmZWI5NzViZmYwMDg4NzFmMDYxOkpvaG4iLCJpc3MiOiJEcmVzc0NvZGVBcHBsaWNhdGlvbiJ9.euKYW-LRW_0NJk7t3nPYnXhvsQrrvQ9j2V5bk7SNWF4");

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch("https://dresscode-test.onrender.com/user/6684efeb975bff008871f061/addresses/active", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result.data);
                setAddress(result.data)
            })
            .catch((error) => console.error(error));
    }, [])

    const displayAddress = (data) => {
        if (data) {
            console.log("display", data)
            
            // return data.map((item) => {
            //     return (
            //         <div key={item._id}>
            //             <div className='fs-4 fw-medium'>{item.name}</div>
            //             <div className='fs-4' style={{ color: "#A56528" }}>
            //                 {
            //                     item.markAsDefault ? "Default" : ""
            //                 }
            //             </div>
            //         </div>
            //     )
            // })
        }
    }




    return (
        <section className='billing mt-5 ms-5'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-lg-6'>
                        <div>
                            <h5>Delivery Address</h5>
                            <p>We will deliver your order to this address</p>
                        </div>
                        {
                            displayAddress(address)
                        }
                    </div>
                    <div className='col-lg-6'>
                        <div className="order__bill">
                            <div className="px-5 py-4 border border-bottom-0 rounded-top-1">
                                <h5 className="fs-4 fw-medium text-capitalize mb-3">Order details</h5>
                                <p className='fs-5 fw-normal lh-1 d-flex justify-content-between align-items-center'>
                                    Bag total
                                    <span>₹{price}</span>
                                </p>
                                <p className='fs-5 fw-normal lh-1 d-flex justify-content-between align-items-center'>
                                    Bag Discount
                                    <span>₹{discountPercentage}</span>
                                </p>
                                <p className='fs-5 fw-normal lh-1 d-flex justify-content-between align-items-center'>
                                    Delivery Fee
                                    <span>₹{deliveryCharges}</span>
                                </p>
                                <p className='fs-5 fw-medium lh-1 d-flex justify-content-between align-items-center'>
                                    Order total
                                    <span>₹{TotalPriceAfterDiscount}</span>
                                </p>
                            </div>
                            <button type="button"
                                style={{
                                    backgroundColor: "#20248A",
                                    width: "100%"
                                }}
                                className="btn text-white fs-4 rounded-top-0 rounded-bottom-1 fw-medium  mt-0 text-capitalize" onClick={handlePayment}>Proceed to payment</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className=''>

            </div>

        </section>
    )
}

export default Billing