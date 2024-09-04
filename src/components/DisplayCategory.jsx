import React from 'react';
// import "./displayCategory.css";
import s1 from "../../public/images/s1.png";
import { Link } from 'react-router-dom';
import scrollTop from '../helpers/scrollTop';

const DisplayCategory = ({ data, loading, groupName }) => {

    const loadingList = new Array(3).fill(null);

    const showCategory = (data) => {
        console.log("data", data)
        if (data) {
            return data.map((item, index) => (
                <Link to={`/${groupName}/${item.category}`} className="col-lg-4" key={index} onClick={scrollTop}>
                    <img src={s1} alt="" className="w-100" />
                    <h5 className='srt__Name'>{item.category}</h5>
                </Link>
            ))
        }
    }

    return (
        <section className='categories'>
            <div className='srt__Ttl'>
                <div className="hm_ct-ttl">
                    <h3>Select one of the collection</h3>
                    <div className="bt_arw">
                        <img src="/images/arrow-down.png" alt="" />
                    </div>
                </div>
            </div>
            {
                loading ?
                    <div className='container-fluid'>
                        <div className='row row-gap-5'>{
                            loadingList.map((item, index) => {
                                return (
                                    <div className="col-lg-4" key={index}>
                                        <div className='placeholder-glow' style={{ height: "60vh" }}>
                                            <span className="placeholder d-inline-block h-100 w-100"></span>
                                        </div>
                                        <h5 className="placeholder-glow">
                                            <span className="placeholder d-inline-block w-100"></span>
                                        </h5>
                                    </div>
                                )
                            })
                        }
                        </div>
                    </div> : (
                        <div className="container-fluid text-center">
                            <div className="row row-gap-5">
                                {
                                    showCategory(data)
                                }
                            </div>
                        </div>
                    )
            }
        </section>
    )
}

export default DisplayCategory