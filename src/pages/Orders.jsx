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

      const data = await response.json();
      console.log(data);

      if (data.message) {
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

  return (
    <div className="orders-container">
      <div className="navbar">
        <div
          className={`nav-item ${selected === "orders" ? "selected" : ""}`}
          onClick={() => setSelected("orders")}
        >
          Your Orders
        </div>
        <div
          className={`nav-item ${selected === "quotes" ? "selected" : ""}`}
          onClick={() => setSelected("quotes")}
        >
          Raised Quotes
        </div>
      </div>
      <div
        className="content"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p style={{ alignSelf: "start" }}>Your Orders</p>

        {selected === "orders" ? (
          data && data.length > 0 ? (
            data.map((val) => (
              <div
                key={val.orderId}
                style={{
                  border: "1px solid black",
                  width: "80%",
                  height: "400px",
                  marginTop: "80px",
                  background: "#EFF4FD",
                }}
                className="rounded"
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: "20px 15px",
                    fontWeight: "lighter",
                    fontSize: "14px",
                    alignItems: "center",
                    background: "white",
                    overflow: "hidden",
                  }}
                  className="rounded"
                >
                  <div>
                    Order placed <br /> {val.dateOfOrder}
                  </div>
                  <div>Order Id # {val.orderId}</div>
                </div>
                <hr style={{ marginTop: "0px" }} />
                <div>
                  <div>
                    <h5>
                      date of delivery{" "}
                      {val.dateOfDelivery ? val.dateOfDelivery : "N/A"}
                    </h5>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        padding: "20px 15px",
                        fontWeight: "lighter",
                        fontSize: "14px",
                        alignItems: "center",
                        gap: "20px",
                        justifyContent: "space-between",
                      }}
                    >
                      {/* div1 */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "20px",
                          }}
                        >
                          <div>
                            <img
                              src={
                                "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg"
                              }
                              alt=""
                              style={{ width: 200, height: 200 }}
                            />
                          </div>{" "}
                          <div style={{ marginTop: "20px" }}>
                            <p>
                              {val.color.name} {val.productDetails.neckline}
                            </p>
                            <p>MRP : &#8377; {val.price}</p>
                            <p>Size '{val.size}'</p>
                            <p>Color: {val.color.name}</p>
                          </div>
                        </div>
                      </div>

                      {/* div 2 */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                          alignItems: "center",
                        }}
                      >
                        <button className="order-button">Track Package</button>
                        <button className="order-button" onClick={() => goToReview(val.group, val.productId)}>Write A Product Review</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <LoadingComponent />
          )
        ) : (
          <div>
            {raised && raised.length > 0 ? (
              data.map((val) => (
                <div
                  key={val.orderId}
                  style={{
                    border: "1px solid black",
                    width: "78vw",
                    height: "400px",
                    marginTop: "80px",
                    background: "#EFF4FD",
                  }}
                  className="rounded"
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      padding: "20px 15px",
                      fontWeight: "lighter",
                      fontSize: "14px",
                      alignItems: "center",
                      background: "white",
                      overflow: "hidden",
                    }}
                    className="rounded"
                  >
                    <div>
                      Order placed <br /> {val.dateOfOrder}
                    </div>
                    <div>Order Id # {val.orderId}</div>
                  </div>
                  <hr style={{ marginTop: "0px" }} />
                  <div>
                    <div>
                      <h5>
                        date of delivery{" "}
                        {val.dateOfDelivery ? val.dateOfDelivery : "N/A"}
                      </h5>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          padding: "20px 15px",
                          fontWeight: "lighter",
                          fontSize: "14px",
                          alignItems: "center",
                          gap: "20px",
                          justifyContent: "space-between",
                        }}
                      >
                        {/* div1 */}
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              gap: "20px",
                            }}
                          >
                            <div>
                              <img
                                src={
                                  "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg"
                                }
                                alt=""
                                style={{ width: 200, height: 200 }}
                              />
                            </div>{" "}
                            <div style={{ marginTop: "20px" }}>
                              <p>
                                {val.color.name} {val.productDetails.neckline}
                              </p>
                              <p>MRP : &#8377; {val.price}</p>
                              <p>Size '{val.size}'</p>
                              <p>Color: {val.color.name}</p>
                            </div>
                          </div>
                        </div>

                        {/* div 2 */}
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            alignItems: "center",
                          }}
                        >
                          <span>Logo Position:Font</span>
                          <div>
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <div>
                                <span
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <label
                                    htmlFor="icon-button-file"
                                    style={{ marginRight: "10px" }}
                                  >
                                    Logo
                                  </label>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    ref={fileInputRef}
                                    style={{ display: "none" }}
                                  />
                                  <button
                                    onClick={handleIconClick}
                                    style={{
                                      background: "none",
                                      border: "none",
                                      cursor: "pointer",
                                      marginRight: "10px",
                                    }}
                                  >
                                    <i
                                      className="fas fa-upload"
                                      style={{ fontSize: "24px" }}
                                    ></i>
                                  </button>
                                  {selectedImage && (
                                    <div>
                                      <img
                                        src={selectedImage}
                                        alt="Selected"
                                        style={{
                                          width: "50px",
                                          height: "50px",
                                          objectFit: "cover",
                                        }}
                                      />
                                    </div>
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div><LoadingComponent /></div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
