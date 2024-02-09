import React, { useState } from "react";
import Draggable from 'react-draggable';
import "./App.css";

function App() {
  const [displayValue, setDisplayValue] = useState("");
  const [firstValue, setFirstValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondValue, setWaitingForSecondValue] = useState(false);

  const inputDigit = (digit) => {
    if (waitingForSecondValue) {
      setDisplayValue(digit);
      setWaitingForSecondValue(false);
    } else {
      setDisplayValue(displayValue === "0" ? digit : displayValue + digit);
    }
  };

  const deleteLastCharacter = () => {
    setDisplayValue(displayValue.slice(0, -1));
  };

  const inputDecimal = () => {
    if (!displayValue.includes(".")) {
      setDisplayValue(displayValue + ".");
    }
  };

  const clearDisplay = () => {
    setDisplayValue("0");
  };

  const toggleSign = () => {
    setDisplayValue(
      displayValue.charAt(0) === "-"
        ? displayValue.substring(1)
        : "-" + displayValue
    );
  };

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(displayValue);

    if (operator && firstValue !== null) {
      const result = calculate(firstValue, inputValue, operator);
      setDisplayValue(String(result));
      setFirstValue(result);
    } else {
      setFirstValue(inputValue);
    }

    setWaitingForSecondValue(true);
    setOperator(nextOperator);
  };

  const calculate = (firstValue, secondValue, operator) => {
    switch (operator) {
      case "+":
        return firstValue + secondValue;
      case "-":
        return firstValue - secondValue;
      case "x":
        return firstValue * secondValue;
      case "÷":
        return firstValue / secondValue;
      default:
        return secondValue;
    }
  };

  const handleButtonClick = (content) => {
    switch (content) {
      case "AC":
        setDisplayValue("");
        setFirstValue(null);
        setOperator(null);
        setWaitingForSecondValue(false);
        break;
      case "+/-":
        toggleSign();
        break;
      case ".":
        inputDecimal();
        break;
      case "=":
        performOperation();
        break;
      case "DEL":
        deleteLastCharacter();
      default:
        if ("0123456789".includes(content)) {
          inputDigit(content);
        } else if (content !== "DEL") {
          setDisplayValue(displayValue + " " + content + " ");
          performOperation(content);
        }
        break;
    }
  };

  return (
    <Draggable>
    <div className = "calculator">
      <input
        type="text"
        className="calculator-screen"
        value={displayValue}
        disabled
      />
      <div className="calculator-buttons">
        <button onClick={() => handleButtonClick("AC")}>AC</button>
        <button onClick={() => handleButtonClick("+/-")}>+/-</button>
        <button onClick={() => handleButtonClick("%")}>%</button>
        <button className="operator" onClick={() => handleButtonClick("÷")}>
          ÷
        </button>
        <button onClick={() => handleButtonClick("7")}>7</button>
        <button onClick={() => handleButtonClick("8")}>8</button>
        <button onClick={() => handleButtonClick("9")}>9</button>
        <button className="operator" onClick={() => handleButtonClick("x")}>
          x
        </button>
        <button onClick={() => handleButtonClick("4")}>4</button>
        <button onClick={() => handleButtonClick("5")}>5</button>
        <button onClick={() => handleButtonClick("6")}>6</button>
        <button className="operator" onClick={() => handleButtonClick("-")}>
          -
        </button>
        <button onClick={() => handleButtonClick("1")}>1</button>
        <button onClick={() => handleButtonClick("2")}>2</button>
        <button onClick={() => handleButtonClick("3")}>3</button>
        <button className="operator" onClick={() => handleButtonClick("+")}>
          +
        </button>
        <button onClick={() => handleButtonClick("0")}>0</button>
        <button onClick={() => handleButtonClick(".")}>.</button>
        <button className="operator" onClick={() => handleButtonClick("=")}>
          =
        </button>
        <button
          className="operator-del"
          onClick={() => handleButtonClick("DEL")}
        >
          DEL
        </button>
      </div>
    </div>
    </Draggable>
  );
}

export default App;
