import React, { useState, useEffect, useRef } from "react";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three-stdlib/loaders/GLTFLoader";

function TwoDWatchModel({ view, selectedColor }) {
  const watchRef = useRef();
  const { camera } = useThree();
  const gltf = useLoader(
    GLTFLoader,
    "/apple_watch_ultra_made_in_blender_polygonmbw/scene.gltf"
  );

  useEffect(() => {
    if (watchRef.current && selectedColor) {
      watchRef.current.traverse((node) => {
        if (node.isMesh && selectedColor[node.name]) {
          node.material.color.set(selectedColor[node.name]);
        }
      });
    }
  }, [watchRef, selectedColor]);

  const adjustmentValue = 0;
  gltf.scene.position.set(0, adjustmentValue, 0);

  const views = {
    front: { position: [0, 0, 5], lookAt: [0, 0, 0] },
    back: { position: [0, 0, -5], lookAt: [0, 0, 0] },
    left: { position: [-5, 0, 0], lookAt: [0, 0, 0] },
    right: { position: [5, 0, 0], lookAt: [0, 0, 0] },
  };

  useEffect(() => {
    const currentView = views[view];
    camera.position.set(...currentView.position);
    camera.lookAt(...currentView.lookAt);
    camera.updateProjectionMatrix();
  }, [view, camera, views]);

  return <primitive ref={watchRef} object={gltf.scene} />;
}

export default function TwoDWatch({ selectedColor }) {
  const [view, setView] = useState("front");

  const handleViewChange = (event) => {
    setView(event.target.value);
  };

  return (
    <div style={{ height: "600px", overflow: "hidden" }}>
      <Canvas style={{ height: "80%" }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <TwoDWatchModel view={view} selectedColor={selectedColor} />
      </Canvas>
      <div style={{ padding: "10px" }}>
        <label>
          Select View:
          <select value={view} onChange={handleViewChange}>
            {["front", "back", "left", "right"].map((v) => (
              <option key={v} value={v}>
                {v.charAt(0).toUpperCase() + v.slice(1)} View
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
