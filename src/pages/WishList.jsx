import axios from "axios";
import { shoppingInfoApis } from "../common";
import { useEffect, useState } from "react";
import { useWhishList } from "../context/WishListContext";

const WishList = () => {

    const { wishList, deleteWishList } = useWhishList()

    return (
        <div>
            <h3>My whishlist</h3>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
                {
                    wishList.map((item, index) => {
                        return (
                            <div className="card" key={index} style={{ width: "18rem", border: "none", textAlign: 'center', position: 'relative' }}>
                                <i className="fa-solid fa-x fa-beat-fade fs-4" style={{ position: 'absolute', top: '-10px', right: '0px', cursor: 'pointer' }} onClick={() => deleteWishList(item._id)}></i>
                                <img className="card-img-top" src="https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg" alt="Card image cap" />
                                <div className="card-body">
                                    <p className="card-text">{item.color.name} {item.group} </p>
                                    <p className="card-text">{item.productDetails.fit} {item.productDetails.neckline}</p>
                                    <p className="card-text">${item.productDetails.price}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>



        </div>
    )
}

export default WishList