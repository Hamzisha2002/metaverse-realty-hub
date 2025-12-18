import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const Ground = () => {
  const gridRef = useRef<THREE.GridHelper>(null);

  useFrame(({ clock }) => {
    if (gridRef.current) {
      gridRef.current.rotation.y = clock.elapsedTime * 0.01;
    }
  });

  return (
    <group>
      {/* Main ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial 
          color="#0a0a15" 
          metalness={0.2} 
          roughness={0.8}
        />
      </mesh>

      {/* Glowing grid */}
      <gridHelper 
        ref={gridRef}
        args={[200, 50, '#00d4aa', '#1a1a3e']} 
        position={[0, 0.01, 0]}
      />

      {/* District markers */}
      <group position={[0, 0.02, 0]}>
        {/* Central hub glow */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <circleGeometry args={[15, 64]} />
          <meshStandardMaterial 
            color="#00d4aa" 
            transparent 
            opacity={0.1}
            emissive="#00d4aa"
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* District Alpha */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-5, 0, 5]}>
          <circleGeometry args={[20, 64]} />
          <meshStandardMaterial 
            color="#a855f7" 
            transparent 
            opacity={0.05}
          />
        </mesh>

        {/* District Beta */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[15, 0, 15]}>
          <circleGeometry args={[18, 64]} />
          <meshStandardMaterial 
            color="#06b6d4" 
            transparent 
            opacity={0.05}
          />
        </mesh>
      </group>

      {/* Road lines */}
      <group position={[0, 0.03, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[2, 100]} />
          <meshStandardMaterial 
            color="#1a1a3e" 
            emissive="#00d4aa"
            emissiveIntensity={0.1}
          />
        </mesh>
        <mesh rotation={[-Math.PI / 2, Math.PI / 2, 0]}>
          <planeGeometry args={[2, 100]} />
          <meshStandardMaterial 
            color="#1a1a3e" 
            emissive="#00d4aa"
            emissiveIntensity={0.1}
          />
        </mesh>
      </group>
    </group>
  );
};
