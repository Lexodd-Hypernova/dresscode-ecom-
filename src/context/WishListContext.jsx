import { createContext, useState, useContext, useEffect } from 'react';
import { shoppingInfoApis } from '../common';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import axiosInstance from "../common/axiosInstance";


const WishListContext = createContext();
export const WishListProvider = ({ children }) => {

    const userId = localStorage.getItem("id");
    const [loading, setLoading] = useState(false);

    const [wishList, setWishList] = useState([])

    const getWishList = async () => {
        setLoading(true);
        try {

            const res = await axiosInstance.get(shoppingInfoApis.getWhishList(userId),
                {
                    withCredentials: true // Ensure cookies are sent with the request
                }
            );

            console.log(res.data.Wishlist);
            setWishList(res.data.Wishlist)
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        getWishList();
    }, []);


    const addToWishList = async (item) => {
        setLoading(true);
        try {


            const res = await axiosInstance.post(shoppingInfoApis.addWhishList(userId),
                item,
                {
                    withCredentials: true // Ensure cookies are sent with the request
                }
            );
            console.log(res);
            const data = await res.data.wishlistItem;
            setWishList((prevList) => [...prevList, data])

            if (res.status === 201) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Product added to wishlist successfully',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                })
            }

            console.log(data)


        } catch (error) {
            Swal.fire({
                title: 'Wishlist Failed!',
                text: error.response.data.message,
                icon: 'error',
                showConfirmButton: false,
                timer: 1500
            })
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }

    const deleteWishList = async (productId) => {
        setLoading(true)
        try {

            const res = await axiosInstance.delete(shoppingInfoApis.removeFromWishList(userId, productId),
                {
                    withCredentials: true // Ensure cookies are sent with the request
                }
            );

            getWishList();
            console.log(res.data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }

    }

    return (
        <WishListContext.Provider value={{ wishList, addToWishList, deleteWishList, getWishList, loading }}>
            {children}
        </WishListContext.Provider>
    );
};

export const useWhishList = () => {
    return useContext(WishListContext);
};