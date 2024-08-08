import axios from "axios";
import { shoppingInfoApis } from "../common";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Counter from "../common/components/Counter";

import { useCart } from "../context/CartContext";

const Cart = () => {
  const token = localStorage.getItem("token");
  const [cartData, setCartData] = useState([]);
  const [cartCount, setCardCount] = useState(0);
  const [productTotal, setProductTotal] = useState({});
  const [bagTotal, setBagTotal] = useState(0); // State for total order value

  const { cart, removeFromCart, setCart, loading } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    calculateBagTotal();
  }, [cart]);

  useEffect(() => {
    if (!loading) {
      calculateInitialProductTotals();
    }
  }, [loading]);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const userId = localStorage.getItem("id");

  //calculate total amount of each item on loading cart page initially.
  const calculateInitialProductTotals = () => {
    cart.forEach((item) => {
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
  const calculateBagTotal = () => {
    let total = 0;
    cart.forEach((item) => {
      if (item.productDetails.price !== undefined) {
        total += item.quantityRequired * item.productDetails.price; // Assuming item.count is the quantity
      }
    });
    setBagTotal(total.toFixed(2)); // Adjust to your formatting needs
  };

  const updateItemQuantity = async (newQuantity, cartItemId) => {
    try {
      //   const response = await axios.patch(
      //     shoppingInfoApis.handleItemsCount(userId, cartItemId),
      //     { quantityNeedToChange: newQuantity },
      //     config
      //   );
      //   console.log(response.data);

      const updatedCart = cart.map((item) =>
        item._id === cartItemId
          ? { ...item, quantityRequired: newQuantity }
          : item
      );
      setCart(updatedCart);

      const updatedItem = updatedCart.find((item) => item._id === cartItemId);
      calculateProductTotal(updatedItem);
    } catch (error) {
      console.error("Error updating item quantity:", error);
    }
  };

  const handleProceedToShipping = () => {
    navigate("/billing", {
      state: {
        cart: cart,
        totalAmount: bagTotal,
      },
    });
  };

  return (
    <div>
      <h2>Bag</h2>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {cart.map((item) => (
            <div
              key={item._id}
              className="d-flex justify-content-around align-items-center"
            >
              {/* img */}
              <div className="d-flex align-items-center ">
                <div>
                  <img
                    src="https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg"
                    alt=""
                    width={180}
                    height={200}
                  />
                </div>
                <div>
                  {item.color.name} {item.group}
                </div>
              </div>

              {/* middle */}
              <div style={{ width: "300px !important" }}>
                <Counter
                  initialCount={item.quantityRequired}
                  cartItemId={item._id}
                  price={item.productDetails.price}
                  onUpdateQuantity={updateItemQuantity}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: "#20248A",
                    cursor: "pointer",
                  }}
                >
                  <span onClick={() => removeFromCart(item._id)}>Delete</span>{" "}
                  <span>
                    <i className="fa-regular fa-heart"></i> Move to wishlist
                  </span>
                </div>
              </div>

              {/* last */}
              <div>
                Order details
                <div>Total: ₹{productTotal[item._id]}</div>
              </div>
            </div>
          ))}

          {/* Bag total and proceed to shipping button */}
          <div className="d-flex justify-content-end">
            <div style={{ textAlign: "right" }}>
              <div style={{ textAlign: "center" }}>
                {`Bag total: ₹${bagTotal}`}
              </div>
              <button
                onClick={handleProceedToShipping}
                style={{
                  background: "#20248A",
                  color: "white",
                  marginTop: "10px",
                  paddingRight: "5px",
                  paddingLeft: "5px",
                }}
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
