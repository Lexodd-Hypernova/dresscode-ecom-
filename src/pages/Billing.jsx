import React, { useState, useEffect } from "react";
import axios from "axios";
import DressCodeApi from "../common";
import { useUserContext } from "../context/UserContext";
import AddressModal from "../components/addressModal/AddressModal";
import { useLocation, useNavigate } from "react-router-dom";
import { shoppingInfoApis } from "../common";
import { accountInfoApis } from "../common";
import { useCart } from "../context/CartContext";
import LoadingComponent from "../common/components/LoadingComponent";
import "./pages-styles/billing.style.css";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import axiosInstance from "../common/axiosInstance";


const Billing = () => {
  const navigate = useNavigate();
  const [deliveryCharges, setDeliveryCharges] = useState(0);
  // const [discountPercentage, setDiscountPercentage] = useState(0);
  const [originalTotalPrice, setOriginalTotalPrice] = useState(0);
  const [TotalPriceAfterDiscount, setTotalPriceAfterDiscount] = useState(0);

  const [loading, setLoading] = useState(false);

  const [activeAddressId, setActiveAddressId] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);

  const [couponloading, setcouponLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false); // For showing alert message

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

  const { id, addressData, addAddress, addressloading } = useUserContext();

  const { fetchCart } = useCart();

  //accessing order total amount received from cart page
  const location = useLocation();
  const { state } = location;

  const { totalCartAmountWithoutDiscount, totalDiscount, cart: orderedItems, product, type } = state || {};
  console.log(orderedItems, "orderedItems");



  console.log(type, "type");

  console.log(product, "product");

  useEffect(() => {
    calculateInitialTotalPrice();
  }, [totalDiscount, totalCartAmountWithoutDiscount, deliveryCharges]);

  const calculateInitialTotalPrice = () => {
    const totalAfterDiscount = totalCartAmountWithoutDiscount - totalDiscount;
    const totalPrice = totalAfterDiscount + deliveryCharges;
    setTotalPriceAfterDiscount(totalPrice);
    setOriginalTotalPrice(totalPrice);
  };



  // Fetch coupons based on product or cart items
  useEffect(() => {
    const fetchCoupons = async () => {
      setcouponLoading(true);
      try {
        const couponRequestData = getCouponRequestData();
        if (!couponRequestData) return;

        const response = await axiosInstance.post(accountInfoApis.getActiveCoupons(localStorage.getItem("id")),
          couponRequestData,
          {
            withCredentials: true
          }
        );
        setCoupons(response.data.couponsApplicableToAllProducts);
        // console.log("active coupons", response.data.coupons)
      } catch (error) {
        console.error('Failed to fetch coupons:', error);
      }
      finally {
        setcouponLoading(false);
      }
    };

    fetchCoupons();
  }, [product, orderedItems]);


  // Helper function to prepare data for coupon API based on product or cart items
  const getCouponRequestData = () => {
    if (type === 'buyNow' && product?.length) {
      return product.map(({ group, productId }) => ({
        group: group,
        productId: productId,
      }));
    } else if (type === 'cart' && orderedItems?.length) {
      return orderedItems.map(({ group, productId }) => ({
        group: group,
        productId: productId,
      }));
    }
    return null;
  };



  const handleApplyCoupon = () => {
    if (!selectedCoupon) return;

    // Apply discount based on the original total price
    const discountedTotal = originalTotalPrice - (originalTotalPrice * selectedCoupon.discountPercentage) / 100;
    setTotalPriceAfterDiscount(discountedTotal);
    setAppliedCoupon(selectedCoupon);
    setShowModal(false);
    setShowAlert(true);

    setTimeout(() => setShowAlert(false), 3000);
  };



  const convertToCurrency = (num) => {
    // Ensure `num` is a number before applying `toFixed` and `toLocaleString`
    let roundedNumber = Number(num.toFixed(2)); // Round to 2 decimal places as a number
    let convertedNumber = roundedNumber.toLocaleString("en-US", {
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

      // console.log(result);
      fetchCart();
    } catch (error) {
      console.error(error);
    }
  };


  const handlePayment = async () => {
    setLoading(true)
    try {
      const amountInPaise = TotalPriceAfterDiscount; // Example amount in paise (i.e., 1000 paise = 10 INR)

      // if (amountInPaise < 100) {
      //   alert("Amount should be at least 100 paise.");
      //   return;
      // }


      // console.log("Creating payment order with amount:", amountInPaise);

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
          couponCode: appliedCoupon && appliedCoupon.couponCode ? appliedCoupon.couponCode : null, // Safeguard against null or undefined
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
          couponCode: appliedCoupon && appliedCoupon.couponCode ? appliedCoupon.couponCode : null, // Safeguard against null or undefined
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

      // console.log("Order data received:", orderData);


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

        // key: "rzp_test_0PMwuUiWHNgJdU",


        key: "rzp_live_YZAblE0DYussOv",

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

            const verifyData = await responseData.data;

            // console.log("Payment verification response:", verifyData);


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
                // console.log("productIds of cart", productIds);

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

      // console.log("Razorpay options:", options);

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
          className="d-flex mt-4 align-items-center gap-4 shadow-sm"
          style={{
            border: "1px solid #ddd",
            padding: "16px",
            borderRadius: "8px",
            // maxWidth: "600px",
            // margin: "0 auto",  
          }}
        >
          {/* Product Image */}
          <div style={{ width: "100px", flexShrink: 0, borderRadius: "8px", overflow: "hidden" }}>
            <img
              src={product.imgUrl}
              alt={product.group}
              className="w-100"
            />
          </div>

          {/* Product Details */}
          <div style={{ flex: "1 1 auto", maxWidth: "70%" }}> {/* Removed minWidth */}
            <div className="fs-5 fw-semibold text-primary">{product.color.name}</div>
            <div className="fs-6 text-secondary">{product.productDetails.productType}</div>
            <div className="d-flex align-items-center mt-2">
              <span className="badge bg-info text-dark me-2">Qty</span>
              <span className="fs-6">{product.quantityRequired}</span>
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
            className="d-flex mt-4 align-items-center gap-4 shadow-sm"
            key={index}
            style={{
              border: "1px solid #ddd",
              padding: "16px",
              borderRadius: "12px",
              backgroundColor: "#fdfdfd",
              // maxWidth: "600px", 
              // margin: "0 auto",  
            }}
          >
            {/* Product Image */}
            <div style={{ width: "100px", flexShrink: 0, borderRadius: "8px", overflow: "hidden" }}>
              <img
                src={item.imgUrl}
                alt={item.group}
                className="w-100"
                style={{ borderRadius: "8px" }}
              />
            </div>

            {/* Product Details */}
            <div style={{ flex: "1 1 auto", maxWidth: "70%" }}> {/* Removed minWidth */}
              <div className="fs-5 fw-semibold text-primary">{item.color}</div>
              <div className="fs-6 text-secondary">{item.productType}</div>
              <div className="d-flex align-items-center mt-2">
                <span className="badge bg-info text-dark me-2">Qty</span>
                <span className="fs-6">{item.quantityRequired}</span>
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

                  <div>
                    {addressloading ? (
                      <div className="d-flex justify-content-center my-4">
                        <div className="spinner-border text-primary" role="status">
                          <span className="sr-only">Loading...</span>
                        </div>
                      </div>
                    ) : (
                      <>
                        {addressData.length === 0 ? (
                          <p>You do not have an address. Please add an address to proceed with checkout.</p>
                        ) : (
                          addressData.map((address) => (
                            <div
                              key={address._id}
                              className={`mb-4 d-flex align-items-center gap-5 ${address._id === activeAddressId ? "active" : ""
                                }`}
                              onClick={() => handleAddressClick(address._id)}
                              style={{ cursor: "pointer" }}
                            >
                              <div>
                                <div className="fs-4 fw-medium">
                                  {address.firstName} {address.lastName}
                                </div>
                                <div className="fs-4" style={{ color: "#A56528" }}>
                                  {address.markAsDefault ? "Default" : ""}
                                </div>
                                <div className="fs-4">
                                  {address.address}, {address.city}, {address.pinCode}, {address.state},{" "}
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
                          ))
                        )}
                      </>
                    )}
                  </div>

                  {/* add address button */}

                  <div className="mt-5">
                    <button
                      type="button"
                      onClick={() => setModalOpen(true)}
                      className="fs-4 fw-medium text-capitalize border-0 text-primary"
                      style={{ background: "none" }}
                    >
                      Add new Address  <i className="fa-solid fa-plus"></i>
                    </button>
                  </div>

                  <hr className="w-100 mt-4" />
                </div>

                {/* --------------Order details----------- */}
                {/* <div className="col-lg-6">
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


                      {showAlert && (
                        <div className="alert alert-success mt-3">
                          Coupon "{appliedCoupon.couponCode}" applied for {appliedCoupon.discountPercentage}% off!
                        </div>
                      )}

               


                      <div className="my-3">
                        <div
                          className="d-flex justify-content-between align-items-center border border-primary rounded p-2 text-primary cursor-pointer"
                          onClick={() => setShowModal(true)}
                          style={{ cursor: "pointer" }}
                        >
                          <span>
                            {appliedCoupon ? `Applied Coupon: ${appliedCoupon.couponCode}` : "Apply Coupon"}
                          </span>
                          <i class="fa-solid fa-arrow-right"></i>
                        </div>
                      </div>


                     



                      {showModal && (
                        <div
                          className="modal fade show d-block"
                          tabIndex="-1"
                          role="dialog"
                          aria-labelledby="couponModalLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog modal-md" role="document">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5 className="modal-title" id="couponModalLabel">
                                  Select a Coupon
                                </h5>
                                <button
                                  type="button"
                                  className="btn-close"
                                  onClick={() => setShowModal(false)}
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div className="modal-body">
                                {couponloading ? (
                                  <div className="d-flex justify-content-center my-4">
                                    <div className="spinner-border text-primary" role="status">
                                      <span className="visually-hidden">Loading...</span>
                                    </div>
                                  </div>
                                ) : coupons.length > 0 ? (
                                  coupons.map((coupon, index) => (
                                    <div key={index} className="card my-2">
                                      <div
                                        className={`card-body ${appliedCoupon &&
                                          appliedCoupon.couponCode === coupon.couponCode
                                          ? "border-success"
                                          : ""
                                          }`}
                                      >
                                        <div className="form-check">
                                          <input
                                            className="form-check-input"
                                            type="radio"
                                            name="couponOption"
                                            value={coupon.couponCode}
                                            checked={
                                              selectedCoupon &&
                                              selectedCoupon.couponCode === coupon.couponCode
                                            }
                                            onChange={() => setSelectedCoupon(coupon)}
                                          />
                                          <label className="form-check-label">
                                            <strong>{coupon.couponCode}</strong> -{" "}
                                            {coupon.discountPercentage}% off
                                            <br />
                                            Expires on:{" "}
                                            {new Date(coupon.expiryDate).toLocaleDateString()}
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                  ))
                                ) : (
                                  <p>No coupons available.</p>
                                )}
                              </div>
                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  onClick={() => setShowModal(false)}
                                >
                                  Close
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-primary"
                                  onClick={handleApplyCoupon}
                                  disabled={!selectedCoupon}
                                >
                                  Apply Selected Coupon
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}






                     



                   


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
                </div> */}


                {/* Order Details Section */}
                <div className="col-lg-6">
                  {/* <div className="order__bill rounded shadow-sm">
                    <div className="px-5 py-4 border-bottom rounded-top-3" style={{ backgroundColor: "#f8f9fa" }}>
                      <h5 className="fs-4 fw-semibold text-capitalize mb-3 text-dark">
                        Order Details
                      </h5>

                      <div className="fs-5 d-flex justify-content-between mb-2 text-secondary">
                        <span>Bag Total</span>
                        <span className="text-dark">
                          {Number(totalCartAmountWithoutDiscount).toLocaleString("en-US", {
                            style: "currency",
                            currency: "INR",
                          })}
                        </span>
                      </div>

                      <div className="fs-5 d-flex justify-content-between mb-2 text-secondary">
                        <span>Bag Discount</span>
                        <span className="text-success">
                          (-) {totalDiscount.toLocaleString("en-US", { style: "currency", currency: "INR" })}
                        </span>
                      </div>

                      <div className="fs-5 d-flex justify-content-between mb-3 text-secondary">
                        <span>Delivery Fee</span>
                        <span className="text-dark">
                          (+) {convertToCurrency(deliveryCharges)}
                        </span>
                      </div>

                      {showAlert && (
                        <div className="alert alert-success mb-3">
                          Coupon "{appliedCoupon.couponCode}" applied for {appliedCoupon.discountPercentage}% off!
                        </div>
                      )}

                      <div className="my-3">
                        <div
                          className="d-flex justify-content-between align-items-center border border-primary rounded p-2 text-primary cursor-pointer"
                          onClick={() => setShowModal(true)}
                        >
                          <span>
                            {appliedCoupon ? `Applied Coupon: ${appliedCoupon.couponCode}` : "Apply Coupon"}
                          </span>
                          <i className="fa-solid fa-arrow-right"></i>
                        </div>
                      </div>

                      <div className="fs-5 fw-bold d-flex justify-content-between align-items-center mt-3 text-secondary">
                        <span>Order Total</span>
                        <span className="text-dark">
                          {convertToCurrency(TotalPriceAfterDiscount)}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      className={`btn btn-lg fw-medium text-white w-100 rounded-bottom ${activeAddressId === null ? "disabled" : ""}`}
                      style={{
                        backgroundColor: "#20248A",
                      }}
                      onClick={handlePayment}
                    >
                      Proceed to Payment
                    </button>
                  </div> */}

                  <div className="order__bill border rounded shadow-sm">
                    <div className="px-4 py-4">
                      {/* Section Title */}
                      <h5 className="fs-4 fw-semibold mb-4 text-primary text-uppercase">Order Summary</h5>

                      {/* Bag Total */}
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="fs-6 text-muted">Bag Total</span>
                        <span className="fs-6 fw-bold">{Number(totalCartAmountWithoutDiscount).toLocaleString("en-US", { style: "currency", currency: "INR" })}</span>
                      </div>

                      {/* Bag Discount */}
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="fs-6 text-muted">Bag Discount</span>
                        <span className="fs-6 text-danger">
                          (-){totalDiscount.toLocaleString("en-US", { style: "currency", currency: "INR" })}
                        </span>
                      </div>


                      {/* Divider */}
                      <hr className="my-3" />

                      {/* Delivery Fee */}
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="fs-6 text-muted">Delivery Fee</span>
                        <span className="fs-6">{convertToCurrency(deliveryCharges)}</span>
                      </div>

                      {/* Apply Coupon */}
                      <div className="my-3">
                        <div
                          className="d-flex justify-content-between align-items-center p-2 border rounded cursor-pointer"
                          onClick={() => setShowModal(true)}
                          style={{ color: appliedCoupon ? "#28a745" : "#007bff", borderColor: appliedCoupon ? "#28a745" : "#007bff" }}
                        >
                          <span className="fs-6 fw-semibold">
                            {appliedCoupon ? `Applied Coupon: ${appliedCoupon.couponCode}` : "Apply Coupon"}
                          </span>
                          <i className="fa-solid fa-arrow-right"></i>
                        </div>
                      </div>

                      {/* Divider */}
                      <hr className="my-3" />

                      {/* Order Total */}
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <span className="fs-5 fw-bold text-uppercase">Order Total</span>
                        <span className="fs-5 fw-bold text-primary">{convertToCurrency(TotalPriceAfterDiscount)}</span>
                      </div>
                    </div>

                    {/* Proceed to Payment Button */}
                    <button
                      type="button"
                      className={`btn ${activeAddressId === null ? "disabled" : ""} fs-5 text-white fw-medium py-3 w-100`}
                      style={{ backgroundColor: "#20248A" }}
                      onClick={handlePayment}
                    >
                      Proceed to Payment
                    </button>
                  </div>




                  {/* Coupon Modal */}
                  {showModal && (
                    <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-labelledby="couponModalLabel" aria-hidden="true">
                      <div className="modal-dialog modal-md" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="couponModalLabel">Select a Coupon</h5>
                            <button type="button" className="btn-close" onClick={() => setShowModal(false)} aria-label="Close"></button>
                          </div>
                          <div className="modal-body">
                            {couponloading ? (
                              <div className="d-flex justify-content-center my-4">
                                <div className="spinner-border text-primary" role="status">
                                  <span className="visually-hidden">Loading...</span>
                                </div>
                              </div>
                            ) : coupons.length > 0 ? (
                              coupons.map((coupon, index) => (
                                <div key={index} className="card my-2 border-0">
                                  <div className={`card-body p-3 ${appliedCoupon && appliedCoupon.couponCode === coupon.couponCode ? "border border-success rounded" : ""}`}>
                                    <div className="form-check">
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        name="couponOption"
                                        value={coupon.couponCode}
                                        checked={selectedCoupon && selectedCoupon.couponCode === coupon.couponCode}
                                        onChange={() => setSelectedCoupon(coupon)}
                                      />
                                      <label className="form-check-label ms-2">
                                        <strong>{coupon.couponCode}</strong> - {coupon.discountPercentage}% off
                                        <br />
                                        <small className="text-muted">Expires on: {new Date(coupon.expiryDate).toLocaleDateString()}</small>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <p className="text-center text-muted">No coupons available.</p>
                            )}
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-outline-secondary" onClick={() => setShowModal(false)}>
                              Close
                            </button>
                            <button type="button" className="btn btn-primary" onClick={handleApplyCoupon} disabled={!selectedCoupon}>
                              Apply Selected Coupon
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>





              </div>
              <div className="row mt-5">
                <h5 className="fs-3 fw-medium">Your order</h5>
                {/* <p className="fs-4 fw-medium">
                  Estimated delivery dates for your order
                </p> */}

                {/* --------------order items------------ */}

                <div
                  style={{
                    display: "flex",
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
