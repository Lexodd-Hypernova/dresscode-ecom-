import React from 'react';
import "./footer.css";

const Footer = () => {
    return (
        <footer>
            <section className='ft__Row1'>
                <div className='ft_icn-sec'>
                    <div className='ft-cs'>
                        <div className='ft-icn'>
                            <img src="images/ft-cs.png" alt="" className="d-block w-100" />
                        </div>
                        <h5>Customer Support</h5>
                    </div>
                    <div className='ft-cs'>
                        <div className='ft-icn'>
                            <img src="images/ft-hp.png" alt="" className="d-block w-100" />
                        </div>
                        <h5>100% Handpicked</h5>
                    </div>
                    <div className='ft-cs'>
                        <div className='ft-icn'>
                            <img src="images/ft-aq.png" alt="" className="d-block w-100" />
                        </div>
                        <h5>Assured Quality</h5>
                    </div>
                </div>
            </section>
            <section className='ft__Row2'>
                <div className='ft_thk'>
                    <h5 className='thank'>Thankyou</h5>
                    <h4 className='visit'>Visit again</h4>
                    <div className='ft_str'>
                        <img src="images/store.png" alt="" />
                    </div>
                </div>
                <div className='ft_card'>
                    <div className='ft-card-row'>
                        <div className='ft-card-loc'>
                            <h4 className='ft-card-ttl'>
                                Location
                            </h4>
                            <address>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do </address>
                            <a href="" className='ft_dir'>Get Directions</a>
                        </div>
                        <div className='ft-card-contact'>
                            <h4 className='ft-card-ttl'>
                                Contact
                            </h4>
                            <a href="tel:+" className='ft-cn'>9632587410</a>
                            <a href="mailto:" className='ft-cn'>contact@dresscode.com</a>
                        </div>
                    </div>
                    <div className='ft-card-row'>
                        <div className='ft-card-links'>
                            <h4 className='ft-card-ttl'>
                                Quick links
                            </h4>
                            <ul>
                                <li>
                                    <a href="">
                                        School Uniforms
                                    </a>
                                </li>
                                <li>
                                    <a href="">
                                        Scrubs
                                    </a>
                                </li>
                                <li>
                                    <a href="">
                                        Doctor Aprons
                                    </a>
                                </li>
                                <li>
                                    <a href="">
                                        Jersey’s
                                    </a>
                                </li>
                                <li>
                                    <a href="">
                                        Accessories
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className='ft-card-stalk'>
                            <h4 className='ft-card-ttl'>
                                Stalk us
                            </h4>
                            <div className='social-links'>
                                <a href="" target="_blank">Instagram</a>
                                <a href="" target="_blank">Facebook</a>
                                <a href="" target="_blank">Twitter</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='ft__Row3'>
                <div className='ft_Ttl'>
                    DressCode
                </div>
            </section>
        </footer>
    )
}

export default Footer