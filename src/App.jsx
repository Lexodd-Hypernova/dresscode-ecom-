import { Outlet, useNavigation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { CartProvider } from "./context/CartContext";
import { WishListProvider } from "./context/WishListContext";
import 'sweetalert2/src/sweetalert2.scss';
import LoadingComponent from "./common/components/LoadingComponent";

import { UserContextProvider } from "./context/UserContext";
import { ProductContextProvider } from "./context/ProductContext";

import sharedContext from "./context/SharedContext";
import { getDocs, collection } from "firebase/firestore";

import { db } from "./firebase";
import { HelmetProvider } from "react-helmet-async";

// import SharedState from "./context/SharedState";


function App() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const { setBlogsData } = useContext(sharedContext);

  const fetchData = async () => {
    try {
      const collectionRef = collection(db, "In The Blog");
      const snapshot = await getDocs(collectionRef);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("blog data", data)


      setBlogsData(data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


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
      <HelmetProvider>
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
      </HelmetProvider>
    </>
  );
}

export default App;
