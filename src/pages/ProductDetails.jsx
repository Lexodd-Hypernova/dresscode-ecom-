import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import DressCodeApi from '../common';
import colorCodes from '../helpers/colorCodes';
import formatColorName from '../helpers/formatColorName';
import ProductSlider from '../components/ProductSlider';


const ProductDetails = () => {

    const { groupName, productId, color, size } = useParams();
    const [loading, setLoading] = useState(true);
    const loadingList = new Array(5).fill(null);
    const [data, setData] = useState({});

    const [availableColors, setAvailableColors] = useState([]);

    const [colorHexCodes, setColorHexCodes] = useState({});


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(DressCodeApi.getProductDetailsWithSpecificVariant.url + `?groupName=${groupName}&productId=${productId}&color=${color}&size=${size}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const result = await response.json();

                setData(result);

                setLoading(false);

                console.log("productAllData", result);


            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [groupName, productId, color, size]);


    useEffect(() => {
        if (data.colors && data.colors.length > 0) {
            const hexCodes = {};
            data.colors.forEach(color => {
                const formattedColor = formatColorName(color.trim());
                hexCodes[color] = colorCodes[formattedColor] || '#000000'; // default to black if color not found
            });
            setColorHexCodes(hexCodes);
            console.log("hexCodes", hexCodes)
        }
    }, [data.colors]);

    useEffect(() => {
        if (data.colors && data.available) {
            const { colors, available } = data;
            const availableColors = available.map(item => formatColorName(item.color));
            setAvailableColors(availableColors);
            console.log("availableColors", availableColors)
        }
    }, [data.colors, data.available]);


    return (
        <section className='product__Details'>

            <ProductSlider />

            <div className='productContent mt-5'>
                <h2 className='pr_name mt-5'>Product Name</h2>
                <div className='pr_rating'>
                    <button type="button" class="btn btn-success fs-5">4.5</button>
                    <span className='ms-2 fs-5'>10 Ratings</span>
                </div>
                <div className='pr_price fs-3 my-2 fw-normal'>
                    MRP ₹ 499.00
                </div>
                <div className='var__Color'>
                    <span className='fs-3 mt-2 fw-normal'>Color</span>
                    {

                        loading ? (
                            <div className="d-flex mt-2 gap-2">
                                {
                                    loadingList.map((item, index) => (
                                        <div key={index} className='placeholder-glow' style={{ width: "48px", height: "48px" }}>
                                            <span className="placeholder h-100 w-100 rounded-circle"></span>
                                        </div>
                                    ))
                                }
                            </div>
                        ) : (
                            <>
                            {
                                data.colors && data.colors.length > 0 && (
                                    <div className='mt-2 d-flex gap-2'>
                                        {data.colors.map((color, index) => (
                                            <Link to={`/${groupName}/${productId}/${color}`}
                                                className={`btn rounded-circle ${availableColors.includes(color) ? '' : 'disabled'}`}
                                                id={`color${color}`}
                                                style={{ backgroundColor: colorHexCodes[color], width: "32px", height: "32px", }}
                                                key={index}
                                            />
                                        ))}
                                    </div>
                                )
                            }
                            </>
                            

                        )
                    }


                </div>
                <div className='var_sizes mt-3 '>
                    <span className='fs-3 fw-normal'>Sizes & fits</span>
                    {
                        loading ? (
                            <div className="d-flex mt-3 gap-2">
                                {
                                    loadingList.map((item, index) => (
                                        <div key={index} className='placeholder-glow' style={{ width: "48px", height: "48px" }}>
                                            <span className="placeholder h-100 w-100 rounded-circle"></span>
                                        </div>
                                    ))
                                }
                            </div>

                        ) : (
                            <div className='sizes mt-3 d-flex gap-2'>
                                {data.sizes.map((size, index) => (
                                    <span
                                        className="size_item fs-5 fw-normal"
                                        id={`size${size}`}
                                        key={index}
                                    >
                                        {size}
                                    </span>
                                ))}
                            </div>
                        )
                    }
                </div>
                <div className='qty'></div>
                <div className='row row-gap-4 mt-5'>
                    <div class="d-grid col-6">
                        <button class="btn btn-outline-secondary fs-5 fw-normal text-capitalize" type="button">
                            Add to bag
                        </button>
                    </div>
                    <div class="d-grid col-6">
                        <button class="btn btn-primary fs-5 fw-normal text-capitalize" type="button">
                            Get a quote
                        </button>
                    </div>
                    <div class="d-grid col-6">
                        <button class="btn btn-outline-primary fs-5 fw-normal text-capitalize" type="button">
                            Save to wishlist
                        </button>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default ProductDetails