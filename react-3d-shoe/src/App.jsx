import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ShoeModel from "./ShoeModel";
import Login from "./Login";
import Watch from "./Watch";
import "./App.css";
import objectNames from "./mesh.jsx";

//shoe
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [generatedNumber, setGeneratedNumber] = useState(1000);
  const [selectedColor, setSelectedColor] = useState({});
  const [showWatch, setShowWatch] = useState(false);
  const colors = {
    Turquoise: "#40E0D0",
    Goldenrod: "#DAA520",
    Hot_Pink: "#FF69B4",
    Slate_Blue: "#6A5ACD",
  };

  const handleColorClick = (objectName, color) => {
    setSelectedColor((prevState) => ({
      ...prevState,
      [objectName]: color,
    }));
  };

  useEffect(() => {
    const lastGenerated = localStorage.getItem("lastGeneratedNumber") || 999;
    const nextNumber = parseInt(lastGenerated) + 1;
    setGeneratedNumber(nextNumber);
    localStorage.setItem("lastGeneratedNumber", nextNumber.toString());
  }, []);

  if (!isLoggedIn) {
    return (
      <Login onValidate={setIsLoggedIn} generatedNumber={generatedNumber} />
    );
  }

  if (showWatch) {
    return <Watch />;
  }

  return (
    <div className="app-container">
      <div className="canvas-container">
        <Canvas camera={{ position: [-5, 2, 10] }}>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <ShoeModel selectedColor={selectedColor} />
          <OrbitControls />
        </Canvas>
      </div>
      <div className="button-container">
        {objectNames.map((name) => (
          <div key={name}>
            <span className="object-name">{name}</span>
            {Object.entries(colors).map(([colorName, hex]) => (
              <button
                key={colorName}
                style={{ backgroundColor: hex }}
                onClick={() => handleColorClick(name, hex)}
              >
                {colorName}
              </button>
            ))}
          </div>
        ))}
        <div className="submit-container">
          <button onClick={() => setShowWatch(true)}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default App;
