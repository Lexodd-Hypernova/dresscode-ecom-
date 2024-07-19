import { Outlet } from 'react-router-dom';
import Header from "./components/Header/Header";
import Footer from './components/Footer/Footer';
import { CartProvider } from './context/CartContext';

function App() {

    return (
        <>
            <CartProvider>
                <Header />
                <main>
                    <Outlet />
                </main>
                <Footer />
            </CartProvider>
        </>
    );
}

export default App;