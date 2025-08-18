import React, { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useMediaQuery } from 'react-responsive'
import { Laptop } from './Laptop'
import HeroLights from './HeroLights'
import * as THREE from 'three'

const RotatingLaptop = ({ isMobile, centerOffset }) => {
  const groupRef = useRef()
  const rotationSpeedSlow = 0.001
  const rotationSpeedFast = 0.03
  const startRotation = Math.PI      // 180 degrees
  const endRotation = Math.PI * 2    // 360 degrees (0)
  const resetRotation = 0             // 0 degrees
  const resetThreshold = 0.01

  const isResetting = useRef(false)

  useFrame(() => {
    if (!groupRef.current) return

    let rotationY = groupRef.current.rotation.y

    if (!isResetting.current) {
      // Slowly rotate from 180 to 360 (π to 2π)
      rotationY += rotationSpeedSlow

      if (rotationY >= endRotation) {
        // Start quick reset back to 180 (π)
        isResetting.current = true
      }
    } else {
      // Quickly rotate backward from 0 to 180 (0 to π)
      rotationY -= rotationSpeedFast

      if (rotationY <= startRotation + resetThreshold) {
        // Snap to 180 and stop resetting
        rotationY = startRotation
        isResetting.current = false
      }
    }

    groupRef.current.rotation.y = rotationY
  })

  return (
    <group
      ref={groupRef}
      scale={isMobile ? 12 : 15}
      position={isMobile ? [1, -2.5, 1] : [1, -1, 1]}
      rotation={[Math.PI / 10, startRotation, 0]} // Start at 180 degrees on Y
    >
      <group position={centerOffset.current.clone().multiplyScalar(-1)}>
        <Laptop />
      </group>
    </group>
  )
}

const HeroExperience = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
  const centerOffset = useRef(new THREE.Vector3())
  const laptopRef = useRef()

  useEffect(() => {
    if (laptopRef.current) {
      const box = new THREE.Box3().setFromObject(laptopRef.current)
      const center = new THREE.Vector3()
      box.getCenter(center)
      centerOffset.current.copy(center)
    }
  }, [])

  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
      <OrbitControls enablePan={false} enableZoom={false} />

      <HeroLights />

      <RotatingLaptop isMobile={isMobile} centerOffset={centerOffset} />
    </Canvas>
  )
}

export default HeroExperience
