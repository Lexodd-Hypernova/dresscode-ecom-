import React, { useState, useEffect, useContext, createContext } from "react";
import axiosInstance from "../common/axiosInstance";
import { accountInfoApis } from "../common";

const userContext = createContext();

export const UserContextProvider = ({ children }) => {

    const [addressData, setAddressData] = useState([]);

    const [loading, setLoading] = useState(false)
    const id = localStorage.getItem("id");

    const getAddressData = async () => {

        setLoading(true)
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
            setLoading(false)
        }
    };


    const addAddress = async (formData) => {

        setLoading(true)
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
            setLoading(false)
        }
    };


    useEffect(() => {
        getAddressData();
    }, [])


    return (
        <userContext.Provider value={{ addressData, setAddressData, addAddress, id, loading, setLoading }}>
            {children}
        </userContext.Provider>
    )
}

export const useUserContext = () => {
    return useContext(userContext)
}