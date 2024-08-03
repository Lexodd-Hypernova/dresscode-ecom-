

import axios from "axios";
import { shoppingInfoApis } from "../common";
import { useEffect, useState } from "react";
import Counter from "../common/components/Counter";

import { useCart } from "../context/CartContext";


const Cart = () => {
  const token = localStorage.getItem("token");
  const [cartData, setCartData] = useState([]);
  const [cartCount, setCardCount] = useState(0);

  const { cart, removeFromCart, setCart, loading } = useCart();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const userId = localStorage.getItem("id");



  const calculateTotalOrder = () => {
    let total = 0;
    cart.forEach((item) => {
      if (item.productDetails.price !== undefined) {
       
        total += item.quantityRequired * item.productDetails.price; // Assuming item.count is the quantity
        
        console.log("price total",total)
        console.log(item)
      }
    });
    return total.toFixed(2); // Adjust to your formatting needs
  };

  const updateItemQuantity = async (newQuantity, cartItemId) => {
    console.log("hitting in cart")
    try {
      //   const response = await axios.patch(
      //     shoppingInfoApis.handleItemsCount(userId, cartItemId),
      //     { quantityNeedToChange: newQuantity },
      //     config
      //   );
      //   console.log(response.data);
      const updatedCart = cart.map((item) =>
        item._id === cartItemId ? { ...item, count: newQuantity } : item
      );
      console.log(updatedCart, "updated cart");
      // setCardCount(updatedCart.cartItem);
    } catch (error) {
      console.error("Error updating item quantity:", error);
    }
  };



  return (

    <div>
      <h2>Bag</h2>



      {
        loading ? (
          <div> Loading...</div>
        ) : (
          <div className="">
            {cart.map((item) => (
              <div
                key={item.id}
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
                  <div style={{ display: "flex", justifyContent: "space-between", color: '#20248A', cursor: 'pointer' }}>
                    <span onClick={() => removeFromCart(item._id)}>Delete</span> <span><i className="fa-regular fa-heart"></i>Move to wishlist</span>

                  </div>
                </div>
                {/* last */}
                <div>
                  Order details
                  <div>
                    Total:{item.quantityRequired * item.productDetails.price}

                  </div>
                  <div>bag total: ${calculateTotalOrder()}</div>
                  <div ><button style={{ background: "#20248A", color: "white" }}>PROCEED TO SHIPPING</button></div>
                </div>
              </div>
            ))}
          </div>
        )
      }





    </div >

  );
};

export default Cart;