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

import { useFormik } from 'formik';
import * as Yup from 'yup';



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



const AddressModal = ({ FormOnSubmit, modalOpen, setModalOpen, formData, setFormData }) => {
    const classes = useStyles();

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

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        FormOnSubmit(formData);  // Call the parent component's submit function
    }


    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('Required'),
        lastName: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        phone: Yup.string().required('Required').matches(/^\d{10}$/, 'Phone number is not valid'),
        address: Yup.string().required('Required'),
        city: Yup.string().required('Required'),
        pinCode: Yup.string()
            .required('Required')
            .matches(/^\d{6}$/, 'Pin code must be exactly 6 digits'),
        state: Yup.string().required('Required'),
        country: Yup.string().required('Required'),
    });



    // const formik = useFormik({
    //     initialValues: formData,
    //     validationSchema,
    //     onSubmit: (values) => {
    //         FormOnSubmit(values);
    //     },
    //     enableReinitialize: true,
    // });

    const formik = useFormik({
        initialValues: formData,
        validationSchema,
        onSubmit: (values) => {
            // console.log('Submitting form with values:', values); // Debugging output
            FormOnSubmit(values);
            setModalOpen(false);
        },
        enableReinitialize: true,
    });

    useEffect(() => {
        formik.setValues(formData);
    }, [formData]);


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
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            label="First Name"
                            name="firstName"
                            fullWidth
                            margin="normal"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            helperText={formik.touched.firstName && formik.errors.firstName}
                        />
                        <TextField
                            label="Last Name"
                            name="lastName"
                            fullWidth
                            margin="normal"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            helperText={formik.touched.lastName && formik.errors.lastName}
                        />
                        <TextField
                            label="Phone No"
                            name="phone"
                            fullWidth
                            margin="normal"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.phone && Boolean(formik.errors.phone)}
                            helperText={formik.touched.phone && formik.errors.phone}
                        />
                        <TextField
                            label="Email"
                            name="email"
                            fullWidth
                            margin="normal"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField
                            label="Address"
                            name="address"
                            fullWidth
                            margin="normal"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.address && Boolean(formik.errors.address)}
                            helperText={formik.touched.address && formik.errors.address}
                        />

                        <TextField
                            label="City"
                            name="city"
                            fullWidth
                            margin="normal"
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.city && Boolean(formik.errors.city)}
                            helperText={formik.touched.city && formik.errors.city}
                        />
                        <TextField
                            label="Pin code"
                            name="pinCode"
                            fullWidth
                            margin="normal"
                            value={formik.values.pinCode}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.pinCode && Boolean(formik.errors.pinCode)}
                            helperText={formik.touched.pinCode && formik.errors.pinCode}
                        />
                        <TextField
                            label="State"
                            name="state"
                            fullWidth
                            margin="normal"
                            value={formik.values.state}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.state && Boolean(formik.errors.state)}
                            helperText={formik.touched.state && formik.errors.state}
                        />
                        <TextField
                            label="Country"
                            name="country"
                            fullWidth
                            margin="normal"
                            value={formik.values.country}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.country && Boolean(formik.errors.country)}
                            helperText={formik.touched.country && formik.errors.country}
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
                                    checked={formik.values.markAsDefault}
                                    onChange={formik.handleChange}
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