import React from "react";
import './card.css';
import Card from "./Card";

const CardGrid = () => {
  return (
    <div className="grid-container">
      <div className="card-grid">
        <Card />
      </div>
    </div>
  );
};

export default CardGrid;
