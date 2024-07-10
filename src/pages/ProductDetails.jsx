import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import DressCodeApi from '../common';
import colorCodes from '../helpers/colorCodes';
import formatColorName from '../helpers/formatColorName';
import ProductSlider from '../components/ProductSlider';
import Breadcrumb from '../components/Breadcrumb';


const ProductDetails = () => {

    const { productId, color, productType, subCategory, category, groupName } = useParams();
    const [loading, setLoading] = useState(true);
    const loadingList = new Array(5).fill(null);
    const [data, setData] = useState({});

    const [availableColors, setAvailableColors] = useState([]);

    const [colorHexCodes, setColorHexCodes] = useState({});


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(DressCodeApi.getProductDetailsWithSpecificVariant.url + `?groupName=${groupName}&productId=${productId}&color=${color}`);
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
    }, [productId, color, productType, subCategory, category, groupName]);


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
                {/* <Breadcrumb
                    groupName={groupName} category={category} subCategory={subCategory} productType={productType}
                /> */}
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
                            <>
                                {
                                    data.sizes && data.sizes.length > 0 && (
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
                            </>
                        )
                    }
                </div>
                <div className='check_scale'>
                    <p className='fs-4 fw-normal text-primary mt-2'>Check scale size</p>
                </div>
                <div className='qty d-flex align-items-center gap-3'>
                    <span className='fs-5 fw-normal'>Qty</span>
                    <div className='update_qty d-flex align-items-center gap-3 px-2 border rounded'>
                        <span className='fs-2 fw-normal'>-</span>
                        <span className='fs-4 fw-normal'>100</span>
                        <span className='fs-2 fw-normal'>+</span>
                    </div>
                    <span><i className="fa-regular fa-trash-can fs-4"></i></span>
                </div>
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
                <div className='pr__dt'>
                    <h3 className='fs-3 fw-normal text-primary mt-4'>Product Details</h3>
                    <p className='fs-5 fw-normal mt-2'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                </div>
            </div>

        </section>
    )
}

export default ProductDetails