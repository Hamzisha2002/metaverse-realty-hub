import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Suspense, useRef, useEffect } from 'react';
import { Building } from './Building';
import { Ground } from './Ground';
import { Environment } from './Environment';
import { CameraController } from './CameraController';
import { useMetaverseStore } from '@/store/metaverseStore';
import * as THREE from 'three';

interface AutoPanCameraProps {
  enabled: boolean;
}

const AutoPanCamera = ({ enabled }: AutoPanCameraProps) => {
  const { camera } = useThree();
  const angleRef = useRef(0);
  const lastInteractionRef = useRef(Date.now());
  const isIdleRef = useRef(false);

  useEffect(() => {
    const handleInteraction = () => {
      lastInteractionRef.current = Date.now();
      isIdleRef.current = false;
    };

    window.addEventListener('mousemove', handleInteraction);
    window.addEventListener('mousedown', handleInteraction);
    window.addEventListener('wheel', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);

    return () => {
      window.removeEventListener('mousemove', handleInteraction);
      window.removeEventListener('mousedown', handleInteraction);
      window.removeEventListener('wheel', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  useFrame((_, delta) => {
    if (!enabled) return;

    const idleTime = Date.now() - lastInteractionRef.current;
    
    // Start auto-pan after 3 seconds of idle
    if (idleTime > 3000) {
      isIdleRef.current = true;
      angleRef.current += delta * 0.08; // Smooth slow rotation
      
      const radius = 80; // Wider orbit to show all districts
      const height = 50; // Higher to see the layout better
      
      camera.position.x = Math.sin(angleRef.current) * radius;
      camera.position.z = Math.cos(angleRef.current) * radius;
      camera.position.y = height + Math.sin(angleRef.current * 0.4) * 8;
      
      camera.lookAt(0, 0, 0);
    }
  });

  return null;
};

interface MetaverseSceneProps {
  isBackground?: boolean;
}

export const MetaverseScene = ({ isBackground = false }: MetaverseSceneProps) => {
  const properties = useMetaverseStore((state) => state.properties);

  // Debug logging
  console.log('MetaverseScene rendering with properties:', properties.length);
  console.log('Properties data:', properties);

  return (
    <div style={{ width: '100%', height: '100%', background: '#0a0a15' }}>
      <Canvas 
        camera={{ position: [80, 60, 80], fov: 60 }}
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        {/* Essential Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[100, 100, 50]} intensity={1.5} />
        <pointLight position={[0, 50, 0]} intensity={1} color="#ffffff" />
        
        {/* Camera Controls */}
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={30}
          maxDistance={200}
          target={[0, 0, 0]}
        />
        
        {/* Ground Grid */}
        <Ground />
        
        {/* Test Cubes for Debugging */}
        <mesh position={[0, 5, 0]}>
          <boxGeometry args={[10, 10, 10]} />
          <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.2} />
        </mesh>
        
        <mesh position={[30, 5, 0]}>
          <boxGeometry args={[10, 10, 10]} />
          <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={0.2} />
        </mesh>
        
        <mesh position={[-30, 5, 0]}>
          <boxGeometry args={[10, 10, 10]} />
          <meshStandardMaterial color="#0000ff" emissive="#0000ff" emissiveIntensity={0.2} />
        </mesh>
        
        {/* Render Buildings */}
        {properties.map((property) => {
          console.log('Rendering building:', property.name, 'at position:', property.coordinates);
          return <Building key={property.id} property={property} />;
        })}
      </Canvas>
    </div>
  );
};