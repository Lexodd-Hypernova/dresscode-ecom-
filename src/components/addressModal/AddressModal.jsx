import React, { useState, useEffect } from 'react';
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
        position: "fixed",
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));



const AddressModal = ({ onSubmit, modalOpen, setModalOpen, formData, setFormData }) => {
    const classes = useStyles();

    // const [modalOpen, setModalOpen] = useState(false);




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



    useEffect(() => {

        console.log(modalOpen)


    }, [])


    const handleCloseModal = () => {
        setModalOpen(false);
    };


    const handleFormSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData)
    }

    return (
        <>

            <Modal
                className={classes.modal}
                open={modalOpen}
                onClose={handleCloseModal}
                aria-labelledby="add-address-modal-title"
                aria-describedby="add-address-modal-description"
            >
                <Card className={classes.card}>
                    <h2 id="add-address-modal-title">{formData._id ? "Edit Address" : "Add New Address"}</h2>
                    <form onSubmit={handleFormSubmit}>
                        <TextField
                            label="First Name"
                            name="firstName"
                            fullWidth
                            margin="normal"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Last Name"
                            name="lastName"
                            fullWidth
                            margin="normal"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Phone No"
                            name="phone"
                            fullWidth
                            margin="normal"
                            value={formData.mobile}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Email"
                            name="email"
                            fullWidth
                            margin="normal"
                            value={formData.mobile}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Address"
                            name="address"
                            fullWidth
                            margin="normal"
                            value={formData.flatNumber}
                            onChange={handleChange}
                        />

                        <TextField
                            label="City"
                            name="city"
                            fullWidth
                            margin="normal"
                            value={formData.districtCity}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Pin code"
                            name="pinCode"
                            fullWidth
                            margin="normal"
                            value={formData.pinCode}
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
                        <TextField
                            label="Country"
                            name="country"
                            fullWidth
                            margin="normal"
                            value={formData.locality}
                            onChange={handleChange}
                        />
                        {/* <FormLabel component="legend">Address Type</FormLabel>
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
                        </RadioGroup> */}
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

        </>
    )
}

export default AddressModal