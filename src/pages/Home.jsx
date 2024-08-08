import React from "react";
import TextMove from "../components/InfiniteTextMove/TextMove";
import BannerGroup from "../components/BannerGroup";
import Cards from "../components/Cards/Cards";

function Home() {
  return (
    <>
      {/* <TextMove title="All Uniforms"/> */}

      <BannerGroup />
      <Cards />

    </>
  );
}

export default Home;
