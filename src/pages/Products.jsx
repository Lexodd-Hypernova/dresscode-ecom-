import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import DressCodeApi from '../common';
import s1 from "../../public/images/s1.png";

const Products = () => {

    const { groupName, category, subCategory, productType, gender } = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const loadingList = new Array(8).fill(null);
    const [variants, setVariants] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(DressCodeApi.getProductsByFilters.url + `?groupName=${groupName}&category=${category}&subCategory=${subCategory}&productType=${productType}&gender=${gender}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const result = await response.json();
                setData(result[0]);
                setVariants(result[0].variants)

                setLoading(false);
                console.log("result", result[0].variants);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [groupName, category, subCategory, productType, gender]);

    const handleChange = async (e) => {
        // e.preventDefault();
        setLoading(true);
        const size = e.target.value;
        console.log(e.target.value);
        try {
            const response = await fetch(DressCodeApi.getProductsByFilters.url + `?groupName=${groupName}&category=${category}&subCategory=${subCategory}&productType=${productType}&gender=${gender}&size=${size}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json();
            setData(result[0]);
            setVariants(result[0].variants)

            setLoading(false);
            console.log("result", result[0].variants);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    }


    return (
        <>

            <section className='filters'>
                <div className='size__Filter'>
                    <div class="dropdown">
                        <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                            Dropdown form
                        </button>
                        <form className="dropdown-menu p-4" onChange={handleChange}>
                            <div className='row row-gap-3'>
                                <div className='col-6'>
                                    <div className='form-check'>

                                        <input className="form-check-input" type="checkbox" id="checkboxNoLabel1" value="S" aria-label="..." />
                                        <label className="form-check-label" for="checkboxNoLabel1">S</label>
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <div className='form-check'>

                                        <input className="form-check-input" type="checkbox" id="checkboxNoLabel2" value="M" aria-label="..." />
                                        <label className="form-check-label" for="checkboxNoLabel2">M</label>
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <div className='form-check'>

                                        <input className="form-check-input" type="checkbox" id="checkboxNoLabel3" value="L" aria-label="..." />
                                        <label className="form-check-label" for="checkboxNoLabel3">L</label>
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <div className='form-check'>

                                        <input className="form-check-input" type="checkbox" id="checkboxNoLabel4" value="XL" aria-label="..." />
                                        <label className="form-check-label" for="checkboxNoLabel4">XL</label>
                                    </div>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </section>

            <section className='categories'>
                {loading ?
                    <div className='container-fluid'>
                        <div className='row row-gap-5'>{
                            loadingList.map((item, index) => {
                                return (
                                    <div className="col-lg-4">
                                        <div className='placeholder-glow' style={{ height: "50vh" }}>
                                            <span className="placeholder d-inline-block h-100 w-100"></span>
                                        </div>
                                        <h5 class="placeholder-glow">
                                            <span class="placeholder d-inline-block w-100"></span>
                                        </h5>
                                    </div>
                                )
                            })
                        }
                        </div>
                    </div>
                    : (
                        <div className="container-fluid text-center">
                            <div className="row row-gap-5">
                                {variants.map((item, index) => (
                                    <div className="col-lg-3" key={index}>
                                        <img src={s1} alt="" className="w-100" />
                                        <h5 key={index} className='srt__Name'>{item.variantId}</h5>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
            </section>
        </>
    )
}

export default Products