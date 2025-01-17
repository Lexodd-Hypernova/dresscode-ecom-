
import { useEffect, useState } from "react";
import {
  Modal,
  Card,
  TextField,
  Button,
  IconButton,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  FormLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons"; // Add necessary icons
// import axios from "axios";
import axiosInstance from "../common/axiosInstance";
import { accountInfoApis } from "../common";
import './pages-styles/yourAddress.styles.css';
import { useUserContext } from "../context/UserContext";

import AddressModal from "../components/addressModal/AddressModal";
import LoadingComponent from "../common/components/LoadingComponent";
import Swal from "sweetalert2/dist/sweetalert2.js";


const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    overflow: 'scroll'
  },
  card: {
    width: 500,
    padding: theme.spacing(2),
    outline: "none",
    borderRadius: 10,
    border: "1px dotted #888",
    height: "auto",
  },
  addButton: {
    position: "absolute",
    // bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const YourAddress = () => {
  const { addressData, setAddressData, addAddress, addressloading, setaddressLoading } = useUserContext();
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);


  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    pinCode: "",
    city: "",
    state: "",
    country: "",
    markAsDefault: false,
  });


  useEffect(() => {
    // console.log(addressData)
  }, [])




  const editAddress = async (id) => {
    const addressToEdit = addressData.find(address => address._id === id);
    if (addressToEdit) {
      setFormData({
        ...formData,
        ...addressToEdit,
      });
      setModalOpen(true);
    }
  };

  const deleteAddress1 = async (id) => {
    setaddressLoading(true)
    try {

      const response = await axiosInstance.patch(accountInfoApis.deleteAddress(localStorage.getItem("id"), id),
        {
          withCredentials: true // Ensure cookies are sent with the request
        }
      );

      if (response) {
        setAddressData(addressData.filter(address => address._id !== id));
        Swal.fire({
          title: "Success!",
          text: "Address deleted successfully",
          icon: "success",
          showConfirmButton: false,
          timer: 3000,
        });
      } else {
        console.error("Failed to delete address:", response.statusText);
      }
    } catch (error) {
      console.error('Error deleting address:', error);
    } finally {
      setaddressLoading(false)
    }
  };

  const setAsDefaultAddress = async (id) => {
    setaddressLoading(true)
    try {

      const response = await axiosInstance.patch(accountInfoApis.setAsDefaultAddress(localStorage.getItem("id"), id),
        {
          withCredentials: true // Ensure cookies are sent with the request
        }
      );

      if (response) {
        const updatedAddresses = addressData.map(address => ({
          ...address,
          markAsDefault: address._id === id,
        }));
        setAddressData(updatedAddresses);
        // window.location.reload()

      }
    } catch (error) {
      console.error('Error setting default address:', error);
    } finally {
      setaddressLoading(false)
    }
  };


  const handleAddAddress = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      pinCode: "",
      city: "",
      state: "",
      country: "",
      markAsDefault: false,
    });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };


  const handleSubmit = (values) => {
    if (values._id) {
      updateAddress(values._id, values); // Pass the form data
    } else {
      addAddress(values);
      handleCloseModal();
    }
  };


  const updateAddress = async (id, formData) => {
    setaddressLoading(true);
    try {
      const response = await axiosInstance.patch(
        accountInfoApis.updateAddress(localStorage.getItem("id"), id),
        formData,
        {
          withCredentials: true, // Ensure cookies are sent with the request
        }
      );

      // Check if the status is 200 before updating and showing the notification
      if (response.status === 200) {
        const updatedAddresses = addressData.map((address) =>
          address._id === formData._id ? formData : address
        );
        setAddressData(updatedAddresses);
        handleCloseModal();

        // Show success notification
        Swal.fire({
          title: "Success!",
          text: "Address updated successfully",
          icon: "success",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setaddressLoading(false);
    }
  };



  return (


    <>


      <div className="address-screen">
        <div>
          <div
            style={{
              background: "white",
              textAlign: "center",
              height: "60px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "black",
            }}
          >
            Your Address
          </div>
        </div>

        {

          addressloading ? (
            <LoadingComponent></LoadingComponent>
          ) : (
            <>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-4 col-md-6 mb-4">
                    <div className="address-card rounded">
                      <IconButton
                        className="add-address-icon"
                        onClick={handleAddAddress}

                      >
                        <FontAwesomeIcon icon={faPlus} />
                        <h4
                          className="add-address-label"
                          style={{ textAlign: "center" }}
                        >
                          Add Address
                        </h4>
                      </IconButton>
                    </div>
                  </div>
                  {addressData.length > 0 ? (
                    addressData.map((val) => (
                      <div className="col-lg-4 col-md-6 mb-4" key={val._id}>
                        <div className="address-card rounded">
                          <p>{val.markAsDefault ? "Default" : ""}</p>
                          <hr style={{ width: '100%', borderTop: '1px solid black' }} />
                          <h5>{val.firstName}&nbsp;{val.lastName}</h5>
                          <p>
                            {val.address}
                          </p>
                          <p>{val.city}&nbsp;{val.pinCode}</p>
                          <p>
                            {val.state}
                          </p>
                          <p>{val.country}</p>
                          <div style={{ color: 'brown' }}>
                            <span onClick={() => editAddress(val._id)} style={{ cursor: 'pointer' }}>
                              Edit
                            </span>{" | "}
                            <span onClick={() => deleteAddress1(val._id)} style={{ cursor: 'pointer' }}>
                              Remove
                            </span>{" | "}
                            {!val.markAsDefault && (
                              <span onClick={() => setAsDefaultAddress(val._id)} style={{ cursor: 'pointer' }}>
                                Set as Default
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <h5 className="fs-4">You do not have any address! Please add an address</h5>
                  )}
                </div>
              </div>

              <IconButton
                className={classes.addButton}
                onClick={handleAddAddress}
                color="primary"
              >
                <FontAwesomeIcon icon={faPlus} size="2x" />
              </IconButton>

            </>
          )

        }
        <AddressModal
          formData={formData}
          setFormData={setFormData}
          FormOnSubmit={handleSubmit}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}></AddressModal>
      </div >
    </>

  );
};

export default YourAddress;

