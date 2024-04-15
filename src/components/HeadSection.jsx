import React, { useContext, useState } from "react";
import '../index.css';
import sharedContext from "../context/SharedContext";

const HeadSection = () => {
    const {selectedCategory, setSelectedCategory} = useContext(sharedContext);

    const hangleChange = (e) => {
        setSelectedCategory(e.target.value)
    }

  return (
    <div className="head-sec">
        <div className="heading">
            <h1>{selectedCategory}</h1>
        </div>
        <div className="head-body">
            <div className="category-btn">
                <select id="" onChange={hangleChange} value={selectedCategory}>
                    <option value="All Uniforms">All Uniforms</option>
                    <option value="Aprons">Aprons</option>
                    <option value="Corporate">Corporate</option>
                    <option value="Skirts">Skirts</option>
                    <option value="Pants">Pants</option>
                    <option value="Trousers">Trousers</option>
                    <option value="Accessories">Accessories</option>
                </select>
            </div>
            <div className="dresscode">
                <p>DressCode Elevating Excellence, Unparalleled quality, innovation,
                 and service tailored to your needs. Embark on a journey with us for the finest in business attire.
                </p>
            </div>
        </div>
    </div>
  );
};

export default HeadSection;
