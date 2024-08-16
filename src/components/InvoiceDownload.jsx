import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoiceGenerate from "./InvoiceGenerate";

const InvoiceDownload = ({ data }) => (
  <div>
    <PDFDownloadLink
      document={<InvoiceGenerate invoiceData={data} />}
      fileName="invoice.pdf"
    >
      {({ loading }) =>
        loading ? "Generating invoice..." : "Download Invoice"
      }
    </PDFDownloadLink>
  </div>
);

export default InvoiceDownload;
