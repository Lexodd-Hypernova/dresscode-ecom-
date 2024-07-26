

import  { createContext, useState, useContext, useEffect } from 'react';


const WishListContext = createContext();
export const WishListProvider = ({ children }) => {

    const token = localStorage.getItem("token");

    const [wishListCount, setWishListCount] = useState(0);
  

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    

    useEffect(() => {
    }, []); 



    return (
        <WishListContext.Provider value={{ wishListCount, setWishListCount,config }}>
            {children}
        </WishListContext.Provider>
    );
};

export const useWhishList = () => {
    return useContext(WishListContext);
};