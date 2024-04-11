import React from "react";
import './card.css';
import CardImage from '../assets/card.jpg';

const Card = () => {
  return (
    <div className="card">
        <div className="card-image-sec">
            <img src={CardImage} alt="Product Image" />
        </div>
        <div className="card-details-sec">
            <p>SURGEON SUIT</p>
            <p>$49.99</p>
        </div>
    </div>
  );
};

export default Card;
