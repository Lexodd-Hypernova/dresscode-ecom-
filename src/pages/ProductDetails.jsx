import React, { useEffect, useCallback, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import DressCodeApi from "../common";
import ProductSlider from "../components/ProductSlider";
import LogoUploader from "../components/LogoUploader";
import { useCart } from "../context/CartContext";
import { useWhishList } from "../context/WishListContext";
import { shoppingInfoApis } from "../common";

import "./pages-styles/productDetails.style.css";

const normalizeName = (name) => {
  if (typeof name === "string") {
    return name.trim().toLowerCase();
  } else {
    console.warn("Unexpected value for name:", name);
    return "";
  }
};
const ProductDetails = () => {
  const { productId, color, productType, subCategory, category, groupName } = useParams();
  const [loading, setLoading] = useState(true);
  const [priceLoading, setPriceLoading] = useState(true);
  const loadingList = new Array(5).fill(null);
  const [data, setData] = useState({});

  const [availableColors, setAvailableColors] = useState(new Set());
  const [availableSizes, setAvailableSizes] = useState(new Set());

  const [activeColor, setActiveColor] = useState("");
  const [activeSize, setActiveSize] = useState("");
  const [price, setPrice] = useState("");
  const [count, setCount] = useState(1); // Initial value set to 1

  const [cartItem, setCartItem] = useState();

  const [buyItem, setBuyItem] = useState();

  const [quoteItem, setQuoteItem] = useState();

  const [totalPrice, setTotalPrice] = useState();


  const [selectType, setSelectType] = useState();

  // const [isQuantityPresent, setQuantityPresent] = useState(true);

  const [sizeError, setSizeError] = useState(false);
  const [stockError, setStockError] = useState();


  const { token } = useCart();

  const { addToWishList } = useWhishList();


  const [isLoggedIn, setIsLoggedIn] = useState(token);

  const nav = useNavigate();


  const handleAddToWishList = async () => {
    if (activeSize) {
      const item = {
        group: groupName,
        productId: productId,
        color: activeColor,
        size: activeSize,
        logoUrl: null,
        logoPosition: null,
        productDetails: null
      };
      await addToWishList(item);
      setSizeError(false);
    }
    else {
      setSizeError(true)
    }
  };

  const handleAddToCart = (e) => {
    if (activeSize) {
      e.preventDefault();
      setCartItem({
        group: groupName,
        productId: productId,
        color: activeColor,
        size: activeSize,
        price: price,
        quantityRequired: count,
        checked: true,
        isRequiredQuantityPresent: true,
      })
      setSelectType("cartType");
    } else {
      setSizeError(true)
    }

  };

  // const increment = () => {
  //   setCount((prevCount) => {
  //     const newQuantity = prevCount + 1;
  //     updateTotalPrice(newQuantity);
  //     return newQuantity;
  //   });
  // };

  // const decrement = () => {
  //   setCount((prevCount) => {
  //     const newCount = Math.max(1, prevCount - 1);
  //     updateTotalPrice(newCount);
  //     return newCount;
  //   });
  // };





  const handleBlur = () => {
    // Reset count to 1 if input is empty when input loses focus
    if (count === "") {
      setCount(1);
    }
  };

  const reset = () => {
    setCount(0);
    updateTotalPrice(1);
  };


  // Update the total price based on the count
  const updateTotalPrice = (newCount) => {
    setTotalPrice(newCount * price);
  };




  useEffect(() => {
    console.log("productId", productId);
    setLoading(true);
    setPriceLoading(true)
    const fetchData = async () => {
      try {
        const response = await fetch(
          DressCodeApi.getProductDetailsWithSpecificVariant.url +
          `?groupName=${groupName}&productId=${productId}&color=${color}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();

        setData(result);
        setActiveColor(color);
        setPrice(result.productDetails.price);
        setTotalPrice(result.productDetails.price)
        // setActiveSize(result.productDetails.variants[0].variantSizes[0].size)


        console.log("productAllData", result);
      } catch (error) {
        console.error("Error fetching data:", error);

      }
      finally {
        setLoading(false);
        setPriceLoading(false)
      }
    };

    fetchData();
  }, [productId, color, productType, subCategory, category, groupName]);

  useEffect(() => {
    if (data.available && data.productDetails.variants) {
      const availableColorsSet = new Set(
        data.available.map((item) => normalizeName(item.color.name))
      );
      setAvailableColors(availableColorsSet);
      console.log("availableColors Set:", availableColorsSet); // Log the Set of available colors

      const availableSizeSet = new Set(
        data.productDetails.variants.flatMap((item) =>
          item.variantSizes.map((size) => size.size)
        )
      );
      setAvailableSizes(availableSizeSet);
      console.log("availableSizes Set:", availableSizeSet);
    }
  }, [data]);

  const handleFilter = (fType, value) => {
    let filterUrl =
      DressCodeApi.getProductDetailsWithSpecificVariant.url +
      `?groupName=${groupName}&productId=${productId}&${fType}=${value}`;
    axios.get(filterUrl).then((res) => {
      setData(res.data);
      setActiveColor(value);
      setActiveSize("");
      setSizeError(true)

      console.log(
        "after filter variantId",
        res.data.productDetails.variants[0].variantId
      );
    });
  };

  const handleSize = (size) => {
    console.log(size);
    setActiveSize(size);
    setSizeError(false);
    setCount(1);
    updateTotalPrice(1)
  };

  const handleButtonClick = () => {
    const currentPath = window.location.pathname;
    // nav(`/auth?redirect=${currentPath}`);
    nav(`/login?redirect=${currentPath}`);
  };


  const handleBuyNow = (e) => {
    if (activeSize) {
      e.preventDefault();
      setBuyItem({
        group: groupName,
        productId: productId,
        color: activeColor,
        size: activeSize,
        price: price,
        totalPrice: totalPrice,
        quantityRequired: count
      })
      setSelectType("buyNowType")
    }
    else {
      setSizeError(true)
    }

  }

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };


  // const updateAPI = async (quantity) => {
  //   console.log(sizeError)
  //   console.log(activeSize)
  //   if (!sizeError) {
  //     setLoading(true);
  //     console.log("hitting in productDetails counter");
  //     try {
  //       const token = localStorage.getItem("token");
  //       const userId = localStorage.getItem("id");
  //       const config = {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       };

  //       const response = await axios.get(
  //         shoppingInfoApis.checkProductQuantity(userId, groupName, productId, activeColor, activeSize, quantity),
  //         config
  //       );

  //       updateTotalPrice(quantity);
  //       // If the API call is successful, keep the item checked
  //       // onUpdateQuantity(quantity, cartItemId); // Keep this item checked
  //       // setCounterError(); // Clear any previous errors

  //       console.log(response.data);
  //     } catch (error) {
  //       console.error("Error updating item quantity:", error);
  //       setCount(1)
  //       updateTotalPrice(1)

  //       // If there is an error, uncheck only the affected item
  //       // onUpdateQuantity(1, cartItemId); // Uncheck this item
  //       // setCounterError(error.response?.data?.message || "Stock issue detected");
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   else {
  //     setSizeError(true)
  //   }
  // };




  const updateAPI = async (quantity) => {
    console.log("Size Error:", sizeError);
    console.log("Active Size:", activeSize);
    console.log("Active Color:", activeColor);

    if (!sizeError && activeSize && activeColor) {
      // setLoading(true);
      setPriceLoading(true);
      console.log("hitting in productDetails counter");
      try {
        // const token = localStorage.getItem("token");
        // const userId = localStorage.getItem("id");
        // const config = {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // };

        const response = await axios.get(
          shoppingInfoApis.checkProductQuantity(groupName, productId, activeColor, activeSize, quantity),
          // config
        );

        updateTotalPrice(quantity);
        setStockError("")
        console.log(response.data);
      } catch (error) {
        console.error("Error updating item quantity:", error);
        setStockError(error.response?.data?.message || "Stock issue detected");
        updateTotalPrice(quantity);

        // setCount(1);
        // updateTotalPrice(1);

      }
      finally {
        setPriceLoading(false)
      }
    } else {
      setSizeError(true);
      console.warn("Size or color not selected");
    }
  };



  const debouncedUpdateAPI = useCallback(debounce((quantity) => {
    if (activeColor && activeSize) {
      updateAPI(quantity);
    } else {
      console.warn("Active color or size is missing in debounced function");
      setSizeError(true);
    }
  }, 1000), [activeColor, activeSize]);



  // const debouncedUpdateAPI = useCallback(debounce(updateAPI, 1000), []);


  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    debouncedUpdateAPI(newCount);

  };

  const decrement = () => {
    const newCount = Math.max(count - 1, 0);
    setCount(newCount);
    debouncedUpdateAPI(newCount);
  };

  // const handleChange = (e) => {
  //   const value = parseInt(e.target.value, 10);
  //   setCount(value);
  //   debouncedUpdateAPI(value);
  // };

  const handleChange = (e) => {
    const value = e.target.value;

    // Update state even if input is empty
    if (value === "") {
      setCount("");
      setStockError("Please add quantity")
      return;
    }

    // Parse to integer
    const parsedValue = parseInt(value, 10);

    // If the parsed value is a valid number and not less than 1, update the count
    if (!isNaN(parsedValue) && parsedValue >= 1) {
      setCount(parsedValue);
      debouncedUpdateAPI(parsedValue);
      setStockError("")
    }
  };


  const handleRaiseQuote = (e) => {
    if (activeSize) {
      e.preventDefault();
      setQuoteItem({
        group: groupName,
        productId: productId,
        color: activeColor,
        size: activeSize,
        price: price,
        totalPrice: totalPrice,
        quantityRequired: count
      })
      setSelectType("quoteType")
    } else {
      setSizeError(true)
    }
  }


  return (
    <>
      <section className="product__Details">
        <ProductSlider />

        <div className="productContent">
          <h2 className="pr_name">Product Name</h2>
          <div className="pr_rating">
            <button type="button" className="btn btn-success text-white">
              4.5<i className="fa-solid fa-star"></i>
            </button>
            <span className="ms-2">10 Ratings</span>
          </div>

          {
            priceLoading ? (
              <p className="placeholder-glow my-2">
                <span className="placeholder col-4"></span>
              </p>
            ) : (
              <div className="var_price my-2">MRP {Number(totalPrice).toLocaleString("en-US", { style: "currency", currency: "INR" })}</div>
            )
          }


          <div className="var__Color">
            <span className="fs-3 mt-2 fw-normal">Color</span>
            {loading ? (
              <div className="d-flex mt-2 gap-2">
                {loadingList.map((item, index) => (
                  <div
                    key={index}
                    className="placeholder-glow"
                    style={{ width: "48px", height: "48px" }}
                  >
                    <span className="placeholder h-100 w-100 rounded-circle"></span>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {data.allColors && data.allColors.length > 0 && (
                  <div className="mt-2 d-flex flex-wrap list-group-horizontal gap-2 list-group">
                    {data.allColors.map((color, index) => {
                      const normalizedColorName = normalizeName(color.name);
                      const isAvailable =
                        availableColors.has(normalizedColorName);
                      // console.log(`Checking color: "${color.name}" (normalized: "${normalizedColorName}") - Available: ${isAvailable}`);
                      return (
                        <li
                          onClick={() => {
                            handleFilter("color", color.name);
                          }}
                          className={`list-group-item rounded-circle ${isAvailable ? "" : "disabled"
                            } ${activeColor === color.name
                              ? "border-primary shadow-lg border-2"
                              : ""
                            }`}
                          id={`color${color.name}`}
                          // value={color.name}
                          style={{
                            backgroundColor: `${color.hexcode}`,
                            width: "32px",
                            height: "32px",
                            position: "relative",
                          }}
                          key={index}
                        >
                          {!isAvailable && (
                            <span
                              className="cross-mark"
                              style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                color: "#0304064a",
                                fontSize: "24px",
                              }}
                            >
                              <i className="fa-solid fa-xmark"></i>
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </div>
          <div className="var_sizes mt-3 ">
            <span className="fs-3 fw-normal">Sizes & fits</span>
            {loading ? (
              <div className="d-flex mt-3 gap-2">
                {loadingList.map((item, index) => (
                  <div
                    key={index}
                    className="placeholder-glow"
                    style={{ width: "48px", height: "48px" }}
                  >
                    <span className="placeholder h-100 w-100 rounded-circle"></span>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {data.allSizes && data.allSizes.length > 0 && (
                  <div className="sizes mt-3 d-flex gap-2 list-group list-group-horizontal">
                    {data.allSizes.map((size, index) => {
                      const isAvailable = availableSizes.has(size);
                      // console.log(`Checking size: "${size}" - Available: ${isAvailable}`);
                      return (
                        <li
                          className={`size_item list-group-item rounded-circle fs-5 fw-normal ${isAvailable ? "" : "disabled"
                            } ${activeSize === size ? "bg-primary shadow-lg" : ""
                            }`}
                          id={`size${size}`}
                          key={index}
                          style={{ position: "relative" }}
                          onClick={() => handleSize(size)}
                        >
                          {size}
                          {!isAvailable && (
                            <span
                              className="cross-mark"
                              style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                color: "#0304064a",
                                fontSize: "48px",
                              }}
                            >
                              <i className="fa-solid fa-xmark"></i>
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </div>
                )}
              </>
            )}
            <div className="size_error">
              {
                sizeError === true ? (
                  <div className="alert alert-warning alert-dismissible fade show mt-2" role="alert">
                    {/* {sizeError} */}
                    Please select size
                    {/* <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> */}
                  </div>
                ) : (
                  <></>
                )
              }

              {/* {conterError && <span className="text-danger">{conterError}</span>} */}
            </div>
          </div>
          <div className="check_scale">
            <p className="fs-4 fw-normal text-primary mt-2">Check scale size</p>
          </div>
          <div className="qty d-flex align-items-center gap-3">
            <span className="fs-5 fw-normal">Qty</span>
            <div className="update_qty d-flex align-items-center gap-3 px-2 border rounded">
              <button
                className="fs-2 fw-normal"
                style={{ background: "none", border: "none" }}
                onClick={decrement}
                disabled={count <= 1 || count === ""}
              >
                <i className="fa-solid fa-minus"></i>
              </button>
              <input
                type="number"
                value={count}
                onChange={handleChange}
                onBlur={handleBlur}
                min="1"
                className="fs-2 fw-normal"
                style={{
                  background: "none",
                  border: "none",
                  width: "100px",
                  textAlign: "center",
                }}
              />
              {/* <span >100</span> */}
              <button
                className="fs-2 fw-normal"
                style={{ background: "none", border: "none" }}
                onClick={increment}
              >
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
            <button
              onClick={reset}
              style={{ background: "none", border: "none" }}
            >
              <i className="fa-regular fa-trash-can fs-4"></i>
            </button>
            <div className="counter_status">
              {priceLoading && <div className="spinner-border " style={{ color: 'oragne' }} role="status">
                <span className="sr-only"></span>
              </div>}
            </div>
          </div>
          {
            stockError &&
            <div className="alert alert-warning alert-dismissible mt-2 fade show" role="alert">
              {stockError}
              {/* <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> */}
            </div>
          }
          <div className="row row-gap-4 mt-5">
            <div className="d-grid col-6">
              {isLoggedIn ? (
                <button
                  className={`btn btn-outline-secondary fs-5 fw-normal text-capitalize w-100 ${stockError ? "disabled" : ""}`}
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#logoModal"
                  onClick={handleAddToCart}
                >
                  Add to bag
                </button>
              ) : (
                <button
                  className="btn btn-outline-secondary fs-5 fw-normal text-capitalize w-100"
                  type="button"
                  onClick={handleButtonClick}
                >
                  Add to bag
                </button>
              )}
              {/* <button
                onClick={handleAddToCart}
                className="btn btn-outline-secondary fs-5 fw-normal text-capitalize w-100"
                type="button"
              >
                Add to bag
              </button> */}
            </div>
            <div className="d-grid col-6">

              {/* count > 35 */}
              <button
                className={`btn ${count > 35 ? "btn-warning" : "btn-primary"} fs-5 fw-normal text-capitalize w-100 ${count <= 35 && stockError ? "disabled" : ""}`}
                type="button"
                data-bs-toggle={isLoggedIn ? "modal" : ""}
                data-bs-target="#logoModal"
                onClick={isLoggedIn ? (count > 35 ? handleRaiseQuote : handleBuyNow) : handleButtonClick}
              >
                {count > 35 ? "Raise Quote" : "Buy Now"}
              </button>



              {/* ${stockError ? "disabled" : "" */}

              {/* {counterValue > 35 ? (
                <button
                  className={`btn btn-warning fs-5 fw-normal text-capitalize w-100 ${stockError ? "disabled" : ""}`}
                  type="button"
                  onClick={isLoggedIn ? handleRaiseQuote : handleButtonClick}
                >
                  Raise Quote
                </button>
              ) : (
                <button
                  className={`btn btn-primary fs-5 fw-normal text-capitalize w-100 ${stockError ? "disabled" : ""}`}
                  type="button"
                  data-bs-toggle={isLoggedIn ? "modal" : ""}
                  data-bs-target={isLoggedIn ? "#logoModal" : ""}
                  onClick={isLoggedIn ? handleBuyNow : handleButtonClick}
                >
                  Buy Now
                </button>
              )} */}



              {/* {isLoggedIn ? (
                <button
                  className={`btn btn-primary fs-5 fw-normal text-capitalize w-100 ${stockError ? "disabled" : ""}`}
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#logoModal"
                  onClick={handleBuyNow}
                >
                  Buy Now
                </button>
              ) : (
                <button
                  className="btn btn-primary fs-5 fw-normal text-capitalize w-100"
                  type="button"
                  onClick={handleButtonClick}
                >
                  Buy Now
                </button>
              )} */}

            </div>
            <div className="d-grid col-6">


              {isLoggedIn ? (
                <button
                  onClick={handleAddToWishList}
                  className={`btn btn-outline-primary fs-5 fw-normal text-capitalize w-100 ${stockError ? "disabled" : ""}`}
                  type="button"
                >
                  Save to wishlist
                </button>
              ) : (
                <button
                  className="btn btn-outline-primary fs-5 fw-normal text-capitalize w-100"
                  type="button"
                  onClick={handleButtonClick}
                >
                  Save to wishlist
                </button>
              )}


              {/* <button
                onClick={handleAddToWishList}
                className={`btn btn-outline-primary fs-5 fw-normal text-capitalize w-100 ${stockError ? "disabled" : ""}`}
                type="button"
              >
                Save to wishlist
              </button> */}
            </div>
          </div>
          <div className="pr__dt">
            <h3 className="fs-3 fw-normal text-primary mt-4">
              Product Details
            </h3>
            <p className="fs-5 fw-normal mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
          </div>
        </div>
      </section>
      <LogoUploader cartItem={cartItem} buyItem={buyItem} quoteItem={quoteItem} selectType={selectType} isSizeSelected={activeSize}></LogoUploader>

      {/* <!-- Modal --> */}
    </>
  );
};

export default ProductDetails;

