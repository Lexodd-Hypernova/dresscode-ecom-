import AdContainer from "../components/AdContainer"
import CardGrid from "../components/CardGrid"
import Footer from "../components/Footer"
import HeadSection from "../components/HeadSection"
import OurProducts from "../components/OurProducts"
import NavBar from "../components/NavBar"
import { useContext, useEffect } from "react"
import sharedContext from "../context/SharedContext"

function HomePage() {
    const {setSelectedCategory} = useContext(sharedContext);

    useEffect(() => {
        // Reset selectedCategory to default when HomePage mounts
        setSelectedCategory("All Uniforms");
    }, [setSelectedCategory])

  return (
    <>
      <NavBar />
      <HeadSection />
      <CardGrid />
      <OurProducts />
      <AdContainer />
      <Footer />
    </>
  )
}

export default HomePage
