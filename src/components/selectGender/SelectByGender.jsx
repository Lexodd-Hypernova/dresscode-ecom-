import React from 'react';
import "./style.css";
import NavBar from '../Header/Header';
import Footer from '../Footer/Footer';

const SelectByGender = () => {
    return (
        <>
            <NavBar />
            <section className='select__Gender'>
                <nav className='gen_Nav'>
                    <div class="nav nav-underline gen_nav-tab" id="nav-tab" role="tablist">
                        <button class="nav-link active gen-tab" id="nav-male-tab" data-bs-toggle="tab" data-bs-target="#nav-male" type="button" role="tab" aria-controls="nav-male" aria-selected="true">Boy</button>
                        <button class="nav-link gen-tab" id="nav-female-tab" data-bs-toggle="tab" data-bs-target="#nav-female" type="button" role="tab" aria-controls="nav-female" aria-selected="false">Girl</button>
                    </div>
                </nav>
                <div class="tab-content" id="nav-tabContent">
                    <div class="tab-pane fade active show" id="nav-male" role="tabpanel" aria-labelledby="nav-male-tab">
                        <div className="container-fluid text-center">
                            <div className="row row-gap-5">
                                <div className="col-lg-4">
                                    <img src="images/shirt.png" alt="" className="w-100" />
                                    <h5 className='srt__Name'>Shirt</h5>
                                </div>
                                <div className="col-lg-4">
                                    <img src="images/pant.png" alt="" className="w-100" />
                                    <h5 className='srt__Name'>Pant</h5>
                                </div>
                                <div className="col-lg-4">
                                    <img src="images/trouser.png" alt="" className="w-100" />
                                    <h5 className='srt__Name'>Trouser</h5>
                                </div>
                                <div className="col-lg-4">
                                    <img src="images/skirt.png" alt="" className="w-100" />
                                    <h5 className='srt__Name'>Mini skirt</h5>
                                </div>
                                <div className="col-lg-4">
                                    <img src="images/sk2.png" alt="" className="w-100" />
                                    <h5 className='srt__Name'>Skirt</h5>
                                </div>
                                <div className="col-lg-4">
                                    <img src="images/shoe.png" alt="" className="w-100" />
                                    <h5 className='srt__Name'>Shoes</h5>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="nav-female" role="tabpanel" aria-labelledby="nav-female-tab">
                        <div className="container-fluid text-center">
                            <div className="row row-gap-5">
                                <div className="col-lg-4">
                                    <img src="images/shirt.png" alt="" className="w-100" />
                                    <h5 className='srt__Name'>Shirt</h5>
                                </div>
                                <div className="col-lg-4">
                                    <img src="images/pant.png" alt="" className="w-100" />
                                    <h5 className='srt__Name'>Pant</h5>
                                </div>
                                <div className="col-lg-4">
                                    <img src="images/trouser.png" alt="" className="w-100" />
                                    <h5 className='srt__Name'>Trouser</h5>
                                </div>
                                <div className="col-lg-4">
                                    <img src="images/skirt.png" alt="" className="w-100" />
                                    <h5 className='srt__Name'>Mini skirt</h5>
                                </div>
                                <div className="col-lg-4">
                                    <img src="images/sk2.png" alt="" className="w-100" />
                                    <h5 className='srt__Name'>Skirt</h5>
                                </div>
                                <div className="col-lg-4">
                                    <img src="images/shoe.png" alt="" className="w-100" />
                                    <h5 className='srt__Name'>Shoes</h5>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}

export default SelectByGender