'use client';

import { Canvas, useLoader } from '@react-three/fiber';
import { useGLTF, Environment, OrbitControls } from '@react-three/drei';
import { Suspense, useState, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import Image from 'next/image';

function GalleryModel({ 
  onPaintingClick, 
  onLoadProgress 
}: { 
  onPaintingClick: (paintingIndex: number) => void;
  onLoadProgress: (progress: number) => void;
}) {
  const gltf = useGLTF('/models/gallery.glb');
  const [texturesLoaded, setTexturesLoaded] = useState(0);
  
  // Load different painting textures with progress tracking
  const texture1 = useLoader(THREE.TextureLoader, '/images/art-deco/Tea House.jpg');
  const texture2 = useLoader(THREE.TextureLoader, '/images/art-deco/TheChase.jpg');
  const texture3 = useLoader(THREE.TextureLoader, '/images/art-deco/FlyingKitesRunningCats.jpg');
  const texture4 = useLoader(THREE.TextureLoader, '/images/art-deco/101OrigamiBirds.jpg');
  const texture5 = useLoader(THREE.TextureLoader, '/images/art-deco/Bath Behind Doors.jpg');
  const texture6 = useLoader(THREE.TextureLoader, '/images/art-deco/HorsesFromHeaven.png');
  
  const paintingTextures = useMemo(() => [
    texture1,
    texture2,
    texture3,
    texture4,
    texture5,
    texture6,
  ], [texture1, texture2, texture3, texture4, texture5, texture6]);

  useEffect(() => {
    // Simulate loading progress and mark as complete when everything is ready
    const totalAssets = paintingTextures.length + 1; // textures + 3D model
    let loadedAssets = 1; // 3D model is loaded when this component renders

    // Check if all textures are loaded
    const checkTexturesLoaded = () => {
      const loaded = paintingTextures.filter(texture => texture.image).length;
      if (loaded > texturesLoaded) {
        setTexturesLoaded(loaded);
        loadedAssets = loaded + 1; // +1 for the 3D model
        const progress = (loadedAssets / totalAssets) * 100;
        onLoadProgress(progress);
        
        // When everything is loaded, wait a moment then show the gallery
        if (loaded === paintingTextures.length) {
          setTimeout(() => {
            onLoadProgress(100);
          }, 500);
        }
      }
    };

    checkTexturesLoaded();
    const interval = setInterval(checkTexturesLoaded, 100);
    
    return () => clearInterval(interval);
  }, [paintingTextures, texturesLoaded, onLoadProgress]);
  
  // Get all painting points from the Blender model
  const paintingPoints = [
    gltf.scene.getObjectByName('Painting1'),
    gltf.scene.getObjectByName('Painting2'),
    gltf.scene.getObjectByName('Painting3'),
    gltf.scene.getObjectByName('Painting4'),
    gltf.scene.getObjectByName('Painting5'),
    gltf.scene.getObjectByName('Painting6'),
  ];
  
  const renderPainting = (paintingPoint: THREE.Object3D, texture: THREE.Texture, index: number) => {
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
            color="#7A7A75"
            roughness={0.4}
            metalness={0.1}
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
        paintingPoint ? renderPainting(paintingPoint, paintingTextures[index], index) : null
      )}
    </>
  );
}

// Enhanced loading component with progress tracking
function GalleryLoadingScreen({ progress }: { progress: number }) {
  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <div className="text-center text-white">
        <div className="mb-8">
          <h2 className="text-4xl font-cinzel font-light mb-4">RAFAEL ACEVEDO</h2>
          <p className="text-lg tracking-wider">Interactive Gallery</p>
        </div>
        
        {/* Progress Bar */}
        <div className="w-80 mx-auto mb-4">
          <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            Loading 3D Gallery... {Math.round(progress)}%
          </p>
        </div>

        {/* Loading Animation */}
        <div className="w-16 h-16 mx-auto border-2 border-amber-400/20 rounded-full flex justify-center items-center">
          <div className="w-12 h-12 border-2 border-transparent border-t-amber-400 border-r-amber-400/50 rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
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
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

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

  // Handle loading completion
  useEffect(() => {
    if (loadingProgress >= 100) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 800); // Small delay to ensure smooth transition
      return () => clearTimeout(timer);
    }
  }, [loadingProgress]);

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
    <>
      {/* Loading Screen */}
      {isLoading && (
        <GalleryLoadingScreen progress={loadingProgress} />
      )}

      {/* Main Gallery */}
      <div className={`w-full h-screen bg-black relative transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`} id="canvas-container">
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
          <GalleryModel 
            onPaintingClick={handlePaintingClick} 
            onLoadProgress={(progress) => setLoadingProgress(progress)}
          />
        </Suspense>
        </Canvas>
        
        {/* Instructions */}
        <div className="absolute top-4 left-4 text-white text-sm">
          {isMobile ? 
            'Use touch to look around • Tap paintings to view details' : 
            'Click and drag to look around • Click paintings to view details'
          }
        </div>
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
              <Image 
                src={selectedPainting.image} 
                alt={selectedPainting.title}
                width={800}
                height={600}
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
    </>
  );
}