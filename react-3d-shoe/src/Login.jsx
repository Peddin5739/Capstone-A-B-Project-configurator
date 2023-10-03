// Login.js
import React from "react";
import "./Login.css";

function Login({ onValidate, generatedNumber }) {
  const [enteredNumber, setEnteredNumber] = React.useState("");

  const validateNumber = () => {
    if (enteredNumber.toString() === generatedNumber.toString()) {
      onValidate(true);
    } else {
      alert("Incorrect number. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h1>
        Welcome! Please enter the provided number to continue To the survey:
      </h1>
      <p>Your Number: {generatedNumber}</p>
      <input
        type="number"
        value={enteredNumber}
        onChange={(e) => setEnteredNumber(e.target.value)}
      />
      <button onClick={validateNumber}>Login</button>
    </div>
  );
}

export default Login;
