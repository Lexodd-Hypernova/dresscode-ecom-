import React, { createContext, useState, useContext, useEffect } from 'react';
import { shoppingInfoApis } from '../common';

import { useNavigate } from "react-router-dom";


import axios from 'axios';

const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const token = localStorage.getItem("token");

    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    const nav = useNavigate()

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
            console.log(data.cartItems)
        } catch (error) {
            console.error('Error fetching the cart:', error);
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
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(item),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const newItem = await response.json();

            const UpdatedItem = await newItem.cartItem;

            // newItem = newItem.cartItem;
            console.log(UpdatedItem)
            setCart((prevCart) => [...prevCart, UpdatedItem]);
            // nav("/cart")
        } catch (error) {
            console.error('Error adding item to cart:', error);
        } finally {
            setLoading(false);
        }
    };



    const removeFromCart = async (productId) => {
        console.log("userId", userId);
        console.log("productId", productId);

        try {
            const res = await axios.delete(shoppingInfoApis.deleteCartItem(userId, productId), config)
            console.log(res.data);
            fetchCart();

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, loading, token }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};