'use client';

import { Canvas, useLoader, useThree, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, PointerLockControls, OrbitControls } from '@react-three/drei';
import { Suspense, useState, useRef, useEffect } from 'react';
import * as THREE from 'three';

function GalleryModel({ onPaintingClick }: { onPaintingClick: (paintingIndex: number) => void }) {
  const gltf = useGLTF('/models/gallery.glb');
  
  // Load different painting textures
  const paintingTextures = [
    useLoader(THREE.TextureLoader, '/images/art-deco/Tea House.jpg'),
    useLoader(THREE.TextureLoader, '/images/art-deco/TheChase.jpg'),
    useLoader(THREE.TextureLoader, '/images/art-deco/FlyingKitesRunningCats.jpg'),
    useLoader(THREE.TextureLoader, '/images/art-deco/101OrigamiBirds.jpg'),
    useLoader(THREE.TextureLoader, '/images/art-deco/Bath Behind Doors.jpg'),
    useLoader(THREE.TextureLoader, '/images/art-deco/HorsesFromHeaven.png'),
  ];
  
  // Get all painting points from the Blender model
  const paintingPoints = [
    gltf.scene.getObjectByName('Painting1'),
    gltf.scene.getObjectByName('Painting2'),
    gltf.scene.getObjectByName('Painting3'),
    gltf.scene.getObjectByName('Painting4'),
    gltf.scene.getObjectByName('Painting5'),
    gltf.scene.getObjectByName('Painting6'),
  ];
  
  const renderPainting = (paintingPoint: any, texture: any, index: number) => {
    if (!paintingPoint) return null;
    
    // Calculate aspect ratio and dimensions based on the texture
    const aspectRatio = texture.image ? texture.image.width / texture.image.height : 1.4 / 0.9;
    const maxWidth = 1.4;
    const maxHeight = 0.9;
    
    let paintingWidth, paintingHeight;
    if (aspectRatio > maxWidth / maxHeight) {
      // Image is wider - constrain by width
      paintingWidth = maxWidth;
      paintingHeight = maxWidth / aspectRatio;
    } else {
      // Image is taller - constrain by height
      paintingHeight = maxHeight;
      paintingWidth = maxHeight * aspectRatio;
    }
    
    // Apply size adjustments for specific paintings
    if (index === 1) {
      // 25% increase for painting 2
      paintingWidth *= 1.25;
      paintingHeight *= 1.25;
    } else if (index === 2) {
      // 10% increase for painting 3
      paintingWidth *= 1.1;
      paintingHeight *= 1.1;
    } else if (index === 3) {
      // 50% + 33% increase for painting 4 (total ~100% increase)
      paintingWidth *= 2.0;
      paintingHeight *= 2.0;
    } else if (index === 4) {
      // 30% increase for painting 5
      paintingWidth *= 1.3;
      paintingHeight *= 1.3;
    } else if (index === 5) {
      // 20% increase for painting 6
      paintingWidth *= 1.2;
      paintingHeight *= 1.2;
    }
    
    // Frame should be slightly larger than painting
    const frameWidth = paintingWidth + 0.2;
    const frameHeight = paintingHeight + 0.2;
    const borderWidth = paintingWidth + 0.08;
    const borderHeight = paintingHeight + 0.08;
    
    // Special rotation for Painting3 (index 2), Painting4 (index 3), Painting5 (index 4), and Painting6 (index 5)
    const additionalRotation = index === 2 ? (130 * Math.PI / 180) : 
                              index === 3 ? (50 * Math.PI / 180) : 
                              index === 4 ? (180 * Math.PI / 180) :
                              index === 5 ? (180 * Math.PI / 180) : 0; // 130 degrees for Painting3, 50 degrees for Painting4, 180 degrees for Painting5 and 6
    
    // Special position adjustment for Painting3, Painting5, and Painting6
    const xOffset = index === 2 ? -0.2 : 
                   index === 4 ? -0.2 :
                   index === 5 ? -0.2 : 0; // X adjustments for Painting3, 5, and 6
    const yOffset = index === 2 ? 0 : 0; // No vertical adjustment
    const zOffset = index === 2 ? -0.1 : 
                   index === 4 ? -0.3 : 
                   index === 5 ? -0.3 : 0; // Move Painting3, Painting5, and Painting6 forward toward camera
    
    return (
      <group 
        key={index}
        position={[
          paintingPoint.position.x + 0.1 + xOffset, 
          paintingPoint.position.y + yOffset, 
          paintingPoint.position.z + zOffset
        ]}
        rotation={[0, paintingPoint.rotation.y + Math.PI / 2 + additionalRotation, 0]}
      >
        {/* Frame with actual depth */}
        <mesh position={[0, 0, -0.02]}>
          <boxGeometry args={[frameWidth, frameHeight, 0.04]} />
          <meshStandardMaterial 
            color={index === 0 ? "#950d17" : index === 2 ? "#000000" : index === 4 ? "#F5F5DC" : index === 5 ? "#1E90FF" : "#8B4513"}
            roughness={0.8}
          />
        </mesh>
        
        {/* Thin black border around the painting */}
        <mesh position={[0, 0, 0.005]}>
          <planeGeometry args={[borderWidth, borderHeight]} />
          <meshStandardMaterial 
            color="#000000"
          />
        </mesh>
        
        {/* Canvas/Painting surface - clickable */}
        <mesh 
          position={[0, 0, 0.01]} 
          rotation={[0, 0, index === 5 ? (2 * Math.PI / 180) : 0]}
          onClick={(e) => {
            e.stopPropagation();
            onPaintingClick(index);
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            document.body.style.cursor = 'auto';
          }}
        >
          <planeGeometry args={[paintingWidth, paintingHeight]} />
          <meshStandardMaterial 
            map={texture} 
            side={THREE.FrontSide}
          />
        </mesh>
      </group>
    );
  };
  
  return (
    <>
      <primitive 
        object={gltf.scene} 
        scale={1} 
        position={[0, 0, 0]}
      />
      
      {/* Render all paintings */}
      {paintingPoints.map((paintingPoint, index) => 
        renderPainting(paintingPoint, paintingTextures[index], index)
      )}
    </>
  );
}

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-white text-xl">Loading gallery...</div>
    </div>
  );
}

