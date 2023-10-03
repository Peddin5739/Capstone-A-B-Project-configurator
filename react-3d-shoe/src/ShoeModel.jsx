import React, { useRef, useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three-stdlib/loaders/GLTFLoader";
import * as THREE from "three";

const ShoeModel = ({ selectedColor }) => {
  const shoeRef = useRef();
  const gltf = useLoader(GLTFLoader, "/nike_air_jordan/scene.gltf");

  useEffect(() => {
    if (shoeRef.current) {
      shoeRef.current.traverse((node) => {
        if (node.isMesh && selectedColor[node.name]) {
          // Check if geometry has vertex colors that might influence the final color
          if (node.geometry.attributes.color) {
            node.geometry.attributes.color = undefined;
          }

          // Use MeshBasicMaterial for direct color application
          const material = new THREE.MeshBasicMaterial({
            color: selectedColor[node.name],
          });
          node.material = material;

          // Log for debugging
          console.log(
            "Setting color for",
            node.name,
            ":",
            selectedColor[node.name]
          );
        }
      });
    }
  }, [selectedColor]);

  return <primitive ref={shoeRef} object={gltf.scene} />;
};

export default ShoeModel;
