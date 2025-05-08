import { useFrame, useLoader, } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from 'three';
import { getFresnelMat } from "./GetFresnelMat";
import getStarfield from "./Stars";


const Earth = () => {
    const groupRef = useRef<THREE.Group>(null!);
    const earthRef = useRef<THREE.Mesh>(null);
    const lightRef = useRef<THREE.Mesh>(null);
    const cloudRef = useRef<THREE.Mesh>(null);
    const glowRef = useRef<THREE.Mesh>(null);
    const starsRef = useRef<THREE.Group>(null);

    const [earthMap, lightsMap, cloudMap, cloudAlphaMap] = useLoader(THREE.TextureLoader, [
        'textures/00_earthmap1k.jpg',
        'textures/03_earthlights1k.jpg',
        'textures/04_earthcloudmap.jpg',
        'textures/05_earthcloudmaptrans.jpg',
    ]);

    // geometry
    const geo = new THREE.IcosahedronGeometry(1.0, 12);

    //globe
    const fresnelMat = getFresnelMat()


    useEffect(() => {
        const stars = getStarfield({ numStars: 2000 })

        starsRef.current?.add(stars)

        return () => {
            starsRef.current?.remove(stars)
        }
    },[])  

    // Animation loop
    useFrame(() => {
        if (earthRef.current) earthRef.current.rotation.y += 0.002;
        if (lightRef.current) lightRef.current.rotation.y += 0.002;
        if (cloudRef.current) cloudRef.current.rotation.y += 0.0028;
        if (glowRef.current) glowRef.current.rotation.y += 0.002;
        if (starsRef.current) starsRef.current.rotation.y -= 0.001;
    });


    return (
        <>
            <group ref={groupRef} rotation={[0, 0, -23.4 * Math.PI / 100]}>
                <mesh ref={earthRef} geometry={geo}>
                    <meshStandardMaterial
                        map={earthMap}
                        
                    />
                </mesh>
                <mesh ref={lightRef} geometry={geo}>
                    <meshBasicMaterial map={lightsMap} blending={THREE.AdditiveBlending} />
                </mesh>
                <mesh ref={cloudRef} geometry={geo} scale={1.003}>
                    <meshStandardMaterial
                        map={cloudMap}
                        transparent
                        opacity={0.7}
                        alphaMap={cloudAlphaMap}
                        blending={THREE.AdditiveBlending}
                    />
                </mesh>

                <mesh ref={glowRef} geometry={geo} scale={1.01}>
                    <primitive object={fresnelMat} attach="material" />
                </mesh>
            </group>
            <group ref={starsRef} />
        </>
    )
}

export default Earth
