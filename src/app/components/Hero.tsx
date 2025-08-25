// src/app/components/Hero.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import * as THREE from 'three';

const Hero: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    let camera: THREE.PerspectiveCamera;
    let scene: THREE.Scene;
    let renderer: THREE.WebGLRenderer;
    let clock: THREE.Clock;
    let light: THREE.DirectionalLight;
    let smokeTexture: THREE.Texture;
    let smokeMaterial: THREE.MeshLambertMaterial;
    let smokeGeo: THREE.PlaneGeometry;
    let smokeParticles: THREE.Mesh[] = [];

    const init = async () => {
      clock = new THREE.Clock();

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0); // Transparent background
      rendererRef.current = renderer;

      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
      camera.position.z = 1000;

      light = new THREE.DirectionalLight(0xffffff, 0.5);
      light.position.set(-1, 0, 1);
      scene.add(light);

      // Load smoke texture
      const loader = new THREE.TextureLoader();
      loader.crossOrigin = 'anonymous';
      
      try {
        smokeTexture = await new Promise<THREE.Texture>((resolve, reject) => {
          loader.load(
            'https://s3-us-west-2.amazonaws.com/s.cdpn.io/95637/Smoke-Element.png',
            resolve,
            undefined,
            reject
          );
        });
        console.log('Smoke texture loaded successfully!');
      } catch (error) {
        console.log('Could not load smoke texture, using fallback');
        // Fallback canvas smoke
        const smokeCanvas = document.createElement('canvas');
        smokeCanvas.width = 256;
        smokeCanvas.height = 256;
        const smokeCtx = smokeCanvas.getContext('2d')!;
        
        const gradient = smokeCtx.createRadialGradient(128, 128, 0, 128, 128, 128);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.3)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        smokeCtx.fillStyle = gradient;
        smokeCtx.fillRect(0, 0, 256, 256);
        
        smokeTexture = new THREE.CanvasTexture(smokeCanvas);
      }

      // White wispy smoke material
      smokeMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff, // White instead of aqua
        map: smokeTexture,
        transparent: true,
        opacity: .9 // More subtle
      });
      
      smokeGeo = new THREE.PlaneGeometry(300, 300);
      smokeParticles = [];

      // Create smoke particles
      for (let p = 0; p < 150; p++) { // Fewer particles for subtlety
        const particle = new THREE.Mesh(smokeGeo, smokeMaterial);
        particle.position.set(
          Math.random() * 800 - 400,
          Math.random() * 600 - 300,
          Math.random() * 1000 - 100
        );
        particle.rotation.z = Math.random() * 360;
        scene.add(particle);
        smokeParticles.push(particle);
      }

      if (mountRef.current) {
        mountRef.current.appendChild(renderer.domElement);
      }

      animate();
    };

    const evolveSmoke = (delta: number) => {
      const sp = smokeParticles.length;
      for (let i = sp - 1; i >= 0; i--) {
        smokeParticles[i].rotation.z += delta * 0.2; // Slower rotation
        // Add slight upward movement
        smokeParticles[i].position.y -= delta * 10;
        
        // Reset particle if it goes too high
        if (smokeParticles[i].position.y < -400) {
          smokeParticles[i].position.y = 400;
          smokeParticles[i].position.x = Math.random() * 800 - 400;
        }
      }
    };

    const animate = () => {
      const delta = clock.getDelta();
      evolveSmoke(delta);
      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };

    init();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      if (rendererRef.current && mountRef.current) {
        try {
          mountRef.current.removeChild(rendererRef.current.domElement);
        } catch (e) {
          console.log('Element already removed');
        }
        rendererRef.current.dispose();
      }

      smokeParticles.forEach(particle => {
        if (particle.geometry) particle.geometry.dispose();
        if (particle.material && !Array.isArray(particle.material)) {
          particle.material.dispose();
        }
      });
    };
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/artista.jpg"
          alt="Rafael - Artist"
          fill
          className="object-cover opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Three.js Smoke Canvas */}
      <div 
        ref={mountRef} 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-md">
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-sm shadow-lg">
              <h1 className="text-4xl font-bold text-black mb-2">
                Rafael
              </h1>
              <p className="text-lg text-gray-800 leading-relaxed">
                Sensual Mastery, International Artist Weaving Cultures and Emotions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;