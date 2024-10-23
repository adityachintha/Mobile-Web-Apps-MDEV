// src/components/Calculator.js
import React, { useState } from "react";
import "../css/Calculator.css"; // Import the CSS for styling

const Calculator = () => {
  const [input, setInput] = useState("");

  // Update the input state with the pressed button
  const handleButtonClick = (value) => {
    setInput((prev) => prev + value);
  };

  // Calculate the result when the equal button is clicked
  const handleCalculate = () => {
    try {
      // Evaluate the expression using Function constructor
      const result = eval(input);
      setInput(result.toString());
    } catch (error) {
      setInput("Error");
    }
  };

  // Clear the input
  const handleClear = () => {
    setInput("");
  };

  return (
      
    <div className="calculator">
      <div className="calculator-display">
        {input || "0"}
      </div>
      <div className="calculator-buttons">
        {[
          "7", "8", "9", "/",
          "4", "5", "6", "*",
          "1", "2", "3", "-",
          "0", "C", "=", "+"
        ].map((btn) => (
          <button
            key={btn}
            className="calculator-button"
            onClick={() => {
              if (btn === "=") {
                handleCalculate();
              } else if (btn === "C") {
                handleClear();
              } else {
                handleButtonClick(btn);
              }
            }}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
