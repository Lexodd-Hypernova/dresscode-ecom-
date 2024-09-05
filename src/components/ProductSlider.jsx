import React, { useEffect, useState } from 'react';
import ReactImageMagnify from 'react-image-magnify';

const ProductSlider = ({ productData }) => {
    const [productImages, setProductImages] = useState([]);

    useEffect(() => {
        if (productData && productData.productDetails && productData.productDetails.variants && productData.productDetails.variants.length > 0) {
            console.log("coming from products", productData);
            setProductImages(productData.productDetails.variants[0].imageUrls);
        }
    }, [productData]);

    const [activeImage, setActiveImage] = useState(productImages[0]);
    const [startIndex, setStartIndex] = useState(0);

    useEffect(() => {
        if (productImages.length > 0) {
            setActiveImage(productImages[0]);
        }
    }, [productImages]);

    const handleMouseEnterProduct = (imageURL) => {
        setActiveImage(imageURL);
    };

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

    return (
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
                <ReactImageMagnify
                    style={{ zIndex: "9" }}
                    smallImage={{
                        alt: '',
                        isFluidWidth: true,
                        src: activeImage,
                    }}
                    largeImage={{
                        alt: '',
                        src: activeImage,
                        width: 1200,
                        height: 1800,
                    }}
                    isHintEnabled={true}
                />
            </div>
        </div>
    );
};

export default ProductSlider;
