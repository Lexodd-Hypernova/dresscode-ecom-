import React from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable"; // For table support
import moment from "moment";

const generateInvoice = (invoiceData) => {
  const doc = new jsPDF("p", "mm", "a4"); // Portrait mode, millimeters, A4 size

  // Add header
  doc.setFontSize(20);
  doc.text("Invoice", 105, 20, { align: "center" });

  // Add logo
  const logoUrl =
    "https://ik.imagekit.io/txmekgeyk/Dress%20Code/dresscode_logo.png";
  doc.addImage(logoUrl, "PNG", 10, 10, 40, 20); // x, y, width, height

  // Add watermark
  doc.setTextColor(0, 0, 0, 0.3); // Light gray color
  doc.setFontSize(50);
  doc.text("Dress", 105, 150, { align: "center", angle: -45 });
  doc.setTextColor("#df3701"); // Darker color
  doc.text("Code", 105, 170, { align: "center", angle: -45 });

  // Add seller and billing address
  doc.setFontSize(14);
  doc.text("Sold By:", 10, 60);
  doc.text(`Dresscode`, 10, 70);
  doc.text(`Seller Address`, 10, 80);
  doc.text(`PAN No:`, 10, 90);
  doc.text(`GST Registration No:`, 10, 100);
  doc.text(`Order Number: ${invoiceData?.orderId}`, 10, 110);
  doc.text(
    `Order Date: ${moment(invoiceData?.dateOfOrder).format("DD-MM-YYYY")}`,
    10,
    120
  );

  doc.text("Billing Address:", 105, 60);
  doc.text(
    `${invoiceData?.addressDetails?.firstName} ${invoiceData?.addressDetails?.lastName}`,
    105,
    70
  );
  doc.text(`${invoiceData?.addressDetails?.address}`, 105, 80);
  doc.text(
    `${invoiceData?.addressDetails?.city}, ${invoiceData?.addressDetails?.state} ${invoiceData?.addressDetails?.country} ${invoiceData?.billingAddress?.pinCode}`,
    105,
    90
  );

  // Add table
  doc.autoTable({
    startY: 130,
    head: [
      [
        "Sr. No",
        "Description",
        "Unit Price",
        "Discount",
        "Quantity",
        "Total Amt",
      ],
    ],
    body: invoiceData?.products?.map((item, index) => [
      index + 1,
      item?.productDetails?.productType?.type,
      item?.price,
      `${invoiceData?.discountPercentage}%`,
      item?.quantityOrdered,
      (
        item?.price * item?.quantityOrdered -
        invoiceData?.discountPercentage * 0.01 * item?.price
      ).toFixed(2),
    ]),
    foot: [
      [
        "Total",
        "",
        "",
        "",
        "",
        invoiceData?.TotalPriceAfterDiscount?.toFixed(2),
      ],
    ],
    margin: { left: 10, right: 10 },
    theme: "striped",
  });

  // Add footer
  doc.setFontSize(12);
  doc.text(
    "Thank you for your business!",
    105,
    doc.internal.pageSize.height - 20,
    { align: "center" }
  );

  doc.save("invoice.pdf");
};

const InvoiceGenerate = ({ data }) => {
  const handleDownload = () => {
    generateInvoice(data);
  };

  return (
    <button
      onClick={handleDownload}
      className="btn fs-4 text-white"
      style={{ backgroundColor: "#F47458" }}
    >
      Download Invoice
    </button>
  );
};

export default InvoiceGenerate;
