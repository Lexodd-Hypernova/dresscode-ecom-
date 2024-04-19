import React, { useContext } from "react";
import '../index.css';
import Logo from '../assets/logo.svg';
import Cart from '../assets/cart.svg';
import Menu from '../assets/menu.svg';
import sharedContext from "../context/SharedContext";

const NavBar = () => {
    const { cartItems } = useContext(sharedContext);

  return (
    <div className="nav">
        <div className="nav-sec">
            <div className="logo">
                <img src={Logo} alt="DressCode logo" />
            </div>
            <div className="cart-menu">
                <div className="cart">
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
    </div>
  );
};

export default NavBar;
