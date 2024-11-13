import React, { useState, useEffect, useContext, createContext } from "react";
import axiosInstance from "../common/axiosInstance";
import { accountInfoApis } from "../common";

const userContext = createContext();

export const UserContextProvider = ({ children }) => {

    const [addressData, setAddressData] = useState([]);

    const [addressloading, setaddressLoading] = useState(false)
    const id = localStorage.getItem("id");

    const getAddressData = async () => {

        setaddressLoading(true)
        try {

            const response = await axiosInstance.get(accountInfoApis.getAddress(id),
                {
                    withCredentials: true // Ensure cookies are sent with the request
                }
            );

            // const result = await response.json();
            setAddressData(response.data.data);
            console.log(response.data.data)
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setaddressLoading(false)
        }
    };


    const addAddress = async (formData) => {

        setaddressLoading(true)
        try {

            const response = await axiosInstance.post(accountInfoApis.addAddress(id),
                formData,
                {
                    withCredentials: true // Ensure cookies are sent with the request
                }
            );

            console.log(response.data.data);
            setAddressData((prevData) => [...prevData, response.data.data])
        } catch (err) {
            console.log(err);
        } finally {
            setaddressLoading(false)
        }
    };


    useEffect(() => {
        getAddressData();
    }, [])


    return (
        <userContext.Provider value={{ addressData, setAddressData, addAddress, id, addressloading, setaddressLoading }}>
            {children}
        </userContext.Provider>
    )
}

export const useUserContext = () => {
    return useContext(userContext)
}