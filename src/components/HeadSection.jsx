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
    }, [selectedCategory]);

    const handleChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedCategory(selectedValue);
        localStorage.setItem("selectedCategory", selectedValue); // Save selected category to localStorage

        // Redirect to the selected page, or home page if "All Uniforms" is selected
        if (selectedValue.toLowerCase() === "all uniforms") {
            navigate("/");
        } else {
            navigate(`/${selectedValue.toLowerCase()}`);
        }
    }

     // Function to generate repeated category elements
  const generateRepeatedCategories = () => {
    const numRepetitions = 10; // Number of repetitions for infinite effect
    const categories = Array.from({ length: numRepetitions }, (_, index) => (
      <h1 key={index} className="category-item">
        {selectedCategory}
      </h1>
    ));
    return categories;
  };

  return (
    <div className="head-sec">
        <div className="heading-container">
        {generateRepeatedCategories()}
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
