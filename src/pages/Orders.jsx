import { useEffect, useRef, useState } from "react";
import ReactDOMServer from 'react-dom/server';
import "./pages-styles/Orders.styles.css";
import { accountInfoApis } from "../common";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../common/components/LoadingComponent";
import { shoppingInfoApis } from "../common";
import DressCodeApi from "../common";
import axiosInstance from "../common/axiosInstance";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import axios from "axios";
import { jsPDF } from "jspdf";
import InvoiceForOrder from "../components/Invoice/InvoiceForOrder";
import html2canvas from "html2canvas";

const Orders = () => {
  const [selected, setSelected] = useState("orders");
  const [quotes, setQuotes] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState({}); // store popups by orderId
  const [cancelPopUp, setCancelPopUp] = useState({});
  const fileInputRef = useRef(null);
  const nav = useNavigate()
  const goToReview = (group, productId) => {
    nav(`/group-review/${group}/${productId}`)
  }

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const [data, setData] = useState([]);

  const [canceledOrder, setCanceledOrder] = useState([]);


  const fetchData = async () => {
    setLoading(true)
    try {

      const response = await axiosInstance.get(accountInfoApis.getOrders(localStorage.getItem("id")),
        {
          withCredentials: true // Ensure cookies are sent with the request
        }
      );

      // const data = await response.json();
      console.log(response.data.orders);
      setData(response.data.orders);
      // setRaised(data.orders);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false)
    }
  };



  const fetchQuote = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.get(accountInfoApis.getQuotes(localStorage.getItem("id")),
        {
          withCredentials: true // Ensure cookies are sent with the request
        }
      );

      // console.log("quote data", response.data);
      // setData(data.orders);
      setQuotes(response.data.quotes);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false)
    }
  };


  const fetchCanceled = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.get(shoppingInfoApis.getCanceledOrders(localStorage.getItem("id")),
        {
          withCredentials: true // Ensure cookies are sent with the request
        }
      );

      // console.log("canceled data", response.data.orders);
      // setData(data.orders);
      setCanceledOrder(response.data.orders);
    } catch (error) {
      console.error("Error fetching cancel data:", error);
    } finally {
      setLoading(false)
    }
  };



  useEffect(() => {
    if (data.length === 0) {
      fetchData();

    }
  }, [data]);


  useEffect(() => {
    fetchQuote();
  }, [])


  useEffect(() => {
    fetchCanceled();
  }, [])


  const convertDate = (date) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const formattedDate = new Date(date)
      .toLocaleDateString('en-GB', options)
      .replace(/ /g, '-');
    return formattedDate;
  }

  const downloadFile = (url) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = url.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  const handleTrackPackage = async (awbCode, orderId) => {
    if (!awbCode) {
      // Show popup only for the specific order
      setShowPopup((prev) => ({
        ...prev,
        [orderId]: true,
      }));

      // Hide popup after 3 seconds
      setTimeout(() => {
        setShowPopup((prev) => ({
          ...prev,
          [orderId]: false,
        }));
      }, 1500);
    } else {
      try {
        const token = import.meta.env.VITE_TRACK_TOKEN
        const config = {
          headers: {
            Authorization: `Bearer ${token}`, // Use the provided token
          },
        };

        const response = await axios.get(
          shoppingInfoApis.trackPackage(awbCode),
          config
        );

        const trackUrl = response.data.tracking_data.track_url;

        if (trackUrl) {
          window.location.href = trackUrl;
        } else {
          alert("Tracking URL not available");
        }
      } catch (error) {
        console.error("Error fetching tracking data:", error);
        alert("Failed to track package. Please try again later.");
      }
    }
  };


  const downloadInvoice = async (shiprocket_order_id) => {
    try {
      const token = import.meta.env.VITE_TRACK_TOKEN;
      const response = await axios.post(DressCodeApi.getInvoice.url, {
        ids: [shiprocket_order_id],
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const { is_invoice_created, invoice_url } = response.data;
      if (is_invoice_created) {
        downloadFile(invoice_url); // Trigger the download immediately
      } else {
        alert("Invoice creation failed.");
      }

    } catch (error) {
      console.log(error)
    }
  }



  const cancelOrder = async (orderId) => {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success me-3",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: true,
    });

    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You want to cancel this order!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, don't cancel!",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "Order canceled",
          text: "Your order has been canceled.",
          icon: "success",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1000,
        });
        try {
          const response = await axiosInstance.patch(shoppingInfoApis.cancelOrder(localStorage.getItem("id"), orderId),
            {
              headers: {
                'Content-Type': 'application/json',  // Set the Content-Type to JSON
              },
              withCredentials: true // Ensure cookies are sent with the request
            }
          );
          // console.log(response.data);
          window.location.reload()
        } catch (error) {
          console.error("Error cancelling order:", error);
        }
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Failed",
          text: "Order cancelation failed",
          icon: "error",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
  };




  // Function to generate the PDF Blob
  const generateInvoicePDFBlob = async (orderDetails) => {
    // Step 1: Render the React component to an HTML string
    const invoiceHTMLString = ReactDOMServer.renderToString(
      <InvoiceForOrder data={orderDetails} />
    );

    // Step 2: Create a temporary container for the rendered HTML
    const tempContainer = document.createElement("div");
    tempContainer.innerHTML = invoiceHTMLString;
    document.body.appendChild(tempContainer);

    try {
      // Step 3: Use html2canvas to convert the rendered HTML into a canvas
      const canvas = await html2canvas(tempContainer, {
        scale: 0.8, // Adjust scale for higher quality
        useCORS: true, // Ensure cross-origin content is included
        logging: false, // Disable console logs to reduce overhead
      });

      // Remove the temporary container after rendering
      document.body.removeChild(tempContainer);

      // Step 4: Convert the canvas to an image and add it to a jsPDF document
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = 210; // A4 width in mm
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width; // Maintain aspect ratio
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      // Optional: Compress the PDF further by reducing the resolution of the PDF image
      // pdf.compress();
      // Step 5: Return the PDF as a blob
      return pdf.output("blob");
    } catch (error) {
      // Handle any errors that occur during the PDF generation process
      console.error("Error generating the invoice PDF:", error);
      throw error;
    }
  };

  // Function to handle invoice download
  const handleInvoiceDownload = async (orderDetails) => {
    try {
      // Step 1: Generate the PDF Blob using the invoice data
      const invoiceBlob = await generateInvoicePDFBlob(orderDetails);

      // Step 2: Create a temporary object URL for the PDF Blob
      const blobURL = URL.createObjectURL(invoiceBlob);

      // Step 3: Create a download link and trigger the download
      const downloadLink = document.createElement("a");
      downloadLink.href = blobURL;
      downloadLink.download = `OrderInvoice-${orderDetails.orderId || "Order"}.pdf`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      // Step 4: Revoke the object URL to free memory
      URL.revokeObjectURL(blobURL);
    } catch (error) {
      // Handle any errors that occur during the download process
      console.error("Error generating or downloading the invoice:", error);
    }
  };





  return (
    <div className="orders-container">
      <div className="order_navbar">
        <div
          className={`ord_nav-item ${selected === "orders" ? "selected" : ""}`}
          onClick={() => setSelected("orders")}
        >
          Your Orders
        </div>
        <div
          className={`ord_nav-item ${selected === "quotes" ? "selected" : ""}`}
          onClick={() => setSelected("quotes")}
        >
          Raised Quotes
        </div>
        <div
          className={`ord_nav-item ${selected === "canceled" ? "selected" : ""}`}
          onClick={() => setSelected("canceled")}
        >
          Canceled Orders
        </div>
      </div>
      {/* <h2 className="order_head">Your Orders</h2> */}
      <div className="order_content">


        {
          loading ? (
            <LoadingComponent></LoadingComponent>
          ) :
            (
              <>
                {selected === "orders" ? (
                  data && data.length > 0 ? (
                    data.map((val) => (
                      <div key={val.orderId} className="order_single">
                        <div className="order_Ttl">
                          <div className="ord_plcd">
                            Order placed <br /> {convertDate(val.dateOfOrder)}
                          </div>
                          <div className="ord_id">Order Id #{val.orderId}</div>
                        </div>

                        <div className="order_outer">

                          <div className="pr_track-outer">


                            <div className="pr_track">
                              {/* {val.shiprocket_order_id !== null && (
                                <button className="btn btn-secondary" onClick={() => downloadInvoice(val.shiprocket_order_id)}>
                                  Download Invoice
                                </button>
                              )} */}


                              <button className="btn btn-secondary" onClick={() => handleInvoiceDownload(val)}>
                                Download Invoice
                              </button>

                            </div>

                            <div className="pr_track">
                              <button className="btn btn-primary" onClick={() => handleTrackPackage(val.shiprocket_awb_code, val.orderId)}>
                                Track Package
                              </button>

                              {/* Show popup only for the specific order */}
                              {showPopup[val.orderId] && (
                                <div className="popup">
                                  Shipping is not assigned
                                </div>
                              )}
                            </div>
                            <div className="pr_track">
                              {val.shiprocket_awb_code === null && (
                                <button className="btn btn-danger" onClick={() => cancelOrder(val.orderId)}>
                                  Cancel Order
                                </button>
                              )}
                            </div>
                          </div>



                          {
                            val.products.map((product, index) => {
                              return (
                                <div key={index} className="order_inner">
                                  <div className="order_item">
                                    <div className="ord_desc">
                                      <div className="ord_img">
                                        <img
                                          src={product.imgUrl}
                                          alt=""
                                          className="w-100"
                                        />
                                      </div>

                                      <div className="ord_item-des">
                                        <div className="ord_desc-con">
                                          <p className="prd_name">
                                            {product.color.name} {product.productDetails.neckline}
                                          </p>
                                          <p className="pr_size">Size : {product.size}</p>
                                          <p className="pr_color">Color : {product.color.name}</p>
                                          {
                                            product.logoPosition !== "" && (
                                              <p className="pr_lg-place">Logo Position : {product.logoPosition}</p>
                                            )
                                          }
                                        </div>
                                        <div className="prd-price-det">
                                          <p className="pr_price">Unit Price: &#8377;{product.price}</p>
                                          <p className="pr_color">Quantity : {product.quantityOrdered}</p>
                                          <p className="pr_color">Slab discount percentage : {product.slabDiscountPercentage}%</p>
                                          <p className="pr_color">Slab discount amount : &#8377;{product.slabDiscountAmount}</p>
                                          <p className="pr_color">Price after slab discount : &#8377;{product.priceAfterSlabDiscount}</p>
                                        </div>
                                      </div>

                                    </div>
                                    <div className="pr_action">
                                      <div className="pr_review">
                                        <button className="order-button" onClick={() => goToReview(product.group, product.productId)}>Write A Product Review</button>
                                      </div>
                                      {
                                        product.logoUrl !== null && (
                                          <div className="pr-logo">
                                            Logo :
                                            <div className="pr_lg_det"><img src={product.logoUrl} alt="" className="w-100" /></div>
                                          </div>
                                        )
                                      }

                                    </div>
                                  </div>
                                </div>
                              )
                            })
                          }

                          <div className="ord_bal">
                            <div className="text-success fs-6">
                              <span className="fw-semibold">Coupon discount: &#8377;{val.couponDiscountAmount}</span>
                            </div>
                            <div className="text-success fs-6">
                              <span className="fw-semibold">Total discount: &#8377;{val.TotalDiscountAmount}</span>
                            </div>
                            <div className="text-success fs-6">
                              <span className="fw-semibold">Total Price After Discount: &#8377;{val.TotalPriceAfterDiscount}</span>
                            </div>
                          </div>


                        </div>
                      </div>
                    ))
                  ) : (
                    <h5 className="fs-3 text-center">You do not have any order</h5>
                  )
                ) : selected === "quotes" ? (

                  quotes && quotes.length > 0 ? (
                    quotes.map((val) => (
                      <div key={val.orderId} className="order_single">
                        <div className="order_Ttl">
                          <div className="ord_plcd">
                            Quote placed <br /> {convertDate(val.dateOfQuoteRecived)}
                          </div>
                          <div className="ord_id">Quote Id #{val.quoteId}</div>
                        </div>

                        <div className="order_outer">



                          <div className="order_inner">
                            {/* <h5 className="dt_delivery">
                                Estimated Delivery on{" "}
                                {val.dateOfDelivery ? val.dateOfDelivery : "N/A"}
                              </h5> */}
                            <div className="order_item">
                              <div className="ord_desc">
                                <div className="ord_img">
                                  <img
                                    src={val.imgUrl}
                                    alt=""
                                    className="w-100"
                                  />
                                </div>
                                <div className="ord_item-des">
                                  <p className="prd_name">
                                    {val.color.name} {val.neckline}
                                  </p>
                                  {/* <p className="pr_price">MRP : &#8377;{val.productDetails.price}</p> */}
                                  <p className="pr_size">Size : {val.size}</p>
                                  <p className="pr_color">Color : {val.color.name}</p>
                                  {/* <p className="pr_lg-place">Logo Position : {val.logoPosition}</p> */}
                                  {
                                    val.logoPosition !== "" && (
                                      <p className="pr_lg-place">Logo Position : {val.logoPosition}</p>
                                    )
                                  }
                                </div>
                              </div>
                              <div className="pr_action">
                                {/* <div className="pr_track">
                                    <button className="order-button">Track Package</button>
                                  </div> */}
                                <div className="pr_review">
                                  <button className="order-button" onClick={() => goToReview(val.group, val.productId)}>Write A Product Review</button>
                                </div>
                                {
                                  val.logoUrl !== null && (
                                    <div className="pr-logo">
                                      Logo :
                                      <div className="pr_lg_det"><img src={val.logoUrl} alt="" className="w-100" /></div>
                                    </div>
                                  )
                                }
                                {/* <div className="pr-logo">
                                    Logo :
                                    <div className="pr_lg_det"><img src={val.logoUrl} alt="" className="w-100" /></div>
                                  </div> */}
                              </div>
                            </div>

                          </div>

                        </div>
                      </div>
                    ))
                  ) : (
                    <h5 className="fs-3 text-center">You do not have any quotes</h5>
                  )

                ) : selected === "canceled" ? (
                  canceledOrder && canceledOrder.length > 0 ? (
                    canceledOrder.map((val) => (
                      <div key={val.orderId} className="order_single">
                        <div className="order_Ttl">
                          <div className="ord_plcd">
                            Date of Order<br /> {convertDate(val.dateOfOrder)}
                          </div>
                          <div className="ord_plcd">
                            Date of Cancelled<br /> {convertDate(val.dateOfCanceled)}
                          </div>
                          <div className="ord_id">Order Id #{val.orderId}</div>
                        </div>

                        <div className="order_outer">
                          <div className="pr_track-outer">
                            <h5 className="fs-5">Refund payment status:</h5>
                            <div className="badge bg-primary text-wrap">
                              {val.refund_payment_status}
                            </div>
                          </div>
                          {
                            val.products.map((product, index) => {
                              return (
                                <div key={index} className="order_inner">
                                  <div className="order_item">
                                    <div className="ord_desc">
                                      <div className="ord_img">
                                        <img
                                          src={product.imgUrl}
                                          alt=""
                                          className="w-100"
                                        />
                                      </div>
                                      <div className="ord_item-des">
                                        <p className="prd_name">
                                          {product.color.name} {product.productDetails.neckline}
                                        </p>
                                        <p className="pr_price">MRP : &#8377;{product.price}</p>
                                        <p className="pr_size">Size : {product.size}</p>
                                        <p className="pr_color">Color : {product.color.name}</p>
                                        {
                                          product.logoPosition !== "" && (
                                            <p className="pr_lg-place">Logo Position : {product.logoPosition}</p>
                                          )
                                        }
                                      </div>
                                    </div>
                                  </div>

                                </div>
                              )
                            })
                          }
                        </div>
                      </div>
                    ))
                  ) : (
                    <h5 className="fs-3 text-center">You do not have any cancel order</h5>
                  )
                ) : null

                }
              </>
            )
        }
      </div>
    </div >
  );
};

export default Orders;
