import React, { useState, useEffect } from "react";
import DressCodeApi from "../../common";
import { Link, useNavigate } from "react-router-dom";
import "./cards.css";

const groups = [
  //  {
  //   name: "ELITE",
  //   src: "https://i.imgur.com/E8sD0n1.png"
  // },
  // {
  //   name: "ELITE",
  //   src: "https://ik.imagekit.io/txmekgeyk/Dress%20Code/c1.png?updatedAt=1723106166949"
  // },
  // {
  //   name: "HEAL",
  //   src: "https://ik.imagekit.io/txmekgeyk/Dress%20Code/c1.png?updatedAt=1723106166949"
  // },
  // {
  //   name: "TOGS",
  //   src: "https://ik.imagekit.io/txmekgeyk/Dress%20Code/c1.png?updatedAt=1723106166949"
  // },
  {
    name: "ELITE",
    src: "images/Elite.png"
  },
  {
    name: "HEAL",
    src: "images/Heal.png"
  },
  {
    name: "TOGS",
    src: "images/Togs.png"
  },

]

const Cards = () => {
  // const [groups, setGroups] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const loadingList = new Array(3).fill(null);

  const navigate = useNavigate();

  // const fetchData = async () => {
  //   const requestOptions = {
  //     method: "GET",
  //     redirect: "follow",
  //   };

  //   try {
  //     setLoading(true);
  //     const response = await fetch(DressCodeApi.getGroups.url, requestOptions);
  //     const result = await response.json();
  //     setLoading(false);
  //     setGroups(result);
  //     console.log("Fetched result of Cards:", result); // Log fetched data
  //   } catch (error) {
  //     setLoading(false);
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);


  const handleClick = (name) => {
    console.log(name);
    navigate(`/products/${name}`)
    // if (name === "TOGS") {
    //   navigate("/coming-soon")
    // } else {
    //   navigate(`/products/${name}`)
    // }
  }


  return (
    <section className="card-section">

      <div className="container-fluid">
        <div className="row row-gap-4">
          {groups.map((group, index) => (
            <div className="col-lg-4" role="button" key={index} onClick={() => handleClick(group.name)}>
              <img
                src={group.src}
                className="w-100 rounded"
                alt={group.name || "Card image"}
              />
              <h3 className="card-title mt-2">{group.name}</h3>
            </div>
          ))}
        </div>
      </div>


      {/* {
        loading ? (
          <div className='container-fluid'>
            <div className='row row-gap-5'>{
              loadingList.map((item, index) => {
                return (
                  <div className="col-lg-4" key={index}>
                    <div className='placeholder-glow' style={{ height: "50vh" }}>
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
          </div>
        ) : (
          <div className="container-fluid">
            <div className="row row-gap-4">
              {groups.map((group, index) => (
                <div className="col-lg-4" role="button" key={index} onClick={() => handleClick(group.groupName)}>
                  <img
                    src=
                    className="w-100 rounded"
                    alt={group.groupName || "Card image"}
                  />
                  <h3 className="card-title mt-2">{group.groupName}</h3>
                </div>
              ))}
            </div>
          </div>
        )
      } */}
    </section>
  )


};

export default Cards;
