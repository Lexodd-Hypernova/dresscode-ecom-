import React, { useContext, useEffect, useState } from "react";
import './card.css';
import CardImage from '../assets/card.jpg';
import sharedContext from "../context/SharedContext";
import { useNavigate } from "react-router-dom";

const Card = () => {
  const {selectedCategory, setSelectedCard} = useContext(sharedContext);
  const [cardsData, setCardsData] = useState([]);
  const navigate = useNavigate();

  // Assuming fetchData function fetches data from an API
  const fetchData = async () => {
    try {
      // Fetch data from API
      // const response = await fetch('API_URL');
      // const data = await response.json();
      
      // Sample data for demonstration
      const data = [
        { id: 1, imageUrl: CardImage, title: 'SURGEON SUIT', price: '49.99' },
        { id: 2, imageUrl: CardImage, title: 'SURGEON SUIT', price: '49.99' },
        { id: 3, imageUrl: CardImage, title: 'SURGEON SUIT', price: '49.99' },
        { id: 4, imageUrl: CardImage, title: 'SURGEON SUIT', price: '49.99' },
        { id: 5, imageUrl: CardImage, title: 'SURGEON SUIT', price: '49.99' },
        { id: 6, imageUrl: CardImage, title: 'SURGEON SUIT', price: '49.99' },
        { id: 7, imageUrl: CardImage, title: 'SURGEON SUIT', price: '49.99' },
        { id: 8, imageUrl: CardImage, title: 'SURGEON SUIT', price: '49.99' },
        { id: 9, imageUrl: CardImage, title: 'SURGEON SUIT', price: '49.99' },
        // Add more data as needed
      ];

      setCardsData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchApronsData = async () => {
    try {
      // Fetch data from API
      // const response = await fetch('API_URL');
      // const data = await response.json();
      
      // Sample data for demonstration
      const data = [
        { id: 1, imageUrl: CardImage, title: 'APRONS', price: '29.99' },
        { id: 2, imageUrl: CardImage, title: 'APRONS', price: '29.99' },
        { id: 3, imageUrl: CardImage, title: 'APRONS', price: '29.99' },
        { id: 4, imageUrl: CardImage, title: 'APRONS', price: '29.99' },
        { id: 5, imageUrl: CardImage, title: 'APRONS', price: '29.99' },
        { id: 6, imageUrl: CardImage, title: 'APRONS', price: '29.99' },
        // Add more data as needed
      ];

      setCardsData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const fetchCorporateData = async () => {
    try {
      // Fetch data from API
      // const response = await fetch('API_URL');
      // const data = await response.json();
      
      // Sample data for demonstration
      const data = [
        { id: 1, imageUrl: CardImage, title: 'CORPORATE', price: '29.99' },
        { id: 2, imageUrl: CardImage, title: 'CORPORATE', price: '29.99' },
        { id: 3, imageUrl: CardImage, title: 'CORPORATE', price: '29.99' },
        { id: 4, imageUrl: CardImage, title: 'CORPORATE', price: '29.99' },
        { id: 5, imageUrl: CardImage, title: 'CORPORATE', price: '29.99' },
        { id: 6, imageUrl: CardImage, title: 'CORPORATE', price: '29.99' },
        // Add more data as needed
      ];

      setCardsData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchSkirtsData = async () => {
    try {
      // Fetch data from API
      // const response = await fetch('API_URL');
      // const data = await response.json();
      
      // Sample data for demonstration
      const data = [
        { id: 1, imageUrl: CardImage, title: 'SKIRTS', price: '49.99' },
        { id: 2, imageUrl: CardImage, title: 'SKIRTS', price: '49.99' },
        { id: 3, imageUrl: CardImage, title: 'SKIRTS', price: '49.99' },
        { id: 4, imageUrl: CardImage, title: 'SKIRTS', price: '49.99' },
        // Add more data as needed
      ];

      setCardsData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchPantsData = async () => {
    try {
      // Fetch data from API
      // const response = await fetch('API_URL');
      // const data = await response.json();
      
      // Sample data for demonstration
      const data = [
        { id: 1, imageUrl: CardImage, title: 'PANTS', price: '49.99' },
        { id: 2, imageUrl: CardImage, title: 'PANTS', price: '49.99' },
        { id: 3, imageUrl: CardImage, title: 'PANTS', price: '49.99' },
        { id: 4, imageUrl: CardImage, title: 'PANTS', price: '49.99' },
        // Add more data as needed
      ];

      setCardsData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchTrousersData = async () => {
    try {
      // Fetch data from API
      // const response = await fetch('API_URL');
      // const data = await response.json();
      
      // Sample data for demonstration
      const data = [
        { id: 1, imageUrl: CardImage, title: 'TROUSERS', price: '49.99' },
        { id: 2, imageUrl: CardImage, title: 'TROUSERS', price: '49.99' },
        { id: 3, imageUrl: CardImage, title: 'TROUSERS', price: '49.99' },
        { id: 4, imageUrl: CardImage, title: 'TROUSERS', price: '49.99' },
        // Add more data as needed
      ];

      setCardsData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchAccessoriesData = async () => {
    try {
      // Fetch data from API
      // const response = await fetch('API_URL');
      // const data = await response.json();
      
      // Sample data for demonstration
      const data = [
        { id: 1, imageUrl: CardImage, title: 'ACCESSORIES', price: '49.99' },
        { id: 2, imageUrl: CardImage, title: 'ACCESSORIES', price: '49.99' },
        { id: 3, imageUrl: CardImage, title: 'ACCESSORIES', price: '49.99' },
        { id: 4, imageUrl: CardImage, title: 'ACCESSORIES', price: '49.99' },
        // Add more data as needed
      ];

      setCardsData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // Call the appropriate fetch function based on selectedCategory
    if (selectedCategory === 'All Uniforms') {
      fetchData();
    } else if (selectedCategory === 'Skirts') {
      fetchSkirtsData();
    } else if (selectedCategory === 'Aprons') {
      fetchApronsData();
    } else if (selectedCategory === 'Corporate') {
      fetchCorporateData();
    } else if (selectedCategory === 'Pants') {
      fetchPantsData();
    } else if (selectedCategory === 'Trousers') {
      fetchTrousersData();
    } else if (selectedCategory === 'Accessories') {
      fetchAccessoriesData();
    }
    // Add more conditions for other categories if needed
  }, [selectedCategory]); // Fetch data when selectedCategory changes

  const handleCardClick = (productId, productName, productImage, productPrice) => {
    setSelectedCard({
      id: productId,
      title: productName,
      imageUrl: productImage,
      price: productPrice
    });
    // Navigate to ProductDetailsPage with the selected product ID
    navigate(`/productPage/${productId}/${productName}`);
  };

  return (
    <>
        {cardsData.map((card, index) => (
          <div className="card" key={index} onClick={() => handleCardClick(card.id, card.title, card.imageUrl, card.price)}>
            <div className="card-image-sec">
              <img src={card.imageUrl} alt="Product Image" />
            </div>
            <div className="card-details-sec">
              <p>{card.title}</p>
              <p>{card.price}</p>
            </div>
          </div>
        ))}
    </>   
  );
};

export default Card;
