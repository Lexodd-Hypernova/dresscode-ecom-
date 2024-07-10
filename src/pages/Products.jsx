import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import DressCodeApi from '../common';
import s1 from "../../public/images/s1.png";
import FilterApi from '../components/filters/FilterApi';
import scrollTop from '../helpers/scrollTop';

const Products = () => {
    const { groupName, category, subCategory, productType, gender } = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const loadingList = new Array(8).fill(null);
    const [variants, setVariants] = useState([]);
    const [productId, setProductId] = useState('');
    const [filters, setFilters] = useState({ groupName, category, subCategory, productType, gender });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(DressCodeApi.getProductsByFilters.url + `?groupName=${filters.groupName}&category=${filters.category}&subCategory=${filters.subCategory}&productType=${filters.productType}&gender=${filters.gender}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const result = await response.json();

                const productId = result[0].productId;
                setProductId(productId);
                setData(result[0]);

                // Shuffle variants before setting them
                const shuffledVariants = shuffleArray(result[0].variants);
                setVariants(shuffledVariants);

                setLoading(false);
                console.log("rawProduct", result);
                console.log("productId", productId);
                console.log("shuffledVariants", shuffledVariants);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [filters]);

    const shuffleArray = (array) => {
        let shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };

    const handleFiltersChange = (newFilters) => {
        setFilters(newFilters);
        setLoading(true);  // Show loading while fetching new data
    };

    return (
        <>
            <FilterApi onFiltersChange={handleFiltersChange} />

            <section className='categories'>
                {loading ? (
                    <div className='container-fluid'>
                        <div className='row row-gap-5'>
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
                        <div className="row row-gap-5">
                            {variants.map((item, index) => (
                                <Link to={`/${productId}/${item.color.name}/${productType}/${subCategory}/${category}/${groupName}`} className="col-lg-3" key={index} onClick={scrollTop}>
                                    <img src={s1} alt="" className="w-100" />
                                    <h5 className='srt__Name'>{item.variantId}</h5>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </section>
        </>
    );
}

export default Products;
