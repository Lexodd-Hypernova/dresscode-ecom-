import React, { useEffect, useState } from "react";
import axios from "axios";
import "./pages-styles/ProductListWithFilters.style.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import { shoppingInfoApis } from "../common";
// import LazyImage from "../common/components/LazyImage";
import LazyImage from "../common/components/LazyImage";

const ProductListWithFilters = () => {
    const [allProducts, setAllProducts] = useState([]); // To store all fetched products
    const [filteredProducts, setFilteredProducts] = useState([]); // To store filtered products

    const [loading, setLoading] = useState(true);
    const loadingList = new Array(8).fill(null);
    const [filters, setFilters] = useState({
        category: "",
        subCategory: "",
        gender: "",
        productType: "",
        fit: "",
        neckline: "",
        pattern: "",
        cuff: "",
        sleeves: "",
        material: "",
        size: "",
        color: "",
    });
    const [filterOptions, setFilterOptions] = useState({});
    const { groupName } = useParams(); // Get groupName from the URL
    const navigate = useNavigate(); // Initialize navigate from react-router-dom



    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch products
                const productResponse = await axios.get(shoppingInfoApis.getProductsByGroup(groupName));
                // Filter products that have variants with variantSizes length greater than zero
                const filteredProductData = productResponse.data.filter(product =>
                    product.variants.some(variant => variant.variantSizes.length > 0)
                );

                setAllProducts(filteredProductData); // Store filtered products
                setFilteredProducts(filteredProductData); // Initially show filtered products

                console.log("filteredProductData", filteredProductData);

                // Fetch filters
                const filterResponse = await axios.get(shoppingInfoApis.getFiltersByGroup(groupName));
                setFilterOptions(filterResponse.data); // Store filter options
                console.log("filterResponse", filterResponse.data);
            } catch (error) {
                console.error("Error fetching data", error);
            } finally {
                setLoading(false);
            }
        };

        if (groupName) {
            fetchData();
        }
    }, [groupName]);




    // Apply filters whenever the filter state changes
    useEffect(() => {
        let filtered = [...allProducts]; // Start with all products

        // Apply each filter if it is selected
        if (filters.category) {
            filtered = filtered.filter((product) => product.category === filters.category);
        }
        if (filters.subCategory) {
            filtered = filtered.filter((product) => product.subCategory === filters.subCategory);
        }
        if (filters.gender) {
            filtered = filtered.filter((product) => product.gender === filters.gender);
        }
        if (filters.productType) {
            filtered = filtered.filter((product) => product.productType === filters.productType);
        }
        if (filters.fit) {
            filtered = filtered.filter((product) => product.fit === filters.fit);
        }
        if (filters.neckline) {
            filtered = filtered.filter((product) => product.neckline === filters.neckline);
        }
        if (filters.pattern) {
            filtered = filtered.filter((product) => product.pattern === filters.pattern);
        }
        if (filters.cuff) {
            filtered = filtered.filter((product) => product.cuff === filters.cuff);
        }
        if (filters.sleeves) {
            filtered = filtered.filter((product) => product.sleeves === filters.sleeves);
        }
        if (filters.material) {
            filtered = filtered.filter((product) => product.material === filters.material);
        }
        if (filters.size) {
            filtered = filtered.filter((product) =>
                product.variants.some((variant) => variant.variantSizes.some((vs) => vs.size === filters.size))
            );
        }

        if (filters.color) {
            filtered = filtered
                .map((product) => ({
                    ...product,
                    variants: product.variants.filter((variant) => variant.color.name === filters.color),
                }))
                .filter((product) => product.variants.length > 0); // Keep only products with matching variants
        }

        setFilteredProducts(filtered); // Update filtered products
    }, [filters, allProducts]); // Dependency array includes filters and allProducts

    // Handle filter change
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    // Handle group change and update URL
    const handleGroupChange = (e) => {
        const newGroupName = e.target.value;
        navigate(`/products/${newGroupName}`); // Update the URL with the new group name
    };

    return (
        <>
            <div className="product__Screen">

                <div className="filter_btn-mobile">
                    <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                        Filter
                    </button>
                </div>




                <div className="mobile_filter-container">
                    <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                        <div className="offcanvas-header">
                            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <form>

                                <div className="filter-group">
                                    <label>Group:</label>
                                    <select name="group" value={groupName} onChange={handleGroupChange}>
                                        <option value="ELITE">ELITE</option>
                                        <option value="HEAL">HEAL</option>
                                        <option value="TOGS">TOGS</option>
                                    </select>
                                </div>

                                {/* Category */}
                                <div className="filter-group">
                                    <label>Category:</label>
                                    <select name="category" onChange={handleFilterChange}>
                                        <option value="">All</option>
                                        {
                                            filterOptions.category ? (
                                                <>
                                                    {filterOptions.category.map((cat) => (
                                                        <option key={cat} value={cat}>
                                                            {cat}
                                                        </option>
                                                    ))}
                                                </>
                                            ) : (
                                                <></>
                                            )
                                        }
                                    </select>
                                </div>

                                {/* SubCategory */}
                                {
                                    filterOptions.subCategory && filterOptions.subCategory.length > 0 ? (
                                        <div className="filter-group">
                                            <label>SubCategory:</label>
                                            <select name="subCategory" onChange={handleFilterChange}>
                                                <option value="">All</option>
                                                {
                                                    filterOptions.subCategory.map((subCat) => (
                                                        <option key={subCat} value={subCat}>
                                                            {subCat}
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    ) : (
                                        <></>
                                    )
                                }


                                {/* Gender */}

                                {
                                    filterOptions.gender && filterOptions.gender.length > 0 ? (
                                        <div className="filter-group">
                                            <label>Gender:</label>
                                            <select name="gender" onChange={handleFilterChange}>
                                                <option value="">All</option>
                                                {filterOptions.gender.map((g) => (
                                                    <option key={g} value={g}>
                                                        {g}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    ) : (
                                        <></>
                                    )
                                }



                                {/* Product Type */}

                                {
                                    filterOptions.productType && filterOptions.productType.length > 0 ? (
                                        <div className="filter-group">
                                            <label>Product Type:</label>
                                            <select name="productType" onChange={handleFilterChange}>
                                                <option value="">All</option>
                                                {filterOptions.productType.map((type) => (
                                                    <option key={type} value={type}>
                                                        {type}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    ) : (
                                        <></>
                                    )
                                }


                                {/* Fit */}


                                {
                                    filterOptions.fit && filterOptions.fit.length > 0 ? (
                                        <div className="filter-group">
                                            <label>Fit:</label>
                                            <select name="fit" onChange={handleFilterChange}>
                                                <option value="">All</option>
                                                {filterOptions.fit.map((fit) => (
                                                    <option key={fit} value={fit}>
                                                        {fit}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    ) : (
                                        <></>
                                    )
                                }



                                {/* Neckline */}

                                {
                                    filterOptions.neckline && filterOptions.neckline.length > 0 ? (
                                        <div className="filter-group">
                                            <label>Neckline:</label>
                                            <select name="neckline" onChange={handleFilterChange}>
                                                <option value="">All</option>
                                                {filterOptions.neckline.map((neckline) => (
                                                    <option key={neckline} value={neckline}>
                                                        {neckline}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    ) : (
                                        <></>
                                    )
                                }

                                {/* Pattern */}


                                {
                                    filterOptions.pattern && filterOptions.pattern.length > 0 ? (
                                        <div className="filter-group">
                                            <label>Pattern:</label>
                                            <select name="pattern" onChange={handleFilterChange}>
                                                <option value="">All</option>
                                                {filterOptions.pattern.map((pattern) => (
                                                    <option key={pattern} value={pattern}>
                                                        {pattern}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    ) : (
                                        <></>
                                    )
                                }




                                {/* Cuff */}

                                {
                                    filterOptions.cuff && filterOptions.cuff.length > 0 ? (
                                        <div className="filter-group">
                                            <label>Cuff:</label>
                                            <select name="cuff" onChange={handleFilterChange}>
                                                <option value="">All</option>
                                                {filterOptions.cuff.map((cuff) => (
                                                    <option key={cuff} value={cuff}>
                                                        {cuff}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    ) : (
                                        <></>
                                    )
                                }



                                {/* Sleeves */}


                                {
                                    filterOptions.sleeves && filterOptions.sleeves.length > 0 ? (
                                        <div className="filter-group">
                                            <label>Sleeves:</label>
                                            <select name="sleeves" onChange={handleFilterChange}>
                                                <option value="">All</option>
                                                {filterOptions.sleeves.map((sleeve) => (
                                                    <option key={sleeve} value={sleeve}>
                                                        {sleeve}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    ) : (
                                        <></>
                                    )
                                }



                                {/* Material */}


                                {
                                    filterOptions.material && filterOptions.material.length > 0 ? (
                                        <div className="filter-group">
                                            <label>Material:</label>
                                            <select name="material" onChange={handleFilterChange}>
                                                <option value="">All</option>
                                                {filterOptions.material.map((material) => (
                                                    <option key={material} value={material}>
                                                        {material}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    ) : (
                                        <></>
                                    )
                                }



                                {/* Color */}

                                {
                                    filterOptions.colors && filterOptions.colors.length > 0 ? (
                                        <div className="filter-group">
                                            <label>Color:</label>
                                            <select name="color" onChange={handleFilterChange}>
                                                <option value="">All</option>
                                                {filterOptions.colors.map((color) => (
                                                    <option key={color} value={color}>
                                                        {color}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    ) : (
                                        <></>
                                    )
                                }



                                {/* Size */}

                                {
                                    filterOptions.sizes && filterOptions.sizes.length > 0 ? (
                                        <div className="filter-group">
                                            <label>Size:</label>
                                            <select name="size" onChange={handleFilterChange}>
                                                <option value="">All</option>
                                                {filterOptions.sizes.map((size) => (
                                                    <option key={size} value={size}>
                                                        {size}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    ) : (
                                        <></>
                                    )
                                }
                            </form>
                        </div>
                    </div>

                </div>


                <div className="filter_container desktop_filter-container">
                    <form>

                        <div className="filter-group">
                            <label>Group:</label>
                            <select name="group" value={groupName} onChange={handleGroupChange}>
                                <option value="ELITE">ELITE</option>
                                <option value="HEAL">HEAL</option>
                                <option value="TOGS">TOGS</option>
                            </select>
                        </div>

                        {/* Category */}
                        <div className="filter-group">
                            <label>Category:</label>
                            <select name="category" onChange={handleFilterChange}>
                                <option value="">All</option>
                                {
                                    filterOptions.category ? (
                                        <>
                                            {filterOptions.category.map((cat) => (
                                                <option key={cat} value={cat}>
                                                    {cat}
                                                </option>
                                            ))}
                                        </>
                                    ) : (
                                        <></>
                                    )
                                }
                            </select>
                        </div>

                        {/* SubCategory */}
                        {
                            filterOptions.subCategory && filterOptions.subCategory.length > 0 ? (
                                <div className="filter-group">
                                    <label>SubCategory:</label>
                                    <select name="subCategory" onChange={handleFilterChange}>
                                        <option value="">All</option>
                                        {
                                            filterOptions.subCategory.map((subCat) => (
                                                <option key={subCat} value={subCat}>
                                                    {subCat}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>
                            ) : (
                                <></>
                            )
                        }


                        {/* Gender */}

                        {
                            filterOptions.gender && filterOptions.gender.length > 0 ? (
                                <div className="filter-group">
                                    <label>Gender:</label>
                                    <select name="gender" onChange={handleFilterChange}>
                                        <option value="">All</option>
                                        {filterOptions.gender.map((g) => (
                                            <option key={g} value={g}>
                                                {g}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ) : (
                                <></>
                            )
                        }



                        {/* Product Type */}

                        {
                            filterOptions.productType && filterOptions.productType.length > 0 ? (
                                <div className="filter-group">
                                    <label>Product Type:</label>
                                    <select name="productType" onChange={handleFilterChange}>
                                        <option value="">All</option>
                                        {filterOptions.productType.map((type) => (
                                            <option key={type} value={type}>
                                                {type}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ) : (
                                <></>
                            )
                        }


                        {/* Fit */}


                        {
                            filterOptions.fit && filterOptions.fit.length > 0 ? (
                                <div className="filter-group">
                                    <label>Fit:</label>
                                    <select name="fit" onChange={handleFilterChange}>
                                        <option value="">All</option>
                                        {filterOptions.fit.map((fit) => (
                                            <option key={fit} value={fit}>
                                                {fit}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ) : (
                                <></>
                            )
                        }



                        {/* Neckline */}

                        {
                            filterOptions.neckline && filterOptions.neckline.length > 0 ? (
                                <div className="filter-group">
                                    <label>Neckline:</label>
                                    <select name="neckline" onChange={handleFilterChange}>
                                        <option value="">All</option>
                                        {filterOptions.neckline.map((neckline) => (
                                            <option key={neckline} value={neckline}>
                                                {neckline}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ) : (
                                <></>
                            )
                        }

                        {/* Pattern */}


                        {
                            filterOptions.pattern && filterOptions.pattern.length > 0 ? (
                                <div className="filter-group">
                                    <label>Pattern:</label>
                                    <select name="pattern" onChange={handleFilterChange}>
                                        <option value="">All</option>
                                        {filterOptions.pattern.map((pattern) => (
                                            <option key={pattern} value={pattern}>
                                                {pattern}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ) : (
                                <></>
                            )
                        }




                        {/* Cuff */}

                        {
                            filterOptions.cuff && filterOptions.cuff.length > 0 ? (
                                <div className="filter-group">
                                    <label>Cuff:</label>
                                    <select name="cuff" onChange={handleFilterChange}>
                                        <option value="">All</option>
                                        {filterOptions.cuff.map((cuff) => (
                                            <option key={cuff} value={cuff}>
                                                {cuff}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ) : (
                                <></>
                            )
                        }



                        {/* Sleeves */}


                        {
                            filterOptions.sleeves && filterOptions.sleeves.length > 0 ? (
                                <div className="filter-group">
                                    <label>Sleeves:</label>
                                    <select name="sleeves" onChange={handleFilterChange}>
                                        <option value="">All</option>
                                        {filterOptions.sleeves.map((sleeve) => (
                                            <option key={sleeve} value={sleeve}>
                                                {sleeve}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ) : (
                                <></>
                            )
                        }



                        {/* Material */}


                        {
                            filterOptions.material && filterOptions.material.length > 0 ? (
                                <div className="filter-group">
                                    <label>Material:</label>
                                    <select name="material" onChange={handleFilterChange}>
                                        <option value="">All</option>
                                        {filterOptions.material.map((material) => (
                                            <option key={material} value={material}>
                                                {material}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ) : (
                                <></>
                            )
                        }



                        {/* Color */}

                        {
                            filterOptions.colors && filterOptions.colors.length > 0 ? (
                                <div className="filter-group">
                                    <label>Color:</label>
                                    <select name="color" onChange={handleFilterChange}>
                                        <option value="">All</option>
                                        {filterOptions.colors.map((color) => (
                                            <option key={color} value={color}>
                                                {color}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ) : (
                                <></>
                            )
                        }



                        {/* Size */}

                        {
                            filterOptions.sizes && filterOptions.sizes.length > 0 ? (
                                <div className="filter-group">
                                    <label>Size:</label>
                                    <select name="size" onChange={handleFilterChange}>
                                        <option value="">All</option>
                                        {filterOptions.sizes.map((size) => (
                                            <option key={size} value={size}>
                                                {size}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ) : (
                                <></>
                            )
                        }
                    </form>
                </div >
                <div className="product_container">
                    {
                        loading ? (
                            <div className='container-fluid'>
                                <div className='row mt-5 row-gap-5'>
                                    {loadingList.map((item, index) => (
                                        <div className="col-lg-4" key={index}>
                                            <div className='placeholder-glow' style={{ height: "50vh" }}>
                                                <span className="placeholder d-inline-block h-100 w-100"></span>
                                            </div>
                                            <h5 className="placeholder-glow">
                                                <span className="placeholder d-inline-block w-100"></span>
                                            </h5>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="container-fluid text-center">
                                <Link className='pr_back_link' to="/">
                                    <img src="/images/back.png" alt="" />
                                    <span>Back</span>
                                </Link>
                                <div className="row mt-5 row-gap-5">

                                    {filteredProducts.length > 0 ? (
                                        <>



                                            {filteredProducts.map((item) => {
                                                return item.variants.map((variant, index) => {
                                                    return (
                                                        <div className="col-lg-4 col-md-6 col-sm-6 mb-4 product_card-div" key={index}>
                                                            <Link to={`/${item.productId}/${variant.color.name}/${item.productType}/${item.subCategory}/${item.category}/${item.group}`} className="product-card">
                                                                <div className="product-image-wrapper">
                                                                    <LazyImage
                                                                        src={variant.imageUrls[0]}
                                                                        alt={variant.color.name}
                                                                        className="product-image"
                                                                    />
                                                                    {/* Rating overlay */}
                                                                    <div className="product-rating">
                                                                        <div className="pr_inner">
                                                                            <span style={{ marginRight: "4px" }}>
                                                                                4.5
                                                                            </span>
                                                                            <i className="fa-solid fa-star" style={{ marginRight: "4px" }}></i>

                                                                            <div className="rt_ppl">
                                                                                <div style={{ marginRight: "4px" }}>
                                                                                    |
                                                                                </div>
                                                                            </div>
                                                                            40
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="product-info">
                                                                    <h5 className="srt__Name">
                                                                        {variant.color.name} {item.productType}<br></br>
                                                                        Rs. {Number(item.price).toLocaleString("en-US", {
                                                                            style: "currency",
                                                                            currency: "INR",
                                                                        })}
                                                                    </h5>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    )
                                                })
                                            }
                                            )}
                                        </>

                                    ) : (
                                        <p>No products found</p>
                                    )}


                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    );
};

export default ProductListWithFilters;
