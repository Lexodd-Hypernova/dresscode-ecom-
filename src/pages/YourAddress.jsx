
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
import axios from "axios";
import { accountInfoApis } from "../common";
import './pages-styles/yourAddress.styles.css'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    overflow:'scroll'
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
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const YourAddress = () => {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);
  const [addressData, setAddressData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    flatNumber: "",
    locality: "",
    pinCode: "",
    landmark: "",
    districtCity: "",
    state: "",
    addressType: "Home", // Default value
    markAsDefault: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: checked,
    }));
  };

  const getAddressData = async () => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");

    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

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
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const addAddress = async () => {
    const token = localStorage.getItem("token"); 

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.post(
        accountInfoApis.addAddress(localStorage.getItem("id")),
        formData,
        config
      );
      console.log(response.data);
      setAddressData([...addressData, response.data]);
      handleCloseModal();
    } catch (err) {
      console.log(err);
    }
  };

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
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found in localStorage.");
      }
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
  
      const url = accountInfoApis.deleteAddress(localStorage.getItem("id"), id);
      console.log("DELETE URL:", url);
      console.log("DELETE CONFIG:", config);
  
      const response = await axios.patch(url, {}, config);
  
      if (response) {
        setAddressData(addressData.filter(address => address._id !== id));
        console.log("Address deleted successfully:", response.data);
        window.location.reload()
      } else {
        console.error("Failed to delete address:", response.statusText);
      }
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };
  
  const setAsDefaultAddress = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        accountInfoApis.setAsDefaultAddress(localStorage.getItem("id"),id),
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response) {
        const updatedAddresses = addressData.map(address => ({
          ...address,
          markAsDefault: address._id === id,
        }));
        setAddressData(updatedAddresses);
        window.location.reload()

      }
    } catch (error) {
      console.error('Error setting default address:', error);
    }
  };

  useEffect(() => {
    getAddressData();
  }, []);

  const handleAddAddress = () => {
    setFormData({
      name: "",
      mobile: "",
      flatNumber: "",
      locality: "",
      pinCode: "",
      landmark: "",
      districtCity: "",
      state: "",
      addressType: "Home",
      markAsDefault: false,
    });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData._id) {
      updateAddress(formData._id);

    } else {
      addAddress();

    }
  };

  const updateAddress = async (id) => {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.patch(
        accountInfoApis.updateAddress(localStorage.getItem("id"),id),
        formData,
        config
      );
      console.log(response.data);
      // Update the address list after editing an address
      const updatedAddresses = addressData.map(address =>
        address._id === formData._id ? formData : address
      );
      setAddressData(updatedAddresses);
      handleCloseModal();
      window.location.reload()

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ background: "#EFF4FD", height: "100vh" }}>
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
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="address-card rounded" style={{height:'85%',}}>
              <IconButton
                className="add-address-icon"
                onClick={handleAddAddress}
                style={{marginTop:'70%'}}
              >
                <FontAwesomeIcon icon={faPlus} />
                <h4
                  className="add-address-label"
                  style={{ textAlign: "center"}}
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
                  <hr style={{width:'120%',borderTop:'1px solid black'}} />
                  <h5>{val.name}</h5>
                  <p>
                    {val.landmark} {val.flatNumber}
                  </p>
                  <p>{val.locality}</p>
                  <p>
                    {val.state} {val.districtCity}
                  </p>
                  <p>{val.addressType}</p>
                  <div style={{color:'brown'}}>
                    <span onClick={() => editAddress(val._id)} style={{cursor: 'pointer'}}>
                      Edit
                    </span>{" | "}
                    <span onClick={() => deleteAddress1(val._id)} style={{cursor: 'pointer'}}>
                      Remove
                    </span>{" | "}
                    {!val.markAsDefault && (
                      <span onClick={() => setAsDefaultAddress(val._id)} style={{cursor: 'pointer'}}>
                        Set as Default
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
      <Modal
        className={classes.modal}
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="add-address-modal-title"
        aria-describedby="add-address-modal-description"
      >
        <Card className={classes.card}>
          <h2 id="add-address-modal-title">{formData._id ? "Edit Address" : "Add New Address"}</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              name="name"
              fullWidth
              margin="normal"
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              label="Mobile"
              name="mobile"
              fullWidth
              margin="normal"
              value={formData.mobile}
              onChange={handleChange}
            />
            <TextField
              label="Flat Number / Building Name"
              name="flatNumber"
              fullWidth
              margin="normal"
              value={formData.flatNumber}
              onChange={handleChange}
            />
            <TextField
              label="Locality / Area / Street"
              name="locality"
              fullWidth
              margin="normal"
              value={formData.locality}
              onChange={handleChange}
            />
            <TextField
              label="Pincode"
              name="pinCode"
              fullWidth
              margin="normal"
              value={formData.pinCode}
              onChange={handleChange}
            />
            <TextField
              label="District / City"
              name="districtCity"
              fullWidth
              margin="normal"
              value={formData.districtCity}
              onChange={handleChange}
            />
            <TextField
              label="State"
              name="state"
              fullWidth
              margin="normal"
              value={formData.state}
              onChange={handleChange}
            />
            <FormLabel component="legend">Address Type</FormLabel>
            <RadioGroup
              aria-label="addressType"
              name="addressType"
              value={formData.addressType}
              onChange={handleChange}
              row
            >
              <FormControlLabel
                value="Home"
                control={<Radio />}
                label="Home"
              />
              <FormControlLabel
                value="Work"
                control={<Radio />}
                label="Work"
              />
              <FormControlLabel
                value="Others"
                control={<Radio />}
                label="Others"
              />
            </RadioGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.markAsDefault}
                  onChange={handleCheckboxChange}
                  name="markAsDefault"
                  color="primary"
                />
              }
              label="Mark as default"
            />
            <div style={{ marginTop: "16px", display: "flex", justifyContent: "flex-end" }}>
              <Button type="submit" variant="contained" color="primary" style={{ marginRight: "8px" }}>
                {formData._id ? "Update" : "Save"}
              </Button>
              <Button variant="outlined" onClick={handleCloseModal}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </Modal>
      <IconButton
        className={classes.addButton}
        onClick={handleAddAddress}
        color="primary"
      >
        <FontAwesomeIcon icon={faPlus} size="2x" />
      </IconButton>
    </div>
  );
};

export default YourAddress;

