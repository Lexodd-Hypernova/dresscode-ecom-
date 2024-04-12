import React from "react";
import './adContainer.css';
import KidsinUniform from '../assets/kidsinuniform.png';

const AdContainer = () => {
    const handleButtonHover = (buttonId) => {
        const buttons = document.querySelectorAll('.ad-buttons button');
        buttons.forEach((button, index) => {
          if (index === buttonId) {
            button.style.transform = `scale(1.2)`;
          } else {
            button.style.transform = `scale(0.7)`;
          }
        });
      };
      
      const handleButtonMouseOut = () => {
        const buttons = document.querySelectorAll('.ad-buttons button');
        buttons.forEach((button) => {
          button.style.transform = `scale(1.15)`;
        });
      };

  return (
    <div className="ad-container">
        <div className="ad-content">
            <div className="ad-head">
                <h2>Lorem, ipsum dolor.</h2>
            </div>
            <div className="ad-body">
                <p>Lorem ipsum dolor sit amet,</p>
                <p>consectetur adipiscing elit,</p>
                <p>sed do </p>
            </div>
            <div className="ad-buttons">
                <div className="button-one">
                    <button onMouseOver={() => handleButtonHover(0)} onMouseOut={handleButtonMouseOut}>SCHOOL UNIFOMRS</button>
                </div>
                <div className="button-two">
                    <button onMouseOver={() => handleButtonHover(1)} onMouseOut={handleButtonMouseOut}>APRONS</button>
                </div>
            </div>
        </div>
        <div className="ad-image">
            <img src={KidsinUniform} alt="Kids in uniform" />
        </div>
    </div>
  );
};

export default AdContainer;
