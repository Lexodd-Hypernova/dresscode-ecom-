import { useState, useCallback, useEffect } from "react";
import "./counter.styles.css";
import axios from "axios";
import { shoppingInfoApis } from "..";

const Counter = ({ initialCount, cartItemId, price, onUpdateQuantity }) => {
  const [count, setCount] = useState(initialCount);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

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
    console.log("hitting in counter");
    try {
      const response = await axios.patch(
        shoppingInfoApis.handleItemsCount(userId, cartItemId),
        { quantityNeedToChange: quantity },
        config
      );
      onUpdateQuantity(quantity, cartItemId);

      console.log(response.data);
      // Call the parent component's callback to update quantity in cartData
    } catch (error) {
      console.error("Error updating item quantity:", error);
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
    <div className="counter">
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
      <span>{price}</span>
      {loading && <span className="loading-indicator">Updating...</span>}
    </div>
  );
};

export default Counter;
