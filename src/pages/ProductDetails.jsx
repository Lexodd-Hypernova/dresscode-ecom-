import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import DressCodeApi from "../common";
import ProductSlider from "../components/ProductSlider";
// import Breadcrumb from '../components/Breadcrumb';
import LogoUploader from "../components/LogoUploader";
import { useCart } from "../context/CartContext";
import { useWhishList } from "../context/WishListContext";

const normalizeName = (name) => {
  if (typeof name === "string") {
    return name.trim().toLowerCase();
  } else {
    console.warn("Unexpected value for name:", name);
    return "";
  }
};
const ProductDetails = () => {
  const { productId, color, productType, subCategory, category, groupName } =
    useParams();
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(5).fill(null);
  const [data, setData] = useState({});

  const [availableColors, setAvailableColors] = useState(new Set());
  const [availableSizes, setAvailableSizes] = useState(new Set());

  const [activeColor, setActiveColor] = useState("");
  const [activeSize, setActiveSize] = useState("");
  const [price, setPrice] = useState("");
  const [count, setCount] = useState(1); // Initial value set to 1

  const { addToCart, token } = useCart();

  const { addToWishList } = useWhishList();

  const [isLoggedIn, setIsLoggedIn] = useState(token);

  const nav = useNavigate();

  const handleAddToWishList = () => {
    const item = {
      group: groupName,
      productId: productId,
      color: activeColor,
      size: activeSize,
      logoUrl: null,
      logoPosition: null,
    };
    addToWishList(item);
  };

  const handleAddToCart = () => {
    // Prepare the data to send to addToCart function
    const itemToAdd = {
      group: groupName,
      productId: productId,
      color: activeColor,
      size: activeSize,
      price: price,
      quantityRequired: count, // Example: default quantity is 1, adjust as needed
      logoUrl: null,
      logoPosition: null,
    };

    // Call addToCart function from context
    addToCart(itemToAdd);
  };

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const decrement = () => {
    setCount((prevCount) => Math.max(1, prevCount - 1));
  };

  const handleChange = (e) => {
    const value = e.target.value;

    // Update state even if input is empty
    if (value === "") {
      setCount("");
      return;
    }

    // Parse to integer
    const parsedValue = parseInt(value, 10);

    // If the parsed value is a valid number and not less than 1, update the count
    if (!isNaN(parsedValue) && parsedValue >= 1) {
      setCount(parsedValue);
    }
  };

  const handleBlur = () => {
    // Reset count to 1 if input is empty when input loses focus
    if (count === "") {
      setCount(1);
    }
  };

  const reset = () => {
    setCount(0);
  };

  useEffect(() => {
    console.log("productId", productId);
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
        // setActiveSize(result.productDetails.variants[0].variantSizes[0].size)
        setLoading(false);

        console.log("productAllData", result);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
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
      console.log(
        "after filter variantId",
        res.data.productDetails.variants[0].variantId
      );
    });
  };

  const handleSize = (size) => {
    console.log(size);
    setActiveSize(size);
  };

  const handleButtonClick = () => {
    const currentPath = window.location.pathname;
    nav(`/auth?redirect=${currentPath}`);
  };

  return (
    <>
      <section className="product__Details">
        <ProductSlider />

        <div className="productContent mt-5">
          {/* <Breadcrumb
                    groupName={groupName} category={category} subCategory={subCategory} productType={productType}
                /> */}
          <h2 className="pr_name mt-5">Product Name</h2>
          <div className="pr_rating">
            <button type="button" className="btn btn-success fs-5">
              4.5
            </button>
            <span className="ms-2 fs-5">10 Ratings</span>
          </div>
          <div className="pr_price fs-3 my-2 fw-normal">MRP ₹ 195.00</div>
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
                  <div className="mt-2 d-flex list-group-horizontal gap-2 list-group">
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
                          className={`list-group-item rounded-circle ${
                            isAvailable ? "" : "disabled"
                          } ${
                            activeColor === color.name
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
                          className={`size_item list-group-item rounded-circle fs-5 fw-normal ${
                            isAvailable ? "" : "disabled"
                          } ${
                            activeSize === size ? "bg-primary shadow-lg" : ""
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
          </div>
          <div className="row row-gap-4 mt-5">
            <div className="d-grid col-6">
              <button
                onClick={handleAddToCart}
                className="btn btn-outline-secondary fs-5 fw-normal text-capitalize w-100"
                type="button"
              >
                Add to bag
              </button>
            </div>
            <div className="d-grid col-6">
              {isLoggedIn ? (
                count < 100 ? (
                  <button
                    className="btn btn-primary fs-5 fw-normal text-capitalize w-100"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#logoModal"
                  >
                    Buy Now
                  </button>
                ) : (
                  <Link
                    to="/getquote"
                    className="btn btn-primary fs-5 fw-normal text-capitalize w-100"
                    type="button"
                  >
                    Get a Quote
                  </Link>
                )
              ) : (
                <button
                  className="btn btn-primary fs-5 fw-normal text-capitalize w-100"
                  type="button"
                  onClick={handleButtonClick}
                >
                  Buy Now
                </button>
              )}

              {/* {
                                count < 100 ? (
                                    <button className="btn btn-primary fs-5 fw-normal text-capitalize w-100" type="button"
                                        data-bs-toggle="modal"
                                        data-bs-target="#logoModal"
                                    >Buy Now</button>
                                ) : (
                                    <Link to="/getquote" className="btn btn-primary fs-5 fw-normal text-capitalize w-100" type="button"
                                    >Get a Quote</Link>
                                )
                            } */}

              {/* <button className="btn btn-primary fs-5 fw-normal text-capitalize w-100" type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#logoModal"
                            >
                                {count < 100 ? 'Buy Now' : 'Get a Quote'}
                            </button> */}
            </div>
            <div className="d-grid col-6">
              <button
                onClick={handleAddToWishList}
                className="btn btn-outline-primary fs-5 fw-normal text-capitalize w-100"
                type="button"
              >
                Save to wishlist
              </button>
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
      <LogoUploader quantity={count}></LogoUploader>

      {/* <!-- Modal --> */}
    </>
  );
};

export default ProductDetails;