function CameraDebug({ setCameraInfo }: { setCameraInfo: (info: string) => void }) {
  const { camera } = useThree();
  
  useFrame(() => {
    const pos = camera.position;
    const rot = camera.rotation;
    const info = `Position: [${pos.x.toFixed(2)}, ${pos.y.toFixed(2)}, ${pos.z.toFixed(2)}]\nRotation: [${rot.x.toFixed(2)}, ${rot.y.toFixed(2)}, ${rot.z.toFixed(2)}]`;
    setCameraInfo(info);
  });
  
  return null;
}

// Component to handle looking at paintings with raycasting
function PaintingRaycaster({ 
  onPaintingLookAt, 
  isPointerLocked,
  setLookingAt
}: { 
  onPaintingLookAt: (painting: any) => void;
  isPointerLocked: boolean;
  setLookingAt: (painting: string | null) => void;
}) {
  const { camera, scene } = useThree();
  
  useFrame(() => {
    if (!isPointerLocked) return;
    
    // Create raycaster from camera center (where user is looking)
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);
    
    // Find all mesh objects in scene
    const meshes: THREE.Mesh[] = [];
    scene.traverse((object) => {
      if (object instanceof THREE.Mesh && object.material && 'map' in object.material && object.material.map) {
        meshes.push(object);
      }
    });
    
    const intersects = raycaster.intersectObjects(meshes);
    
    if (intersects.length > 0) {
      const paintingMesh = intersects[0].object;
      setLookingAt(paintingMesh.name || 'painting');
    } else {
      setLookingAt(null);
    }
  });
  
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space' && isPointerLocked) {
        event.preventDefault();
        onPaintingLookAt({ name: 'painting' });
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPointerLocked, onPaintingLookAt]);
  
  return null;
}

// Camera position preset component
function CameraControls({ orbitControlsRef }: { orbitControlsRef: React.RefObject<any> }) {
  const { camera } = useThree();

  const cameraPositions = [
    { name: "Front View", position: [0, 2, 5], target: [0, 1, 0] },
    { name: "Side View", position: [5, 2, 0], target: [0, 1, 0] },
    { name: "Corner View", position: [3, 3, 3], target: [0, 1, 0] },
    { name: "Close to Painting", position: [1, 1.5, 2], target: [0, 1.5, 0] },
    { name: "Overview", position: [0, 8, 8], target: [0, 0, 0] }
  ];

  const moveToPosition = (position: number[], target: number[]) => {
    if (orbitControlsRef.current) {
      // Animate camera position
      camera.position.set(position[0], position[1], position[2]);
      orbitControlsRef.current.target.set(target[0], target[1], target[2]);
      orbitControlsRef.current.update();
    }
  };

  return null; // This component doesn't render anything, just provides the function
}

