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
      angleRef.current += delta * 0.1; // Slow rotation
      
      const radius = 45;
      const height = 25;
      
      camera.position.x = Math.sin(angleRef.current) * radius;
      camera.position.z = Math.cos(angleRef.current) * radius;
      camera.position.y = height + Math.sin(angleRef.current * 0.5) * 5;
      
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

  return (
    <div className="w-full h-full">
      <Canvas shadows>
        <Suspense fallback={null}>
          <PerspectiveCamera 
            makeDefault 
            position={isBackground ? [40, 30, 40] : [30, 20, 30]} 
            fov={60} 
          />
          <OrbitControls 
            enablePan={!isBackground}
            enableZoom={!isBackground}
            enableRotate={!isBackground}
            maxPolarAngle={Math.PI / 2 - 0.1}
            minDistance={5}
            maxDistance={100}
          />
          
          <AutoPanCamera enabled={isBackground} />
          
          <Environment />
          <Ground />
          
          {properties.map((property) => (
            <Building key={property.id} property={property} />
          ))}
          
          {!isBackground && <CameraController />}
        </Suspense>
      </Canvas>
    </div>
  );
};