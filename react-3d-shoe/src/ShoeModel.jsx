import React, { useRef, useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three-stdlib/loaders/GLTFLoader";
import * as THREE from "three";

const ShoeModel = ({ selectedColor }) => {
  const shoeRef = useRef();
  const gltf = useLoader(
    GLTFLoader,
    "/3d-shoe-model-gltf-master/3d-shoe-model-gltf-master/shoe.gltf"
  );

  useEffect(() => {
    if (shoeRef.current) {
      shoeRef.current.traverse((node) => {
        if (node.isMesh) {
          // Compute the bounding box of the mesh to get its size
          const boundingBox = new THREE.Box3().setFromObject(node);
          const size = boundingBox.getSize(new THREE.Vector3());

          // Check if the size of the mesh exceeds a certain threshold
          const minSize = 0.1; // You can adjust this value as needed
          if (size.length() > minSize) {
            console.log("Mesh that can be colored:", node.name);
          }

          // If the mesh has a corresponding selectedColor, change its color
          if (selectedColor[node.name]) {
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
        }
      });
    }
  }, [selectedColor]);

  return <primitive ref={shoeRef} object={gltf.scene} />;
};

export default ShoeModel;
