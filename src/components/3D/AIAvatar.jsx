import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';

const AnimatedSphere = ({ isActive }) => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.3;
      
      if (isActive) {
        meshRef.current.scale.setScalar(
          1 + Math.sin(state.clock.elapsedTime * 3) * 0.1
        );
      }
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]}>
      <MeshDistortMaterial
        color={isActive ? "#00FFE0" : "#A020F0"}
        attach="material"
        distort={0.3}
        speed={2}
        roughness={0.4}
        metalness={0.8}
      />
    </Sphere>
  );
};

const AIAvatar = ({ isActive = false, isRecruiterMode = false }) => {
  return (
    <motion.div
      className="ai-avatar relative w-full h-full"
      animate={{
        scale: isActive ? 1.1 : 1,
        filter: isActive ? 'brightness(1.2)' : 'brightness(1)'
      }}
      transition={{ duration: 0.3 }}
    >
      {/* 3D Avatar */}
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#A020F0" />
        
        <AnimatedSphere isActive={isActive} />
      </Canvas>

      {/* Status Indicator */}
      {isActive && (
        <motion.div
          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          <div className="bg-primary-cyan text-primary-dark px-3 py-1 rounded-full text-xs font-semibold">
            {isRecruiterMode ? 'Professional Mode' : 'Speaking...'}
          </div>
        </motion.div>
      )}

      {/* Pulse Ring */}
      {isActive && (
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-primary-cyan rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </motion.div>
  );
};

export default AIAvatar;
