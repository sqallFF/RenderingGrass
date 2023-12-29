import React, { useRef, useMemo, useEffect } from 'react'
import * as THREE from 'three'
import GrassVertex from './shaders/GrassVertex.glsl';
import GrassFragment from './shaders/GrassFragment.glsl';
import { useFrame, useThree, useLoader } from '@react-three/fiber';

function PraticeRender({size}) {
    const meshRef = useRef();
    console.log(meshRef)
    const instances = 100000
    const rows = Math.sqrt(instances);
    const cols = rows;
    const spacingX = size[0] / cols; // Horizontal spacing
    const spacingZ = size[1] / rows; 
    // const geometry = new THREE.BufferGeometry();
    const terrPos = [];
    const d = size[0];
    const h = 0;
    const w = size[1];
    const positions = [];
  

    for ( let i =0; i < instances; i++) {
        let posiX = Math.random() * w - w/2
        let posiY = h
        let posiZ = Math.random() * d - d/2;

        terrPos.push(posiX,posiY,posiZ)
    }

  //   for (let i = 0; i < rows; i++) {
  //     for (let j = 0; j < cols; j++) {
  //         let x = -size[0] / 2 + j * spacingX;
  //         let z = -size[1] / 2 + i * spacingZ;
  //         positions.push(x, 0, z); // Y is 0 assuming grass is on flat ground
  //     }
  // }

  const positionAttribute = new Float32Array(positions);

    console.log(terrPos)
    const terrPo = new Float32Array(terrPos)
  
    const texture = useLoader(THREE.TextureLoader, 'Grass.png');
    const noise = useLoader(THREE.TextureLoader, 'waterTest4.png');

    const grassMaterial = useMemo(() => {
      const uniforms = {
        uTime: { value: 0 },
        grassTexture: { value: texture },
        noiseTexture: { value: noise },
      };

      return new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: GrassVertex,
        fragmentShader: GrassFragment,
        side: THREE.DoubleSide
      });
    }, [texture, noise]);

    useFrame(({ clock }) => {
      grassMaterial.uniforms.uTime.value = clock.getElapsedTime();
    });

  return (
    <group>
    <instancedMesh ref={meshRef} args={[null, null, instances]} material={grassMaterial} position={[0,0.5,0]}>
        <planeGeometry >
        <instancedBufferAttribute attach='attributes-terrPosi' array={terrPo} count={terrPo.length/3} itemSize={3}/>
        </planeGeometry>
    </instancedMesh>
    </group>
  )
}

export default PraticeRender