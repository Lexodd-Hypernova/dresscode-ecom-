import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DressCodeApi from '../../common';

const colorCodes = {
    "black": "#000000",
    "sage_green": "#B2AC88",
    "cherry_lacquer": "#532D3A",
    "electric_indigo": "#6f00ff",
    "mauve": "#E0B0FF",
    "celestial_yellow": "#FFE6A2",
    "dusted_grape": "#ab92b3",
    "sepia_midnight_plum": "#553842",
    "terracotta": "#E2725B",
    "digital_mist": "#646D7E",
    "olive_green": "#BAB86C",
    "camouflage": "#78866b",
    "navy_blue": "#000080",
    "sky_blue": "#87CEEB",
    "white": "#ffffff",
    "indigo": "#4B0082",
    "green": "#00FF00",
    "gray": "#808080",
    "red": "#ff0000",
    "maroon": "#800000"
};

const formatColorName = (str) => {
    return str.toLowerCase().replace(/\s+/g, '_');
};

const FilterApi = () => {
    const { groupName, category, subCategory, productType, gender } = useParams();
    const [filters, setFilters] = useState({});
    const [loading, setLoading] = useState(true);

    // const [colorNames, setColorNames] = useState([]);
    // const [hexCodes, setHexCodes] = useState([]);

    const [colorHexCodes, setColorHexCodes] = useState({});



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(DressCodeApi.getProductFilters.url + `?groupName=${groupName}&category=${category}&subCategory=${subCategory}&productType=${productType}&gender=${gender}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const result = await response.json();
                setFilters(result);
                // setColorNames(result.colors);
                setLoading(false);
                console.log("filters", result);

            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [groupName, category, subCategory, productType, gender]);

    useEffect(() => {
        if (filters.colors && filters.colors.length > 0) {
            const hexCodes = {};
            filters.colors.forEach(color => {
                const formattedColor = formatColorName(color.trim());
                hexCodes[color] = colorCodes[formattedColor] || '#000000'; // default to black if color not found
            });
            setColorHexCodes(hexCodes);
        }
    }, [filters.colors]);

    return (

        <section className='filters'>


            {loading ?
                <div className='placeholder-glow'>
                    <span className="placeholder d-inline-block h-100 w-100"></span>
                </div>
                : (
                    <Filters filters={filters} colorHexCodes={colorHexCodes} />
                )}
        </section>
    );
};

const Filters = ({ filters, colorHexCodes }) => {
    return (
        <div className='filter__Inner'>
            {
                filters.fabrics && filters.fabrics.length > 0 && (
                    <div className='fabric__Filter filter'>
                        <div class="dropdown-center d-flex justify-content-center">
                            <button type="button" className="btn btn-light dropdown-toggle py-3" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                                Fabrics
                            </button>
                            <form className="dropdown-menu p-4">
                                <div className='row row-gap-3'>
                                    {filters.fabrics.map((fabric, index) => (
                                        <div className='col-6' key={index}>
                                            <div className='form-check'>
                                                <input className="form-check-input" type="checkbox" id={`fabric${fabric}`} value={fabric} aria-label="..." />
                                                <label className="form-check-label" for={`fabric${fabric}`}>{fabric}</label>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }

            {
                filters.colors && filters.colors.length > 0 && (
                    <>
                        <div className='color__Filter filter'>
                            <div className="dropdown-center d-flex justify-content-center">
                                <button
                                    type="button"
                                    className="btn btn-light dropdown-toggle py-3"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    data-bs-auto-close="outside"
                                >
                                    Color
                                </button>
                                <form className="dropdown-menu p-4">
                                    <div className='row row-gap-3'>
                                        {filters.colors.map((color, index) => (
                                            <div className='col-6' key={index}>
                                                <div className='form-check'>
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id={`color${color}`}
                                                        value={color}
                                                        aria-label="..."
                                                        style={{ backgroundColor: colorHexCodes[color] }}
                                                    />
                                                    <label className="form-check-label" htmlFor={`color${color}`}>
                                                        {color}
                                                    </label>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </>
                )
            }

            {
                filters.sleeves && filters.sleeves.length > 0 && (
                    <div className='sleeve__Filter filter'>
                        <div class="dropdown-center d-flex justify-content-center">
                            <button type="button" className="btn btn-light dropdown-toggle py-3" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                                Sleeves
                            </button>
                            <form className="dropdown-menu p-4">
                                <div className='row row-gap-3'>
                                    {filters.sleeves.map((sleeve, index) => (
                                        <div className='col-6' key={index}>
                                            <div className='form-check'>
                                                <input className="form-check-input" type="checkbox" id={`sleeve${sleeve}`} value={sleeve} aria-label="..." />
                                                <label className="form-check-label" for={`sleeve${sleeve}`}>{sleeve}</label>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }



            {
                filters.sizes && filters.sizes.length > 0 && (
                    <>
                        <div className='size__Filter filter'>
                            <div class="dropdown-center d-flex justify-content-center">
                                <button type="button" className="btn btn-light dropdown-toggle py-3" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                                    Size
                                </button>
                                <form className="dropdown-menu p-4">
                                    <div className='row row-gap-3'>
                                        {filters.sizes.map((size, index) => (
                                            <div className='col-6' key={index}>
                                                <div className='form-check'>
                                                    <input className="form-check-input" type="checkbox" id={`size${size}`} value={size} aria-label="..." />
                                                    <label className="form-check-label" for={`size${size}`}>{size}</label>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                </form>
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    );
};

export default FilterApi


// const handleChange = async (e) => {
//     setLoading(true);
//     const size = e.target.value;
//     console.log(e.target.value);
//     try {
//         const response = await fetch(DressCodeApi.getProductsByFilters.url + `?groupName=${groupName}&category=${category}&subCategory=${subCategory}&productType=${productType}&gender=${gender}&size=${size}`);
//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const result = await response.json();
//         setData(result[0]);
//         setVariants(result[0].variants)

//         setLoading(false);
//         console.log("result", result[0].variants);
//     } catch (error) {
//         console.error("Error fetching data:", error);
//         setLoading(false);
//     }
// }