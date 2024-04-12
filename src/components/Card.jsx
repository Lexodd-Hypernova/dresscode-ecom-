import React, { useEffect, useState } from "react";
import './card.css';
import CardImage from '../assets/card.jpg';

const Card = () => {
  const [cardsData, setCardsData] = useState([]);

  // Assuming fetchData function fetches data from an API
  const fetchData = async () => {
    try {
      // Fetch data from API
      // const response = await fetch('API_URL');
      // const data = await response.json();
      
      // Sample data for demonstration
      const data = [
        { id: 1, imageUrl: CardImage, title: 'SURGEON SUIT', price: '$49.99' },
        { id: 2, imageUrl: CardImage, title: 'SURGEON SUIT', price: '$49.99' },
        { id: 3, imageUrl: CardImage, title: 'SURGEON SUIT', price: '$49.99' },
        { id: 4, imageUrl: CardImage, title: 'SURGEON SUIT', price: '$49.99' },
        { id: 5, imageUrl: CardImage, title: 'SURGEON SUIT', price: '$49.99' },
        { id: 6, imageUrl: CardImage, title: 'SURGEON SUIT', price: '$49.99' },
        { id: 7, imageUrl: CardImage, title: 'SURGEON SUIT', price: '$49.99' },
        { id: 8, imageUrl: CardImage, title: 'SURGEON SUIT', price: '$49.99' },
        { id: 9, imageUrl: CardImage, title: 'SURGEON SUIT', price: '$49.99' },
        // Add more data as needed
      ];

      setCardsData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Fetch data on component mount


  return (
    <div className="grid-container">
      <div className="card-grid">
        {cardsData.map((card, index) => (
          <div className="card" key={index}>
            <div className="card-image-sec">
              <img src={card.imageUrl} alt="Product Image" />
            </div>
            <div className="card-details-sec">
              <p>{card.title}</p>
              <p>{card.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
