import React from "react";
import NavBar from "../components/Header/Header";
import ProductDetails from "../components/ProductDetails";
import RelatedCategory from "../components/RelatedCategory";
import OurProducts from "../components/OurProducts";
import Footer from "../components/Footer";
import SatCus from "../assets/satCus.png";

const ProductDetailsPage = () => {
  return (
    <>
      <NavBar />
      <ProductDetails />
      <RelatedCategory />
      <OurProducts />
      <div>
        <div className="sat-cus">
          <div className="sat-head">
            <p>100% SATISFIED</p>
            <p>CUSTOMERS</p>
          </div>
          <div className="sat-img">
            <img src={SatCus} alt="Satisfied customers" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetailsPage;
