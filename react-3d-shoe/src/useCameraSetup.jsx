// useCameraSetup.js
import { useEffect } from "react";
import { useThree } from "@react-three/fiber";

export const useCameraSetup = (view) => {
  const { camera } = useThree();

  useEffect(() => {
    const views = {
      front: { position: [0, 0, 5], lookAt: [0, 0, 0] },
      side: { position: [5, 0, 0], lookAt: [0, 0, 0] },
      top: { position: [0, 5, 0], lookAt: [0, 0, 0] },
    };

    const currentView = views[view];

    camera.position.set(...currentView.position);
    camera.lookAt(...currentView.lookAt);
  }, [view, camera]);
};
