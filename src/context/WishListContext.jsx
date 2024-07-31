import { createContext, useState, useContext, useEffect } from 'react';
import { shoppingInfoApis } from '../common';
import axios from 'axios';


const WishListContext = createContext();
export const WishListProvider = ({ children }) => {

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("id");

    const [wishList, setWishList] = useState([])

    // const [wishListCount, setWishListCount] = useState(0);


    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const getWishList = async () => {
        try {
            const res = await axios.get(shoppingInfoApis.getWhishList(userId), config)
            console.log(res.data.Wishlist);
            setWishList(res.data.Wishlist)
        } catch (error) {
            console.log(error)
        }
    }



    useEffect(() => {
        getWishList();
    }, []);


    const addToWishList = async (item) => {
        try {

            const res = await axios.post(shoppingInfoApis.addWhishList(userId), JSON.stringify(item), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },

            })
            const data = await res.data.wishlistItem;
            setWishList((prevList) => [...prevList, data])

            console.log(data)


        } catch (error) {
            console.log(error)
        }


        // const myHeaders = new Headers();
        // myHeaders.append("Content-Type", "application/json");
        // myHeaders.append("Authorization", `Bearer ${token}`);

        // const raw = JSON.stringify(item);

        // const requestOptions = {
        //     method: "POST",
        //     headers: myHeaders,
        //     body: raw,
        //     redirect: "follow"
        // };

        // fetch(shoppingInfoApis.addWhishList(userId), requestOptions)
        //     .then((response) => response.text())
        //     .then((result) => console.log(result))
        //     .catch((error) => console.error(error));
    }

    const deleteWishList = async (productId) => {
        const res = await axios.delete(shoppingInfoApis.removeFromWishList(userId, productId), config);
        getWishList();
        console.log(res.data)
    }



    return (
        <WishListContext.Provider value={{ wishList, addToWishList, deleteWishList }}>
            {children}
        </WishListContext.Provider>
    );
};

export const useWhishList = () => {
    return useContext(WishListContext);
};