import AdContainer from "../components/AdContainer"
import CardGrid from "../components/CardGrid"
import Footer from "../components/Footer"
// import HeadSection from "../components/HeadSection"
import OurProducts from "../components/OurProducts"
import NavBar from "../components/Header/Header"
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
      
      <CardGrid />
      <OurProducts />
      <AdContainer />
      <Footer />
    </>
  )
}

export default HomePage
