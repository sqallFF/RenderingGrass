'use client'
import {Canvas} from "@react-three/fiber"
import {CameraControls, PerspectiveCamera, Sky} from '@react-three/drei'
import PraticeRender from './components/PraticeRender'
import Stones from './components/Stones'

export default function Home() {

  const planeSize = [15, 15];
  const height = window.innerHeight;
  const width = window.innerWidth;
  return (
    <div className="h-screen w-screen">
      <Canvas 
        style={{ background: 'aliceblue' }}
        shadows // Enable shadow map
      >
        <ambientLight intensity={1} />
        <directionalLight 
          color="white" 
          position={[0, 10, 10]} 
          castShadow // Enable shadow casting for this light
          shadow-mapSize-width={2048} // Adjust shadow map size for better shadow quality
          shadow-mapSize-height={2048}
          intensity={10}
        />


<hemisphereLight 
        skyColor={"#ffffff"} // Color of the sky light
        groundColor={"#b1b1b1"} // Color of the ground light
        intensity={5} // Adjust the light intensity
        position={[5, 10, 0]} // Adjust the position if needed
      />
      <Sky sunPosition={[100, 10, 100]} />
      <PerspectiveCamera position={[0, 100, 10]}/>
        <PraticeRender size={planeSize}/>
        <Stones size={planeSize}/>
        <CameraControls />
         <gridHelper args={[200, 200, 0xff0000, 'teal']} />
      </Canvas>
    </div>
  )
}
