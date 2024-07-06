import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DressCodeApi from '../common';
import TextMove from '../components/InfiniteTextMove/TextMove';
import { Link } from 'react-router-dom';
import DisplayCategory from '../components/DisplayCategory';

const Categories = () => {

    const { groupName } = useParams();
    const [categoryData, setCategoryData] = useState([]);
    const [loading, setLoading] = useState(true);

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
                const response = await fetch(DressCodeApi.getCategories.url + `?groupName=${groupName}`, requestOptions);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const result = await response.json();
                setCategoryData(result);
                setLoading(false);
                console.log(result);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [groupName]);

    return (
        <>
            <TextMove title={groupName} />
            <section className="mid__Ttl-con">
                <div className="hm_ct-ttl">
                    <Link className='back_link' to="/">
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

            <DisplayCategory data={categoryData} loading={loading} groupName={groupName} />
        </>
    )
}

export default Categories



