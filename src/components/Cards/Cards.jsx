import React, { useState, useEffect } from "react";
import DressCodeApi from "../../common";
import { Link } from "react-router-dom";

const Cards = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {
      setLoading(true);
      const response = await fetch(DressCodeApi.getGroups.url, requestOptions);
      const result = await response.json();
      setLoading(false);
      setGroups(result);
      console.log("Fetched result of Cards:", result); // Log fetched data
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return loading ? (
    <div className="placeholder-glow w-100 vh-100 rounded-14">
      <span className="placeholder h-100 d-inline-block w-100"></span>
    </div>
  ) : (
    <div className="container mt-5">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {groups.map((group, index) => (
          <div className="col" key={index}>
            <div className="card h-100">
              <img
                src={group.imageUrl || "https://via.placeholder.com/150"}
                className="card-img-top"
                alt={group.groupName || "Card image"}
              />
              <div className="card-body">
                <h5 className="card-title">
                  {group.groupName || "Default Title"}
                </h5>
              </div>
              <div className="card-footer">
                <Link
                  to={`/${group.groupName}`}
                  key={index}
                  className="btn btn-primary"
                >
                  Go somewhere
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
