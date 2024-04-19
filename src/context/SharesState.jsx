import React, { useState } from "react";
import SharedContext from "./SharedContext";

const SharesState = (props) => {
    const [selectedCategory, setSelectedCategory] = useState('All Uniforms');
    const [selectedCard, setSelectedCard] = useState(null);
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
      setCartItems([...cartItems, item]); // Add item to cart
    };

  return (
    <SharedContext.Provider value={{selectedCategory,
     setSelectedCategory, 
     selectedCard, 
     setSelectedCard,
     cartItems,
     addToCart
    }}>
        {props.children}
    </SharedContext.Provider>
  );
};

export default SharesState;
