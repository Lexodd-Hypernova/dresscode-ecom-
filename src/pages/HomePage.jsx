import AdContainer from "../components/AdContainer"
import CardGrid from "../components/CardGrid"
import Footer from "../components/Footer"
// import HeadSection from "../components/HeadSection"
import OurProducts from "../components/OurProducts"
import NavBar from "../components/Header/NavBar"
import { useContext, useEffect } from "react"
import sharedContext from "../context/SharedContext"
import TextMove from "../components/InfiniteTextMove/TextMove"

function HomePage() {
  const { selectedCategory, setSelectedCategory } = useContext(sharedContext);

  useEffect(() => {
    // Reset selectedCategory to default when HomePage mounts
    setSelectedCategory("All Uniforms");
  }, [selectedCategory])

  return (
    <>
      <NavBar />
      <TextMove />
      {/* <HeadSection /> */}
      <section className="home__Ttl-con">
        <div className="hm_ct-ttl">
          <h3>Category</h3>
          <div className="bt_arw">
            <img src="images/arrow-down.png" alt="" />
          </div>
        </div>
        <div className="hm__Ttl-para">
          <p>DressCode Elevating Excellence <img src="images/hm-ttl.png" alt="" /> Unparalleled quality,
            innovation, and service tailored to your needs.
            Embark on a journey with us for the finest in business attire.
          </p>
          {/* hm-ttl */}
        </div>
      </section>
      <CardGrid />
      <OurProducts />
      <AdContainer />
      <Footer />
    </>
  )
}

export default HomePage
