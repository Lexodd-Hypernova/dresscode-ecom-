import React from 'react'
import Category from './Category'
import NavBar from '../Header/NavBar'
import TextMove from '../InfiniteTextMove/TextMove'
import SortBy from './SortBy';
import "./style.css";
import Footer from '../Footer/Footer';
const Home = () => {
    return (
        <>
            <NavBar />
            <TextMove />
            <Category />
            <SortBy />
            <section className='hm__Ext'>
                <div className='hm_ext-p'>
                    <p>
                        Elevate your uniform experience with us,
                        where quality and style unite seamlessly.
                        Explore our store today and find the perfect
                        fit for your unique needs.
                    </p>
                </div>
                <div className='hm_ext-cnt'>
                    <div className='or_pr'>
                        <h2>Our prdoucts</h2>
                        <div className='pr_icn'>
                            <img src="images/pr-icn.png" alt="" className='d-block w-100' />
                        </div>
                    </div>
                    <ul className='pr_list'>
                        <li>
                            <h4>a large selection of school uniforms</h4>
                            <img src="images/tick.png" alt="" />
                        </li>
                        <li>
                            <h4>excellent comfort and fit for all ages</h4>
                            <img src="images/tick.png" alt="" />
                        </li>
                        <li>
                            <h4>athletic and footwear for school</h4>
                            <img src="images/tick.png" alt="" />
                        </li>
                        <li>
                            <h4>comfy and soft socks</h4>
                            <img src="images/tick.png" alt="" />
                        </li>
                    </ul>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Home