import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import DressCodeApi from '../common';

import { useCart } from '../context/CartContext';

const LogoUploader = ({ selectType, cartItem, buyItem, isSizeSelected }) => {

    const { addToCart } = useCart();
    const [product, setProduct] = useState([]);

    const [imageUrl, setImageUrl] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [logoPlacement, setLogoPlacement] = useState('');

    const [cartItemToAdd, setCartItemToAdd] = useState({
        group: "",
        productId: "",
        color: "",
        size: "",
        price: "",
        quantityRequired: "",
        logoUrl: imageUrl,
        logoPosition: logoPlacement
    });


    const [buyItemToAdd, setBuyItemToAdd] = useState({
        group: "",
        productId: "",
        color: "",
        size: "",
        price: "",
        totalPrice: "",
        quantityRequired: "",
        logoUrl: imageUrl,
        logoPosition: logoPlacement
    })


    useEffect(() => {
        if (cartItem) {
            setCartItemToAdd({
                group: cartItem.group,
                productId: cartItem.productId,
                color: cartItem.color,
                size: cartItem.size,
                price: cartItem.price,
                quantityRequired: cartItem.quantityRequired,
                logoUrl: imageUrl,      // Reset or keep existing logoUrl
                logoPosition: logoPlacement // Reset or keep existing logoPosition
            });
        }


        if (buyItem) {
            setBuyItemToAdd({
                group: buyItem.group,
                productId: buyItem.productId,
                color: buyItem.color,
                size: buyItem.size,
                price: buyItem.price,
                totalPrice: buyItem.totalPrice,
                quantityRequired: buyItem.quantityRequired,
                logoUrl: imageUrl,      // Reset or keep existing logoUrl
                logoPosition: logoPlacement // Reset or keep existing logoPosition
            })
        }


    }, [cartItem, buyItem]);


    // const [areaLabel, setAreaLabel] = useState("");
    const navigate = useNavigate();


    const handleSkip = () => {

        if (selectType === "cartType") {
            const updatedItem = {
                ...cartItemToAdd,              // Spread the current itemToAdd state
                logoUrl: imageUrl,         // Add or update the logoUrl with the current imageUrl
                logoPosition: logoPlacement // Add or update the logoPosition with the selected placement
            };
            setCartItemToAdd(updatedItem); // Update the state with the new object
            addToCart(updatedItem);    // Pass the updated item directly to addToCart
        } else if (selectType === "buyNowType") {

            const updatedBuyItem = {
                ...buyItemToAdd,
                logoUrl: imageUrl,
                logoPosition: logoPlacement
            }

            setBuyItemToAdd(updatedBuyItem);
            setProduct((prevItem) => [...prevItem, updatedBuyItem]);

            // Delay navigation until state is set
            setTimeout(() => {
                navigate("/billing", {
                    state: {
                        product: [...product, updatedBuyItem],
                        totalAmount: buyItem.totalPrice,
                        type: "buyNow",
                    },
                });
            }, 100);
        }
    };


    const handleDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();

        setUploading(true);
        const formdata = new FormData();
        formdata.append("image", fileInput.files[0]);

        const requestOptions = {
            method: "POST",
            body: formdata,
            redirect: "follow"
        };

        fetch(DressCodeApi.generateImageURL.url, requestOptions)
            .then((response) => response.json())
            .then((result) => {

                if (result.status === "success") {
                    console.log(result);
                    let logoURL = result.imgURL;
                    setImageUrl(logoURL);
                    setUploading(false);
                    sessionStorage.setItem('logoURL', logoURL)
                }

            })

            .catch((error) => console.error(error));
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const handlePlacementChange = (event) => {
        let logoPosition = event.target.value;
        setLogoPlacement(logoPosition);
        console.log("logoPosition", logoPosition);
        sessionStorage.setItem('logoPosition', logoPosition)
    };

    const handleSave = () => {
        // e.preventDefault();
        if (imageUrl) {

            if (selectType === "cartType") {
                const updatedItem = {
                    ...cartItemToAdd,              // Spread the current itemToAdd state
                    logoUrl: imageUrl,         // Add or update the logoUrl with the current imageUrl
                    logoPosition: logoPlacement // Add or update the logoPosition with the selected placement
                };
                setCartItemToAdd(updatedItem); // Update the state with the new object
                addToCart(updatedItem);    // Pass the updated item directly to addToCart
            } else if (selectType === "buyNowType") {

                const updatedBuyItem = {
                    ...buyItemToAdd,
                    logoUrl: imageUrl,
                    logoPosition: logoPlacement
                }

                setBuyItemToAdd(updatedBuyItem);
                setProduct((prevItem) => [...prevItem, updatedBuyItem]);

                // Delay navigation until state is set
                setTimeout(() => {
                    navigate("/billing", {
                        state: {
                            product: [...product, updatedBuyItem],
                            totalAmount: buyItem.totalPrice,
                            type: "buyNow",
                        },
                    });
                }, 100);
            }
        }
    }

    return (

        <>
            {
                isSizeSelected && (
                    <div className="modal fade" id="logoModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">We are excited to see your brand logo</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div
                                        onDrop={handleDrop}
                                        onDragOver={handleDragOver}
                                        style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center', cursor: 'pointer' }}
                                    >
                                        <input
                                            type="file"
                                            style={{ display: 'none' }}
                                            onChange={(e) => handleDrop(e)}
                                            accept="image/*"
                                            id="fileInput"
                                        />
                                        <label htmlFor="fileInput">
                                            {uploading ? (
                                                <p>Uploading image...</p>
                                            ) : imageUrl ? (
                                                <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '300px' }} />
                                            ) : (
                                                <p>Drag & drop your image here, or click to select</p>
                                            )}
                                        </label>
                                    </div>
                                    <div className="mt-3">
                                        <label htmlFor="logoPlacement" className="form-label">Select Logo Placement:</label>
                                        <select
                                            id="logoPlacement"
                                            className="form-select"
                                            value={logoPlacement}
                                            onChange={handlePlacementChange}
                                        >
                                            <option value="">Logo placement</option>
                                            <option value="onPockets">On Pockets</option>
                                            <option value="backside">Backside</option>
                                            <option value="shoulder">Shoulder</option>
                                            <option value="frontside">Frontside</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleSkip}>Skip</button>
                                    <button type="button" className="btn btn-primary" data-bs-dismiss={`${imageUrl ? "modal" : ""}`} onClick={handleSave}>Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }




        </>
    )
}

export default LogoUploader