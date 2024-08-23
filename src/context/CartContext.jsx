import React, { createContext, useState, useContext, useEffect } from "react";
import { shoppingInfoApis } from "../common";

import { useNavigate } from "react-router-dom";

import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const token = localStorage.getItem("token");

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [logoUrl, setLogoUrl] = useState('');

  const nav = useNavigate();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const userId = localStorage.getItem("id");

  const fetchCart = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        shoppingInfoApis.getCartData(userId),
        config
      );
      setCart(data.cartItems);
      console.log(data.cartItems);
    } catch (error) {
      console.error("Error fetching the cart:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []); // Add dependencies to useEffect





  const addToCart = async (item) => {
    setLoading(true);
    try {
      const response = await fetch(shoppingInfoApis.addCartData(userId), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(item),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const newItem = await response.json();

      const UpdatedItem = await newItem.cartItem;

      // newItem = newItem.cartItem;
      console.log(UpdatedItem);
      setCart((prevCart) => [...prevCart, UpdatedItem]);
      nav("/cart");
    } catch (error) {
      console.error("Error adding item to cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    console.log("userId", userId);
    console.log("productId", productId);

    try {
      const res = await axios.delete(
        shoppingInfoApis.deleteCartItem(userId, productId),
        config
      );
      console.log(res.data);
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

      const res = await axios.patch(shoppingInfoApis.updateCartItemCheck(userId, cartItemId),
        { checked: updatedItem.checked },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setCart(updatedCart);
      console.log("updatedCart in handleCheckboxChange", updatedCart)

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
      value={{ cart, addToCart, removeFromCart, loading, token, setCart, fetchCart, handleCheckboxChange }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};