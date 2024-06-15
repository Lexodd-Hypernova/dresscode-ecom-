import React from 'react';
import "./sortBy.css";

const SortBy = () => {
    return (
        <section className='sortBy__con'>
            <div className='srt__Ttl'>
                <div className="hm_ct-ttl">
                    <h3>Sort By</h3>
                    <div className="bt_arw">
                        <img src="images/arrow-down.png" alt="" />
                    </div>
                </div>
            </div>
            <div className="container-fluid text-center">
                <div className="row row-gap-5">
                    <div className="col-lg-4">
                        <img src="images/s1.png" alt="" className="w-100" />
                        <h5 className='srt__Name'>Skirts</h5>
                    </div>
                    <div className="col-lg-4">
                        <img src="images/s2.png" alt="" className="w-100" />
                        <h5 className='srt__Name'>Pants</h5>
                    </div>
                    <div className="col-lg-4">
                        <img src="images/s3.png" alt="" className="w-100" />
                        <h5 className='srt__Name'>Trousers</h5>
                    </div>
                    <div className="col-lg-4">
                        <img src="images/s4.png" alt="" className="w-100" />
                        <h5 className='srt__Name'>patient Apron</h5>
                    </div>
                    <div className="col-lg-4">
                        <img src="images/s5.png" alt="" className="w-100" />
                        <h5 className='srt__Name'>Scrubs</h5>
                    </div>
                    <div className="col-lg-4">
                        <img src="images/s6.png" alt="" className="w-100" />
                        <h5 className='srt__Name'>Doctor Apron</h5>
                    </div>
                    <div className="col-lg-4">
                        <img src="images/s7.png" alt="" className="w-100" />
                        <h5 className='srt__Name'>Jerseys</h5>
                    </div>
                    <div className="col-lg-4">
                        <img src="images/s8.png" alt="" className="w-100" />
                        <h5 className='srt__Name'>Ties</h5>
                    </div>
                    <div className="col-lg-4">
                        <img src="images/s9.png" alt="" className="w-100" />
                        <h5 className='srt__Name'>T-shirts</h5>
                    </div>
                    <div className="col-lg-4">
                        <img src="images/s10.png" alt="" className="w-100" />
                        <h5 className='srt__Name'>Sports Shoes</h5>
                    </div>
                    <div className="col-lg-4">
                        <img src="images/s11.png" alt="" className="w-100" />
                        <h5 className='srt__Name'>Casual Shoes</h5>
                    </div>
                    <div className="col-lg-4">
                        <img src="images/s12.png" alt="" className="w-100" />
                        <h5 className='srt__Name'>Formal Shoes</h5>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SortBy