import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";
import { shoppingInfoApis } from '../common';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useUserContext } from '../context/UserContext';
import Swal from 'sweetalert2/dist/sweetalert2.js';

const QuoteSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    contactPhone: Yup.string().required('Required').matches(/^\d{10}$/, 'Phone number is not valid'),
});

const RaiseQuote = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const { token, id } = useUserContext();

    const [formData, setFormData] = useState({
        name: '',
        contactPhone: '',
        email: '',
        organizationName: '',
        street: '',
        lane: '',
        postalCode: ''
    });


    const location = useLocation();
    const { state } = location;

    const { totalAmount, product } = state || {};

    const quoteItem = product[0];

    console.log(product, "product");
    console.log(totalAmount, "totalAmount");




    return (
        <>

            <div className='container-fluid' style={{ position: "relative", marginTop: "100px" }}>
                <div className='row'>
                    <div className='fs-1 fw-medium text-primary text-center'>
                        <span style={{ color: "#20248A" }}>Get a {""}</span>
                        <span style={{ color: "#DF3701" }}>
                            Quote
                        </span>
                    </div>
                    <div className='fs-5 text-center mt-2' >
                        Could you please provide the content you would <br></br>like to have below the contact form
                    </div>
                </div>
                <div className='row justify-content-center'>
                    <div className='col-lg-4'>


                        <Formik
                            initialValues={
                                {
                                    name: '',
                                    contactPhone: '',
                                    email: '',
                                    organizationName: '',
                                    street: '',
                                    lane: '',
                                    postalCode: '',
                                }
                            }
                            validationSchema={QuoteSchema}
                            onSubmit={async (values) => {
                                console.log(values);

                                const headers = {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${token}`,
                                };
                                setLoading(true)
                                try {
                                    const response = await axios.post(shoppingInfoApis.createQuote(id), {
                                        group: quoteItem.group,
                                        productId: quoteItem.productId,
                                        color: quoteItem.color,
                                        size: quoteItem.size,
                                        quantityRequired: quoteItem.quantityRequired,
                                        logoUrl: quoteItem.logoUrl,
                                        logoPosition: quoteItem.logoPosition,
                                        imgUrl: quoteItem.imgUrl,
                                        address: {
                                            name: values.name,
                                            contactPhone: values.contactPhone,
                                            email: values.email,
                                            organizationName: values.organizationName,
                                            street: values.street,
                                            lane: values.lane,
                                            postalCode: values.postalCode,
                                        }
                                    },
                                        { headers }
                                    );
                                    // console.log(response.data);


                                    if (response.status === 201) {
                                        Swal.fire({
                                            title: 'Success!',
                                            text: 'Quote raised successfully',
                                            icon: 'success',
                                            showConfirmButton: false,
                                            timer: 1500
                                        })
                                        navigate("/quote-success")
                                        console.log(response.data);
                                    }

                                } catch (error) {

                                    Swal.fire({
                                        title: 'Failed!',
                                        text: error.response.data.message,
                                        icon: 'error',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })

                                    console.error('Error signing up:', error);
                                }
                                finally {
                                    setLoading(false)
                                }
                            }}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                // isSubmitting,
                                /* and other goodies */
                            }) => (
                                <form className='mt-5' onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.name}
                                            className="form-control w-100"
                                            name="name"
                                            placeholder='Name'
                                            aria-describedby="NameHelp" />
                                        {touched.name && errors.name ? (
                                            <p className='text-danger'>{errors.name}</p>
                                        ) : null}
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.contactPhone}
                                            className="form-control w-100"
                                            name='contactPhone'
                                            placeholder='Contact Phone'
                                            aria-describedby="phoneNumberHelp" />
                                        {touched.contactPhone && errors.contactPhone ? (
                                            <p className='text-danger'>{errors.contactPhone}</p>
                                        ) : null}
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="email"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.email}
                                            className="form-control w-100"
                                            name='email'
                                            placeholder='E-mail'
                                            aria-describedby="emailHelp" />
                                        {touched.email && errors.email ? (
                                            <p className='text-danger'>{errors.email}</p>
                                        ) : null}
                                    </div>

                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.organizationName}
                                            className="form-control w-100"
                                            name="organizationName"
                                            placeholder='Name of Organization (Optional)'
                                        />
                                        {touched.organizationName && errors.organizationName ? (
                                            <p className='text-danger'>{errors.organizationName}</p>
                                        ) : null}
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.street}
                                            className="form-control w-100"
                                            name='street'
                                            placeholder='Street'
                                        />
                                        {touched.street && errors.street ? (
                                            <p className='text-danger'>{errors.street}</p>
                                        ) : null}
                                    </div>
                                    <div className="row">
                                        <div className='col'>
                                            <input
                                                type="text"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.lane}
                                                className="form-control w-100"
                                                name='lane'
                                                placeholder='Lane'
                                            />
                                            {touched.lane && errors.lane ? (
                                                <p className='text-danger'>{errors.lane}</p>
                                            ) : null}
                                        </div>
                                        <div className='col'>
                                            <input
                                                type="text"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.postalCode}
                                                className="form-control w-100"
                                                name='postalCode'
                                                placeholder='Postal code'
                                            />
                                            {touched.postalCode && errors.postalCode ? (
                                                <p className='text-danger'>{errors.postalCode}</p>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div>
                                        <button type='submit'
                                            className='mt-5 btn btn-primary w-100 text-uppercase text-white fs-5 fw-medium'
                                        >

                                            {loading ? <div className="spinner-border " style={{ color: 'oragne' }} role="status">
                                                <span className="sr-only"></span>
                                            </div> : "submit"}

                                        </button>
                                    </div>
                                </form>
                            )}
                        </Formik>



                        {/* <form className='mt-5'>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control w-100"
                                    name="name"
                                    placeholder='Name'
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control w-100"
                                    name="contactPhone"
                                    placeholder='Contact Phone'
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="email"
                                    className="form-control w-100"
                                    name="email"
                                    placeholder='E-mail'
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control w-100"
                                    name="organizationName"
                                    placeholder='Name of Organization (Optional)'
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control w-100"
                                    name="street"
                                    placeholder='Street'
                                />
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <input
                                        type="text"
                                        className="form-control w-100"
                                        name="lane"
                                        placeholder='Lane'
                                    />
                                </div>
                                <div className='col'>
                                    <input
                                        type="text"
                                        className="form-control w-100 mb-3"
                                        name="postalCode"
                                        placeholder='Postal code'
                                    />
                                </div>
                            </div>
                            <div>
                                <button type='submit' className='mt-5 btn btn-primary w-100 text-uppercase text-white fs-5 fw-medium'>submit</button>
                            </div>
                        </form> */}
                    </div>
                </div>
                <div style={{ position: "absolute", top: "0px", left: "100px" }}>
                    <Link className='back_link' to="/">
                        <img src="/images/back.png" alt="" />
                    </Link>
                </div>
            </div>



        </>
    )
}

export default RaiseQuote