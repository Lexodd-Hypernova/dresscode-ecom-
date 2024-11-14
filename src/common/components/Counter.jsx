import { useState, useCallback, useEffect } from "react";
import "./counter.styles.css";
// import axios from "axios";
import { shoppingInfoApis } from "..";

import axiosInstance from "../axiosInstance";

const Counter = ({ initialCount, cartItemId, price, onUpdateQuantity }) => {
  const [count, setCount] = useState(initialCount);
  const [loading, setLoading] = useState(false);
  // const token = localStorage.getItem("token");

  const [conterError, setCounterError] = useState();

  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };

  const userId = localStorage.getItem("id");

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };


  const updateAPI = async (quantity) => {
    setLoading(true);
    // console.log("hitting in counter");
    try {

      const response = await axiosInstance.patch(shoppingInfoApis.handleItemsCount(userId, cartItemId),
        { quantityNeedToChange: quantity },
        {
          withCredentials: true // Ensure cookies are sent with the request
        }
      );


      // const response = await axios.patch(
      //   shoppingInfoApis.handleItemsCount(userId, cartItemId),
      //   { quantityNeedToChange: quantity },
      //   config
      // );
      // If the API call is successful, keep the item checked
      onUpdateQuantity(quantity, cartItemId); // Keep this item checked
      setCounterError(); // Clear any previous errors

      // console.log(response.data);
    } catch (error) {
      console.error("Error updating item quantity:", error);
      setCount(1)

      // If there is an error, uncheck only the affected item
      onUpdateQuantity(1, cartItemId); // Uncheck this item
      setCounterError(error.response?.data?.message || "Stock issue detected");
    } finally {
      setLoading(false);
    }
  };


  const debouncedUpdateAPI = useCallback(debounce(updateAPI, 1000), []);

  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    debouncedUpdateAPI(newCount);
  };

  const decrement = () => {
    const newCount = Math.max(count - 1, 0);
    setCount(newCount);
    debouncedUpdateAPI(newCount);
  };

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setCount(value);
    debouncedUpdateAPI(value);
  };

  return (
    <div className="c_counter">
      <div className="counter_inner">
        Qty
        <button
          className="counter-btn"
          onClick={decrement}
          disabled={count === 0 || loading}
        >
          -
        </button>
        <input
          type="number"
          value={count}
          className="counter-display"
          onChange={handleChange}
        />
        <button className="counter-btn" onClick={increment} disabled={loading}>
          +
        </button>
      </div>

      <div className="counter_status">
        {loading && <div className="spinner-border " style={{ color: 'oragne' }} role="status">
          <span className="sr-only"></span>
        </div>}
      </div>
      {/* <div className="counter_error">
        {
          conterError &&
          <div className="alert alert-warning alert-dismissible fade show" role="alert">
            {conterError}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        }
      </div> */}


      <div className="counter_error">
        {conterError && (
          <div className="alert alert-warning alert-dismissible" role="alert">
            {conterError}
            <button type="button" className="btn-close" onClick={() => setCounterError(null)} aria-label="Close"></button>
          </div>
        )}
      </div>



      {/* <span>{price}</span> */}

    </div>
  );
};

export default Counter;