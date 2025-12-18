import { useRef, useState } from 'react';
import { useFrame, ThreeEvent } from '@react-three/fiber';
import { Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Property } from '@/types/property';
import { useMetaverseStore } from '@/store/metaverseStore';

interface BuildingProps {
  property: Property;
}

export const Building = ({ property }: BuildingProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const selectProperty = useMetaverseStore((state) => state.selectProperty);

  useFrame((state) => {
    if (groupRef.current && hovered) {
      groupRef.current.position.y = 
        property.size.height / 2 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    } else if (groupRef.current) {
      groupRef.current.position.y = property.size.height / 2;
    }
  });

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    selectProperty(property);
  };

  const getStatusColor = () => {
    switch (property.status) {
      case 'Available': return '#22c55e';
      case 'Sold': return '#ef4444';
      case 'Reserved': return '#f59e0b';
      default: return '#22c55e';
    }
  };

  const getBuildingGeometry = () => {
    switch (property.buildingType) {
      case 'landmark':
        return (
          <group>
            <mesh position={[0, -property.size.height / 4, 0]}>
              <boxGeometry args={[property.size.width, property.size.height / 2, property.size.depth]} />
              <meshStandardMaterial color={property.color} metalness={0.5} roughness={0.2} />
            </mesh>
            <mesh position={[0, property.size.height * 0.1, 0]}>
              <coneGeometry args={[property.size.width / 2, property.size.height / 3, 8]} />
              <meshStandardMaterial color={property.color} metalness={0.6} roughness={0.1} emissive={property.color} emissiveIntensity={0.15} />
            </mesh>
          </group>
        );
      case 'commercial':
        return (
          <mesh>
            <boxGeometry args={[property.size.width, property.size.height, property.size.depth]} />
            <meshStandardMaterial 
              color={property.color} 
              metalness={0.7} 
              roughness={0.1}
              emissive={property.color}
              emissiveIntensity={hovered ? 0.2 : 0.08}
            />
          </mesh>
        );
      case 'plot':
        return (
          <mesh>
            <boxGeometry args={[property.size.width, property.size.height, property.size.depth]} />
            <meshStandardMaterial 
              color={property.color} 
              metalness={0.2} 
              roughness={0.6}
              emissive={property.color}
              emissiveIntensity={hovered ? 0.15 : 0.03}
            />
          </mesh>
        );
      default:
        return (
          <mesh>
            <boxGeometry args={[property.size.width, property.size.height, property.size.depth]} />
            <meshStandardMaterial 
              color={property.color} 
              metalness={0.4} 
              roughness={0.3}
              emissive={property.color}
              emissiveIntensity={hovered ? 0.15 : 0.04}
            />
          </mesh>
        );
    }
  };

  return (
    <group 
      position={[property.coordinates.x, property.size.height / 2, property.coordinates.z]}
      ref={groupRef}
    >
      <group
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {getBuildingGeometry()}
        
        {/* Building windows effect */}
        {property.buildingType !== 'plot' && (
          <mesh position={[0, 0, property.size.depth / 2 + 0.01]}>
            <planeGeometry args={[property.size.width * 0.8, property.size.height * 0.8]} />
            <meshStandardMaterial 
              color="#1a1a2e" 
              metalness={0.9} 
              roughness={0.1}
              transparent
              opacity={0.6}
            />
          </mesh>
        )}

        {/* Glowing edges when hovered */}
        {hovered && (
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(property.size.width + 0.2, property.size.height + 0.2, property.size.depth + 0.2)]} />
            <lineBasicMaterial color="#2dd4bf" linewidth={2} />
          </lineSegments>
        )}
      </group>

      {/* Floating label with area name, price, and status */}
      <group position={[0, property.size.height / 2 + 2, 0]}>
        {/* Area Name */}
        <Text
          position={[0, 1.2, 0]}
          fontSize={0.7}
          color="#ffffff"
          anchorX="center"
          anchorY="bottom"
          font="/fonts/inter-bold.woff"
        >
          {property.areaName}
        </Text>
        
        {/* Price in PKR */}
        <Text
          position={[0, 0.4, 0]}
          fontSize={0.55}
          color="#d4af37"
          anchorX="center"
          anchorY="bottom"
        >
          PKR {property.priceInPKR}
        </Text>
        
        {/* Status */}
        <Text
          position={[0, -0.3, 0]}
          fontSize={0.45}
          color={getStatusColor()}
          anchorX="center"
          anchorY="bottom"
        >
          {property.status}
        </Text>
      </group>

      {/* Property info card on hover */}
      {hovered && (
        <Html
          position={[0, property.size.height / 2 + 5, 0]}
          center
          distanceFactor={15}
          style={{ pointerEvents: 'none' }}
        >
          <div className="glass-card p-4 min-w-[220px] text-center animate-fade-in">
            <h3 className="font-display text-primary text-lg">{property.name}</h3>
            <p className="text-muted-foreground text-sm">{property.location}</p>
            <div className="mt-2">
              <span className="text-accent font-bold text-lg">PKR {property.priceInPKR}</span>
            </div>
            <div className="mt-1 flex items-center justify-center gap-2">
              <span 
                className="px-2 py-0.5 rounded text-xs font-medium"
                style={{ 
                  backgroundColor: `${getStatusColor()}20`,
                  color: getStatusColor()
                }}
              >
                {property.status}
              </span>
              <span className="text-xs text-muted-foreground capitalize">
                {property.buildingType}
              </span>
            </div>
            <p className="text-xs text-primary mt-2">Click to view details</p>
          </div>
        </Html>
      )}
    </group>
  );
};