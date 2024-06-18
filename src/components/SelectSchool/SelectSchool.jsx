import React from 'react';
import "./style.css";
import TextMove from "../InfiniteTextMove/TextMove";
import NavBar from "../Header/NavBar";
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';

const SelectSchool = () => {
    return (
        <>
            <NavBar></NavBar>
            <TextMove></TextMove>
            <section className="mid__Ttl-con">
                <div className="hm_ct-ttl">
                    <Link className='back_link'>

                        <img src="images/back.png" alt="" />
                        <span>Back</span>

                    </Link>
                </div>
                <div className="hm__Ttl-para">
                    <p>DressCode Elevating Excellence <img src="images/hm-ttl.png" alt="" /> Unparalleled quality,
                        innovation, and service tailored to your needs.
                        Embark on a journey with us for the finest in business attire.
                    </p>
                </div>
            </section>
            <section className='sortBy__con'>
                <div className='srt__Ttl'>
                    <div className="hm_ct-ttl">
                        <h3>Select your school</h3>
                        <div className="bt_arw">
                            <img src="images/arrow-down.png" alt="" />
                        </div>
                    </div>
                </div>
                <div className="container-fluid text-center">
                    <div className="row row-gap-5">
                        <div className="col-lg-4">
                            <img src="images/sc1.png" alt="" className="w-100" />
                            <h5 className='srt__Name'>Delhi public school</h5>
                        </div>
                        <div className="col-lg-4">
                            <img src="images/sc2.png" alt="" className="w-100" />
                            <h5 className='srt__Name'>CRPF public school</h5>
                        </div>
                        <div className="col-lg-4">
                            <img src="images/sc3.png" alt="" className="w-100" />
                            <h5 className='srt__Name'>KMS</h5>
                        </div>
                        <div className="col-lg-4">
                            <img src="images/sc4.png" alt="" className="w-100" />
                            <h5 className='srt__Name'>LLPS</h5>
                        </div>
                        <div className="col-lg-4">
                            <img src="images/sc5.png" alt="" className="w-100" />
                            <h5 className='srt__Name'>KBHS</h5>
                        </div>
                        <div className="col-lg-4">
                            <img src="images/sc6.png" alt="" className="w-100" />
                            <h5 className='srt__Name'>TPS</h5>
                        </div>
                    </div>
                </div>
            </section>
            <Footer></Footer>

        </>
    )
}

export default SelectSchool