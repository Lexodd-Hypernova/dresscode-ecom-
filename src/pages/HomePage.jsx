import AdContainer from "../components/AdContainer"
import CardGrid from "../components/CardGrid"
import Footer from "../components/Footer"
import HeadSection from "../components/HeadSection"
import OurProducts from "../components/OurProducts"
import NavBar from "../components/NavBar"

function HomePage() {

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
