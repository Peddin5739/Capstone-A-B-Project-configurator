import React, { useRef, useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three-stdlib/loaders/GLTFLoader";

const Watch = ({ selectedColor }) => {
  const watchRef = useRef();
  const gltf = useLoader(
    GLTFLoader,
    "/roger_dubuis_lamborghini_huracan_black_by_sdc/scene.gltf"
  );

  useEffect(() => {
    if (watchRef.current) {
      let meshNames = [];

      watchRef.current.traverse((node) => {
        if (node.isMesh) {
          meshNames.push(node.name);

          // Set color if there's a matching selectedColor entry
          if (selectedColor && selectedColor[node.name]) {
            node.material.color.set(selectedColor[node.name]);
          }
        }
      });

      console.log("Mesh Names:", meshNames);
    }
  }, [watchRef, selectedColor]);

  return <primitive ref={watchRef} object={gltf.scene} />;
};

export default Watch;
