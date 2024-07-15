import React, { useContext, useState } from "react";
import './navbar.css';
import Logo from '../../assets/logo.svg';
import { useNavigate, Link } from "react-router-dom";


const Header = () => {
    const nav = useNavigate()
    const goToWishlist = () => {
        nav('/wishlist')
    }
    const goToCart = () => {
        nav('/cart')
    }

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
                            <div className="nv_Search">
                                <form className="d-flex" role="search">
                                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                    <button className="btn" type="submit">
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </button>
                                </form>
                            </div>
                            <div className="nav__Ht">
                                <i className="fa-regular fa-heart" onClick={goToWishlist}></i>
                            </div>
                            <div className="nav__Cart">
                                <i className="fa-solid fa-bag-shopping" onClick={goToCart}></i>
                                <div className="cart-braces"><span></span></div>
                            </div>
                            <div className="ham-menu">
                                <i className="fa-solid fa-bars"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

        </>
    );
};

export default Header;
