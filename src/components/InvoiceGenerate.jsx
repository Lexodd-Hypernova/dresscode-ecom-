import React from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable"; // For table support
import moment from "moment";

const generateInvoice = (invoiceData) => {
  const doc = new jsPDF("p", "mm", "a4"); // Portrait mode, millimeters, A4 size
  // Get page dimensions
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Calculate the center position
  const centerX = pageWidth / 2;
  const centerY = pageHeight / 2;

  // Add header
  doc.setFontSize(20);
  doc.text("Invoice", 105, 20, { align: "center" });

  // Add logo
  const logoUrl =
    "https://ik.imagekit.io/txmekgeyk/Dress%20Code/dresscode_logo.png";
  doc.addImage(logoUrl, "PNG", 10, 10, 40, 20); // x, y, width, height

  // Add watermark
  doc.setTextColor(0, 0, 0, 0.3); // Light gray color
  doc.setFontSize(100);
  doc.text("DressCode", 50, 80, { angle: -50 });
  doc.setTextColor("#df3701"); // Darker color

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
    `${invoiceData?.addressDetails?.city}, ${invoiceData?.addressDetails?.state} ${invoiceData?.addressDetails?.country} ${invoiceData?.addressDetails?.pinCode}`,
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
        "Quantity",
        `Discount (${invoiceData?.discountPercentage}%)`,
        "Total Amt",
      ],
    ],
    body: invoiceData?.products?.map((item, index) => [
      index + 1,
      `${item?.productDetails?.productType?.type} ${item?.color?.name}`,
      item?.price,
      item?.quantityOrdered,
      (
        item?.price *
        item?.quantityOrdered *
        invoiceData?.discountPercentage *
        0.01
      ).toFixed(2),
      (
        item?.price *
        item?.quantityOrdered *
        (100 - invoiceData?.discountPercentage) *
        0.01
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
