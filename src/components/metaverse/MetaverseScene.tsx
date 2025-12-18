import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';
import { Building } from './Building';
import { Ground } from './Ground';
import { Environment } from './Environment';
import { CameraController } from './CameraController';
import { useMetaverseStore } from '@/store/metaverseStore';

export const MetaverseScene = () => {
  const properties = useMetaverseStore((state) => state.properties);

  return (
    <div className="w-full h-full">
      <Canvas shadows>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[30, 20, 30]} fov={60} />
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            maxPolarAngle={Math.PI / 2 - 0.1}
            minDistance={5}
            maxDistance={100}
          />
          
          <Environment />
          <Ground />
          
          {properties.map((property) => (
            <Building key={property.id} property={property} />
          ))}
          
          <CameraController />
        </Suspense>
      </Canvas>
    </div>
  );
};
