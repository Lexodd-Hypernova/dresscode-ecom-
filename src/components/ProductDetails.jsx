import React, { useContext, useState } from "react";
import "./productDetails.css";
import Dress from "../assets/dress.png";
import Faq from "./Faq";
import sharedContext from "../context/SharedContext";

const ProductDetails = () => {
    const {selectedCard, addToCart} = useContext(sharedContext);
    const [selectedSize, setSelectedSize] = useState('');

    const handleSizeClick = (size) => {
        setSelectedSize(size);
    };

    const handleAddToCart = () => {
        if (selectedCard) {
            // Update cart with selected item
            addToCart(selectedCard);
        }
    };

  return (
    <div>
        <div className="prod-sec">
            <div className="prod-img">
                <img src={Dress}  alt="Product Image" />
            </div>
            <div className="prod-det">
                <div className="prod-name">
                    <h3>{selectedCard.title}</h3>
                </div>
                <div className="prod-desc">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                     Recusandae quibusdam corporis hic facilis dolor eaque cupiditate quod quos.
                     Dolorem, non inventore voluptatum odio magni incidunt necessitatibus mollitia
                     temporibus quaerat labore eius sit cupiditate rerum nobis beatae officia vel est adipisci nam porro nisi ullam reprehenderit.
                     Facilis voluptates optio officia eaque.</p>
                </div>
                <div className="prod-size">
                    <div>
                        <p>SIZE:</p>
                    </div>
                    <div className="size-list">
                    {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size, index) => (

                        <p
                            key={index}
                            onClick={() => handleSizeClick(size)}
                            style={{ textDecoration: selectedSize === size ? 'underline' : 'none' }}
                        >
                            {size}
                        </p>
                    ))}
                    </div>
                </div>
                <div className="prod-age">
                    <div>
                        <p>AGE:</p>
                    </div>
                    <div className="age-list">
                        <p>6-7</p>
                        <p>7-8</p>
                        <p>8-9</p>
                        <p>9-10</p>
                        <p>10-11</p>
                        <p>11-12</p>
                    </div>
                </div>
                <div className="prod-add-sec">
                    <div className="prod-price">
                        <p>RS {selectedCard.price}</p>
                    </div>
                    <div className="prod-add">
                        <div className="prod-quant">
                            <p className="quant-action">-</p>
                            <p>1</p>
                            <p className="quant-action">+</p>
                        </div>
                        <div className="add-to-cart">
                            <button onClick={handleAddToCart}>ADD TO CART</button>
                        </div>
                    </div>
                </div>
                <Faq />
            </div>
        </div>
    </div>
  );
};

export default ProductDetails;
