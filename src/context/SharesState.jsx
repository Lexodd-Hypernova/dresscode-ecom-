import React, { useState } from "react";
import SharedContext from "./SharedContext";

const SharesState = (props) => {
    const [selectedCategory, setSelectedCategory] = useState('All Uniforms');
    const [selectedCard, setSelectedCard] = useState(null);

  return (
    <SharedContext.Provider value={{selectedCategory, setSelectedCategory, selectedCard, setSelectedCard}}>
        {props.children}
    </SharedContext.Provider>
  );
};

export default SharesState;
