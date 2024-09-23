import React, { useState, useEffect } from "react";
import axios from "axios";
import DressCodeApi from "../common";
import { useUserContext } from "../context/UserContext";
import AddressModal from "../components/addressModal/AddressModal";
import { useLocation, useNavigate } from "react-router-dom";
import { shoppingInfoApis } from "../common";
import { useCart } from "../context/CartContext";
import LoadingComponent from "../common/components/LoadingComponent";
import "./pages-styles/billing.style.css";
import Swal from 'sweetalert2/dist/sweetalert2.js';

import axiosInstance from "../common/axiosInstance";


const Billing = () => {
  const navigate = useNavigate();
  const [deliveryCharges, setDeliveryCharges] = useState(0);
  // const [discountPercentage, setDiscountPercentage] = useState(0);
  const [TotalPriceAfterDiscount, setTotalPriceAfterDiscount] = useState(0);

  const [loading, setLoading] = useState(false);

  const [activeAddressId, setActiveAddressId] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);



  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    pinCode: "",
    city: "",
    state: "",
    country: "",
    markAsDefault: false,
  });
  const handleSubmit = (formData) => {
    addAddress(formData);
    setModalOpen(false);
  };

  const { id, addressData, addAddress } = useUserContext();

  const { fetchCart } = useCart();

  //accessing order total amount received from cart page
  const location = useLocation();
  const { state } = location;

  const { totalCartAmountWithoutDiscount, totalDiscount, cart: orderedItems, product, type } = state || {};
  console.log(orderedItems, "orderedItems");



  console.log(type, "type");

  console.log(product, "product");

  useEffect(() => {
    calculateTotalPrice();
  }, [totalDiscount, totalCartAmountWithoutDiscount, deliveryCharges]);

  const calculateTotalPrice = () => {
    const totalAfterDiscount = totalCartAmountWithoutDiscount - totalDiscount;
    const totalPrice = totalAfterDiscount + deliveryCharges;
    setTotalPriceAfterDiscount(totalPrice);
  };

  const convertToCurrency = (num) => {
    let convertedNumber = num.toLocaleString("en-US", {
      style: "currency",
      currency: "INR",
    });
    return convertedNumber;
  };




  const removeCartItems = async (productIds) => {
    try {
      const raw = {
        cartItemIds: productIds,
      };
  
      const { data: result } = await axiosInstance.delete(
        shoppingInfoApis.removeCartItems(id),
        {
          headers: {
            'Content-Type': 'application/json',
          },
          data: raw, // Pass the body (payload) here for DELETE requests
          withCredentials: true, // Ensure cookies are sent with the request
        }
      );
      
      console.log(result);
      fetchCart(); 
    } catch (error) {
      console.error(error);
    }
  };
  





  // const removeCartItems = (productIds) => {
  //   const myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");
  //   myHeaders.append("Authorization", `Bearer ${token}`);

  //   const raw = JSON.stringify({
  //     cartItemIds: productIds,
  //   });

  //   const requestOptions = {
  //     method: "DELETE",
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: "follow",
  //   };

  //   fetch(shoppingInfoApis.removeCartItems(id), requestOptions)
  //     .then((response) => response.text())
  //     .then((result) => {
  //       console.log(result);
  //       fetchCart();
  //     })
  //     .catch((error) => console.log(error));
  // };

  const handlePayment = async () => {
    setLoading(true)
    try {
      const amountInPaise = TotalPriceAfterDiscount; // Example amount in paise (i.e., 1000 paise = 10 INR)

      // if (amountInPaise < 100) {
      //   alert("Amount should be at least 100 paise.");
      //   return;
      // }

      // Define the headers including the Authorization token
      // const headers = {
      //   "Content-Type": "application/json",
      //   Authorization: `Bearer ${token}`,
      // };

      console.log("Creating payment order with amount:", amountInPaise);

      // Step 1: Create a payment order on your server

      var raw = {}

      if (type === "cart") {
        raw = JSON.stringify({
          products: orderedItems.map((item) => ({
            group: item.group,
            productId: item.productId,
            color: item.color.name,
            size: item.size,
            quantityOrdered: item.quantityRequired,
            imgUrl: item.imgUrl,
            logoUrl: item.logoUrl,
            logoPosition: item.logoPosition,
          })),
        })
      }
      else if (type === "buyNow") {
        raw = JSON.stringify({
          products: product.map((item) => ({
            group: item.group,
            productId: item.productId,
            color: item.color,
            size: item.size,
            quantityOrdered: item.quantityRequired,
            imgUrl: item.imgUrl,
            logoUrl: item.logoUrl,
            logoPosition: item.logoPosition,
          })),
        })
      }

      const { data: orderData } = await axiosInstance.post(shoppingInfoApis.createOrder(id, activeAddressId),
        raw,
        {
          headers: {
            'Content-Type': 'application/json',  // Set the Content-Type to JSON
          },
          withCredentials: true // Ensure cookies are sent with the request
        }
      );


      // const { data: orderData } = await axios.post(
      //   shoppingInfoApis.createOrder(id, activeAddressId),
      //   raw,
      //   { headers }
      // );
      console.log("Order data received:", orderData);


      if (!orderData.success) {
        Swal.fire({
          title: 'Order creation failed!',
          text: 'Something went wrong in order creation',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
        })
        throw new Error("Order creation failed");
      }

      // Step 2: Initialize Razorpay
      const options = {

        key: "rzp_test_0PMwuUiWHNgJdU",


        //  key: "rzp_live_YZAblE0DYussOv",

        currency: "INR",
        name: "Dress Code ",
        description: "Test Transaction",
        order_id: orderData.newOrderDetails.razorpay_checkout_order_id, // This is the order ID created in the previous step
        handler: async (response) => {
          console.log("Payment successful, verifying payment:", response);
          const verifyPayload = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            orderId: orderData.newOrderDetails.orderId,
          };

          try {
            setLoading(true);

            const responseData = await axiosInstance.post(DressCodeApi.verifyPayment.url,
              verifyPayload,
              {
                withCredentials: true // Ensure cookies are sent with the request
              }
            );


            // const responseData = await axios.post(
            //   DressCodeApi.verifyPayment.url,
            //   verifyPayload,
            //   { headers }
            // );

            const verifyData = await responseData.data;

            console.log("Payment verification response:", verifyData);


            if (verifyData.success) {
              Swal.fire({
                title: 'Success!',
                text: 'Order created successfully',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
              })
              if (type === "cart") {
                const productIds = orderedItems.map((item) => item._id);
                console.log("productIds of cart", productIds);

                removeCartItems(productIds);

                navigate("/success");
              } else if (type === "buyNow") {
                navigate("/success");
              }
            } else {
              // alert("Payment verification failed!");
              Swal.fire({
                title: 'Failed!',
                text: 'Payment verification failed!',
                icon: 'error',
                showConfirmButton: false,
                timer: 1500
              })
            }

          } catch (error) {
            console.log("error")
          } finally {
            setLoading(false)
          }

        },
        prefill: {
          name: localStorage.getItem('userName'),
          email: localStorage.getItem('email'),
          contact: localStorage.getItem('phoneNumber'),
        },
        notes: {
          address: "Razorpay address",
        },
        theme: {
          color: "#F37254",
        },
      };

      console.log("Razorpay options:", options);

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        console.error("Payment failed:", response.error);
        // alert("Payment failed. Please try again.");

        Swal.fire({
          title: 'Failed!',
          text: 'Payment failed. Please try again.',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
        })

      });
      rzp.open();
    } catch (error) {
      console.error("Error in payment process:", error);
      // alert("Payment process failed!");
      Swal.fire({
        title: 'Failed!',
        text: 'Payment process failed!',
        icon: 'error',
        showConfirmButton: false,
        timer: 1500
      })
    } finally {
      setLoading(false)
    }
  };

  const handleAddressClick = (addressId) => {
    setActiveAddressId(addressId);
  };

  const showCartItems = (orderedItems) => {
    if (orderedItems) {
      return orderedItems.map((product) => (
        <div
          key={product._id}
          className="d-flex mt-4 align-items-center gap-4"
          style={{
            border: "1px solid #ddd",
            padding: "16px",
            borderRadius: "8px",
          }}
        >
          <div style={{ width: "120px", flexShrink: 0 }}>
            <img
              src={product.imgUrl}
              alt={product.group}
              className="w-100"
            />
          </div>
          <div style={{ flex: "1 1 auto", minWidth: "200px" }}>
            <div className="fs-4 fw-medium">{product.color.name}</div>
            <div className="fs-4 fw-normal">
              {product.productDetails.productType}
            </div>
            <div className="fs-4 fw-normal">
              {`Quantity: ${product.quantityRequired}`}
            </div>
          </div>
        </div>
      ));
    }
  };

  const showBuyNowProduct = (product) => {
    if (product) {
      return product.map((item, index) => {
        return (
          <div
            className="d-flex mt-4 align-items-center gap-4"
            key={index}
            style={{
              border: "1px solid #ddd",
              padding: "16px",
              borderRadius: "8px",
            }}
          >
            <div style={{ width: "120px", flexShrink: 0 }}>
              <img
                src={item.imgUrl}
                alt={item.group}
                className="w-100"
              />
            </div>
            <div style={{ flex: "1 1 auto", minWidth: "200px" }}>
              <div className="fs-4 fw-medium">{item.color}</div>
              <div className="fs-4 fw-normal">{item.productType}</div>
              <div className="fs-4 fw-normal">
                {`Quantity: ${item.quantityRequired}`}
              </div>
            </div>
          </div>
        );
      });
    }
  };

  return (
    <>

      {
        loading ? (
          <LoadingComponent />
        ) : (
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

                  {/* show address data */}

                  {addressData.map((address) => (
                    <div
                      key={address._id}
                      className={`mb-4 d-flex align-items-center gap-5 ${address._id === activeAddressId ? "active" : ""
                        }`}
                      onClick={() => handleAddressClick(address._id)}
                      style={{ cursor: "pointer" }}
                    >
                      <div>
                        <div className="fs-4 fw-medium">{address.firstName} {address.lastName}</div>
                        <div className="fs-4" style={{ color: "#A56528" }}>
                          {address.markAsDefault === false ? "" : "Default"}
                        </div>
                        <div className="fs-4">
                          {address.address},&nbsp; {address.city},&nbsp;
                          {address.pinCode},&nbsp;{address.state}, &nbsp;
                          {address.country}
                        </div>
                        <div className="fs-4">
                          Phone: <span className="fw-medium">{address.phone}</span>
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

                  {/* add address button */}

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

                {/* --------------Order details----------- */}
                <div className="col-lg-6">
                  <div className="order__bill">
                    <div className="px-5 py-4 border border-bottom-0 rounded-top-1">
                      <h5 className="fs-4 fw-medium text-capitalize mb-3">
                        Order details
                      </h5>
                      <p className="fs-5 fw-normal lh-1 d-flex justify-content-between align-items-center">
                        Bag total
                        <span>
                          {Number(totalCartAmountWithoutDiscount).toLocaleString("en-US", {
                            style: "currency",
                            currency: "INR",
                          })}
                        </span>
                      </p>
                      <p className="fs-5 fw-normal lh-1 d-flex justify-content-between align-items-center">
                        {`Bag Discount`}
                        <span>
                          (-)
                          {totalDiscount.toLocaleString("en-US", { style: "currency", currency: "INR" })}
                        </span>
                      </p>
                      <p className="fs-5 fw-normal lh-1 d-flex justify-content-between align-items-center">
                        Delivery Fee
                        <span>(+){convertToCurrency(deliveryCharges)}</span>
                      </p>
                      <p className="fs-5 fw-medium lh-1 d-flex justify-content-between align-items-center">
                        Order total
                        <span>{convertToCurrency(TotalPriceAfterDiscount)}</span>
                      </p>
                    </div>
                    <button
                      type="button"
                      style={{
                        backgroundColor: "#20248A",
                        width: "100%",
                      }}
                      className={`btn  ${activeAddressId === null ? "disabled" : ""
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

                {/* --------------order items------------ */}

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "16px",
                  }}
                >
                  {showBuyNowProduct(product)}

                  {showCartItems(orderedItems)}
                </div>
              </div>
            </div>
            <div className=""></div>
          </section>
        )
      }

      <AddressModal
        FormOnSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      ></AddressModal>
    </>
  );
};

export default Billing;
