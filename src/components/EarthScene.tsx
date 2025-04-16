import { OrbitControls, PerspectiveCamera, View } from '@react-three/drei';
import { Suspense } from 'react'
import Light from './Light';
import Earth from './Earth';
import * as THREE from 'three';
const EarthScene = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const fov = 75;
    const aspect = w / h;
    const near = 0.1;
    const far = 1000;
    return (
        <View className={`w-full h-full `}  >
            <PerspectiveCamera makeDefault position={[0, 0, 5]} {...{ fov, aspect, near, far }} />
            <Light />
            <OrbitControls 
                enableDamping 
                dampingFactor={0.063} 
                enableZoom 
                zoomSpeed={0.5} 
                maxDistance={100}
                minDistance={2}
                target={new THREE.Vector3(0,0,0)}
            />            
            
            <Suspense fallback={null}>
                <Earth />
            </Suspense>
        </View>
    )
}

export default EarthScene