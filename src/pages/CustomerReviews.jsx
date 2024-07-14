import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { shoppingInfoApis } from "../common";
import { PrimeReactProvider } from "primereact/api";
import { Rating } from "primereact/rating";
import "./pages-styles/CustomerReview.styles.css";
import { ProgressBar } from "primereact/progressbar";
const CustomerReviews = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const [rating, setRating] = useState(0);
  const [overAll, setOverAll] = useState([]);
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const getReviews = async () => {
    try {
      const res = await axios.get(
        shoppingInfoApis.getReviews(params.group, params.productId),
        config
      );
      console.log(res.data);
      setData(res.data.reviews);
    } catch (error) {
      console.log(error);
    }
  };
  const avgRating = () => {
    let sum = 0;
    data.forEach((item) => {
      sum += item.rating;
    });
    setRating(sum / data.length);
    console.log(rating, "rating");
    return rating;
  };
  const overAllindviualRating = () => {
    let one = 0;

    let two = 0;
    let three = 0;
    let four = 0;
    let five = 0;
    data.forEach((item) => {
      if (item.rating === 1) {
        one += 1;
      }
      if (item.rating === 2) {
        two += 1;
      }
      if (item.rating === 3) {
        three += 1;
      }
      if (item.rating === 4) {
        four += 1;
      }
      if (item.rating === 5) {
        five += 1;
      }
    });
    return setOverAll([
      (one / data.length) * 100,
      (two / data.length) * 100,
      (three / data.length) * 100,
      (four / data.length) * 100,
      (five / data.length) * 100,
    ]);
  };
  useEffect(() => {
    getReviews();
    avgRating();
    overAllindviualRating();
  }, []);
  return (
    <PrimeReactProvider>
      <div style={{ padding: "100px" }}>
        <h3>Customer Reviews</h3>
        <Rating value={rating} readOnly cancel={false} />

        <p>{data.length} Ratings</p>

        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <div>
            {/* 5 Start <Rating value={5} readOnly cancel={false} /> */}5 Start{" "}
            <ProgressBar
              value={overAll[4]}
              style={{ width: 300 }}
            ></ProgressBar>
            4 Start{" "}
            <ProgressBar
              value={overAll[3]}
              style={{ width: 300 }}
            ></ProgressBar>
            3 Start{" "}
            <ProgressBar
              value={overAll[2]}
              style={{ width: 300 }}
            ></ProgressBar>
            2 Start{" "}
            <ProgressBar
              value={overAll[1]}
              style={{ width: 300 }}
            ></ProgressBar>
            1 Start{" "}
            <ProgressBar
              value={overAll[0]}
              style={{ width: 300 }}
            ></ProgressBar>
            <hr style={{ marginTop:50 }} />
            <h3 className="mt-3"> Review this product</h3>
            <span style={{fontWeight:100}}>share your thoughts with other customers </span>
            <div className="rounded mt-2" style={{fontWeight:300,border:'1px solid',textAlign:'center',padding:'10px',cursor:'pointer'}}>write a product review</div>
          </div>
          {/* contnet */}
          <div style={{marginLeft:'100px'}}>
            {data.map((item) => {
              return (
                <>
                  <div>
                    <h3>{item.username}</h3>
                    <div style={{ marginLeft: 50 }}>
                      <Rating value={item.rating} readOnly cancel={false} />
                      <p>{item.comment}</p>
                      {/* <h5 style={{item.imgUrl.length>}}>Reviews With Images</h5> */}
                      <div style={{ display: "flex", gap: "20px" }}>
                        {item.imgUrl.map((val) => {
                          return (
                            <>
                              <img
                                src={val}
                                alt=""
                                style={{ width: 100, height: 100 }}
                              />
                            </>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </PrimeReactProvider>
  );
};

export default CustomerReviews;
