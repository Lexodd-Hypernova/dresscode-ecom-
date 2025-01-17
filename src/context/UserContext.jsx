import React, { useState, useEffect, useContext, createContext } from "react";
import axiosInstance from "../common/axiosInstance";
import { accountInfoApis } from "../common";
import Swal from "sweetalert2/dist/sweetalert2.js";

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
            // console.log(response.data.data)
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

            if (response.status === 200) {
                console.log(response.data.data);
                setAddressData((prevData) => [...prevData, response.data.data]);

                // Show success notification
                Swal.fire({
                    title: "Success!",
                    text: "Address added successfully",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 3000,
                });
            }

            // console.log(response.data.data);
            // setAddressData((prevData) => [...prevData, response.data.data])
        } catch (err) {
            console.log(err);
            Swal.fire({
                title: "Address failed!",
                text: "Something went wrong",
                icon: "error",
                showConfirmButton: false,
                timer: 3000,
            });
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