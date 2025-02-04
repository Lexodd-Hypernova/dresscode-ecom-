import fs from "fs";
import path from "path";
import axios from "axios";
import { SitemapStream, streamToPromise } from "sitemap";
import { shoppingInfoApis } from "./src/common/index.js"; // Ensure correct path

// import { shoppingInfoApis } from "./src/common";

// const { shoppingInfoApis } = require("./src/common");

// Define your base website URL
// const baseUrl = "https://yourwebsite.com";

// const baseUrl = "https://71b7-152-59-198-145.ngrok-free.app";

// const baseUrl = "http://localhost:5173";

const baseUrl = "https://dress-code.in/";




// List of known group names (since there's no API for it)
const groupNames = ["heal", "elite", "togs"]; // Add all existing group names


const formatUrl = (text) =>
    encodeURIComponent(text.toLowerCase().replace(/\s+/g, "-"));


// Function to fetch products by group name
async function fetchProductsByGroup(groupName) {
    try {
        const response = await axios.get(shoppingInfoApis.getProductsByGroup(groupName)); // Adjust API

        let productUrls = [];

        response.data.forEach(product => {
            product.variants.forEach(variant => {
                productUrls.push({
                    group: groupName,
                    category: product.category,
                    subCategory: product.subCategory,
                    color: variant.color.name,  // Extracting color from variants
                    id: product.productId
                });
            });
        });

        return productUrls;

    } catch (error) {
        console.error(`Error fetching products for group ${groupName}:`, error);
        return [];
    }
}

// Main function to generate sitemap
async function generateSitemap() {
    const sitemap = new SitemapStream({ hostname: baseUrl });

    // Static Pages
    const staticPages = [
        "/",
        "/about",
        "/cart",
        "/blogs",
    ];

    // Add static pages to sitemap
    staticPages.forEach((page) => {
        sitemap.write({ url: page, changefreq: "daily", priority: 0.8 });
    });

    // Fetch product data dynamically for each group
    for (const group of groupNames) {
        sitemap.write({ url: `/${group}`, changefreq: "daily", priority: 0.8 }); // Group page

        const products = await fetchProductsByGroup(group); // Fetch products
        products.forEach((product) => {
            const productUrl = `/${formatUrl(product.group)}/${formatUrl(product.category)}/${formatUrl(product.subCategory)}/${formatUrl(product.color)}/${product.id}`;
            sitemap.write({ url: productUrl, changefreq: "weekly", priority: 0.7 });
        });
    }

    sitemap.end();

    // Save the sitemap file
    const sitemapBuffer = await streamToPromise(sitemap);
    fs.writeFileSync("public/sitemap.xml", sitemapBuffer);

    console.log("✅ Sitemap generated successfully!");
}

// Run the function
generateSitemap();
