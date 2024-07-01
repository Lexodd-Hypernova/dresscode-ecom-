import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DressCodeApi from '../common';
import s1 from "../../public/images/s1.png";

const ProductTypes = () => {

    const { groupName, category, subCategory } = useParams();
    const [data, setData] = useState([]);
    const [selectedGender, setSelectedGender] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(DressCodeApi.getProductTypes.url + `?groupName=${groupName}&category=${category}&subCategory=${subCategory}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const result = await response.json();
                setData(result);
                if (result.length > 0) {
                    setSelectedGender(result[0].gender);
                }

                setLoading(false);
                console.log(result);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [groupName, category, subCategory]);

    const handleGenderClick = (gender) => {
        setSelectedGender(gender);
    };

    const getGenders = () => {
        return [...new Set(data.map(item => item.gender))];
    };

    const getProductTypesByGender = (gender) => {
        return data.filter(item => item.gender === gender).flatMap(item => item.productTypes);
    };

    return (
        <>
            {loading ? (
                <div className='container-fluid'>
                    <div className='row row-cols-1 row-cols-md-3 g-4'>
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div className="col" key={index}>
                                <div className='placeholder-glow' style={{ height: "60vh" }}>
                                    <span className="placeholder d-inline-block h-100 w-100"></span>
                                </div>
                                <h5 className="placeholder-glow">
                                    <span className="placeholder d-inline-block w-100"></span>
                                </h5>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <section className='select__Gender'>
                    <nav className='gen_Nav'>
                        <div className="nav nav-underline gen_nav-tab" id="nav-tab" role="tablist">
                            {getGenders().map((gender, index) => (
                                <button
                                    key={gender}
                                    className={`nav-link gen-tab ${selectedGender === gender ? 'active' : ''}`}
                                    id={`nav-${gender.toLowerCase()}-tab`}
                                    data-bs-toggle="tab"
                                    data-bs-target={`#nav-${gender.toLowerCase()}`}
                                    type="button"
                                    role="tab"
                                    aria-controls={`nav-${gender.toLowerCase()}`}
                                    aria-selected={selectedGender === gender}
                                    onClick={() => handleGenderClick(gender)}
                                >
                                    {gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase()}
                                </button>
                            ))}
                        </div>
                    </nav>
                    <div className="tab-content" id="nav-tabContent">
                        {getGenders().map(gender => (
                            <div
                                key={gender}
                                className={`tab-pane fade ${selectedGender === gender ? 'active show' : ''}`}
                                id={`nav-${gender.toLowerCase()}`}
                                role="tabpanel"
                                aria-labelledby={`nav-${gender.toLowerCase()}-tab`}
                            >
                                <div className="container-fluid text-center">
                                    <div className="row row-gap-5">
                                        {getProductTypesByGender(gender).map((productType, index) => (
                                            <div className="col-lg-4" key={index}>
                                                <img src={s1} alt={productType.type} className="w-100" />
                                                <h5 className='srt__Name'>{productType.type}</h5>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </>
    );
};

export default ProductTypes;
