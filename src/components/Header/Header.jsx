import React, { useContext, useState } from "react";
import "./navbar.css";
import Logo from "../../assets/logo.svg";
import { useNavigate, Link, NavLink } from "react-router-dom";

import { useCart } from "../../context/CartContext";
import { useWhishList } from "../../context/WishListContext";
import { Tag } from "primereact/tag";

import scrollTop from "../../helpers/scrollTop";

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

const Header = () => {
  const { cart } = useCart();
  const { wishList } = useWhishList();
  const itemCount = cart.length;
  const wishListCount = wishList.length;
  // const { wishListCount } = useWhishList();

  const [open, setOpen] = useState(false);

  const toggleDrawer = (isOpen) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(isOpen);
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
              <Link to="/contact">Contact</Link>
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

              <div className="nv_ham" onClick={toggleDrawer(true)} style={{ cursor: "pointer", position: "relative", zIndex: "2" }}>
                <i className="fa-solid fa-bars"></i>
              </div>


            </div>
          </div>
        </div>
      </nav>

      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>

        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <span onClick={toggleDrawer(false)} className='cl_icn'>
            <i className="fa-regular fa-circle-xmark"></i>
          </span>
          <div className='mob_links'>

            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
            >
              About
            </NavLink>

            <NavLink
              to="/blogs"
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
            >
              Blog
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
            >
              Contact
            </NavLink>

          </div>

        </Box>

      </Drawer>

    </>
  );
};

export default Header;
