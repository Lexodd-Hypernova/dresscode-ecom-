import { useEffect, useRef, useState } from "react";
import "./pages-styles/Orders.styles.css";
import { accountInfoApis } from "../common";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../common/components/LoadingComponent";
import { shoppingInfoApis } from "../common";

const Orders = () => {
  const [selected, setSelected] = useState("orders");
  const [quotes, setQuotes] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState({}); // store popups by orderId
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
  const fetchData = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem("token"); // Replace with your actual token key

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await fetch(
        accountInfoApis.getOrders(localStorage.getItem("id")),
        config
      );

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      else {
        const data = await response.json();
        console.log(data.orders);
        setData(data.orders);
        // setRaised(data.orders);
      }

    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false)
    }
  };



  const fetchQuote = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem("token"); // Replace with your actual token key

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await fetch(
        accountInfoApis.getQuotes(localStorage.getItem("id")),
        config
      );

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      else {
        const data = await response.json();
        console.log("quote data", data);
        // setData(data.orders);
        setQuotes(data.quotes);
      }

    } catch (error) {
      console.error("Error fetching data:", error);
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


  const convertDate = (date) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const formattedDate = new Date(date)
      .toLocaleDateString('en-GB', options)
      .replace(/ /g, '-');
    return formattedDate;
  }

  const handleTrackPackage = async (awbCode, orderId) => {
    if (!awbCode) {
      // Show popup only for the specific order
      setShowPopup(prev => ({
        ...prev,
        [orderId]: true,
      }));

      // Hide popup after 3 seconds
      setTimeout(() => {
        setShowPopup(prev => ({
          ...prev,
          [orderId]: false,
        }));
      }, 1500);
    } else {
      try {
        const response = await axios.get(shoppingInfoApis.trackPackage(awbCode));

        const trackUrl = response.data.tracking_data.track_url;

        if (trackUrl) {
          window.location.href = trackUrl;
        } else {
          alert("Tracking URL not available");
        }
      } catch (error) {
        console.error('Error fetching tracking data:', error);
        alert("Failed to track package. Please try again later.");
      }
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
      </div>
      <h2 className="order_head">Your Orders</h2>
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

                          {
                            val.products.map((product, index) => {
                              return (
                                <div key={index} className="order_inner">
                                  <h5 className="dt_delivery">
                                    Estimated Delivery on{" "}
                                    {val.dateOfDelivery ? val.dateOfDelivery : "N/A"}
                                  </h5>
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
                                    <div className="pr_action">

                                      <div className="pr_track">
                                        <button className="order-button" onClick={() => handleTrackPackage(val.shiprocket_awb_code, val.orderId)}>
                                          Track Package
                                        </button>

                                        {/* Show popup only for the specific order */}
                                        {showPopup[val.orderId] && (
                                          <div className="popup">
                                            Shipping is not assigned
                                          </div>
                                        )}
                                      </div>

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
                        </div>
                      </div>
                    ))
                  ) : (
                    <h5 className="fs-3 text-center">You do not have any order</h5>
                  )
                ) : (

                  // <div className="raise_cmng">
                  //   Quotes functionality coming soon
                  // </div>


                  // raised in comment
                  <>
                    {quotes && quotes.length > 0 ? (
                      quotes.map((val) => (
                        <div key={val.orderId} className="order_single">
                          <div className="order_Ttl">
                            <div className="ord_plcd">
                              Order placed <br /> {convertDate(val.dateOfQuoteRecived)}
                            </div>
                            <div className="ord_id">Quote Id #{val.quoteId}</div>
                          </div>

                          <div className="order_outer">



                            <div className="order_inner">
                              <h5 className="dt_delivery">
                                Estimated Delivery on{" "}
                                {/* {val.dateOfDelivery ? val.dateOfDelivery : "N/A"} */}
                              </h5>
                              <div className="order_item">
                                <div className="ord_desc">
                                  <div className="ord_img">
                                    <img
                                      src={
                                        "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg"
                                      }
                                      alt=""
                                      className="w-100"
                                    />
                                  </div>
                                  <div className="ord_item-des">
                                    <p className="prd_name">
                                      {val.color.name} {val.neckline}
                                    </p>
                                    <p className="pr_price">MRP : &#8377;{val.price}</p>
                                    <p className="pr_size">Size : {val.size}</p>
                                    <p className="pr_color">Color : {val.color.name}</p>
                                    <p className="pr_lg-place">Logo Position : {val.logoPosition}</p>
                                  </div>
                                </div>
                                <div className="pr_action">
                                  <div className="pr_track">
                                    <button className="order-button">Track Package</button>
                                  </div>
                                  <div className="pr_review">
                                    <button className="order-button" onClick={() => goToReview(val.group, val.productId)}>Write A Product Review</button>
                                  </div>
                                  <div className="pr-logo">
                                    Logo :
                                    <div className="pr_lg_det"><img src={val.logoUrl} alt="" className="w-100" /></div>
                                  </div>
                                </div>
                              </div>

                            </div>

                          </div>
                        </div>
                      ))
                    ) : (
                      <h5 className="fs-3 text-center">You do not have any quotes</h5>
                    )}
                  </>
                )}
              </>
            )
        }
      </div>
    </div >
  );
};

export default Orders;
