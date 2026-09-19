import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ANATOMY_ORGANS } from '../../services/storage';
import { AnatomyOrgan } from '../../types';
import { sound } from '../../services/audio';

interface Anatomy3DCanvasProps {
  selectedOrganId: string | null;
  onSelectOrgan: (organ: AnatomyOrgan) => void;
  gender: 'male' | 'female';
  onToggleGender: () => void;
}

export const Anatomy3DCanvas: React.FC<Anatomy3DCanvasProps> = ({
  selectedOrganId,
  onSelectOrgan,
  gender,
  onToggleGender,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const organMeshesRef = useRef<Map<string, THREE.Mesh>>(new Map());
  const cameraTargetRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0.4, 0));
  const cameraPosRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0.6, 4.2));
  const sceneRef = useRef<THREE.Scene | null>(null);
  const isDraggingRef = useRef(false);
  const previousMousePosRef = useRef({ x: 0, y: 0 });
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const heartMeshRef = useRef<THREE.Mesh | null>(null);
  const [isAutoRotate, setIsAutoRotate] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 550;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Subtle dark mist/fog
    scene.fog = new THREE.FogExp2(0x09090C, 0.12);

    // Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.6, 4.2);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lighting (Dramatic Editorial Lighting - Ferrari / Leclerc style)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const crimsonKeyLight = new THREE.DirectionalLight(0xE10600, 2.8);
    crimsonKeyLight.position.set(3, 4, 3);
    scene.add(crimsonKeyLight);

    const rimLight = new THREE.DirectionalLight(0xD4AF37, 2.0);
    rimLight.position.set(-3, 2, -2);
    scene.add(rimLight);

    const bottomGlow = new THREE.PointLight(0xFF2800, 1.5, 8);
    bottomGlow.position.set(0, -2, 1);
    scene.add(bottomGlow);

    // Model Group (contains mannequin + organs)
    const modelGroup = new THREE.Group();
    modelGroupRef.current = modelGroup;
    scene.add(modelGroup);

    // Build stylized editorial mannequin
    const bodyWireMat = new THREE.MeshStandardMaterial({
      color: 0x3A3A48,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
      roughness: 0.4,
      metalness: 0.8,
    });

    const bodyGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x181822,
      transparent: true,
      opacity: 0.35,
      roughness: 0.15,
      metalness: 0.9,
      transmission: 0.6,
      thickness: 0.5,
    });

    // Head
    const headGeo = new THREE.SphereGeometry(0.38, 24, 20);
    headGeo.scale(0.85, 1.1, 0.95);
    const headMesh = new THREE.Mesh(headGeo, bodyGlassMat);
    headMesh.position.set(0, 1.62, 0);
    modelGroup.add(headMesh);

    const headWire = new THREE.Mesh(headGeo, bodyWireMat);
    headWire.position.set(0, 1.62, 0);
    modelGroup.add(headWire);

    // Neck
    const neckGeo = new THREE.CylinderGeometry(0.14, 0.16, 0.28, 16);
    const neckMesh = new THREE.Mesh(neckGeo, bodyGlassMat);
    neckMesh.position.set(0, 1.28, 0);
    modelGroup.add(neckMesh);

    // Torso (Upper Chest)
    const chestWidth = gender === 'female' ? 0.64 : 0.74;
    const chestGeo = new THREE.BoxGeometry(chestWidth, 0.68, 0.42, 6, 6, 6);
    const chestMesh = new THREE.Mesh(chestGeo, bodyGlassMat);
    chestMesh.position.set(0, 0.85, 0);
    modelGroup.add(chestMesh);

    const chestWire = new THREE.Mesh(chestGeo, bodyWireMat);
    chestWire.position.set(0, 0.85, 0);
    modelGroup.add(chestWire);

    // Abdomen / Waist
    const waistWidth = gender === 'female' ? 0.50 : 0.60;
    const abdomenGeo = new THREE.CylinderGeometry(chestWidth * 0.48, waistWidth * 0.52, 0.55, 16);
    const abdomenMesh = new THREE.Mesh(abdomenGeo, bodyGlassMat);
    abdomenMesh.position.set(0, 0.42, 0);
    modelGroup.add(abdomenMesh);

    // Pelvis
    const pelvisWidth = gender === 'female' ? 0.66 : 0.60;
    const pelvisGeo = new THREE.BoxGeometry(pelvisWidth, 0.38, 0.44);
    const pelvisMesh = new THREE.Mesh(pelvisGeo, bodyGlassMat);
    pelvisMesh.position.set(0, 0.08, 0);
    modelGroup.add(pelvisMesh);

    // Spine Column (Internal glowing vertebrae rings)
    const spineMat = new THREE.MeshStandardMaterial({
      color: 0xE3DFD5,
      roughness: 0.3,
      metalness: 0.7,
      wireframe: true,
      opacity: 0.5,
      transparent: true,
    });
    const spineGeo = new THREE.CylinderGeometry(0.04, 0.05, 1.1, 12, 16);
    const spineMesh = new THREE.Mesh(spineGeo, spineMat);
    spineMesh.position.set(0, 0.62, -0.06);
    modelGroup.add(spineMesh);

    // Rib cage ring lines
    for (let i = 0; i < 5; i++) {
      const ringGeo = new THREE.TorusGeometry(0.24 + i * 0.025, 0.008, 8, 24);
      ringGeo.rotateX(Math.PI / 2);
      const ringMesh = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color: 0x555566, transparent: true, opacity: 0.3 }));
      ringMesh.position.set(0, 1.05 - i * 0.1, 0.02);
      modelGroup.add(ringMesh);
    }

    // Legs
    const createLeg = (xOffset: number) => {
      const legGroup = new THREE.Group();
      // Thigh
      const thighGeo = new THREE.CylinderGeometry(0.14, 0.11, 0.78, 12);
      const thighMesh = new THREE.Mesh(thighGeo, bodyGlassMat);
      thighMesh.position.set(0, -0.42, 0);
      legGroup.add(thighMesh);

      // Knee joint
      const kneeGeo = new THREE.SphereGeometry(0.11, 14, 14);
      const kneeMesh = new THREE.Mesh(kneeGeo, bodyGlassMat);
      kneeMesh.position.set(0, -0.84, 0.02);
      legGroup.add(kneeMesh);

      // Shin / Calf
      const calfGeo = new THREE.CylinderGeometry(0.10, 0.08, 0.78, 12);
      const calfMesh = new THREE.Mesh(calfGeo, bodyGlassMat);
      calfMesh.position.set(0, -1.26, 0);
      legGroup.add(calfMesh);

      legGroup.position.set(xOffset, 0, 0);
      return legGroup;
    };

    modelGroup.add(createLeg(-0.20));
    modelGroup.add(createLeg(0.20));

    // Arms
    const createArm = (xOffset: number, isRight: boolean) => {
      const armGroup = new THREE.Group();
      // Upper arm
      const armGeo = new THREE.CylinderGeometry(0.09, 0.07, 0.65, 12);
      const armMesh = new THREE.Mesh(armGeo, bodyGlassMat);
      armMesh.position.set(0, -0.32, 0);
      armMesh.rotation.z = isRight ? -0.15 : 0.15;
      armGroup.add(armMesh);

      // Forearm
      const foreGeo = new THREE.CylinderGeometry(0.07, 0.06, 0.60, 12);
      const foreMesh = new THREE.Mesh(foreGeo, bodyGlassMat);
      foreMesh.position.set(isRight ? -0.06 : 0.06, -0.88, 0);
      foreMesh.rotation.z = isRight ? -0.1 : 0.1;
      armGroup.add(foreMesh);

      armGroup.position.set(xOffset, 1.05, 0);
      return armGroup;
    };

    modelGroup.add(createArm(-0.48, true));
    modelGroup.add(createArm(0.48, false));

    // Pedestal grid ring (Charles Leclerc telemetry / stage platform)
    const platformRingGeo = new THREE.RingGeometry(1.2, 1.35, 48);
    platformRingGeo.rotateX(-Math.PI / 2);
    const platformMat = new THREE.MeshBasicMaterial({
      color: 0xE10600,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide,
    });
    const platformMesh = new THREE.Mesh(platformRingGeo, platformMat);
    platformMesh.position.set(0, -1.72, 0);
    modelGroup.add(platformMesh);

    // Rotating dashed outer ring
    const outerRingGeo = new THREE.RingGeometry(1.5, 1.52, 48);
    outerRingGeo.rotateX(-Math.PI / 2);
    const outerRingMat = new THREE.MeshBasicMaterial({
      color: 0xD4AF37,
      transparent: true,
      opacity: 0.25,
      side: THREE.DoubleSide,
    });
    const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
    outerRing.position.set(0, -1.72, 0);
    modelGroup.add(outerRing);

    // Add Interactive Organs
    const organMeshes = new Map<string, THREE.Mesh>();
    ANATOMY_ORGANS.forEach((organ) => {
      let organGeo: THREE.BufferGeometry;

      if (organ.id === 'heart') {
        organGeo = new THREE.DodecahedronGeometry(0.14, 2);
      } else if (organ.id === 'brain') {
        organGeo = new THREE.SphereGeometry(0.20, 18, 18);
        organGeo.scale(1.1, 0.85, 1.2);
      } else if (organ.id === 'lungs') {
        organGeo = new THREE.CapsuleGeometry(0.12, 0.22, 8, 12);
      } else if (organ.id === 'liver') {
        organGeo = new THREE.BoxGeometry(0.22, 0.14, 0.18);
      } else if (organ.id === 'stomach') {
        organGeo = new THREE.SphereGeometry(0.14, 14, 14);
        organGeo.scale(1.2, 0.8, 0.9);
      } else if (organ.id === 'kidneys') {
        organGeo = new THREE.CapsuleGeometry(0.08, 0.12, 6, 8);
      } else if (organ.id === 'spine') {
        organGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.8, 12);
      } else {
        organGeo = new THREE.SphereGeometry(0.12, 14, 14);
      }

      const organMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(organ.color),
        emissive: new THREE.Color(organ.color),
        emissiveIntensity: organ.id === selectedOrganId ? 0.9 : 0.35,
        roughness: 0.2,
        metalness: 0.6,
        transparent: true,
        opacity: 0.88,
      });

      const organMesh = new THREE.Mesh(organGeo, organMat);
      organMesh.position.set(organ.position[0], organ.position[1], organ.position[2]);
      organMesh.userData = { organId: organ.id, organData: organ };

      // Halo glow around each organ
      const haloGeo = new THREE.SphereGeometry(0.18, 12, 12);
      const haloMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(organ.color),
        transparent: true,
        opacity: organ.id === selectedOrganId ? 0.35 : 0.12,
        wireframe: true,
      });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      organMesh.add(haloMesh);

      modelGroup.add(organMesh);
      organMeshes.set(organ.id, organMesh);

      if (organ.id === 'heart') {
        heartMeshRef.current = organMesh;
      }
    });

    organMeshesRef.current = organMeshes;

    // Background particle dust field
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 8;
      particlePos[i + 1] = (Math.random() - 0.5) * 8;
      particlePos[i + 2] = (Math.random() - 0.5) * 8;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xD4AF37,
      size: 0.028,
      transparent: true,
      opacity: 0.4,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Raycasting for interactive organ clicking
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e: MouseEvent) => {
      if (isDraggingRef.current && modelGroupRef.current) {
        const deltaX = e.clientX - previousMousePosRef.current.x;
        const deltaY = e.clientY - previousMousePosRef.current.y;
        modelGroupRef.current.rotation.y += deltaX * 0.008;
        modelGroupRef.current.rotation.x += deltaY * 0.004;
        // Clamp vertical pitch
        modelGroupRef.current.rotation.x = Math.max(-0.4, Math.min(0.4, modelGroupRef.current.rotation.x));
        previousMousePosRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
    };

    const handleClick = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const meshes = Array.from(organMeshes.values());
      const intersects = raycaster.intersectObjects(meshes, true);

      if (intersects.length > 0) {
        let hitMesh: THREE.Object3D | null = intersects[0].object;
        while (hitMesh && !hitMesh.userData.organId && hitMesh.parent) {
          hitMesh = hitMesh.parent;
        }

        if (hitMesh && hitMesh.userData.organData) {
          sound.playOrganSelect();
          onSelectOrgan(hitMesh.userData.organData);
        }
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      camera.position.z = Math.max(2.2, Math.min(6.5, camera.position.z + e.deltaY * 0.003));
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    dom.addEventListener('click', handleClick);
    dom.addEventListener('wheel', handleWheel, { passive: false });

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth camera transition toward target
      camera.position.lerp(cameraPosRef.current, 0.06);
      camera.lookAt(cameraTargetRef.current);

      // Auto-rotation if enabled
      if (isAutoRotate && modelGroupRef.current && !isDraggingRef.current) {
        modelGroupRef.current.rotation.y += 0.005;
      }

      // Heart pulsation animation (lub-dub cycle)
      if (heartMeshRef.current) {
        const pulse = 1 + Math.sin(elapsed * 4.5) * 0.08 + Math.sin(elapsed * 9.0) * 0.04;
        heartMeshRef.current.scale.set(pulse, pulse, pulse);
      }

      // Slowly rotate particle ring and stage
      outerRing.rotation.z = elapsed * 0.12;
      particles.rotation.y = elapsed * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const newW = mountRef.current.clientWidth || 500;
      const newH = mountRef.current.clientHeight || 550;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      dom.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      dom.removeEventListener('click', handleClick);
      dom.removeEventListener('wheel', handleWheel);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [gender]);

  // Update target organ camera orbit & illumination
  useEffect(() => {
    if (!selectedOrganId) {
      cameraTargetRef.current.set(0, 0.4, 0);
      cameraPosRef.current.set(0, 0.6, 4.2);
    } else {
      const organ = ANATOMY_ORGANS.find(o => o.id === selectedOrganId);
      if (organ) {
        // Orbit camera directly to organ position
        cameraTargetRef.current.set(organ.position[0], organ.position[1], organ.position[2]);
        cameraPosRef.current.set(
          organ.position[0] * 0.5,
          organ.position[1],
          2.6
        );
      }
    }

    // Update emissive intensity of selected organ
    organMeshesRef.current.forEach((mesh, id) => {
      const isSelected = id === selectedOrganId;
      const mat = mesh.material as THREE.MeshStandardMaterial;
      if (mat) {
        mat.emissiveIntensity = isSelected ? 1.0 : 0.35;
      }
      if (mesh.children[0]) {
        const haloMat = (mesh.children[0] as THREE.Mesh).material as THREE.MeshBasicMaterial;
        if (haloMat) {
          haloMat.opacity = isSelected ? 0.45 : 0.12;
        }
      }
    });
  }, [selectedOrganId]);

  return (
    <div className="relative w-full h-[520px] sm:h-[620px] rounded-2xl overflow-hidden glass-panel border border-brand-border bg-gradient-to-b from-[#111116] to-[#09090C] shadow-2xl">
      {/* 3D Canvas mount */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Charles Leclerc Telemetry Overlay / Controls */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-brand-crimson animate-ping" />
          <span className="font-mono text-xs tracking-widest text-brand-bone uppercase">
            3D ANATOMY ENGINE // WEBGL v2.4
          </span>
        </div>
        <div className="text-[11px] font-mono text-brand-muted">
          MODEL: {gender.toUpperCase()} HUMAN MATRIX • REAL-TIME RENDER
        </div>
      </div>

      {/* Top right HUD action buttons */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        <button
          onClick={() => {
            sound.playClick();
            onToggleGender();
          }}
          className="px-3 py-1.5 rounded-full text-xs font-mono tracking-wider glass-pill text-brand-bone hover:border-brand-crimson transition-colors flex items-center gap-1.5"
          title="Toggle Male / Female Mannequin"
        >
          <span className="text-brand-crimson">⚡</span>
          {gender === 'male' ? 'MALE' : 'FEMALE'}
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setIsAutoRotate(!isAutoRotate);
          }}
          className={`px-3 py-1.5 rounded-full text-xs font-mono tracking-wider glass-pill transition-colors ${
            isAutoRotate ? 'border-brand-gold text-brand-gold bg-brand-gold/10' : 'text-brand-muted hover:text-white'
          }`}
          title="Toggle Auto Rotation"
        >
          {isAutoRotate ? 'ROTATING ON' : 'ROTATE OFF'}
        </button>
      </div>

      {/* Bottom control telemetry banner */}
      <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-xs font-mono text-brand-muted glass-pill px-4 py-2.5 rounded-xl border border-white/5 pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="text-brand-gold">◈</span>
          <span>DRAG TO ROTATE • PINCH / SCROLL TO ZOOM • CLICK ORGAN TO INSPECT</span>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <span className="text-brand-crimson">●</span>
          <span>HEARTBEAT: 72 BPM</span>
          <span className="text-white/20">|</span>
          <span className="text-brand-sage">●</span>
          <span>SENSORS ACTIVE</span>
        </div>
      </div>
    </div>
  );
};
