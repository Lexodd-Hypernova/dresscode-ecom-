import React, { useState, useEffect, createContext, useContext } from "react";

const ProductContext = createContext();

export const ProductContextProvider = ({ children }) => {

    const [product, setProduct] = useState();

    const addProduct = (item) => {
        setProduct(item)
    }


    return (
        <ProductContext.Provider value={{ product, addProduct }}>{children}</ProductContext.Provider>
    )
}

export const useProductContext = () => {
    return useContext(ProductContext);
};