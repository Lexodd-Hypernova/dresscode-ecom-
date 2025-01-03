import React, { createContext, useState, useContext, useEffect } from "react";
import { shoppingInfoApis } from "../common";
import axiosInstance from "../common/axiosInstance";
import { useNavigate } from "react-router-dom";

// import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // const token = localStorage.getItem("token");

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [logoUrl, setLogoUrl] = useState('');

  const nav = useNavigate();

  const userId = localStorage.getItem("id");

  const fetchCart = async () => {
    setLoading(true);
    try {

      const { data } = await axiosInstance.get(shoppingInfoApis.getCartData(userId),
        {
          withCredentials: true // Ensure cookies are sent with the request
        }
      );

      setCart(data.cartItems);
      // console.log(data.cartItems);
    } catch (error) {
      console.error("Error fetching the cart:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []); // Add dependencies to useEffect



  const addToCart = async (newItem) => {
    setLoading(true);
    try {
      // Find if the item already exists in the cart
      const existingItem = cart.find(
        (item) =>
          item.group === newItem.group &&
          item.productId === newItem.productId &&
          item.size === newItem.size &&
          item.color === newItem.color // You can add more comparisons as needed
      );

      if (existingItem) {
        existingItem.quanityRequired += newItem.quantityRequired

        setCart(updatedCart);
      } else {

        const response = await axiosInstance.post(shoppingInfoApis.addCartData(userId),
          newItem,
          {
            withCredentials: true // Ensure cookies are sent with the request
          }
        );

        // console.log("response from addToCart", response)

        // const result = await response.json();
        const updatedItem = response.data.cartItem;

        // Add the new item to the cart
        setCart((prevCart) => [...prevCart, updatedItem]);
      }

      nav("/cart");
      window.location.reload()

    } catch (error) {
      console.error("Error adding item to cart:", error);
    } finally {
      setLoading(false);
    }
  };


  const removeFromCart = async (productId) => {
    // console.log("userId", userId);
    // console.log("productId", productId);
    try {

      const res = await axiosInstance.delete(shoppingInfoApis.deleteCartItem(userId, productId),
        {
          withCredentials: true // Ensure cookies are sent with the request
        }
      );

      // console.log(res.data);
      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };


  const handleCheckboxChange = async (cartItemId) => {
    setLoading(true)
    const updatedCart = cart.map((item) => {
      if (item._id === cartItemId) {
        // Only toggle checkbox if stock is present and no issues
        return { ...item, checked: !item.checked };
      }
      return item;
    });

    const updatedItem = updatedCart.find((item) => item._id === cartItemId);

    try {
      // Call the API to update the checked state on the server

      const res = await axiosInstance.patch(shoppingInfoApis.updateCartItemCheck(userId, cartItemId),
        { checked: updatedItem.checked },
        {
          withCredentials: true // Ensure cookies are sent with the request
        }
      );

      setCart(updatedCart);
      // console.log("updatedCart in handleCheckboxChange", updatedCart)

    } catch (error) {
      console.error("Error updating checked state:", error);
      // Optionally, handle error (e.g., show a notification)
    }
    finally {
      setLoading(false)
    }
  };


  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, loading, setCart, fetchCart, handleCheckboxChange }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};