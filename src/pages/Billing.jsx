import React, { useState } from 'react';
import axios from 'axios';

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

    const handlePayment = async () => {
        try {
            const amountInPaise = 1000; // Example amount in paise (i.e., 1000 paise = 10 INR)

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


                    // const myHeaders = new Headers();
                    // myHeaders.append("Content-Type", "application/json");
                    // myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTk5OTAxNDYsImV4cCI6MTc1MTU0Nzc0NiwiYXVkIjoiNjY4NGVmZWI5NzViZmYwMDg4NzFmMDYxOkpvaG4iLCJpc3MiOiJEcmVzc0NvZGVBcHBsaWNhdGlvbiJ9.euKYW-LRW_0NJk7t3nPYnXhvsQrrvQ9j2V5bk7SNWF4");

                    // const raw = JSON.stringify({
                    //     "razorpay_order_id": "order_OXSGWSBtE2dcEn",
                    //     "razorpay_payment_id": "pay_OXSGqrHtGX0YRa",
                    //     "razorpay_signature": "7ce21cdbffffc4a5f6116734c91b29f8fb4a0578446cdbcffbdb2c15d0a4595e"
                    // });

                    // const requestOptions = {
                    //     method: "POST",
                    //     headers: myHeaders,
                    //     body: raw,
                    //     redirect: "follow"
                    // };

                    // fetch("https://dresscode-test.onrender.com/payment/verifyPayment", requestOptions)
                    //     .then((response) => response.text())
                    //     .then((result) => console.log(result))
                    //     .catch((error) => console.error(error));


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


                    // Step 3: Verify the payment on your server
                    // const { data: verifyData } = await axios.post(
                    //     `${BASE_URL}/payment/verifyPayment`,
                    //     {
                    //         paymentId: response.razorpay_payment_id,
                    //         orderId: response.razorpay_order_id,
                    //         signature: response.razorpay_signature,
                    //     },
                    //     {
                    //         headers: {
                    //             'Content-Type': 'application/json',
                    //             'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTk5OTAxNDYsImV4cCI6MTc1MTU0Nzc0NiwiYXVkIjoiNjY4NGVmZWI5NzViZmYwMDg4NzFmMDYxOkpvaG4iLCJpc3MiOiJEcmVzc0NvZGVBcHBsaWNhdGlvbiJ9.euKYW-LRW_0NJk7t3nPYnXhvsQrrvQ9j2V5bk7SNWF4'
                    //         },
                    //     }
                    // );

                    console.log("Payment verification response:", verifyData);

                    if (verifyData.success) {
                        // Step 4: Create the order on your server
                        const myHeaders = {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTk5OTAxNDYsImV4cCI6MTc1MTU0Nzc0NiwiYXVkIjoiNjY4NGVmZWI5NzViZmYwMDg4NzFmMDYxOkpvaG4iLCJpc3MiOiJEcmVzc0NvZGVBcHBsaWNhdGlvbiJ9.euKYW-LRW_0NJk7t3nPYnXhvsQrrvQ9j2V5bk7SNWF4'
                        };

                        const raw = JSON.stringify({
                            paymentId: response.razorpay_payment_id,
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

                        const result = await finalResponse.json();
                        console.log("Order creation response:", result);
                        alert('Order created successfully!');
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


    return (
        <>
            <div className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                    <h5 className="card-title">Order details</h5>
                    {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                    <div className='row'>
                        <div className='col-6'>
                            <p className='card-text'>Bag total</p>
                        </div>
                        <div className='col-6'>
                            <p className='card-text'>₹{price}</p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-6'>
                            <p className='card-text'>Bag Discount</p>
                        </div>
                        <div className='col-6'>
                            <p className='card-text'>₹{discountPercentage}</p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-6'>
                            <p className='card-text'>Delivery Fee</p>
                        </div>
                        <div className='col-6'>
                            <p className='card-text'>₹{deliveryCharges}</p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-6'>
                            <p className='card-text fw-medium'>Order total</p>
                        </div>
                        <div className='col-6'>
                            <p className='card-text fw-medium'>₹{TotalPriceAfterDiscount}</p>
                        </div>
                    </div>
                    <button type="button" className="btn btn-primary mt-3" onClick={handlePayment}>Proceed to payment</button>
                </div>
            </div>
        </>
    )
}

export default Billing