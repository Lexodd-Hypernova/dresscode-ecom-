import { useEffect, useRef, useState } from "react";
import "./pages-styles/Orders.styles.css";
import { accountInfoApis } from "../common";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../common/components/LoadingComponent";

const Orders = () => {
  const [selected, setSelected] = useState("orders");
  const [raised, setRaised] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
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
        setRaised(data.orders);
      }

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (data.length === 0) {
      fetchData();
    }
  }, [data]);


  const convertDate = (date) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const formattedDate = new Date(date)
      .toLocaleDateString('en-GB', options)
      .replace(/ /g, '-');
    return formattedDate;
  }

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
                                  src={
                                    "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg"
                                  }
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
                                <p className="pr_lg-place">Logo Position : {product.logoPosition}</p>
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
                                <div className="pr_lg_det"><img src={product.logoUrl} alt="" className="w-100" /></div>
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
            <LoadingComponent />
          )
        ) : (

          <div className="raise_cmng">
            Quotes functionality coming soon
          </div>


          // raised in comment
          // <div>
          //   {raised && raised.length > 0 ? (
          //     data.map((val) => (
          //       <div
          //         key={val.orderId}
          //         style={{
          //           border: "1px solid black",
          //           width: "78vw",
          //           height: "400px",
          //           marginTop: "80px",
          //           background: "#EFF4FD",
          //         }}
          //         className="rounded"
          //       >
          //         <div
          //           style={{
          //             display: "flex",
          //             flexDirection: "row",
          //             justifyContent: "space-between",
          //             padding: "20px 15px",
          //             fontWeight: "lighter",
          //             fontSize: "14px",
          //             alignItems: "center",
          //             background: "white",
          //             overflow: "hidden",
          //           }}
          //           className="rounded"
          //         >
          //           <div>
          //             Order placed <br /> {val.dateOfOrder}
          //           </div>
          //           <div>Order Id # {val.orderId}</div>
          //         </div>
          //         <hr style={{ marginTop: "0px" }} />
          //         <div>
          //           <div>
          //             <h5>
          //               date of delivery{" "}
          //               {val.dateOfDelivery ? val.dateOfDelivery : "N/A"}
          //             </h5>
          //             <div
          //               style={{
          //                 display: "flex",
          //                 flexDirection: "row",
          //                 padding: "20px 15px",
          //                 fontWeight: "lighter",
          //                 fontSize: "14px",
          //                 alignItems: "center",
          //                 gap: "20px",
          //                 justifyContent: "space-between",
          //               }}
          //             >
          //               {/* div1 */}
          //               <div
          //                 style={{
          //                   display: "flex",
          //                   flexDirection: "column",
          //                   gap: "10px",
          //                 }}
          //               >
          //                 <div
          //                   style={{
          //                     display: "flex",
          //                     flexDirection: "row",
          //                     gap: "20px",
          //                   }}
          //                 >
          //                   <div>
          //                     <img
          //                       src={
          //                         "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg"
          //                       }
          //                       alt=""
          //                       style={{ width: 200, height: 200 }}
          //                     />
          //                   </div>{" "}
          //                   <div style={{ marginTop: "20px" }}>
          //                     <p>
          //                       {val.color.name} {val.productDetails.neckline}
          //                     </p>
          //                     <p>MRP : &#8377; {val.price}</p>
          //                     <p>Size '{val.size}'</p>
          //                     <p>Color: {val.color.name}</p>
          //                   </div>
          //                 </div>
          //               </div>

          //               {/* div 2 */}
          //               <div
          //                 style={{
          //                   display: "flex",
          //                   flexDirection: "column",
          //                   gap: "10px",
          //                   alignItems: "center",
          //                 }}
          //               >
          //                 <span>Logo Position:Font</span>
          //                 <div>
          //                   <div
          //                     style={{ display: "flex", alignItems: "center" }}
          //                   >
          //                     <div>
          //                       <span
          //                         style={{
          //                           display: "flex",
          //                           alignItems: "center",
          //                         }}
          //                       >
          //                         <label
          //                           htmlFor="icon-button-file"
          //                           style={{ marginRight: "10px" }}
          //                         >
          //                           Logo
          //                         </label>
          //                         <input
          //                           type="file"
          //                           accept="image/*"
          //                           onChange={handleImageChange}
          //                           ref={fileInputRef}
          //                           style={{ display: "none" }}
          //                         />
          //                         <button
          //                           onClick={handleIconClick}
          //                           style={{
          //                             background: "none",
          //                             border: "none",
          //                             cursor: "pointer",
          //                             marginRight: "10px",
          //                           }}
          //                         >
          //                           <i
          //                             className="fas fa-upload"
          //                             style={{ fontSize: "24px" }}
          //                           ></i>
          //                         </button>
          //                         {selectedImage && (
          //                           <div>
          //                             <img
          //                               src={selectedImage}
          //                               alt="Selected"
          //                               style={{
          //                                 width: "50px",
          //                                 height: "50px",
          //                                 objectFit: "cover",
          //                               }}
          //                             />
          //                           </div>
          //                         )}
          //                       </span>
          //                     </div>
          //                   </div>
          //                 </div>
          //               </div>
          //             </div>
          //           </div>
          //         </div>
          //       </div>
          //     ))
          //   ) : (
          //     <div><LoadingComponent /></div>
          //   )}
          // </div>
        )}
      </div>
    </div >
  );
};

export default Orders;
