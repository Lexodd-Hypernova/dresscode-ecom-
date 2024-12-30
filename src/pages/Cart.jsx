import { useEffect, useState } from "react";
import Counter from "../common/components/Counter";
import { useCart } from "../context/CartContext";
import "./pages-styles/cart.styles.css";
import { useNavigate } from "react-router-dom";
import { useWhishList } from "../context/WishListContext";
import LoadingComponent from "../common/components/LoadingComponent";

const Cart = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("id");

  const [productTotal, setProductTotal] = useState({});
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [bagTotal, setBagTotal] = useState(0);

  const [totalCartAmountWithoutDiscount, setTotalCartAmountWithoutDiscount] =
    useState(0);

  const { cart, removeFromCart, setCart, loading, handleCheckboxChange } =
    useCart();
  const { addToWishList } = useWhishList();

  // useEffect(() => {
  //   if (!loading) {
  //     const updatedCart = cart.map((item) => ({
  //       ...item,
  //       checked: item.checked ?? true, // Keep the existing checked state or set it to true initially
  //     }));

  //     setCart(updatedCart);

  //     // Only calculate for checked items
  //     calculateBagTotal(updatedCart);
  //     calculateTotalCartAmountWithoutDiscount(updatedCart);
  //     calculateInitialProductTotals(updatedCart);
  //   }
  // }, [loading, cart]);  // Include cart dependency if cart changes dynamically

  useEffect(() => {
    if (!loading) {
      const updatedCart = cart.map((item) => ({
        ...item,
        checked: item.checked ?? true, // Set initial checked state if not already set
      }));

      setCart(updatedCart);
    }
  }, [loading]); // Trigger only on loading change

  useEffect(() => {
    // Calculate totals whenever cart is updated
    calculateBagTotal(cart);
    calculateTotalCartAmountWithoutDiscount(cart);
    calculateInitialProductTotals(cart);
  }, [cart]); // Trigger on cart change only

  // Calculate total amount of each item on loading cart page initially.
  const calculateInitialProductTotals = (updatedCart) => {
    updatedCart.forEach((item) => {
      calculateProductTotal(item);
    });
  };

  const getDiscountPercentage = (quantity) => {
    if (quantity >= 1 && quantity <= 5) {
      return 0; // No discount for 1-5 items
    } else if (quantity >= 6 && quantity <= 10) {
      return 0; // 5% discount for 6-10 items
    } else if (quantity >= 11 && quantity <= 20) {
      return 0; // 10% discount for 11-20 items
    } else if (quantity > 20) {
      return 0; // 15% discount for 21+ items
    }
    return 0;
  };

  const calculateProductTotal = (item) => {
    const quantity = item.quantityRequired;
    const price = item.productDetails.price;

    // Get discount percentage based on quantity
    const discountPercentage = getDiscountPercentage(quantity);

    // Calculate total before discount
    const totalBeforeDiscount = quantity * price;

    // Calculate discount amount
    const discountAmount = (totalBeforeDiscount * discountPercentage) / 100;

    // Calculate total after discount
    const totalAfterDiscount = totalBeforeDiscount - discountAmount;

    // Round the values to the nearest whole number
    const roundedTotalAfterDiscount = totalAfterDiscount;
    const roundedDiscountAmount = discountAmount;

    // Update product totals with discount information
    setProductTotal((prevTotals) => ({
      ...prevTotals,
      [item._id]: {
        totalAfterDiscount: roundedTotalAfterDiscount,
        discountAmount: roundedDiscountAmount,
        discountPercentage,
        totalBeforeDiscount,
      },
    }));

    return {
      totalAfterDiscount: roundedTotalAfterDiscount,
      discountAmount: roundedDiscountAmount,
      discountPercentage,
      totalBeforeDiscount,
    };
  };

  const calculateBagTotal = (updatedCart) => {
    let totalPriceAfterDiscount = 0;
    let totalDiscount = 0;

    updatedCart.forEach((item) => {
      if (item.checked && item.productDetails.price !== undefined) {
        const { totalAfterDiscount, discountAmount } =
          calculateProductTotal(item);
        totalPriceAfterDiscount += totalAfterDiscount;
        totalDiscount += discountAmount;
      }
    });

    // Round the totals to the nearest whole number
    setBagTotal(totalPriceAfterDiscount);
    setTotalDiscount(totalDiscount); // You can store total discount in state
  };

  // Calculate total amount of the cart without discount
  // const calculateTotalCartAmountWithoutDiscount = (updatedCart) => {
  //   const totalAmountWithoutDiscount = updatedCart.reduce((acc, item) => {
  //     return acc + (item.productDetails.price * item.quantityRequired);
  //   }, 0);
  //   setTotalCartAmountWithoutDiscount(totalAmountWithoutDiscount);
  // };

  const calculateTotalCartAmountWithoutDiscount = (updatedCart) => {
    const totalAmountWithoutDiscount = updatedCart.reduce((acc, item) => {
      if (item.checked) {
        return acc + item.productDetails.price * item.quantityRequired;
      }
      return acc;
    }, 0);

    setTotalCartAmountWithoutDiscount(totalAmountWithoutDiscount);
  };

  const updateItemQuantity = async (newQuantity, cartItemId) => {
    try {
      const updatedCart = cart.map((item) => {
        if (item._id === cartItemId) {
          return {
            ...item,
            quantityRequired: newQuantity,
          };
        }
        return item; // Return other items unchanged
      });

      // console.log("updatedCart after quantity update:", updatedCart);

      setCart(updatedCart);

      const updatedItem = updatedCart.find((item) => item._id === cartItemId);
      calculateProductTotal(updatedItem);
      calculateBagTotal(updatedCart);
    } catch (error) {
      console.error("Error updating item quantity:", error);
    }
  };

  const handleProceedToShipping = () => {
    const checkedItems = cart
      .filter((item) => item.checked)
      .map((item) => ({
        ...item,
        discountAmount: productTotal[item._id]?.discountAmount || 0,
        totalAfterDiscount: productTotal[item._id]?.totalAfterDiscount || 0,
        discountPercentage: productTotal[item._id]?.discountPercentage || 0,
      }));

    navigate("/billing", {
      state: {
        cart: checkedItems, // Send only checked items with discount data
        totalAmount: bagTotal,
        totalCartAmountWithoutDiscount,
        totalDiscount: totalDiscount, // Send total discount
        type: "cart",
      },
    });
  };

  const handleGoBack = () => {
    navigate(-1); // Navigates to the previous page
  };

  const handleWishList = async (item) => {
    const itemToAdd = {
      group: item.group,
      productId: item.productId,
      color: item.color.name,
      size: item.size,
      logoUrl: item.logoUrl,
      logoPosition: item.logoPosition,
      productDetails: null,
      imgUrl: item.imgUrl,
    };
    await addToWishList(itemToAdd);
    await removeFromCart(item._id);
  };

  const handleChange = (cartItemId) => {
    handleCheckboxChange(cartItemId);
  };

  return (
    <div className="cart_screen">
      <div className="cart-back" onClick={handleGoBack}>
        <img src="/images/auth/back-arrow.svg" alt="" />
      </div>
      <h2 className="bag_title">My Bag</h2>

      {loading ? (
        <LoadingComponent />
      ) : (
        <div className="container-fluid">
          <div className="row">
            {cart.map((item, index) => (
              <div
                key={index}
                className="d-flex justify-content-between p_cart"
              >
                {/* img */}
                <div className="p_outer">
                  <div className="p_img">
                    <img src={item.imgUrl} alt={item.group} className="w-100" />
                  </div>
                  <div className="p_desc">
                    <div className="p_name">
                      <h5 className="text-truncate">
                        {item.color.name} {item.productDetails.productType}
                      </h5>
                      {/* {item.color.name} {item.productDetails.productType} */}
                    </div>
                    {/* p_act */}
                    <div className=" d-flex justify-content-start align-items-center gap-3">
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="btn btn-sm btn-danger d-flex align-items-center gap-2"
                        style={{ cursor: "pointer" }}
                      >
                        <i className="fa fa-trash"></i> Delete
                      </button>

                      <button
                        onClick={() => handleWishList(item)}
                        className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-2"
                        style={{ cursor: "pointer" }}
                      >
                        <i className="fa-regular fa-heart"></i> Move to Wishlist
                      </button>

                      {/* <span style={{ cursor: "pointer" }} onClick={() => removeFromCart(item._id)}>Delete</span>{" "} */}
                      {/* <span style={{ cursor: "pointer" }} onClick={() => handleWishList(item)}>
                        <i className="fa-regular fa-heart"></i> Move to wishlist
                      </span> */}
                    </div>
                  </div>
                </div>

                {/* <div className="p_size">Size: {item.size}</div> */}
                <div className="p_size mt-2">
                  <span className="badge bg-secondary">{`Size: ${item.size}`}</span>
                </div>

                {/* middle */}
                <div className="p_counter">
                  <Counter
                    initialCount={item.quantityRequired}
                    cartItemId={item._id}
                    price={item.productDetails.price}
                    onUpdateQuantity={updateItemQuantity}
                  />
                  <div className="p_price">
                    {/* <div className="text-muted fs-6">
                      Price per unit ₹{item.productDetails.price}
                    </div> */}

                    <span className="text-muted fs-6">
                      MRP ₹{productTotal[item._id]?.totalBeforeDiscount}
                    </span>

                    {productTotal[item._id]?.discountAmount > 0 && (
                      <div className="p_discount text-success fw-semibold">
                        You save: ₹{productTotal[item._id]?.discountAmount}
                      </div>
                    )}
                    {productTotal[item._id]?.discountAmount > 0 && (
                      <div className="p_discount fs-6 text-primary">
                        Price after discount: ₹
                        {productTotal[item._id]?.totalAfterDiscount}
                      </div>
                    )}
                  </div>
                </div>

                <div className="logo_detail">
                  <div className="p_logo">
                    <div className="fw-bold">Logo</div>
                    <div className="logo_f">
                      {item.logoUrl ? (
                        <img
                          src={item.logoUrl}
                          className="img-fluid rounded-3"
                          alt="Logo"
                          style={{ maxHeight: "100px", objectFit: "contain" }}
                        />
                      ) : (
                        <span className="text-muted">Not Provided</span>
                      )}
                    </div>
                  </div>
                  <div className="p_logo">
                    <div className="fw-bold">Name</div>
                    <div className="lg_ttl">
                      {item.name ? (
                        item.name
                      ) : (
                        <span className="text-muted">Not Provided</span>
                      )}
                    </div>
                  </div>
                  <div className="p_logo-pos">
                    <div className="fw-bold">Logo Placement</div>
                    <div className="lg_ttl">
                      {item.logoPosition ? (
                        item.logoPosition
                      ) : (
                        <span className="text-muted">Not Provided</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p_remark">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id={`flexSwitchCheckDefault-${index}`}
                      checked={item.checked}
                      onChange={() => handleChange(item._id)}
                    />
                  </div>
                </div>
              </div>
            ))}

            <div
              className="cart_total p-4 rounded shadow-sm mt-3"
              style={{
                border: "1px solid #ddd",
                maxWidth: "400px",
                margin: "0 auto",
                backgroundColor: "#fdfdfd",
              }}
            >
              {/* <h5 className="text-primary mb-3">Order Summary</h5> */}

              <div className="cart_discount d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted">Total Discount:</span>
                <span className="fs-5 fw-semibold text-success">{`₹${totalDiscount}`}</span>
              </div>

              <div className="cart_amt d-flex justify-content-between align-items-center mb-4">
                <span className="text-muted">Bag Total (after discount):</span>
                <span className="fs-5 fw-semibold text-dark">{`₹${bagTotal}`}</span>
              </div>

              <button
                type="button"
                onClick={handleProceedToShipping}
                className={`btn btn-primary w-100 ${
                  bagTotal === 0 ? "disabled" : ""
                }`}
                style={{
                  padding: "12px",
                  fontSize: "1rem",
                  fontWeight: "600",
                  borderRadius: "8px",
                  transition: "background-color 0.3s ease",
                }}
                disabled={bagTotal === 0} // Adds native button disable functionality
              >
                PROCEED TO SHIPPING
              </button>
            </div>

            {/* <div className="cart_total">
              <div className="cart_discount">
                {`Total Discount: ₹${totalDiscount}`} 
              </div>
              <div className="cart_amt">
                {`Bag total (after discount): ₹${bagTotal}`}
              </div>
              <button
                type="button"
                onClick={handleProceedToShipping}
                className={`btn ${bagTotal === 0 ? "disabled" : ""}`}
              >
                PROCEED TO SHIPPING
              </button>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
