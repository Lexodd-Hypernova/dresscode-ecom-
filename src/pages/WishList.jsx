import { useWhishList } from "../context/WishListContext";
import { useNavigate } from 'react-router-dom';
import "./pages-styles/wishlist.styles.css";

import LoadingComponent from "../common/components/LoadingComponent";
import { Helmet } from "react-helmet-async";

const WishList = () => {

    const navigate = useNavigate();
    const { wishList, deleteWishList, loading } = useWhishList();

    const handleGoBack = () => {
        navigate(-1); // Navigates to the previous page
    };

    return (

        <>

            <Helmet>
                <title>My Wishlist | DressCode - Save Your Favorite Uniforms for Later</title>
                <meta name="description" content="Keep track of your favorite school uniforms, medical scrubs, and corporate workwear with Dresscode's Wishlist. Save items for later and shop whenever you're ready." />
            </Helmet>

            <div className="wishlist_screen">
                <div className="cart-back" onClick={handleGoBack}>
                    <img src="/images/auth/back-arrow.svg" alt="" />
                </div>
                <h2 className="bag_title">My Wishlist</h2>

                {
                    loading ? (
                        <LoadingComponent></LoadingComponent>
                    ) : (
                        <div className="wish_item-con">
                            {

                                wishList.length > 0 ? (
                                    wishList.map((item, index) => {
                                        return (
                                            <div className="wish_Item" key={index}>
                                                <i className="fa-solid fa-x fa-beat-fade fs-4" style={{ position: 'absolute', top: '-10px', right: '0px', cursor: 'pointer' }} onClick={() => deleteWishList(item._id)}></i>

                                                <div className="w_item-img">
                                                    <img className="card-img-top w-100" src={item.imgUrl} alt="Card image cap" />
                                                </div>

                                                <div className="w-item_des">
                                                    <p className="">{item.color.name} {item.productDetails.productType} </p>
                                                    {/* <p className="card-text">{item.productDetails.fit} {item.productDetails.neckline}</p> */}
                                                    {/* <p className="card-text">${item.productDetails.price}</p> */}
                                                </div>
                                            </div>
                                        )
                                    })

                                ) : (
                                    <h5 className="fs-3 text-center">You do not have any wishlist</h5>
                                )
                            }

                        </div>
                    )
                }
            </div >

        </>
    )
}

export default WishList