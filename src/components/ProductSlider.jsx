import React, { useState } from 'react';
import ReactImageMagnify from 'react-image-magnify';

const productImages = [
    "/images/s1.png", "/images/s2.png",
    "/images/s3.png", "/images/s4.png"
]

const ProductSlider = () => {

    const [activeImage, setActiveImage] = useState(productImages[0]);
    const [startIndex, setStartIndex] = useState(0);

    const handleMouseEnterProduct = (imageURL) => {
        setActiveImage(imageURL)
    }

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
                    style={{ zIndex: "9999" }}
                    smallImage={{
                        alt: '',
                        isFluidWidth: true,
                        src: `${activeImage}`,
                        // srcSet: srcSet,
                        // sizes: '(min-width: 800px) 33.5vw, (min-width: 415px) 50vw, 100vw',
                    }}
                    largeImage={{
                        alt: '',
                        src: `${activeImage}`,
                        width: 1200,
                        height: 1800,
                    }}
                    isHintEnabled={true}
                />
            </div>

        </div>
    )
}

export default ProductSlider