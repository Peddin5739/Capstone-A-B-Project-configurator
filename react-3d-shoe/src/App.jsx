import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ShoeModel from "./ShoeModel";
import Login from "./Login";
import Watch from "./Watch";
import TwoDWatch from "./2dwatch";
import "./App.css";
import objectNames from "./mesh.jsx";
import watchObjects from "./Watchmesh";

function ColorPicker({ objectName, onColorSelect, availableColors }) {
  return (
    <div key={objectName}>
      <span className="object-name">{objectName}</span>
      {availableColors.map(([colorName, hex]) => (
        <button
          key={colorName}
          style={{ backgroundColor: hex }}
          onClick={() => onColorSelect(objectName, hex)}
        >
          {colorName}
        </button>
      ))}
    </div>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [generatedNumber, setGeneratedNumber] = useState(1000);
  const [selectedColor, setSelectedColor] = useState({});
  const [view, setView] = useState("shoe3D");

  const colors = {
    lightGray: "#f5f0f0",
    deepBlue: "#1e62c0",
    burntOrange: "#f06616",
    brightRed: "#f5341b",
    darkGray: "#1b2120",
    brightYellow: "#e2f026",
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

  const nextView = () => {
    switch (view) {
      case "shoe3D":
        setView("watch3D");
        break;
      case "watch3D":
        setView("watch2D");
        break;
      default:
        setView("shoe3D");
        break;
    }
  };

  if (!isLoggedIn) {
    return (
      <Login onValidate={setIsLoggedIn} generatedNumber={generatedNumber} />
    );
  }

  return (
    <div className="app-container">
      {view !== "watch2D" ? (
        <div className="canvas-container">
          <Canvas camera={{ position: [-5, 2, 10] }}>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            {view === "shoe3D" ? (
              <ShoeModel selectedColor={selectedColor} />
            ) : (
              <Watch selectedColor={selectedColor} />
            )}
            <OrbitControls />
          </Canvas>
        </div>
      ) : (
        <TwoDWatch selectedColor={selectedColor} />
      )}
      <div className="button-container">
        {(view === "shoe3D" ? objectNames : watchObjects).map((name) => (
          <ColorPicker
            key={name}
            objectName={name}
            onColorSelect={handleColorClick}
            availableColors={Object.entries(colors)}
          />
        ))}
        <div className="submit-container">
          <button onClick={nextView}>
            {view === "shoe3D"
              ? "Move to 3D Watch"
              : view === "watch3D"
              ? "Move to 2D Watch"
              : "Switch to 3D Shoe"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
