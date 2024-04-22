import React from "react";
import "./cartModal.css";
import Close from "../assets/close.svg";
import Dress from "../assets/dress.png";

const CartModal = ({ onClose }) => {
  return (
    <div className="cart-det">
        <div className="cart-sec">
            <div className="cart-nav">
                <div className="cart-close">
                    <img src={Close} alt="Close cart modal" onClick={onClose} />
                    <p>CLOSE</p>
                </div>
                <div className="cart-count">
                    <p>CART () </p>
                </div>
            </div>
            <div className="data-content-sec">
                <div className="data-sec">
                    <div className="data-sec-one">
                        <img src={Dress} alt="" />
                    </div>
                    <div className="data-sec-two">
                        <div className="data-item-one">
                            <p>Lorem ipsum</p>
                            <p>RS 200</p>
                            <div className="prod-quantity">
                                <p className="prod-quant-action">-</p>
                                <p>0</p>
                                <p className="quant-action">+</p>
                            </div>
                        </div>
                        <div className="data-item-two">
                            <p>SIZE</p>
                        </div>
                    </div>
                </div>
                <div className="sub-total">
                    <p>SUB TOTAL</p>
                    <p>RS 200</p>
                </div>
            </div>
            <div className="cart-footer">
                <div className="check-out">
                    <button>CHECK OUT</button>
                </div>
                <div className="view-cart">
                    <button>VIEW MY CART</button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default CartModal;
