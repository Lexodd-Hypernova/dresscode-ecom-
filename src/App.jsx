import { Outlet, useNavigation } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { CartProvider } from "./context/CartContext";
import { WishListProvider } from "./context/WishListContext";
import 'sweetalert2/src/sweetalert2.scss';
import LoadingComponent from "./common/components/LoadingComponent";

import { UserContextProvider } from "./context/UserContext";
import { ProductContextProvider } from "./context/ProductContext";


function App() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    if (navigation.state === "loading") {
      setIsLoading(true)
    } else {
      setIsLoading(true)

      setTimeout(() => {
        setIsLoading(false)
      }, 1000);
    }
  }, [navigation.state]);

  return (
    <>
      <UserContextProvider>
        <WishListProvider>
          <CartProvider>
            <Header />
            <main>
              {isLoading ? <LoadingComponent /> : <Outlet />}
            </main>
            <Footer />
          </CartProvider>
        </WishListProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
