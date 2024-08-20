import axios from "axios";
import { shoppingInfoApis } from "../common";
import { useEffect, useState } from "react";
import Counter from "../common/components/Counter";
import { useCart } from "../context/CartContext";
import "./pages-styles/cart.styles.css";

import { useNavigate } from 'react-router-dom';
import { useWhishList } from "../context/WishListContext";

// import { shoppingInfoApis } from "../common"

// import { shoppingInfoApis } from "../common";

const Cart = () => {
  const navigate = useNavigate();


  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("id")

  const [cartData, setCartData] = useState([]);
  const [cartCount, setCardCount] = useState(0);
  const [productTotal, setProductTotal] = useState({});
  const [bagTotal, setBagTotal] = useState(0);

  const { cart, removeFromCart, setCart, loading } = useCart();

  const { addToWishList } = useWhishList();


  useEffect(() => {
    if (!loading) {
      // Initialize checked property for each item in the cart
      // const updatedCart = cart.map((item) => ({
      //   ...item,
      //   checked: item.checked !== undefined ? item.checked : true, 
      // }));

      // console.log("Cart initialized with checked property:", updatedCart);
      setCart(cart);
      calculateBagTotal(cart);
      calculateInitialProductTotals(cart);

      // setCart(updatedCart);
      // calculateBagTotal(updatedCart);
      // calculateInitialProductTotals(updatedCart);
    }
  }, [loading]);



  // useEffect(() => {
  //   if (!loading) {
  //     // Initialize checked property for each item in the cart
  //     const updatedCart = cart.map((item) => ({
  //       ...item,
  //       checked: item.checked !== undefined ? item.checked : true, // Ensure 'checked' is initialized
  //     }));

  //     console.log("Cart initialized with checked property:", updatedCart);

  //     setCart(updatedCart);
  //     calculateBagTotal(updatedCart);
  //     calculateInitialProductTotals(updatedCart);
  //   }
  // }, [loading]);


  //calculate total amount of each item on loading cart page initially.
  const calculateInitialProductTotals = (updatedCart) => {
    updatedCart.forEach((item) => {
      calculateProductTotal(item);
    });
  };

  //total calculation for each item on change in quantity
  const calculateProductTotal = (item) => {
    const total = item.quantityRequired * item.productDetails.price;
    setProductTotal((prevTotals) => ({
      ...prevTotals,
      [item._id]: total,
    }));
  };

  //total calculation of all item i.e. bag total
  const calculateBagTotal = (updatedCart) => {
    let total = 0;
    updatedCart.forEach((item) => {
      if (item.checked && item.productDetails.price !== undefined) {
        total += item.quantityRequired * item.productDetails.price;
      }
    });
    setBagTotal(
      total.toFixed(2)
    );
  };

  const updateItemQuantity = async (newQuantity, cartItemId, isChecked) => {
    try {
      const updatedCart = cart.map((item) => {
        if (item._id === cartItemId) {
          return {
            ...item,
            quantityRequired: newQuantity, // Update the quantity
            checked: isChecked, // Update the checkbox status based on isChecked parameter
            isRequiredQuantityPresent: isChecked
          };
        }
        return item;
      });

      console.log("updatedCart after", updatedCart)

      setCart(updatedCart);

      const updatedItem = updatedCart.find((item) => item._id === cartItemId);
      calculateProductTotal(updatedItem);
      calculateBagTotal(updatedCart);
    } catch (error) {
      console.error("Error updating item quantity:", error);
    }
  };

  const handleCheckboxChange = async (cartItemId) => {
    const updatedCart = cart.map((item) => {
      if (item._id === cartItemId) {
        // Only toggle checkbox if stock is present and no issues
        if (item.isRequiredQuantityPresent) {
          return { ...item, checked: !item.checked };
        }
        // If stock is not present, do not change the checkbox status
        return item;
      }
      return item;
    });

    const updatedItem = updatedCart.find((item) => item._id === cartItemId);

    try {
      // Call the API to update the checked state on the server
      await axios.patch(
        // `/CartItemCheck/${userId}/updateCartItemCheck/${cartItemId}`,
        shoppingInfoApis.updateCartItemCheck(userId, cartItemId),
        { checked: updatedItem.checked },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the local cart state after successful API call
      setCart(updatedCart);
      calculateBagTotal(updatedCart);
    } catch (error) {
      console.error("Error updating checked state:", error);
      // Optionally, handle error (e.g., show a notification)
    }
  };






  // const handleCheckboxChange = (cartItemId) => {
  //   const updatedCart = cart.map((item) => {
  //     if (item._id === cartItemId) {
  //       // Only toggle checkbox if stock is present and no issues
  //       if (item.isRequiredQuantityPresent) {
  //         return { ...item, checked: !item.checked };
  //       }
  //       // If stock is not present, do not change the checkbox status
  //       return item;
  //     }
  //     return item;
  //   });

  //   setCart(updatedCart);
  //   calculateBagTotal(updatedCart);
  // };



  const handleProceedToShipping = () => {
    const checkedItems = cart.filter((item) => item.checked);

    navigate("/billing", {
      state: {
        cart: checkedItems, // Send only checked items
        totalAmount: bagTotal,
        type: "cart",
      },
    });
  };


  const handleGoBack = () => {
    navigate(-1); // Navigates to the previous page
  };


  const handleWishList = (item) => {

    const itemToAdd = {
      group: item.group,
      productId: item.productId,
      color: item.color.name,
      size: item.size,
      logoUrl: item.logoUrl,
      logoPosition: item.logoPosition,
      productDetails: null
    };
    addToWishList(itemToAdd);

    removeFromCart(item._id)

    // console.log("item", item)
  }


  return (
    <div className="cart_screen">
      <div className="cart-back" onClick={handleGoBack}>
        <img src="/images/auth/back-arrow.svg" alt="" />
      </div>
      <h2 className="bag_title">My Bag</h2>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="container-fluid">
          <div className="row">
            {cart.map((item, index) => (
              <div key={index} className="d-flex justify-content-between p_cart">
                {/* img */}
                <div className="p_outer">

                  <div className="p_img">
                    <img
                      src="https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg"
                      alt=""
                      className="w-100"
                    />
                  </div>
                  <div className="p_desc">
                    <div className="p_name">
                      {item.color.name} {item.group}
                    </div>
                    <div className="p_act">
                      <span onClick={() => removeFromCart(item._id)}>Delete</span>{" "}
                      <span onClick={() => handleWishList(item)}>
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
                  <div className="p_price">Rs. {productTotal[item._id]}</div>
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
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`flexSwitchCheckDefault-${index}`}
                      checked={item.checked}
                      // disabled={!item.isRequiredQuantityPresentt} // Disable if stock is insufficient
                      onChange={() => handleCheckboxChange(item._id)}
                    />
                  </div>
                </div>

              </div>
            ))}

            {/* Bag total and proceed to shipping button */}
            <div className="cart_total">
              <div className="cart_total-inner">
                <div className="cart_amt">
                  {`Bag total: ₹${bagTotal}`}
                </div>
                <button
                  onClick={handleProceedToShipping}
                >
                  PROCEED TO SHIPPING
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;