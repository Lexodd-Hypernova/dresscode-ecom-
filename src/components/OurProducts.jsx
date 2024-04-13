import React from "react";
import './ourProducts.css';
import OurProd from '../assets/ourProducts.png';
import Tick from '../assets/tick.svg';
import Prod from '../assets/products.svg';

const OurProducts = () => {
  return (
    <div className="products">
        <div className="products-sec">
            <div className="products-sec-list">
                <div className="head">
                    <h3>OUR PRODUCTS</h3>
                    <img src={Prod} alt="Our products" />
                </div>
            </div>
            <div className="products-sec-image">
                <img src={OurProd} alt="" />
            </div>
            <div className="products-sec-tag">
                <p>Elevate your uniform experience with us, where quality and style unite seamlessly.
                 Explore our store today and find the perfect fit for your unique needs.</p>
            </div>
        </div>
        <div className="list">
                    <div className="list-item">
                        <p>a large selection of school uniforms</p>
                        <img src={Tick} alt="List item" />
                    </div>
                    <div className="list-item">
                        <p>a large selection of school uniforms</p>
                        <img src={Tick} alt="List item" />
                    </div>
                    <div className="list-item">
                        <p>a large selection of school uniforms</p>
                        <img src={Tick} alt="List item" />
                    </div>
                    <div className="list-item">
                        <p>a large selection of school uniforms</p>
                        <img src={Tick} alt="List item" />
                    </div>
        </div>
    </div>
  );
};

export default OurProducts;
