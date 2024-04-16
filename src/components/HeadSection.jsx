import React, { useContext, useEffect } from "react";
import '../index.css';
import sharedContext from "../context/SharedContext";
import { useLocation, useNavigate } from "react-router-dom";

const HeadSection = () => {
    const {selectedCategory, setSelectedCategory} = useContext(sharedContext);
    const navigate = useNavigate(); // Initialize useHistory
    const location = useLocation();
    
    // Load the selected category from localStorage on component mount
    useEffect(() => {
        const storedCategory = localStorage.getItem("selectedCategory");
        if (storedCategory) {
            console.log(storedCategory);
            setSelectedCategory(storedCategory);
        }
    }, [setSelectedCategory]);

    const handleChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedCategory(selectedValue);
        localStorage.setItem("selectedCategory", selectedValue); // Save selected category to localStorage

        // Redirect to the selected page
        navigate(`/${selectedValue.toLowerCase()}`);
    }

  return (
    <div className="head-sec">
        <div className="heading">
            <h1>{selectedCategory}</h1>
        </div>
        <div className="head-body">
            <div className="category-btn">
                <select id="category" onChange={handleChange} value={selectedCategory}>
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
