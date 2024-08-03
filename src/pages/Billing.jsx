import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DressCodeApi from "../common";

import { accountInfoApis } from "../common";

import { useUserContext } from "../context/UserContext";

import AddressModal from "../components/addressModal/AddressModal";
import { useLocation } from "react-router-dom";

const BASE_URL = "https://dresscode-test.onrender.com";

const Billing = () => {
  const [paymentId, setPaymentId] = useState("");
  const [group, setGroup] = useState("ELITE");
  const [productId, setProductId] = useState("6F698F");
  const [color, setColor] = useState("WHITE");
  const [size, setSize] = useState("S");
  const [quantityOrdered, setQuantityOrdered] = useState(1);
  const [price, setPrice] = useState(195);
  const [logoUrl, setLogoUrl] = useState(null);
  const [logoPosition, setLogoPosition] = useState(null);
  const [deliveryCharges, setDeliveryCharges] = useState(20);
  const [discountPercentage, setDiscountPercentage] = useState(10);
  const [TotalPriceAfterDiscount, setTotalPriceAfterDiscount] = useState(0);

  const [activeAddressId, setActiveAddressId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    flatNumber: "",
    locality: "",
    pinCode: "",
    landmark: "",
    districtCity: "",
    state: "",
    addressType: "Home", // Default value
    markAsDefault: false,
  });

  const navigate = useNavigate();

  const { token, id, addressData, addAddress } = useUserContext();

  //accessing order total amount received from cart page
  const location = useLocation();
  const { state } = location;
  const { totalAmount } = state || {};

  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = (formData) => {
    addAddress(formData);
    setModalOpen(false);
  };

  const handlePayment = async () => {
    try {
      const amountInPaise = 108; // Example amount in paise (i.e., 1000 paise = 10 INR)

      if (amountInPaise < 100) {
        alert("Amount should be at least 100 paise.");
        return;
      }

      // Define the headers including the Authorization token
      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      };

      console.log("Creating payment order with amount:", amountInPaise);

      // Step 1: Create a payment order on your server
      const { data: orderData } = await axios.post(
        // `${BASE_URL}/payment/checkout`,
        DressCodeApi.checkout.url,
        { amount: amountInPaise }, // Amount in paise
        { headers }
      );

      console.log("Order data received:", orderData);

      if (!orderData.success) {
        throw new Error("Order creation failed");
      }

      // Step 2: Initialize Razorpay
      const options = {
        key: "rzp_test_xMaFmOwuo05QVV", // Replace with your actual Razorpay key
        amount: orderData.order.amount.toString(),
        currency: "INR",
        name: "Your App Name",
        description: "Test Transaction",
        order_id: orderData.order.id, // This is the order ID created in the previous step
        handler: async (response) => {
          console.log("Payment successful, verifying payment:", response);
          const verifyPayload = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          };

          const requestOptions = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(verifyPayload),
          };

          // const responseData = await fetch(`${BASE_URL}/payment/verifyPayment`, requestOptions);
          const responseData = await fetch(
            DressCodeApi.verifyPayment.url,
            requestOptions
          );

          const verifyData = await responseData.json();

          console.log("Payment verification response:", verifyData);

          if (verifyData.success) {
            // Step 4: Create the order on your server
            const myHeaders = {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            };

            const raw = JSON.stringify({
              paymentId: response.paymentId,
              group: "ELITE",
              productId: "6F698F",
              color: "WHITE",
              size: "S",
              quantityOrdered: 1,
              price: 195,
              logoUrl: null,
              logoPosition: null,
              deliveryCharges: 20,
              discountPercentage: 10,
              TotalPriceAfterDiscount: 108,
            });

            const requestOptions = {
              method: "POST",
              headers: myHeaders,
              body: raw,
            };

            console.log("Creating order with data:", raw);

            const finalResponse = await fetch(
              `${BASE_URL}/order/createOrder/user/${id}/address/${activeAddressId}`,
              requestOptions
            );
            if (!finalResponse.ok) {
              throw new Error("Network response was not ok");
            } else {
              const result = await finalResponse.json();
              console.log("Order creation response:", result);
              alert("Order created successfully!");
              navigate("/success");
            }
          } else {
            alert("Payment verification failed!");
          }
        },
        prefill: {
          name: "John Doe",
          email: "john.doe@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#F37254",
        },
      };

      console.log("Razorpay options:", options);

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        console.error("Payment failed:", response.error);
        alert("Payment failed. Please try again.");
      });
      rzp.open();
    } catch (error) {
      console.error("Error in payment process:", error);
      alert("Payment process failed!");
    }
  };

  const handleAddressClick = (addressId) => {
    setActiveAddressId(addressId);
  };

  useEffect(() => {
    console.log(activeAddressId);
  });
  useEffect(() => {
    calculateTotalPrice();
  }, [totalAmount, discountPercentage, deliveryCharges]);

  const calculateTotalPrice = () => {
    const discountAmount = (discountPercentage * totalAmount) / 100;
    const totalAfterDiscount = totalAmount - discountAmount;
    const totalPrice = totalAfterDiscount + deliveryCharges;
    setTotalPriceAfterDiscount(totalPrice);
  };

  return (
    <>
      <section className="billing mt-5 ms-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6">
              <div>
                <h5 className="fs-3 fw-medium">Delivery Address</h5>
                <p className="fs-4 fw-medium lh-1 mb-3">
                  We will deliver your order to this address
                </p>
              </div>
              {addressData.map((address) => (
                <div
                  key={address._id}
                  className={`mb-4 d-flex align-items-center gap-5 ${
                    address._id === activeAddressId ? "active" : ""
                  }`}
                  onClick={() => handleAddressClick(address._id)}
                  style={{ cursor: "pointer" }}
                >
                  <div style={{ width: "40%" }}>
                    <div className="fs-4 fw-medium">{address.name}</div>
                    <div className="fs-4" style={{ color: "#A56528" }}>
                      {address.markAsDefault === false ? "" : "Default"}
                    </div>
                    <div className="fs-4">
                      {address.flatNumber}, {address.landmark},{" "}
                      {address.locality}, {address.districtCity},{" "}
                      {address.state}, {address.pinCode}
                    </div>
                    <div className="fs-4">
                      Phone: <span className="fw-medium">{address.mobile}</span>
                    </div>
                  </div>
                  <div>
                    <div className="form-check">
                      <input
                        className="form-check-input fs-4"
                        type="radio"
                        name="flexRadioDefault"
                        checked={address._id === activeAddressId}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              ))}

              <div className="mt-5">
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="fs-4 fw-medium text-capitalize border-0 text-primary"
                  style={{ background: "none" }}
                >
                  Add new Address
                </button>
              </div>

              <hr className="w-100 mt-4" />
            </div>
            <div className="col-lg-6">
              <div className="order__bill">
                <div className="px-5 py-4 border border-bottom-0 rounded-top-1">
                  <h5 className="fs-4 fw-medium text-capitalize mb-3">
                    Order details
                  </h5>
                  <p className="fs-5 fw-normal lh-1 d-flex justify-content-between align-items-center">
                    Bag total
                    <span>₹{totalAmount}</span>
                  </p>
                  <p className="fs-5 fw-normal lh-1 d-flex justify-content-between align-items-center">
                    {`Bag Discount ${discountPercentage}%`}
                    <span>(-)₹{(discountPercentage * totalAmount) / 100}</span>
                  </p>
                  <p className="fs-5 fw-normal lh-1 d-flex justify-content-between align-items-center">
                    Delivery Fee
                    <span>(+)₹{deliveryCharges}</span>
                  </p>
                  <p className="fs-5 fw-medium lh-1 d-flex justify-content-between align-items-center">
                    Order total
                    <span>₹{TotalPriceAfterDiscount}</span>
                  </p>
                </div>
                <button
                  type="button"
                  style={{
                    backgroundColor: "#20248A",
                    width: "100%",
                  }}
                  className={`btn  ${
                    activeAddressId === null ? "disabled" : ""
                  } text-white fs-4 rounded-top-0 rounded-bottom-1 fw-medium  mt-0 text-capitalize`}
                  onClick={handlePayment}
                >
                  Proceed to payment
                </button>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <h5 className="fs-3 fw-medium">Expected Delivery</h5>
            <p className="fs-4 fw-medium">
              Estimated delivery dates for your order
            </p>
            <div className="d-flex mt-4 align-items-center gap-4">
              <div style={{ width: "122px" }}>
                <img src="images/s1.png" className="w-100" alt="" />
              </div>
              <div>
                <div className="fs-4 fw-medium">22 May</div>
                <div className="fs-4 fw-normal">Brand</div>
                <div className="fs-4 fw-normal">#1234 slip fit shits</div>
              </div>
            </div>
          </div>
        </div>
        <div className=""></div>
      </section>
      <AddressModal
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      ></AddressModal>
    </>
  );
};

export default Billing;
