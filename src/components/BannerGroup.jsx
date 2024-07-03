import React, { useState, useEffect } from 'react';
import DressCodeApi from '../common';
import "./bannerGroup.css";
import { Link } from 'react-router-dom';
import scrollTop from '../helpers/scrollTop';
const BannerGroup = () => {

    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        try {
            setLoading(true)
            const response = await fetch(DressCodeApi.getGroups.url, requestOptions);
            const result = await response.json();
            setLoading(false)
            setGroups(result);
            console.log('Fetched result:', result); // Log fetched data
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <section className='group__Slider'>
            {loading ? (
                <div className="placeholder-glow w-100 vh-100 rounded-14">
                    <span className="placeholder h-100 d-inline-block w-100"></span>
                </div>
            ) : (
                <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        {groups.map((item, index) => (
                            <button
                                key={index}
                                type="button"
                                data-bs-target="#carouselExampleIndicators"
                                data-bs-slide-to={index}
                                className={index === 0 ? "active" : ""}
                                aria-current={index === 0 ? "true" : "false"}
                                aria-label={`Slide ${index + 1}`}
                            ></button>
                        ))}
                    </div>
                    <div className="carousel-inner">
                        {groups.map((item, index) => (
                            <Link to={`/category/${item.groupName}`} key={index} className={`carousel-item ${index === 0 ? "active" : ""}`} onClick={scrollTop}>
                                <img src="images/c1.png" className="d-block w-100" alt={item.groupName} />
                                <div className="carousel-caption d-none d-md-block">
                                    <h5 className='cat__Lbl'>{item.groupName}</h5>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            )}
        </section>
    )
}

export default BannerGroup