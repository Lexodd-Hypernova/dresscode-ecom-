import React from "react";
import BannerGroup from "../components/BannerGroup";
import Cards from "../components/Cards/Cards";
import CouponSection from "../components/CouponSection";
import Blog from "../components/blog/Blog";
import { Helmet } from "react-helmet-async";

function Home() {
  return (
    <>
      <Helmet>
        <title>Buy School, Medical & Corporate Uniforms Online | DressCode E-commerce</title>
        <meta name="description" content="Discover premium-quality school uniforms, medical scrubs, and corporate workwear at Dresscode E-commerce. Buy custom uniforms online with durable fabrics and stylish designs. Shop now!" />
      </Helmet>
      <Cards />
      <CouponSection />
      <Blog />


    </>
  );
}

export default Home;
