import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { soundService } from '../../services/sound';
import { Sparkles, RotateCw, Palette, Smile } from 'lucide-react';

interface HeroRobotCanvasProps {
  className?: string;
  onInteract?: () => void;
}

export const HeroRobotCanvas: React.FC<HeroRobotCanvasProps> = ({ className = '', onInteract }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [robotColorIndex, setRobotColorIndex] = useState(0);
  const [isWaving, setIsWaving] = useState(false);

  // Color schemes for Robot body
  const COLOR_PALETTES = [
    { primary: 0x3b82f6, accent: 0x60a5fa, name: 'Xanh Công Nghệ' }, // Blue
    { primary: 0x10b981, accent: 0x34d399, name: 'Xanh Lá Tươi Sáng' }, // Emerald
    { primary: 0x8b5cf6, accent: 0xa78bfa, name: 'Tím Trí Tuệ' }, // Purple
    { primary: 0xf59e0b, accent: 0xfbbf24, name: 'Vàng Năng Lượng' } // Amber
  ];

  // Refs for animation loop
  const animStateRef = useRef({
    targetMouseX: 0,
    targetMouseY: 0,
    currentMouseX: 0,
    currentMouseY: 0,
    waveProgress: 0,
    spinVelocity: 0,
    primaryMaterial: null as THREE.MeshStandardMaterial | null,
    accentMaterial: null as THREE.MeshStandardMaterial | null,
    eyeLeftMesh: null as THREE.Mesh | null,
    eyeRightMesh: null as THREE.Mesh | null,
    rightArmGroup: null as THREE.Group | null,
    robotGroup: null as THREE.Group | null,
    floatingKeysGroup: null as THREE.Group | null,
    antennaLightMesh: null as THREE.Mesh | null
  });

  const triggerWave = () => {
    soundService.playStarChime();
    setIsWaving(true);
    animStateRef.current.waveProgress = 1.0;
    animStateRef.current.spinVelocity = 0.25;
    if (onInteract) onInteract();
    setTimeout(() => setIsWaving(false), 2000);
  };

  const cycleColor = () => {
    soundService.playKeyCorrect();
    const nextIdx = (robotColorIndex + 1) % COLOR_PALETTES.length;
    setRobotColorIndex(nextIdx);
    const pal = COLOR_PALETTES[nextIdx];
    if (animStateRef.current.primaryMaterial) {
      animStateRef.current.primaryMaterial.color.setHex(pal.primary);
    }
    if (animStateRef.current.accentMaterial) {
      animStateRef.current.accentMaterial.color.setHex(pal.accent);
    }
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 420;

    // SCENE & CAMERA
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.8, 6.2);

    // RENDERER
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // STUDIO ENVIRONMENT (PMREM + RoomEnvironment)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // LIGHTING RIG
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x1e293b, 0.9);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xfff7ed, 2.2);
    dirLight.position.set(4, 7, 5);
    dirLight.castShadow = !isSoftwareGl;
    if (dirLight.shadow) {
      dirLight.shadow.mapSize.width = 1024;
      dirLight.shadow.mapSize.height = 1024;
      dirLight.shadow.bias = -0.0005;
      dirLight.shadow.camera.near = 0.5;
      dirLight.shadow.camera.far = 15;
    }
    scene.add(dirLight);

    const blueRimLight = new THREE.DirectionalLight(0x38bdf8, 1.8);
    blueRimLight.position.set(-5, 3, -4);
    scene.add(blueRimLight);

    // PROCEDURAL RADIAL CONTACT SHADOW
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const gradient = sCtx.createRadialGradient(64, 64, 10, 64, 64, 64);
      gradient.addColorStop(0, 'rgba(15, 23, 42, 0.55)');
      gradient.addColorStop(0.5, 'rgba(15, 23, 42, 0.25)');
      gradient.addColorStop(1, 'rgba(15, 23, 42, 0)');
      sCtx.fillStyle = gradient;
      sCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(3.6, 3.6);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.6
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.55;
    scene.add(shadowMesh);

    // ==========================================
    // PROCEDURAL 3D ROBOT COMPOSITE (12+ PARTS)
    // ==========================================
    const robotRoot = new THREE.Group();
    robotRoot.position.y = -0.1;
    scene.add(robotRoot);
    animStateRef.current.robotGroup = robotRoot;

    // Materials
    const curPal = COLOR_PALETTES[robotColorIndex];
    const primaryMat = new THREE.MeshStandardMaterial({
      color: curPal.primary,
      metalness: 0.25,
      roughness: 0.25
    });
    animStateRef.current.primaryMaterial = primaryMat;

    const accentMat = new THREE.MeshStandardMaterial({
      color: curPal.accent,
      metalness: 0.4,
      roughness: 0.2
    });
    animStateRef.current.accentMaterial = accentMat;

    const whiteMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      metalness: 0.1,
      roughness: 0.35
    });

    const darkScreenMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.8,
      roughness: 0.1
    });

    const eyeGlowMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.8,
      roughness: 0.1
    });

    const goldAntennaMat = new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.9,
      roughness: 0.2,
      metalness: 0.7
    });

    // 1. Hover Base & Energy Pod
    const baseGeo = new THREE.CylinderGeometry(0.85, 1.05, 0.35, 32);
    const baseMesh = new THREE.Mesh(baseGeo, whiteMat);
    baseMesh.position.y = -1.3;
    baseMesh.castShadow = !isSoftwareGl;
    robotRoot.add(baseMesh);

    const ringGeo = new THREE.TorusGeometry(0.95, 0.08, 16, 32);
    const ringMesh = new THREE.Mesh(ringGeo, accentMat);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = -1.25;
    robotRoot.add(ringMesh);

    // 2. Torso Body
    const torsoGeo = new THREE.BoxGeometry(1.5, 1.35, 1.1);
    const torsoMesh = new THREE.Mesh(torsoGeo, primaryMat);
    torsoMesh.position.y = -0.4;
    torsoMesh.castShadow = !isSoftwareGl;
    robotRoot.add(torsoMesh);

    // Torso Belly Screen (Computer Monitor vibe)
    const bellyScreenGeo = new THREE.BoxGeometry(1.05, 0.75, 0.1);
    const bellyScreen = new THREE.Mesh(bellyScreenGeo, darkScreenMat);
    bellyScreen.position.set(0, -0.4, 0.54);
    robotRoot.add(bellyScreen);

    // Heart / KNTT Book Badge on Belly
    const badgeGeo = new THREE.PlaneGeometry(0.5, 0.4);
    const badgeCanvas = document.createElement('canvas');
    badgeCanvas.width = 128;
    badgeCanvas.height = 128;
    const bCtx = badgeCanvas.getContext('2d');
    if (bCtx) {
      bCtx.fillStyle = '#0284c7';
      bCtx.roundRect(10, 10, 108, 108, 20);
      bCtx.fill();
      bCtx.fillStyle = '#ffffff';
      bCtx.font = 'bold 50px sans-serif';
      bCtx.textAlign = 'center';
      bCtx.textBaseline = 'middle';
      bCtx.fillText('💻', 64, 64);
    }
    const badgeTex = new THREE.CanvasTexture(badgeCanvas);
    badgeTex.colorSpace = THREE.SRGBColorSpace;
    const badgeMat = new THREE.MeshBasicMaterial({ map: badgeTex, transparent: true });
    const badgeMesh = new THREE.Mesh(badgeGeo, badgeMat);
    badgeMesh.position.set(0, -0.4, 0.6);
    robotRoot.add(badgeMesh);

    // 3. Neck
    const neckGeo = new THREE.CylinderGeometry(0.3, 0.35, 0.22, 16);
    const neckMesh = new THREE.Mesh(neckGeo, accentMat);
    neckMesh.position.y = 0.35;
    robotRoot.add(neckMesh);

    // 4. Robot Head Group (look-at target)
    const headGroup = new THREE.Group();
    headGroup.position.y = 0.95;
    robotRoot.add(headGroup);

    const headGeo = new THREE.BoxGeometry(1.4, 1.05, 1.05);
    const headMesh = new THREE.Mesh(headGeo, whiteMat);
    headMesh.castShadow = !isSoftwareGl;
    headGroup.add(headMesh);

    // Head Visor Screen
    const visorGeo = new THREE.BoxGeometry(1.15, 0.65, 0.1);
    const visorMesh = new THREE.Mesh(visorGeo, darkScreenMat);
    visorMesh.position.set(0, 0.02, 0.52);
    headGroup.add(visorMesh);

    // Glowing Expressive Eyes
    const eyeGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const leftEye = new THREE.Mesh(eyeGeo, eyeGlowMat);
    leftEye.position.set(-0.3, 0.05, 0.58);
    leftEye.scale.set(1.2, 1.4, 0.5);
    headGroup.add(leftEye);
    animStateRef.current.eyeLeftMesh = leftEye;

    const rightEye = new THREE.Mesh(eyeGeo, eyeGlowMat);
    rightEye.position.set(0.3, 0.05, 0.58);
    rightEye.scale.set(1.2, 1.4, 0.5);
    headGroup.add(rightEye);
    animStateRef.current.eyeRightMesh = rightEye;

    // Robot Ear Headphones
    const earGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.15, 16);
    const leftEar = new THREE.Mesh(earGeo, primaryMat);
    leftEar.rotation.z = Math.PI / 2;
    leftEar.position.set(-0.75, 0.05, 0);
    headGroup.add(leftEar);

    const rightEar = new THREE.Mesh(earGeo, primaryMat);
    rightEar.rotation.z = Math.PI / 2;
    rightEar.position.set(0.75, 0.05, 0);
    headGroup.add(rightEar);

    // Antenna
    const antPoleGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.35, 8);
    const antPole = new THREE.Mesh(antPoleGeo, accentMat);
    antPole.position.y = 0.65;
    headGroup.add(antPole);

    const antSphereGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const antSphere = new THREE.Mesh(antSphereGeo, goldAntennaMat);
    antSphere.position.y = 0.85;
    headGroup.add(antSphere);
    animStateRef.current.antennaLightMesh = antSphere;

    // 5. Left Arm (resting gently on waist)
    const leftArmGroup = new THREE.Group();
    leftArmGroup.position.set(-0.95, -0.2, 0);
    const armUpperGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.65, 12);
    const leftArmUpper = new THREE.Mesh(armUpperGeo, whiteMat);
    leftArmUpper.position.y = -0.3;
    leftArmUpper.rotation.z = 0.25;
    leftArmGroup.add(leftArmUpper);
    const handGeo = new THREE.SphereGeometry(0.18, 12, 12);
    const leftHand = new THREE.Mesh(handGeo, accentMat);
    leftHand.position.set(0.1, -0.65, 0);
    leftArmGroup.add(leftHand);
    robotRoot.add(leftArmGroup);

    // 6. Right Arm (Waving Hand!)
    const rightArmGroup = new THREE.Group();
    rightArmGroup.position.set(0.95, -0.2, 0);
    const rightArmUpper = new THREE.Mesh(armUpperGeo, whiteMat);
    rightArmUpper.position.y = -0.3;
    rightArmGroup.add(rightArmUpper);
    const rightHand = new THREE.Mesh(handGeo, accentMat);
    rightHand.position.set(0, -0.65, 0);
    rightArmGroup.add(rightHand);
    robotRoot.add(rightArmGroup);
    animStateRef.current.rightArmGroup = rightArmGroup;

    // 7. Floating 3D Keycaps (F & J with homing bumps!)
    const floatingKeys = new THREE.Group();
    scene.add(floatingKeys);
    animStateRef.current.floatingKeysGroup = floatingKeys;

    const createKeycap = (letter: string, posX: number, posY: number, posZ: number, rotZ: number) => {
      const kGroup = new THREE.Group();
      kGroup.position.set(posX, posY, posZ);
      kGroup.rotation.z = rotZ;

      const kGeo = new THREE.BoxGeometry(0.5, 0.5, 0.25);
      const kMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.2,
        metalness: 0.1
      });
      const kMesh = new THREE.Mesh(kGeo, kMat);
      kMesh.castShadow = !isSoftwareGl;
      kGroup.add(kMesh);

      // Label texture
      const kCanvas = document.createElement('canvas');
      kCanvas.width = 128;
      kCanvas.height = 128;
      const kCtx = kCanvas.getContext('2d');
      if (kCtx) {
        kCtx.fillStyle = '#ffffff';
        kCtx.fillRect(0, 0, 128, 128);
        kCtx.fillStyle = '#1e3a8a';
        kCtx.font = 'bold 70px monospace';
        kCtx.textAlign = 'center';
        kCtx.textBaseline = 'middle';
        kCtx.fillText(letter, 64, 60);

        // Underline bump for F and J
        kCtx.fillStyle = '#3b82f6';
        kCtx.fillRect(40, 96, 48, 8);
      }
      const kTex = new THREE.CanvasTexture(kCanvas);
      kTex.colorSpace = THREE.SRGBColorSpace;
      const labelMat = new THREE.MeshBasicMaterial({ map: kTex });
      const labelGeo = new THREE.PlaneGeometry(0.44, 0.44);
      const labelMesh = new THREE.Mesh(labelGeo, labelMat);
      labelMesh.position.z = 0.13;
      kGroup.add(labelMesh);

      floatingKeys.add(kGroup);
      return kGroup;
    };

    const keyF = createKeycap('F', -1.9, 0.4, 0.5, 0.15);
    const keyJ = createKeycap('J', 1.9, 0.6, 0.3, -0.2);

    // Orbiting Golden Stars
    const starMat = new THREE.MeshStandardMaterial({
      color: 0xfacc15,
      emissive: 0xeab308,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.8
    });
    const starGeo = new THREE.OctahedronGeometry(0.18, 0);

    const star1 = new THREE.Mesh(starGeo, starMat);
    star1.position.set(-1.6, 1.4, -0.4);
    floatingKeys.add(star1);

    const star2 = new THREE.Mesh(starGeo, starMat);
    star2.position.set(1.7, -0.5, 0.6);
    floatingKeys.add(star2);

    // Mouse movement interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      animStateRef.current.targetMouseX = x * 0.5;
      animStateRef.current.targetMouseY = y * 0.3;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // ANIMATION TICK LOOP
    let frameId = 0;
    let clock = new THREE.Clock();

    const tick = () => {
      const dt = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Exponential damping on mouse look-at
      const state = animStateRef.current;
      state.currentMouseX += (state.targetMouseX - state.currentMouseX) * (1 - Math.exp(-6 * dt));
      state.currentMouseY += (state.targetMouseY - state.currentMouseY) * (1 - Math.exp(-6 * dt));

      if (robotRoot) {
        // Subtle floating bounce
        robotRoot.position.y = -0.1 + Math.sin(elapsed * 2.2) * 0.08;

        // Interactive tilt towards cursor + idle sway
        robotRoot.rotation.y = state.currentMouseX + Math.sin(elapsed * 0.8) * 0.08;
        robotRoot.rotation.x = -state.currentMouseY * 0.5;

        // Extra spin on interaction
        if (state.spinVelocity > 0.001) {
          robotRoot.rotation.y += state.spinVelocity;
          state.spinVelocity *= 0.94;
        }
      }

      // Head look-at tilt
      if (headGroup) {
        headGroup.rotation.y = state.currentMouseX * 0.6;
        headGroup.rotation.x = -state.currentMouseY * 0.6;
      }

      // Waving right arm animation
      if (state.rightArmGroup) {
        if (state.waveProgress > 0) {
          state.rightArmGroup.rotation.z = Math.PI * 0.75 + Math.sin(elapsed * 12) * 0.35;
          state.rightArmGroup.rotation.x = Math.sin(elapsed * 6) * 0.2;
          state.waveProgress -= dt * 0.5;
        } else {
          // Default idle posable arm
          state.rightArmGroup.rotation.z = -0.25 + Math.sin(elapsed * 2.2) * 0.05;
          state.rightArmGroup.rotation.x = 0;
        }
      }

      // Floating keycaps orbit
      if (keyF) {
        keyF.position.y = 0.4 + Math.sin(elapsed * 1.8 + 1) * 0.12;
        keyF.rotation.y = elapsed * 0.8;
      }
      if (keyJ) {
        keyJ.position.y = 0.6 + Math.sin(elapsed * 1.8 + 2.5) * 0.12;
        keyJ.rotation.y = -elapsed * 0.8;
      }
      if (star1) {
        star1.rotation.y = elapsed * 1.5;
        star1.rotation.x = elapsed * 0.8;
        star1.position.y = 1.4 + Math.cos(elapsed * 2) * 0.08;
      }
      if (star2) {
        star2.rotation.y = -elapsed * 1.5;
        star2.position.y = -0.5 + Math.sin(elapsed * 2) * 0.08;
      }

      // Antenna pulse glow
      if (state.antennaLightMesh) {
        const pulse = 0.8 + Math.sin(elapsed * 5) * 0.3;
        (state.antennaLightMesh.material as THREE.MeshStandardMaterial).emissiveIntensity = pulse;
      }

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    // RESIZE LISTENER
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // CLEANUP
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      scene.clear();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      {/* 3D Canvas Mount Container */}
      <div
        ref={mountRef}
        onClick={triggerWave}
        className="w-full h-80 sm:h-96 md:h-[420px] cursor-pointer touch-none relative"
        title="Nhấp vào chú Robot để chào và xem hiệu ứng xoay!"
      />

      {/* Floating Interactive Controls (Collapsible Glass Dock) */}
      <div className="absolute bottom-2 flex items-center gap-2 px-3 py-1.5 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-700/60 shadow-lg text-xs text-white">
        <button
          onClick={triggerWave}
          className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition-all flex items-center gap-1.5 shadow-xs"
        >
          <Smile className="w-3.5 h-3.5" />
          <span>{isWaving ? 'Robot đang vẫy tay!' : 'Vẫy tay chào'}</span>
        </button>

        <button
          onClick={cycleColor}
          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded-xl font-medium transition-all flex items-center gap-1 text-slate-200"
          title="Đổi màu sắc Robot"
        >
          <Palette className="w-3.5 h-3.5 text-amber-400" />
          <span>Màu {COLOR_PALETTES[robotColorIndex].name.split(' ')[0]}</span>
        </button>

        <span className="text-[11px] text-slate-400 hidden sm:inline ml-1">
          💡 Rê chuột để tương tác
        </span>
      </div>
    </div>
  );
};
