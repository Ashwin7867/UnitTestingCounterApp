import React, { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [error, setError] = useState(false);

  const handleIncrement = () => {
    if (count === 0) {
      setError(false);
    }
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count === 0) {
      setError(true);
    } else if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <div data-test="component-app">
      {/* <Development /> */}
      <h1 data-test="counter-display">
        This is the counter
        <span data-test="count">{count}</span>
      </h1>
      <div
        data-test="error-message"
        className={`error ${error ? "" : "hidden"}`}
      >
        {error && <p>Sorry, Counter cannot go below 0</p>}
      </div>
      <button data-test="increment-button" onClick={() => handleIncrement()}>
        Increment
      </button>
      <button data-test="decrement-button" onClick={() => handleDecrement()}>
        Decrement
      </button>
    </div>
  );
}

export default App;
