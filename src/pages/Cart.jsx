import { useEffect, useState } from "react";
import Counter from "../common/components/Counter";
import { useCart } from "../context/CartContext";
import "./pages-styles/cart.styles.css";
import { useNavigate } from 'react-router-dom';
import { useWhishList } from "../context/WishListContext";
import LoadingComponent from "../common/components/LoadingComponent";

const Cart = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("id");

  const [productTotal, setProductTotal] = useState({});
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [bagTotal, setBagTotal] = useState(0);

  const [totalCartAmountWithoutDiscount, setTotalCartAmountWithoutDiscount] = useState(0);

  const { cart, removeFromCart, setCart, loading, handleCheckboxChange } = useCart();
  const { addToWishList } = useWhishList();

  useEffect(() => {
    if (!loading) {
      const updatedCart = cart.map((item) => ({
        ...item,
        checked: item.checked ?? true, // Keep the existing checked state or set it to true initially
      }));

      setCart(updatedCart);
      calculateBagTotal(updatedCart);
      calculateInitialProductTotals(updatedCart);
      calculateTotalCartAmountWithoutDiscount(updatedCart);
    }
  }, [loading]);

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
      return 5; // 5% discount for 6-10 items
    } else if (quantity >= 11 && quantity <= 20) {
      return 10; // 10% discount for 11-20 items
    } else if (quantity > 20) {
      return 15; // 15% discount for 21+ items
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
    const roundedTotalAfterDiscount = Math.round(totalAfterDiscount);
    const roundedDiscountAmount = Math.round(discountAmount);

    // Update product totals with discount information
    setProductTotal((prevTotals) => ({
      ...prevTotals,
      [item._id]: {
        totalAfterDiscount: roundedTotalAfterDiscount,
        discountAmount: roundedDiscountAmount,
        discountPercentage,
        totalBeforeDiscount
      },
    }));

    return {
      totalAfterDiscount: roundedTotalAfterDiscount,
      discountAmount: roundedDiscountAmount,
      discountPercentage,
      totalBeforeDiscount
    };
  };

  const calculateBagTotal = (updatedCart) => {
    let totalPriceAfterDiscount = 0;
    let totalDiscount = 0;

    updatedCart.forEach((item) => {
      if (item.checked && item.productDetails.price !== undefined) {
        const { totalAfterDiscount, discountAmount } = calculateProductTotal(item);
        totalPriceAfterDiscount += totalAfterDiscount;
        totalDiscount += discountAmount;
      }
    });

    // Round the totals to the nearest whole number
    setBagTotal(Math.round(totalPriceAfterDiscount));
    setTotalDiscount(Math.round(totalDiscount)); // You can store total discount in state
  };

  // Calculate total amount of the cart without discount
  const calculateTotalCartAmountWithoutDiscount = (updatedCart) => {
    const totalAmountWithoutDiscount = updatedCart.reduce((acc, item) => {
      return acc + (item.productDetails.price * item.quantityRequired);
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

      console.log("updatedCart after quantity update:", updatedCart);

      setCart(updatedCart);

      const updatedItem = updatedCart.find((item) => item._id === cartItemId);
      calculateProductTotal(updatedItem);
      calculateBagTotal(updatedCart);
    } catch (error) {
      console.error("Error updating item quantity:", error);
    }
  };

  const handleProceedToShipping = () => {
    const checkedItems = cart.filter((item) => item.checked).map((item) => ({
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
      productDetails: null
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
              <div key={index} className="d-flex justify-content-between p_cart">
                {/* img */}
                <div className="p_outer">
                  <div className="p_img">
                    <img
                      // src="https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg"
                      src={item.imgUrl}
                      alt={item.group}
                      className="w-100"
                    />
                  </div>
                  <div className="p_desc">
                    <div className="p_name">
                      {item.color.name} {item.productDetails.productType}
                    </div>
                    <div className="p_act">
                      <span style={{ cursor: "pointer" }} onClick={() => removeFromCart(item._id)}>Delete</span>{" "}
                      <span style={{ cursor: "pointer" }} onClick={() => handleWishList(item)}>
                        <i className="fa-regular fa-heart"></i> Move to wishlist
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p_size">Size: {item.size}</div>

                {/* middle */}
                <div className="p_counter">
                  <Counter
                    initialCount={item.quantityRequired}
                    cartItemId={item._id}
                    price={item.productDetails.price}
                    onUpdateQuantity={updateItemQuantity}
                  />
                  <div className="p_price">
                    Rs. {productTotal[item._id]?.totalBeforeDiscount}
                    {productTotal[item._id]?.discountAmount > 0 && (
                      <div className="p_discount">
                        Discount: ₹{productTotal[item._id]?.discountAmount}
                      </div>
                    )}
                  </div>
                </div>

                <div className="logo_detail">
                  <div className="p_logo">
                    <div>Logo</div>
                    <div className="logo_f">
                      <img src={item.logoUrl} className="w-100" alt="" />
                    </div>
                  </div>
                  <div className="p_logo-pos">
                    <div>Logo placement</div>
                    <div className="lg_ttl">{item.logoPosition}</div>
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

            <div className="cart_total">
              <div className="cart_discount">
                {`Total Discount: ₹${totalDiscount}`} {/* Total discount state */}
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;