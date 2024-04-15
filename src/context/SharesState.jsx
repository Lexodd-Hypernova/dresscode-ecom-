import React, { useState } from "react";
import SharedContext from "./SharedContext";

const SharesState = (props) => {
    const [selectedCategory, setSelectedCategory] = useState('All Uniforms');

  return (
    <SharedContext.Provider value={{selectedCategory, setSelectedCategory}}>
        {props.children}
    </SharedContext.Provider>
  );
};

export default SharesState;
