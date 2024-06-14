import React from 'react';
import "./category.css";
import CategorySlider from './CategorySlider';


const Category = () => {
    return (
        <>
            <section className="home__Ttl-con">
                <div className="hm_ct-ttl">
                    <h3>Category</h3>
                    <div className="bt_arw">
                        <img src="images/arrow-down.png" alt="" />
                    </div>
                </div>
                <div className="hm__Ttl-para">
                    <p>DressCode Elevating Excellence <img src="images/hm-ttl.png" alt="" /> Unparalleled quality,
                        innovation, and service tailored to your needs.
                        Embark on a journey with us for the finest in business attire.
                    </p>
                </div>
            </section>
            <CategorySlider></CategorySlider>
        </>
    )
}

export default Category