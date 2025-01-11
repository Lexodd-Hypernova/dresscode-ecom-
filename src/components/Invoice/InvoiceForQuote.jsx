import React from 'react';
// import numberToWords from "number-to-words";

import LOGO from "../../../public/images/logo.png";

const InvoiceForQuote = ({ data }) => {

    const quoteDetails = data;

    return (
        <div style={{ padding: "40px", width: "100%" }}>
            {/* Header */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "40px",
                }}
            >
                <img
                    src={LOGO}
                    alt="Logo"
                    style={{
                        width: "300px",
                        height: "80px",
                        objectFit: "contain",
                        maxWidth: "100%",
                    }}
                />
                <div style={{ textAlign: "right", fontSize: "20px" }}>
                    <p style={{ margin: 0 }}>Jhaver Enterprises</p>
                    <p style={{ margin: 0 }}>Email: info@jhaverenterprises.com</p>
                    <p style={{ margin: 0 }}>GSTIN: 36BDOPJ3833D1ZA</p>
                    <p style={{ margin: 0 }}>
                        AWF15 NSL Icon, Rd No. 12, Hyderabad - 500034
                    </p>
                </div>
            </div>

            {/* Order Info */}
            <div>
                <p
                    style={{
                        fontSize: "24px",
                        fontWeight: "bold",
                        marginBottom: "20px",
                        textTransform: "uppercase",
                    }}
                >
                    Order Invoice
                </p>
                <div style={{ marginBottom: "30px", fontSize: "20px" }}>
                    <p>Quote ID: {quoteDetails.quoteId || "N/A"}</p>
                    <p>Date: {new Date(quoteDetails.dateOfQuoteRecived).toLocaleDateString()}</p>
                    <p>Customer Name: {quoteDetails.address.name || "N/A"}</p>
                    <p>Customer Email: {quoteDetails.address.email || "N/A"}</p>
                    <p>Phone: {quoteDetails.address.contactPhone || "N/A"}</p>
                </div>
            </div>

            {/* Products Table */}
            <div
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginBottom: "40px",
                }}
            >
                {/* Table Header */}
                <div style={{ display: "flex", backgroundColor: "#f2f2f2" }}>
                    {[
                        "Product",
                        "Color",
                        "Size",
                        "Quantity",
                    ].map((header, index) => (
                        <div
                            key={index}
                            style={{
                                width: "16.66%",
                                border: "1px solid #d3d3d3",
                                padding: "16px",
                                textAlign: "center",
                                fontWeight: "bold",
                                fontSize: "20px",
                                backgroundColor: "#d3d3d3",
                            }}
                        >
                            {header}
                        </div>
                    ))}
                </div>

                {/* Products Rows */}

                <div style={{ display: "flex" }}>
                    <div
                        style={{
                            width: "16.66%",
                            border: "1px solid #d3d3d3",
                            padding: "16px",
                            fontSize: "20px",
                            textAlign: "center",
                        }}
                    >
                        {quoteDetails.productType || "N/A"}
                    </div>
                    <div
                        style={{
                            width: "16.66%",
                            border: "1px solid #d3d3d3",
                            padding: "16px",
                            fontSize: "20px",
                            textAlign: "center",
                        }}
                    >
                        {quoteDetails.color.name || "N/A"}
                    </div>
                    <div
                        style={{
                            width: "16.66%",
                            border: "1px solid #d3d3d3",
                            padding: "16px",
                            fontSize: "20px",
                            textAlign: "center",
                        }}
                    >
                        {quoteDetails.size || "N/A"}
                    </div>
                    <div
                        style={{
                            width: "16.66%",
                            border: "1px solid #d3d3d3",
                            padding: "16px",
                            fontSize: "20px",
                            textAlign: "center",
                        }}
                    >
                        {quoteDetails.quantityRequired || 0}
                    </div>
                </div>

            </div>


            {/* Footer */}
            <div
                style={{
                    fontSize: "14px",
                    textAlign: "center",
                    marginTop: "40px",
                    paddingTop: "10px",
                    borderTop: "1px solid #000",
                }}
            >
                <p>
                    Bank Details: Account Name: Jhaver Enterprises | Account No: 123456789
                    | IFSC: ABCD0123456
                </p>
            </div>
        </div>
    )
}

export default InvoiceForQuote