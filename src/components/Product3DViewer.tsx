import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface Product3DViewerProps {
  color?: string;
}

const RotatingBox = ({ color = '#00f0ff' }: { color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.6;
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.4) * 0.3;
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
    }
  });

  return (
    <group>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial
          color={color}
          metalness={0.9}
          roughness={0.1}
          emissive={color}
          emissiveIntensity={0.6}
        />
      </mesh>
      {/* Inner glow sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.1} />
      </mesh>
    </group>
  );
};

const Product3DViewer = ({ color = '#00f0ff' }: Product3DViewerProps) => {
  return (
    <div className="w-full h-full min-h-[400px] rounded-lg overflow-hidden glass">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 6]} />
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f0ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#b000ff" />
        <pointLight position={[0, -10, 5]} intensity={0.6} color="#ff00ff" />
        <spotLight position={[0, 5, 0]} intensity={1} angle={0.6} penumbra={1} color="#00ffff" />
        
        <RotatingBox color={color} />
        
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={4}
          maxDistance={10}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default Product3DViewer;
