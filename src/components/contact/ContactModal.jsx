import React, { useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Image from "../../../public/assets/images/formimage.svg";
import "./ContactModal.css";

const ContactModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        category: "",
        message: "",
        organization: "",
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // Validation logic for the form fields
    const validateForm = () => {
        const newErrors = {};
        if (formData.name.trim() === "") {
            newErrors.name = "Name is required";
        }
        if (formData.mobile.trim() === "") {
            newErrors.mobile = "Mobile is required";
        } else if (!/^\d{10}$/.test(formData.mobile)) {
            newErrors.mobile = "Please enter a valid phone number";
        }
        if (formData.category.trim() === "") {
            newErrors.category = "Category is required";
        }
        if (formData.message.trim() === "") {
            newErrors.message = "Message is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        // Clear error for the input being edited
        setErrors({
            ...errors,
            [name]: "", // Clear error for the input being edited
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validateForm();
        if (isValid) {
            setLoading(true);
            try {
                const response = await axios.post(
                    "https://sheet.best/api/sheets/2881737d-ea89-42c6-a784-882f417de018",
                    formData
                );
                console.log(response);
                setFormData({
                    name: "",
                    email: "",
                    mobile: "",
                    category: "",
                    message: "",
                    organization: "",
                });
                toast.success(
                    "Thank you. We will get back to you as soon as possible",
                    {
                        style: {
                            backgroundColor: "#14d414",
                            color: "white",
                        },
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    }
                );
            } catch (error) {
                console.error(error);
                toast.error("An error occurred. Please try again later.", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } finally {
                setLoading(false);
            }
        } else {
            // If the form is invalid, show a message or handle accordingly
            toast.error("Please fill in the required fields correctly.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (
        <>
            <Modal
                open={isOpen}
                onClose={onClose}
                center
                styles={{ modal: { width: "100%", height: "auto " } }}
            >
                <div className="modal-content-contact">
                    <div className="form-container">
                        <h2>Contact</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-field">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                    />
                                    {errors.name && <span className="error">{errors.name}</span>}
                                </div>
                                <div className="form-field">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-field">
                                    <input
                                        type="tel"
                                        name="mobile"
                                        placeholder="Mobile"
                                        value={formData.mobile}
                                        onChange={handleInputChange}
                                    />
                                    {errors.mobile && (
                                        <span className="error">{errors.mobile}</span>
                                    )}
                                </div>
                                <div className="form-field">
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select category</option>
                                        <option value="school">School</option>
                                        <option value="hospital">Hospital</option>
                                        <option value="corporate">Corporate</option>
                                        {/* Add your category options here */}
                                    </select>
                                    {errors.category && (
                                        <span className="error">{errors.category}</span>
                                    )}
                                </div>
                            </div>
                            <div className="form-field">
                                <label>Message</label>
                                <textarea
                                    name="message"
                                    rows="4"
                                    placeholder="Message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                ></textarea>
                                {errors.message && (
                                    <span className="error">{errors.message}</span>
                                )}
                            </div>
                            <div className="form-field">
                                <input
                                    type="text"
                                    name="organization"
                                    placeholder="Organization"
                                    value={formData.organization}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-field">
                                <button type="submit" disabled={loading}>
                                    {loading ? "Submitting..." : "Submit"}
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="image-container">
                        <img src={Image} alt="Image" />
                    </div>
                </div>
            </Modal>
            <ToastContainer />
        </>
    );
};

export default ContactModal;
