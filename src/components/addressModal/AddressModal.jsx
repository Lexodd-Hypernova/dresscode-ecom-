import React, { useState, useEffect } from 'react';
import {
    Modal,
    Card,
    TextField,
    Button,
    FormControlLabel,
    Checkbox,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import debounce from 'lodash.debounce';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        overflow: 'scroll',
    },
    card: {
        width: 500,
        padding: theme.spacing(2),
        outline: "none",
        borderRadius: 10,
        border: "1px dotted #888",
        height: "auto",
    },
}));

const AddressModal = ({ FormOnSubmit, modalOpen, setModalOpen, formData, setFormData }) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [typedPinCode, setTypedPinCode] = useState(''); // Added state for pin code tracking

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const fetchPinCodeDetails = async (pinCode) => {
        try {
            setLoading(true);
            setErrorMessage('');
            const response = await axios.get(`https://api.postalpincode.in/pincode/${pinCode}`);
            const data = response.data[0];
            if (data.Status === "Success" && data.PostOffice?.length) {
                const { State, Country, Division, Pincode } = data.PostOffice[0];
                formik.setValues({
                    ...formik.values,
                    state: State,
                    city: Division,
                    country: Country,
                    pinCode: Pincode,
                });
            } else {
                setErrorMessage('Invalid pin code or details not found.');
            }
        } catch (error) {
            setErrorMessage('Unable to fetch details. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const debouncedFetchPinCodeDetails = debounce(fetchPinCodeDetails, 500);

    const handlePinCodeChange = (e) => {
        const pinCode = e.target.value;

        // Set the value directly in formik for real-time validation
        formik.setFieldValue('pinCode', pinCode);

        // Remove the exact match check for now
        // Only trigger the debounced API call if exactly 6 digits
        if (pinCode.length === 6 && /^\d{6}$/.test(pinCode)) {
            debouncedFetchPinCodeDetails(pinCode); // Call API only when 6 digits are entered
        }
    };


    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('Required'),
        lastName: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        phone: Yup.string()
            .required('Required')
            .matches(/^\d{10}$/, 'Phone number is not valid'),
        address: Yup.string()
            .required('Required')
            .min(10, 'Address must be at least 10 characters'),
        city: Yup.string().required('Required'),
        pinCode: Yup.string()
            .required('Required')
            .matches(/^\d{6}$/, 'Pin code must be exactly 6 digits'),
        state: Yup.string().required('Required'),
        country: Yup.string().required('Required'),
    });


    const formik = useFormik({
        initialValues: formData,
        validationSchema,
        onSubmit: (values) => {
            FormOnSubmit(values);
            setModalOpen(false);
        },
        enableReinitialize: true,
    });

    useEffect(() => {
        formik.setValues(formData);
    }, [formData]);

    return (
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
                        label="Pin code"
                        name="pinCode"
                        fullWidth
                        margin="normal"
                        value={formik.values.pinCode} // Ensure this value is always up to date
                        onChange={handlePinCodeChange} // Updated change handler
                        onBlur={formik.handleBlur}
                        error={formik.touched.pinCode && Boolean(formik.errors.pinCode)}
                        helperText={formik.touched.pinCode && formik.errors.pinCode}
                    />
                    {loading && <p>Loading...</p>}
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
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
    );
};

export default AddressModal;
