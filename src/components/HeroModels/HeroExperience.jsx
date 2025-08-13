import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useMediaQuery } from 'react-responsive';
import { Laptop } from './Laptop'
import HeroLights from './HeroLights';
import * as THREE from 'three';

const HeroExperience = () => {

    const isTablet = useMediaQuery({ query: '(max-width: 1024px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    // Ref to access the Laptop mesh
    const laptopRef = useRef();
    const centerOffset = useRef(new THREE.Vector3());

    // Calculate center of the model after it's loaded
    useEffect(() => {
        if (laptopRef.current) {
            const box = new THREE.Box3().setFromObject(laptopRef.current);
            const center = new THREE.Vector3();
            box.getCenter(center);
            centerOffset.current.copy(center);
        }
    }, []);

    return (
        <Canvas camera={{ position: [0, 0, 15], fov: 45}}>

            <OrbitControls
                enablePan={false}
                enableZoom={false}
                maxDistance={20}
                minDistance={5}
                autoRotate
                autoRotateSpeed={0.3}
            />

            <HeroLights />

            <group
                scale={isMobile ? 12 : 15}
                position={[1, -2.5, 1]}
                rotation={[Math.PI / 10, -Math.PI / 1.5, 0]}
            >
                <group position={centerOffset.current.clone().multiplyScalar(-1)}>
                    <Laptop ref={laptopRef} />
                </group>

            </group>

        </Canvas>

    )
}

export default HeroExperience