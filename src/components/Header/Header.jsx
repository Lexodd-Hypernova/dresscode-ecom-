import React, { useContext, useState } from "react";
import "./navbar.css";
import Logo from "../../assets/logo.svg";
import { useNavigate, Link } from "react-router-dom";

import { useCart } from "../../context/CartContext";
import { useWhishList } from "../../context/WishListContext";
import { Tag } from "primereact/tag";

import scrollTop from "../../helpers/scrollTop";
import ContactModal from "../contact/ContactModal";

const Header = () => {
  const { cart } = useCart();
  const { wishList } = useWhishList();
  const itemCount = cart.length;
  const wishListCount = wishList.length;
  // const { wishListCount } = useWhishList();

  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const openContactModal = () => {
    setIsContactModalOpen(true);
  };

  const closeContactModal = () => {
    setIsContactModalOpen(false);
  };

  const nav = useNavigate();
  const goToWishlist = () => {
    nav("/wishlist");
    scrollTop();
  };
  // const goToCart = () => {
  //     nav('/cart')
  // }

  return (
    <>
      <nav className="navbar sticky-top bg-body-tertiary">
        <div className="container-fluid">
          <div className="nav-sec">
            <div className="nv__Left">
              {/* <a href="https://dress-code.in/" className="logo">
                <img src={Logo} alt="DressCode logo" />
              </a> */}
              <Link to="/" className="logo">
                <img src={Logo} alt="DressCode logo" />
              </Link>
            </div>

            <div className="nv_center">
              <Link to="/about">About</Link>
              <Link to="/blogs">Blog</Link>
              <a onClick={openContactModal} style={{ cursor: "pointer" }}>
                Contact
              </a>
            </div>

            <div className="nv__Right">
              <div className="nav__Ht" onClick={goToWishlist}>
                <i className="fa-regular fa-heart"><span className="m-2">{wishListCount}</span></i>
              </div>
              {/* onClick={goToCart} */}
              <Link className="nav__Cart" to="/cart" onClick={scrollTop}>
                <i className="fa-solid fa-bag-shopping"></i>
                <div className="cart-braces">
                  <span>({itemCount})</span>
                </div>
              </Link>
              <Link to="/account-info" className="ham-menu" onClick={scrollTop}>
                <i className="fa-solid fa-user"></i>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {isContactModalOpen && (
        <ContactModal onClose={closeContactModal} isOpen={openContactModal} />
      )}

    </>
  );
};

export default Header;
