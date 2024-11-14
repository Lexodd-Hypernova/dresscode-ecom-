import React, { useState, useEffect } from 'react';
import DressCodeApi from '../common';
import axios from 'axios';
import { Link, useParams, useNavigate } from "react-router-dom";
import "./pages-styles/school.style.css";
const Schools = () => {
    const navigate = useNavigate(); // Initialize navigate from react-router-dom

    const [loading, setLoading] = useState(false);
    const loadingList = new Array(8).fill(null);

    const [schoolNames, setSchoolNames] = useState([]);

    const getSchoolNames = async () => {
        setLoading(true)
        try {
            const response = await axios.get(DressCodeApi.getSchoolNames.url);
            // console.log("school response", response.data);
            setSchoolNames(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

    }

    useEffect(() => {
        getSchoolNames();
    }, [])


    const handleClick = (name) => {
        // console.log(name);
        navigate(`/school-products/${name}`)
    }



    return (
        <section className="card-section">


            {
                loading ? (
                    <div className='container-fluid'>
                        <div className='row row-gap-5'>{
                            loadingList.map((item, index) => {
                                return (
                                    <div className="col-lg-4" key={index}>
                                        <div className='placeholder-glow' style={{ height: "50vh" }}>
                                            <span className="placeholder d-inline-block h-100 w-100"></span>
                                        </div>
                                        <h5 className="placeholder-glow">
                                            <span className="placeholder d-inline-block w-100"></span>
                                        </h5>
                                    </div>
                                )
                            })
                        }
                        </div>
                    </div>
                ) : (

                    <div className="container-fluid">
                        <div className="school_con">
                            {schoolNames.map((name, index) => (
                                <div className="scl_item" role="button" key={index} onClick={() => handleClick(name)}>
                                    <h3 className="fs-3">{name}</h3>
                                    <button>View Products</button>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            }
        </section >
    )
}

export default Schools
