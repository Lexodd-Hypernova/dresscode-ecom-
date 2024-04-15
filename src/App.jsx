import AdContainer from "./components/AdContainer"
import Card from "./components/Card"
import CardGrid from "./components/CardGrid"
import Footer from "./components/Footer"
import HeadSection from "./components/HeadSection"
import NavBar from "./components/NavBar"
import OurProducts from "./components/OurProducts"

function App() {

  return (
    <>
      <NavBar />
      {/* <Card /> */}
      <HeadSection />
      <CardGrid />
      <OurProducts />
      <AdContainer />
      <Footer />
    </>
  )
}

export default App
