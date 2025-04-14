// import './App.css'

import { View } from "@react-three/drei";
import EarthScene from "./components/EarthScene";
import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from 'three';

const App: React.FC = () => {
  const earthRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div ref={earthRef} id="earth-container" className="w-screen h-screen relative">
        <EarthScene />
        <Canvas
          className="w-screen h-screen"
          eventSource={document.getElementById("root")!}
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            overflow: 'hidden',
          }}
          gl={{
            toneMapping: THREE.ACESFilmicToneMapping, 
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            stencil: false,
            depth: true,
           

           }}
        >
          <View.Port />
        </Canvas>
      </div>
    </>
  );
};

export default App
