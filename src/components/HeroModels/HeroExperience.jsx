import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useMediaQuery } from 'react-responsive';
import { Laptop } from './Laptop'
import HeroLights from './HeroLights';

const HeroExperience = () => {

    const isTablet = useMediaQuery({ query: '(max-width: 1024px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    return (
        <Canvas camera={{ position: [0, 0, 15], fov: 45}}>

            <OrbitControls
                enablePan={false}
                enableZoom={false}
                maxDistance={20}
                minDistance={5}
                minPolarAngle={Math.PI / 5}
                maxPolarAngle={Math.PI / 2}
            />

            <HeroLights />

            <group
                scale={isMobile? 12: 15}
                position={[1, -2.5, 1]}
                rotation={[0.2, Math.PI/0.3, 0]}
            >
                <Laptop />
            </group>

        </Canvas>

    )
}

export default HeroExperience