export default function InteractiveGallery() {
  const [selectedPainting, setSelectedPainting] = useState<{
    id: string;
    title: string;
    artist: string;
    description: string;
    image: string;
  } | null>(null);

  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Painting data for each artwork
  const paintingsData = [
    {
      id: 'tea-house',
      title: 'Tea House',
      artist: 'Rafael Acevedo',
      description: 'Following the ritual, a woman is serving tea: you cannot see the teacups, but the raising steam going up, visually suggest a beautiful turquoise curtain.',
      image: '/images/art-deco/Tea House.jpg'
    },
    {
      id: 'the-chase',
      title: 'The Chase',
      artist: 'Rafael Acevedo',
      description: 'In this piece a gang of tigers races after a flock of cranes, only to realize they have being pursued by origami birds themselves. It\'s a playful chase within a chase.',
      image: '/images/art-deco/TheChase.jpg'
    },
    {
      id: 'flying-kites-running-cats',
      title: 'Flying Kites, Running Cats',
      artist: 'Rafael Acevedo',
      description: 'In a playful game cats running alongside horses, but when you look up, you discover vibrant fish seemingly alive, flaming through the air held by the women.',
      image: '/images/art-deco/FlyingKitesRunningCats.jpg'
    },
    {
      id: '101-origami-birds',
      title: '101 Origami Birds',
      artist: 'Rafael Acevedo',
      description: 'A cascade of folded birds fills each panel, transforming simple moments into a quiet flight of imagination.',
      image: '/images/art-deco/101OrigamiBirds.jpg'
    },
    {
      id: 'bath-behind-doors',
      title: 'Bath Behind Doors',
      artist: 'Rafael Acevedo',
      description: 'Three women, three directions of flowing hair: one reaching up, one cascading down, and one stretching sideways capturing a moment of elegance in every direction.',
      image: '/images/art-deco/Bath Behind Doors.jpg'
    },
    {
      id: 'horses-from-heaven',
      title: 'Horses from Heaven',
      artist: 'Rafael Acevedo',
      description: 'The power, the motion and the energy of the black horses galloping across the infinite sky.',
      image: '/images/art-deco/HorsesFromHeaven.png'
    }
  ];

  const handlePaintingClick = (paintingIndex: number) => {
    setSelectedPainting(paintingsData[paintingIndex]);
  };

  const closeModal = () => {
    setSelectedPainting(null);
  };

  // Handle keyboard shortcuts for modal
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (selectedPainting && (event.code === 'Enter' || event.code === 'Space')) {
        event.preventDefault();
        closeModal();
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedPainting]);

  return (
    <div className="w-full h-screen bg-black relative" id="canvas-container">
      <Canvas
        camera={{ 
          position: [0, 1.7, -4.2], 
          fov: 50 
        }}
        style={{ width: '100%', height: '100%' }}
      >
        {/* Bright Kitchen-style Lighting */}
        <ambientLight intensity={3.5} color="#FFFFFF" />
        <directionalLight 
          position={[20, 15, 10]} 
          intensity={3.5}
          color="#FFFFFF"
          castShadow={true}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-20}
          shadow-camera-right={-20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
        />
        
        {/* Additional bright lights for even coverage */}
        <directionalLight 
          position={[-20, 15, -10]} 
          intensity={2.0}
          color="#FFFFFF"
        />
        <directionalLight 
          position={[0, 20, 0]} 
          intensity={1.5}
          color="#FFFFFF"
        />
        
        {/* Environment to eliminate black void */}
        <Environment files="/models/worldtexture.exr" background />
        
        {/* Controls - Different for mobile vs desktop */}
        {isMobile ? (
          <OrbitControls 
            target={[0, 1.7, -3]}
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            enableDamping={true}
            dampingFactor={0.05}
            minDistance={0.5}
            maxDistance={3}
            maxPolarAngle={Math.PI}
            minPolarAngle={0}
          />
        ) : (
          <OrbitControls 
            target={[0, 1.7, -3]}
            enablePan={false}
            enableZoom={false}
            enableRotate={true}
            enableDamping={true}
            dampingFactor={0.05}
            minDistance={0.2}
            maxDistance={0.2}
            maxPolarAngle={Math.PI}
            minPolarAngle={0}
          />
        )}
        
        {/* 3D Model */}
        <Suspense fallback={null}>
          <GalleryModel onPaintingClick={handlePaintingClick} />
        </Suspense>
      </Canvas>
      
      {/* Instructions */}
      <div className="absolute top-4 left-4 text-white text-sm">
        {isMobile ? 
          'Use touch to look around • Tap paintings to view details' : 
          'Click and drag to look around • Click paintings to view details'
        }
      </div>

      {/* Modal */}
      {selectedPainting && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto flex flex-col md:flex-row"
            onClick={closeModal}
          >
            <div className="md:w-1/2 p-6 flex items-center justify-center bg-gray-100">
              <img 
                src={selectedPainting.image} 
                alt={selectedPainting.title}
                className="max-w-full max-h-full object-contain rounded"
              />
            </div>
            <div className="md:w-1/2 p-6 flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-2 text-gray-800">
                {selectedPainting.title}
              </h2>
              <p className="text-xl text-gray-600 mb-4">
                {selectedPainting.artist}
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                {selectedPainting.description}
              </p>
              <button 
                onClick={closeModal}
                className="self-start px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}