import React from 'react';
import { OrbitControls as OrbitControlsImpl } from '@react-three/drei';

const CustomOrbitControls = (props) => {
  return (
    <OrbitControlsImpl
      enableZoom={false}
      enablePan={false}
      autoRotate
      autoRotateSpeed={0.5}
      maxPolarAngle={Math.PI / 2}
      minPolarAngle={Math.PI / 3}
      {...props}
    />
  );
};

export default CustomOrbitControls;