import React, { useState, useEffect, createContext, useContext } from "react";

const ProductContext = createContext();

export const ProductContextProvider = ({ children }) => {

    const [product, setProduct] = useState([]);

    // const addProduct = (item) => {
    //     setProduct((prevItem) => [
    //         ...prevItem, item
    //     ])
    // }


    return (
        <ProductContext.Provider value={{ product, setProduct }}>{children}</ProductContext.Provider>
    )
}

export const useProductContext = () => {
    return useContext(ProductContext);
};