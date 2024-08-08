import React, { useContext, useState } from "react";
import "./navbar.css";
import Logo from "../../assets/logo.svg";
import { useNavigate, Link } from "react-router-dom";

import { useCart } from "../../context/CartContext";
import { useWhishList } from "../../context/WishListContext";
import { Tag } from "primereact/tag";

const Header = () => {
  const { cart } = useCart();
  const { wishList } = useWhishList();
  const itemCount = cart.length;
  const wishListCount = wishList.length;
  // const { wishListCount } = useWhishList();

  const nav = useNavigate();
  const goToWishlist = () => {
    nav("/wishlist");
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
              <Link to="/" className="logo">
                <img src={Logo} alt="DressCode logo" />
              </Link>
            </div>

            <div className="nv__Right">
              {/* <div className="nv_Search">
                <form className="d-flex" role="search">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <button className="btn" type="submit">
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </button>
                </form>
              </div> */}
              {/* onClick={goToWishlist} */}
              <div className="nav__Ht" onClick={goToWishlist}>
                <i className="fa-regular fa-heart"><span className="m-2">{wishListCount}</span></i>
              </div>
              {/* onClick={goToCart} */}
              <Link className="nav__Cart" to="/cart">
                <i className="fa-solid fa-bag-shopping"></i>
                <div className="cart-braces">
                  <span>({itemCount})</span>
                </div>
              </Link>
              <Link to="/account-info" className="ham-menu">
                <i className="fa-solid fa-user"></i>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
