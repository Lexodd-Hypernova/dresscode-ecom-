// InvoicePage.js
import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoiceGenerate from "./InvoiceGenerate";

// InvoicePage.js
const invoiceData = {
  invoiceNumber: "123456",
  date: "2024-08-14",
  soldBy: {
    name: "Seller Name",
    address: "123 Seller St",
    city: "Seller City",
    state: "Seller State",
    zip: "12345",
    pan: "AAKL",
    gst: "er3536dbdcjh73",
    orderNumber: "1123",
    orderDate: "20-07-2024",
  },
  billingAddress: {
    name: "Buyer Name",
    address: "456 Buyer Ave",
    city: "Buyer City",
    state: "Buyer State",
    zip: "67890",
  },
  items: [
    {
      description: "Item 1",
      unitPrice: 10.0,
      discount: 1.0,
      quantity: 2,
      netAmt: 18.0,
      totalAmt: 20.0,
    },
    {
      description: "Item 2",
      unitPrice: 20.0,
      discount: 2.0,
      quantity: 1,
      netAmt: 18.0,
      totalAmt: 20.0,
    },
  ],
};

const InvoiceDownload = () => (
  <div>
    <PDFDownloadLink
      document={<InvoiceGenerate invoiceData={invoiceData} />}
      fileName="invoice.pdf"
    >
      {({ loading }) =>
        loading ? "Generating invoice..." : "Download Invoice"
      }
    </PDFDownloadLink>
  </div>
);

export default InvoiceDownload;
