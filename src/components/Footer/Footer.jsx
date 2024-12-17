import React from 'react';
import "./footer.css";
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <>
            <footer>
                <section className='ft__Row1'>
                    <div className='ft_icn-sec'>
                        <div className='ft-cs'>
                            <div className='ft-icn'>
                                <img src="/images/ft-cs.png" alt="" className="d-block w-100" />
                            </div>
                            <h5>Customer Support</h5>
                        </div>
                        <div className='ft-cs'>
                            <div className='ft-icn'>
                                <img src="/images/ft-hp.png" alt="" className="d-block w-100" />
                            </div>
                            <h5>100% Handpicked</h5>
                        </div>
                        <div className='ft-cs'>
                            <div className='ft-icn'>
                                <img src="/images/ft-aq.png" alt="" className="d-block w-100" />
                            </div>
                            <h5>Assured Quality</h5>
                        </div>
                    </div>
                </section>
                <section className='ft__Row2'>
                    <div className='ft_thk'>
                        <h5 className='thank'>Thankyou</h5>
                        <div className='visit'>
                            <h4>Visit again</h4>
                            <i className="fa-solid fa-bag-shopping"></i>
                        </div>

                        {/* <div className='ft_str'>
                            <img src="images/store.png" alt="" />
                        </div> */}
                    </div>
                    <div className='ft_card'>
                        <div className='ft-card-row'>
                            <div className='ft-card-loc'>
                                <h4 className='ft-card-ttl'>
                                    Location
                                </h4>
                                <address>
                                    DressCode ,
                                    G Anupamanandh Vijay Kumar Building,
                                    Opp RVR School of Photography,
                                    Annapurna Studio Lane,
                                    Rd No :2, LV Prasad Marg, Jubilee Hills, Hyderabad, Telangana 500033.
                                </address>
                                <a href="https://www.google.com/maps/place/17%C2%B025'30.8%22N+78%C2%B025'24.2%22E/@17.4252227,78.4208078,1046m/data=!3m2!1e3!4b1!4m4!3m3!8m2!3d17.4252227!4d78.4233827?hl=en&entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D" target="_blank" className='ft_dir'>Get Directions</a>
                            </div>
                            <div className='ft-card-contact'>
                                <h4 className='ft-card-ttl'>
                                    Contact
                                </h4>
                                <a href="tel:+917036436370" className='ft-cn'>+91 70364 36370</a>
                                <a href="mailto:info@dress-code.in" className='ft-cn'>info@dress-code.in</a>
                            </div>
                        </div>
                        <div className='ft-card-row'>
                            <div className='ft-card-links'>
                                <h4 className='ft-card-ttl'>
                                    Quick links
                                </h4>
                                <ul>
                                    <li>
                                        <Link to="/coming-soon">
                                            School Uniforms
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/products/ELITE">
                                            Corporate Uniforms
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/products/HEAL">
                                            Doctor Aprons
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/coming-soon">
                                            Jersey’s
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/coming-soon">
                                            Accessories
                                        </Link>
                                    </li>
                                    <li>
                                        <a href="https://dress-code.in/">
                                            About us
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className='ft-card-stalk'>
                                <h4 className='ft-card-ttl'>
                                    Stalk us
                                </h4>
                                <div className='social-links'>
                                    <a href="https://www.instagram.com/official_dress_code_/?igsh=MWJmaG9oZGh2aTVzMA%3D%3D" target="_blank">Instagram</a>
                                    <a href="https://www.facebook.com/people/Dress-Code/61555326429338/?mibextid=LQQJ4d" target="_blank">Facebook</a>
                                    <a href="https://www.linkedin.com/company/dress-codeuniforms/" target="_blank">LinkedIn</a>
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
            {/* <a href="https:/wa.me/+917036436370" target="_blank" class="whatsapp_float"><i class="fa-brands fa-whatsapp whatsapp-icon"></i></a> */}

            <a href="https://wa.me/+917036436370" target="_blank" className="whatsapp_float">
                <i className="fa-brands fa-whatsapp whatsapp-icon"></i>
            </a>


        </>
    )
}

export default Footer