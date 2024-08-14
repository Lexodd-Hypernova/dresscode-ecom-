import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 20,
  },
  header: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  twoColumn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    width: "48%",
  },
  text: { fontSize: 14 },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableColHeader: {
    width: "16.6%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: "#f2f2f2",
    textAlign: "center",
    padding: 4,
  },
  tableCol: {
    width: "16.6%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    textAlign: "center",
    padding: 4,
  },

  totalLabelCol: {
    width: "83.4%",
    textAlign: "center",
    paddingRight: 10,
    borderWidth: 1,
    borderStyle: "solid",
  },
  footer: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 12,
  },
});

const InvoiceGenerate = ({ invoiceData }) => {
  const totalAmount = invoiceData.items.reduce(
    (total, item) => total + item.totalAmt,
    0
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Invoice</Text>

        <View style={[styles.section, styles.twoColumn]}>
          <View style={styles.column}>
            <Text style={{ fontWeight: "bold" }}>Sold By:</Text>
            <Text style={styles.text}>{invoiceData.soldBy.name}</Text>
            <Text style={styles.text}>{invoiceData.soldBy.address}</Text>
            <Text style={styles.text}>
              {invoiceData.soldBy.city}, {invoiceData.soldBy.state}{" "}
              {invoiceData.soldBy.zip}
            </Text>
            <Text
              style={styles.text}
            >{`PAN No: ${invoiceData.soldBy.pan}`}</Text>
            <Text
              style={styles.text}
            >{`GST Registration No: ${invoiceData.soldBy.gst}`}</Text>
            <Text
              style={styles.text}
            >{`Order Number: ${invoiceData.soldBy.orderNumber}`}</Text>
            <Text
              style={styles.text}
            >{`Order Date: ${invoiceData.soldBy.orderDate}`}</Text>
          </View>
          <View style={styles.column}>
            <Text style={{ fontWeight: "bold" }}>Billing Address:</Text>
            <Text style={styles.text}>{invoiceData.billingAddress.name}</Text>
            <Text style={styles.text}>
              {invoiceData.billingAddress.address}
            </Text>
            <Text style={styles.text}>
              {invoiceData.billingAddress.city},{" "}
              {invoiceData.billingAddress.state}{" "}
              {invoiceData.billingAddress.zip}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Sr. No</Text>
              <Text style={styles.tableColHeader}>Description</Text>
              <Text style={styles.tableColHeader}>Unit Price</Text>
              <Text style={styles.tableColHeader}>Discount</Text>
              <Text style={styles.tableColHeader}>Quantity</Text>
              <Text style={styles.tableColHeader}>Total Amt</Text>
            </View>
            {invoiceData.items.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCol}>{index + 1}</Text>
                <Text style={styles.tableCol}>{item.description}</Text>
                <Text style={styles.tableCol}>{item.unitPrice}</Text>
                <Text style={styles.tableCol}>{item.discount}</Text>
                <Text style={styles.tableCol}>{item.quantity}</Text>
                <Text style={styles.tableCol}>{item.totalAmt}</Text>
              </View>
            ))}
            <View style={styles.tableRow}>
              <Text style={styles.totalLabelCol}>Total</Text>
              <Text style={styles.tableCol}>{totalAmount.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.footer}>Thank you for your business!</Text>
      </Page>
    </Document>
  );
};

export default InvoiceGenerate;
