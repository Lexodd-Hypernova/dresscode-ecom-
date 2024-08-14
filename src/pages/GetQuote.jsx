import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const GetQuote = () => {

    const [formData, setFormData] = useState({
        name: '',
        contactPhone: '',
        email: '',
        organizationName: '',
        street: '',
        lane: '',
        postalCode: ''
    });


    const productDetails = sessionStorage.getItem("itemToAdd")

    useEffect(() => {

        if (productDetails) {
            const parseDetails = JSON.parse(productDetails)
            console.log(parseDetails)
        }




    }, [])



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {

        e.preventDefault();

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTk5OTAxNDYsImV4cCI6MTc1MTU0Nzc0NiwiYXVkIjoiNjY4NGVmZWI5NzViZmYwMDg4NzFmMDYxOkpvaG4iLCJpc3MiOiJEcmVzc0NvZGVBcHBsaWNhdGlvbiJ9.euKYW-LRW_0NJk7t3nPYnXhvsQrrvQ9j2V5bk7SNWF4");

        const raw = JSON.stringify({
            "group": "ELITE",
            "productId": "6F698F",
            "color": "RED",
            "size": "L",
            "quantityRequired": 200,
            "logoUrl": "https://dummyimage.com/600x400/000/fff",
            "logoPosition": "back",
            "address": {
                "name": `${formData.name}`,
                "contactPhone": `${formData.contactPhone}`,
                "email": `${formData.email}`,
                "organizationName": `${formData.organizationName}`,
                "street": `${formData.street}`,
                "lane": `${formData.lane}`,
                "postalCode": `${formData.postalCode}`
            }
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("https://dresscode-test.onrender.com/order/createQuote/user/6684efeb975bff008871f061", requestOptions)
            .then((response) => response.json())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));

    }



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
                        <form className='mt-5' onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control w-100"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder='Name'
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control w-100"
                                    name="contactPhone"
                                    value={formData.contactPhone}
                                    onChange={handleChange}
                                    placeholder='Contact Phone'
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="email"
                                    className="form-control w-100"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder='E-mail'
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control w-100"
                                    name="organizationName"
                                    value={formData.organizationName}
                                    onChange={handleChange}
                                    placeholder='Name of Organization (Optional)'
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control w-100"
                                    name="street"
                                    value={formData.street}
                                    onChange={handleChange}
                                    placeholder='Street'
                                />
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <input
                                        type="text"
                                        className="form-control w-100"
                                        name="lane"
                                        value={formData.lane}
                                        onChange={handleChange}
                                        placeholder='Lane'
                                    />
                                </div>
                                <div className='col'>
                                    <input
                                        type="text"
                                        className="form-control w-100 mb-3"
                                        name="postalCode"
                                        value={formData.postalCode}
                                        onChange={handleChange}
                                        placeholder='Postal code'
                                    />
                                </div>
                            </div>
                            <div>
                                <button type='submit' className='mt-5 btn btn-primary w-100 text-uppercase text-white fs-5 fw-medium'>submit</button>
                            </div>
                        </form>
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

export default GetQuote