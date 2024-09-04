import React, { useState, useEffect, useContext, createContext } from "react";

import { accountInfoApis } from "../common";

import axios from "axios";

const userContext = createContext();

export const UserContextProvider = ({ children }) => {


    const [addressData, setAddressData] = useState([]);

    const [loading, setLoading] = useState(false)

    // const [modalOpen, setModalOpen] = useState(false);


    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");

    const getAddressData = async () => {


        const requestOptions = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        };
        setLoading(true)
        try {
            const response = await fetch(
                accountInfoApis.getAddress(id),
                requestOptions
            );
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json();
            setAddressData(result.data);
            console.log(result.data)
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false)
        }
    };


    const addAddress = async (formData) => {
        // const token = localStorage.getItem("token");

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        setLoading(true)
        try {
            const response = await axios.post(
                accountInfoApis.addAddress(id),
                formData,
                config
            );
            console.log(response.data.data);
            setAddressData((prevData) => [...prevData, response.data.data])
            // setAddressData([...addressData, response.data]);
            // handleCloseModal();
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
        <userContext.Provider value={{ addressData, setAddressData, addAddress, token, id, loading, setLoading }}>
            {children}
        </userContext.Provider>
    )
}

export const useUserContext = () => {
    return useContext(userContext)
}