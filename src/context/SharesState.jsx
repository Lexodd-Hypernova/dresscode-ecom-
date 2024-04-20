import React, { useState } from "react";
import SharedContext from "./SharedContext";

const SharesState = (props) => {
    const [selectedCategory, setSelectedCategory] = useState('All Uniforms');
    const [selectedCard, setSelectedCard] = useState(null);
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
      // Check if the item is already in the cart
      const itemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);

      if (itemIndex !== -1) {
          // If the item is already in the cart, update its quantity
          const updatedCartItems = [...cartItems];
          updatedCartItems[itemIndex].quantity += 1;
          setCartItems(updatedCartItems);
      } else {
          // If the item is not in the cart, add it with quantity 1
          setCartItems([...cartItems, { ...item, quantity: 1 }]);
      }
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
