import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import DressCodeApi from '../common';
import s1 from "../../public/images/s1.png";
import ReactImageMagnify from 'react-image-magnify';

const productImages = [
    "/images/s1.png", "/images/s2.png",
    "/images/s3.png", "/images/s4.png"
]

const ProductDetails = () => {

    const { groupName, productId, color, size } = useParams();
    const [loading, setLoading] = useState(true);
    const productImageListLoading = new Array(4).fill(null)
    const [data, setData] = useState({});
    // const [productDetails, setProductDetails] = useState({})
    // const [productImage, setProductImage] = useState([]);
    const [activeImage, setActiveImage] = useState(productImages[0]);
    // const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    //     x: 0,
    //     y: 0
    // })
    // const [zoomImage, setZoomImage] = useState(false);
    const [startIndex, setStartIndex] = useState(0);

    const handleNext = () => {
        setStartIndex((prevIndex) => (prevIndex + 1) % productImages.length);
    };

    const handlePrev = () => {
        setStartIndex((prevIndex) => (prevIndex - 1 + productImages.length) % productImages.length);
    };

    const displayedImages = [];
    for (let i = 0; i < 3; i++) {
        displayedImages.push(productImages[(startIndex + i) % productImages.length]);
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(DressCodeApi.getProductDetailsWithSpecificVariant.url + `?groupName=${groupName}&productId=${productId}&color=${color}&size=${size}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const result = await response.json();
                // const productImages = result.productDetails.variants[0].imageUrls;
                setData(result);
                // setProductImage(productImages);
                setActiveImage(productImages[0]);
                setLoading(false);
                // setProductImage
                console.log("productAllData", result);
                // console.log("productDetails", productDetails);

            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [groupName, productId, color, size]);


    const handleMouseEnterProduct = (imageURL) => {
        setActiveImage(imageURL)
    }

    // const handleZoomImage = useCallback((e) => {
    //     setZoomImage(true)
    //     const { left, top, width, height } = e.target.getBoundingClientRect()
    //     console.log("coordinate", left, top, width, height)

    //     const x = (e.clientX - left) / width
    //     const y = (e.clientY - top) / height

    //     setZoomImageCoordinate({
    //         x,
    //         y
    //     })
    // }, [zoomImageCoordinate])

    // const handleLeaveImageZoom = () => {
    //     setZoomImage(false)
    // }

    return (
        <section className='product__Details'>

            <div className="productImage">

                <div className="pr__thumbs">
                    <div className='pr_nav pr_nav-prev'>
                        <button onClick={handlePrev}>
                            <i className="fa-solid fa-chevron-up"></i>
                        </button>
                    </div>

                    <div className="pr__thumbs-inner">
                        {displayedImages.map((imgURL, index) => (
                            <div className="thumb_item" key={imgURL}>
                                <img
                                    src={imgURL}
                                    className=""
                                    onMouseEnter={() => handleMouseEnterProduct(imgURL)}
                                    onClick={() => handleMouseEnterProduct(imgURL)}
                                />
                            </div>
                        ))}
                    </div>
                    <div className='pr_nav pr_nav-nxt'>
                        <button onClick={handleNext}>
                            <i className="fa-solid fa-chevron-down"></i>
                        </button>
                    </div>

                </div>

                <div className='main_Image'>
                    {/* <img
                        src={activeImage}
                        className=""
                        onMouseMove={handleZoomImage}
                        onMouseLeave={handleLeaveImageZoom}
                    /> */}
                    <ReactImageMagnify
                        smallImage={{
                            alt: 'Wristwatch by Ted Baker London',
                            isFluidWidth: true,
                            // src: `${imageBaseUrl}wristwatch_1033.jpg`,
                            src: `${activeImage}`,
                            // srcSet: srcSet,
                            // sizes: '(min-width: 800px) 33.5vw, (min-width: 415px) 50vw, 100vw',
                        }}
                        largeImage={{
                            alt: '',
                            // src: `${imageBaseUrl}wristwatch_1200.jpg`,
                            src: `${activeImage}`,
                            width: 1200,
                            height: 1800,
                        }}
                        isHintEnabled={true}
                    />
                </div>

            </div>

            {/**product zoom */}
            {/* {zoomImage && (
                <div className="zoom_Image">
                    <div
                        className="zoom_Image-inner"
                        style={{
                            background: `url(${activeImage})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`,
                            transform: 'scale(1.5)',
                        }}
                    >
                    </div>
                </div>
            )} */}

        </section>
    )
}

export default ProductDetails