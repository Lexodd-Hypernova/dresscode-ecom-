import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import DressCodeApi from '../common';

const LogoUploader = () => {

    const [imageUrl, setImageUrl] = useState('');
    const [uploading, setUploading] = useState(false);
    const [logoPlacement, setLogoPlacement] = useState('');
    // const [areaLabel, setAreaLabel] = useState("");
    const navigate = useNavigate();


    const handleSkip = () => {
        navigate("/billing")
    }

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
            // setAreaLabel("Close")
            navigate("/billing");
        }

    }

    return (

        <>
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

        </>
    )
}

export default LogoUploader