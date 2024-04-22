import React, { useContext, useState } from "react";
import '../index.css';
import Logo from '../assets/logo.svg';
import Cart from '../assets/cart.svg';
import Menu from '../assets/menu.svg';
import sharedContext from "../context/SharedContext";
import CartModal from "./CartModal";

const NavBar = () => {
    const { cartItems } = useContext(sharedContext);
    const [isCartModalOpen, setIsCartModalOpen] = useState(false);

    const toggleCartModal = () => {
        setIsCartModalOpen(true); // Toggle the state
    };

    const closeCartModal = () => {
        setIsCartModalOpen(false);
    }

  return (
    <div className="nav">
        <div className="nav-sec">
            <div className="logo">
                <img src={Logo} alt="DressCode logo" />
            </div>
            <div className="cart-menu">
                <div className="cart" onClick={toggleCartModal}>
                    <div>
                        <img src={Cart} alt="Cart" />
                    </div>
                    <div className="cart-braces"><span>({cartItems.length})</span></div>
                </div>
                <div className="ham-menu">
                    <img src={Menu} alt="Hamburger menu" />
                </div>
            </div>
        </div>
        {isCartModalOpen && <CartModal onClose={closeCartModal} />}
    </div>
  );
};

export default NavBar;
