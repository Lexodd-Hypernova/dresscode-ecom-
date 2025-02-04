import React from "react";
// import TextMove from "../components/InfiniteTextMove/TextMove";
import BannerGroup from "../components/BannerGroup";
import Cards from "../components/Cards/Cards";
import CouponSection from "../components/CouponSection";

import Blog from "../components/blog/Blog";

function Home() {
  return (
    <>
      {/* <TextMove title="All Uniforms"/> */}

      {/* <BannerGroup /> */}
      <Cards />
      <CouponSection />
      <Blog />


    </>
  );
}

export default Home;
