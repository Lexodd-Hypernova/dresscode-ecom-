import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DressCodeApi from '../common';
import TextMove from '../components/InfiniteTextMove/TextMove';
import s1 from "../../public/images/s1.png";
import { Link } from 'react-router-dom';
import scrollTop from "../helpers/scrollTop";

const SubCategories = () => {

    const { groupName, category } = useParams();
    const [subcategoryData, setSubCategoryData] = useState([]);
    const [loading, setLoading] = useState(true);
    const loadingList = new Array(3).fill(null)
    useEffect(() => {
        const fetchData = async () => {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow"
            };

            try {
                const response = await fetch(DressCodeApi.getSubCategories.url + `?groupName=${groupName}&category=${category}`, requestOptions);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const result = await response.json();
                setSubCategoryData(result);
                setLoading(false);
                console.log(result);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [groupName, category]);
    return (
        <>
            <TextMove title={category} />
            <section className="mid__Ttl-con">
                <div className="hm_ct-ttl">
                    <Link className='back_link' to={`/category/${groupName}`}>
                        <img src="/images/back.png" alt="" />
                        <span>Back</span>
                    </Link>
                </div>
                <div className="hm__Ttl-para">
                    <p>DressCode Elevating Excellence <img src="/images/hm-ttl.png" alt="" /> Unparalleled quality,
                        innovation, and service tailored to your needs.
                        Embark on a journey with us for the finest in business attire.
                    </p>
                </div>
            </section>

            <section className='categories'>
                <div className='srt__Ttl'>
                    <div className="hm_ct-ttl">
                        <h3>Select one of the collection</h3>
                        <div className="bt_arw">
                            <img src="/images/arrow-down.png" alt="" />
                        </div>
                    </div>
                </div>
                {loading ?
                    <div className='container-fluid'>
                        <div className='row row-gap-5'>{
                            loadingList.map((item, index) => {
                                return (
                                    <div className="col-lg-4">
                                        <div className='placeholder-glow' style={{ height: "60vh" }}>
                                            <span className="placeholder d-inline-block h-100 w-100"></span>
                                        </div>
                                        <h5 class="placeholder-glow">
                                            <span class="placeholder d-inline-block w-100"></span>
                                        </h5>
                                    </div>
                                )
                            })
                        }
                        </div>
                    </div>
                    : (
                        <div className="container-fluid text-center">
                            <div className="row row-gap-5">
                                {subcategoryData.map((item, index) => (
                                    <Link to={`/${groupName}/${category}/${item.subCategory}`} className="col-lg-4" key={index} onClick={scrollTop}>
                                        <img src={s1} alt="" className="w-100" />
                                        <h5 className='srt__Name'>{item.subCategory}</h5>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
            </section>
        </>
    )
}

export default SubCategories