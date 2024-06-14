import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/Header/NavBar";
import HeadSection from "../components/HeadSection";
import CardGrid from "../components/CardGrid";
import AdContainer from "../components/AdContainer";
import Footer from "../components/Footer";
import sharedContext from "../context/SharedContext";

const ProductPage = () => {
  const { setSelectedCategory } = useContext(sharedContext);
  const { category } = useParams(); // Get the category from URL parameters

  useEffect(() => {
    // Set selected category based on route parameter
    setSelectedCategory(category);
  }, [category]);

  return (
    <>
      <NavBar />
      <HeadSection />
      <CardGrid />
      <AdContainer />
      <Footer />
    </>
  );
};

export default ProductPage;
