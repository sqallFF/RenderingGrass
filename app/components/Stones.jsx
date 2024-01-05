import React, { useRef, useMemo } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

const stonePositions = [
  [-5, 5, 0],
  [5, 5, 0],
  [2, 5, 5],
  [-2, 5, 5],
];

function Stones() {
  const gltf = useLoader(GLTFLoader, '/Tall Rock Monolith.gltf');
  const meshRef = useRef();

  // Create a matrix for each position
  const matrices = useMemo(() => {
    return stonePositions.map(position => {
      const mat = new THREE.Matrix4();
      mat.setPosition(...position);
      return mat;
    });
  }, []);

  // Clone the GLTF scene for each instance
  const clones = matrices.map((matrix, index) => {
    const clone = gltf.scene.clone(true);
    clone.applyMatrix4(matrix);
    return <primitive key={index} object={clone} />;
  });

  return (
    <group ref={meshRef}>
      {clones}
    </group>
  );
}

export default Stones;