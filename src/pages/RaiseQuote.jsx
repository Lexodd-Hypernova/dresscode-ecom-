import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { shoppingInfoApis } from "../common";
import { Formik } from "formik";
import * as Yup from "yup";
import { useUserContext } from "../context/UserContext";
import Swal from "sweetalert2/dist/sweetalert2.js";
import axiosInstance from "../common/axiosInstance";
import "./pages-styles/raiseQuote.style.css";

import ReactDOMServer from "react-dom/server";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

// import InvoiceForOrder from "../components/Invoice/InvoiceForOrder";
import InvoiceForQuote from "../components/Invoice/InvoiceForQuote";




const QuoteSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  contactPhone: Yup.string()
    .required("Required")
    .matches(/^\d{10}$/, "Phone number is not valid"),
});

const RaiseQuote = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { id } = useUserContext();

  // const [formData, setFormData] = useState({
  //   name: "",
  //   contactPhone: "",
  //   email: "",
  //   organizationName: "",
  //   street: "",
  //   lane: "",
  //   postalCode: "",
  // });

  const location = useLocation();
  const { state } = location;

  const { totalAmount, product } = state || {};

  const quoteItem = product[0];

  console.log("quoteItem", quoteItem)


  // Function to generate the PDF Blob
  // const generateInvoicePDFBlob = async (quoteDetails) => {
  //   const invoiceHTMLString = ReactDOMServer.renderToString(
  //     <InvoiceForQuote data={quoteDetails} />
  //   );

  //   const tempContainer = document.createElement("div");
  //   tempContainer.innerHTML = invoiceHTMLString;
  //   document.body.appendChild(tempContainer);

  //   try {
  //     const canvas = await html2canvas(tempContainer, {
  //       scale: 0.8,
  //       useCORS: true,
  //     });
  //     document.body.removeChild(tempContainer);

  //     const imgData = canvas.toDataURL("image/png");
  //     const pdf = new jsPDF("p", "mm", "a4");
  //     const pdfWidth = 210;
  //     const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  //     pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

  //     return pdf.output("blob");
  //   } catch (error) {
  //     console.error("Error generating invoice PDF:", error);
  //     throw error;
  //   }
  // };

  // // Function to send invoice via WhatsApp
  // const sendInvoiceViaWhatsApp = async (quoteDetails) => {
  //   try {
  //     const invoiceBlob = await generateInvoicePDFBlob(quoteDetails);

  //     const whatsappFormData = new FormData();
  //     whatsappFormData.append(
  //       "file",
  //       invoiceBlob,
  //       `invoice-${quoteDetails.quoteId}.pdf`
  //     );
  //     whatsappFormData.append("messaging_product", "whatsapp");

  //     const fbResponse = await fetch(
  //       `https://graph.facebook.com/v13.0/${import.meta.env.VITE_WHATSAPP_ID
  //       }/media`,
  //       {
  //         method: "POST",
  //         body: whatsappFormData,
  //         headers: {
  //           Authorization: `Bearer ${import.meta.env.VITE_WHATSAPP_TOKEN}`,
  //         },
  //       }
  //     );

  //     if (!fbResponse.ok) {
  //       console.error(`Facebook Graph API error: ${fbResponse.status}`);
  //       return;
  //     }

  //     const fbData = await fbResponse.json();

  //     const phoneNumber = quoteDetails.address.contactPhone;

  //     const whatsappData = {
  //       messaging_product: "whatsapp",
  //       to: `91${phoneNumber}`,
  //       type: "template",
  //       template: {
  //         name: "invoice_template",
  //         language: { code: "en" },
  //         components: [
  //           {
  //             type: "header",
  //             parameters: [
  //               {
  //                 type: "document",
  //                 document: { id: fbData.id },
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //     };

  //     const whatsappResponse = await fetch(
  //       `https://graph.facebook.com/v18.0/${import.meta.env.VITE_WHATSAPP_ID
  //       }/messages`,
  //       {
  //         method: "POST",
  //         headers: {
  //           Authorization: `Bearer ${import.meta.env.VITE_WHATSAPP_TOKEN}`,
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(whatsappData),
  //       }
  //     );

  //     if (!whatsappResponse.ok) {
  //       const errorData = await whatsappResponse.json();
  //       console.error(
  //         `Error sending WhatsApp message: ${whatsappResponse.status}`,
  //         errorData
  //       );
  //       if (errorData.error?.message?.includes("incapable")) {
  //         console.error(
  //           `${phoneNumber} incapable of receiving WhatsApp message.`
  //         );
  //       }
  //     } else {
  //       console.log(`${phoneNumber} Invoice sent successfully via WhatsApp!`);
  //     }
  //   } catch (error) {
  //     console.error("Error sending invoice via WhatsApp:", error);
  //   }
  // };



  const generateInvoicePDFBlob = async (quoteDetails) => {
    const invoiceHTMLString = ReactDOMServer.renderToString(
      <InvoiceForQuote data={quoteDetails} />
    );
  
    const tempContainer = document.createElement("div");
    tempContainer.innerHTML = invoiceHTMLString;
    tempContainer.style.position = "absolute";
    tempContainer.style.top = "-9999px"; // Hide the element
    document.body.appendChild(tempContainer);
  
    try {
      const canvas = await html2canvas(tempContainer, {
        scale: 0.8,
        useCORS: true,
        allowTaint: true, // Allow cross-origin images
      });
      document.body.removeChild(tempContainer);
  
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = 210;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  
      return pdf.output("blob");
    } catch (error) {
      console.error("Error generating invoice PDF:", error);
      document.body.removeChild(tempContainer);
      throw error;
    }
  };
  
  const sendInvoiceViaWhatsApp = async (quoteDetails) => {
    try {
      const invoiceBlob = await generateInvoicePDFBlob(quoteDetails);
  
      const whatsappFormData = new FormData();
      whatsappFormData.append(
        "file",
        invoiceBlob,
        `invoice-${quoteDetails.quoteId}.pdf`
      );
      whatsappFormData.append("messaging_product", "whatsapp");
  
      const mediaResponse = await fetch(
        `https://graph.facebook.com/v18.0/${import.meta.env.VITE_WHATSAPP_ID}/media`,
        {
          method: "POST",
          body: whatsappFormData,
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_WHATSAPP_TOKEN}`,
          },
        }
      );
  
      if (!mediaResponse.ok) {
        const errorResponse = await mediaResponse.json();
        console.error(`Facebook Graph API error:`, errorResponse);
        return;
      }
  
      const mediaData = await mediaResponse.json();
      const mediaId = mediaData.id;
  
      const phoneNumber = quoteDetails.address.contactPhone;
  
      const whatsappMessagePayload = {
        messaging_product: "whatsapp",
        to: `91${phoneNumber}`,
        type: "template",
        template: {
          name: "invoice_template",
          language: { code: "en" },
          components: [
            {
              type: "header",
              parameters: [
                {
                  type: "document",
                  document: { id: mediaId },
                },
              ],
            },
          ],
        },
      };
  
      const messageResponse = await fetch(
        `https://graph.facebook.com/v18.0/${import.meta.env.VITE_WHATSAPP_ID}/messages`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_WHATSAPP_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(whatsappMessagePayload),
        }
      );
  
      if (!messageResponse.ok) {
        const errorData = await messageResponse.json();
        console.error(
          `Error sending WhatsApp message: ${messageResponse.status}`,
          errorData
        );
        if (errorData.error?.message?.includes("incapable")) {
          console.error(
            `${phoneNumber} incapable of receiving WhatsApp message.`
          );
        }
      } else {
        console.log(`${phoneNumber} Invoice sent successfully via WhatsApp!`);
      }
    } catch (error) {
      console.error("Error sending invoice via WhatsApp:", error);
    }
  };
  





  // console.log(product, "product");
  // console.log(totalAmount, "totalAmount");

  return (
    <>
      <div className="container-fluid raise_qt-screen" style={{}}>
        <div className="row">
          <div className="fs-1 fw-medium text-primary text-center">
            <span style={{ color: "#20248A" }}>Get a {""}</span>
            <span style={{ color: "#DF3701" }}>Quote</span>
          </div>
          <div className="fs-5 text-center mt-2">
            Could you please provide the content you would <br></br>like to have
            below the contact form
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-4">
            <Formik
              initialValues={{
                name: "",
                contactPhone: "",
                email: "",
                organizationName: "",
                street: "",
                lane: "",
                postalCode: "",
              }}
              validationSchema={QuoteSchema}
              onSubmit={async (values) => {
                // console.log(values);
                setLoading(true);
                try {
                  const response = await axiosInstance.post(
                    shoppingInfoApis.createQuote(id),
                    {
                      group: quoteItem.group,
                      productId: quoteItem.productId,
                      color: quoteItem.color,
                      size: quoteItem.size,
                      quantityRequired: quoteItem.quantityRequired,
                      logoUrl: quoteItem.logoUrl,
                      logoPosition: quoteItem.logoPosition,
                      imgUrl: quoteItem.imgUrl,
                      name: quoteItem.name,
                      address: {
                        name: values.name,
                        contactPhone: values.contactPhone,
                        email: values.email,
                        organizationName: values.organizationName,
                        street: values.street,
                        lane: values.lane,
                        postalCode: values.postalCode,
                      },
                    },
                    {
                      headers: {
                        "Content-Type": "application/json",
                      },
                      withCredentials: true, // Ensure cookies are sent with the request
                    }
                  );
                  console.log("quote res", response.data.quote);

                  let quoteDetails = response.data.quote;

                  if (response.status === 201) {
                    Swal.fire({
                      title: "Success!",
                      text: "Quote raised successfully",
                      icon: "success",
                      showConfirmButton: false,
                      timer: 1500,
                    });

                    sendInvoiceViaWhatsApp(quoteDetails)

                    navigate("/quote-success");



                    // console.log(response.data);
                  }
                } catch (error) {
                  Swal.fire({
                    title: "Failed!",
                    text: error.response.data.message,
                    icon: "error",
                    showConfirmButton: false,
                    timer: 1500,
                  });

                  console.error("Error signing up:", error);
                } finally {
                  setLoading(false);
                }
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                // isSubmitting,
                /* and other goodies */
              }) => (
                <form className="mt-5" onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      className="form-control w-100"
                      name="name"
                      placeholder="Name"
                      aria-describedby="NameHelp"
                    />
                    {touched.name && errors.name ? (
                      <p className="text-danger">{errors.name}</p>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.contactPhone}
                      className="form-control w-100"
                      name="contactPhone"
                      placeholder="Contact Phone"
                      aria-describedby="phoneNumberHelp"
                    />
                    {touched.contactPhone && errors.contactPhone ? (
                      <p className="text-danger">{errors.contactPhone}</p>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      className="form-control w-100"
                      name="email"
                      placeholder="E-mail"
                      aria-describedby="emailHelp"
                    />
                    {touched.email && errors.email ? (
                      <p className="text-danger">{errors.email}</p>
                    ) : null}
                  </div>

                  <div className="mb-3">
                    <input
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.organizationName}
                      className="form-control w-100"
                      name="organizationName"
                      placeholder="Name of Organization (Optional)"
                    />
                    {touched.organizationName && errors.organizationName ? (
                      <p className="text-danger">{errors.organizationName}</p>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.street}
                      className="form-control w-100"
                      name="street"
                      placeholder="Street"
                    />
                    {touched.street && errors.street ? (
                      <p className="text-danger">{errors.street}</p>
                    ) : null}
                  </div>
                  <div className="row">
                    <div className="col">
                      <input
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.lane}
                        className="form-control w-100"
                        name="lane"
                        placeholder="Lane"
                      />
                      {touched.lane && errors.lane ? (
                        <p className="text-danger">{errors.lane}</p>
                      ) : null}
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.postalCode}
                        className="form-control w-100"
                        name="postalCode"
                        placeholder="Postal code"
                      />
                      {touched.postalCode && errors.postalCode ? (
                        <p className="text-danger">{errors.postalCode}</p>
                      ) : null}
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="mt-5 btn btn-primary w-100 text-uppercase text-white fs-5 fw-medium"
                    >
                      {loading ? (
                        <div
                          className="spinner-border "
                          style={{ color: "oragne" }}
                          role="status"
                        >
                          <span className="sr-only"></span>
                        </div>
                      ) : (
                        "submit"
                      )}
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default RaiseQuote;
