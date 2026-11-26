import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { Maximize2, Minimize2 } from 'lucide-react';

interface ParticleTypographyProps {
  className?: string;
}

// Exactly 20,000 particles
const PARTICLE_COUNT = 20000;

const PROFESSION_TITLES = [
  'AI & DATA SCIENCE DEVELOPER',
  'ARTIFICIAL INTELLIGENCE DEVELOPER',
  'MACHINE LEARNING DEVELOPER',
  'PYTHON FULL STACK DEVELOPER',
  'SOFTWARE ENGINEER',
  'DATA ANALYTICS DEVELOPER',
  'GENERATIVE AI DEVELOPER',
  'AUTOMATION ENGINEER',
  'DEEP LEARNING ENTHUSIAST',
  'INTELLIGENT SYSTEMS DEVELOPER',
];

export const HolographicParticleTypography: React.FC<ParticleTypographyProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animationFrameId: number;
    let isDisposed = false;

    // --- 1. SCENE & CAMERA SETUP ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000); // PURE BLACK #000000

    const width = container.clientWidth || 900;
    const height = container.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 22);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      stencil: false,
      depth: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 1.0); // Strict Pure Black Clear
    container.appendChild(renderer.domElement);

    // --- 2. ORBITCONTROLS ---
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 45;
    controls.minDistance = 6;
    controls.autoRotate = false;

    // --- 3. POST-PROCESSING (UNREALBLOOMPASS) ---
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    // Controlled bloom settings preventing white screen blowout and ensuring razor-sharp letterform legibility
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      0.26, // Refined bloom strength for crisp letter definition
      0.16, // Tight bloom radius
      0.50  // High threshold: only brightest particle cores glow, letters remain razor sharp
    );
    composer.addPass(bloomPass);

    // --- 4. DYNAMIC TEXT SAMPLING: "KARTHIKEYAN" (Line 1) & "S A" (Line 2) ---
    const aTarget = new Float32Array(PARTICLE_COUNT * 3);
    const aScatter = new Float32Array(PARTICLE_COUNT * 3);
    const aLineId = new Float32Array(PARTICLE_COUNT);
    const aPhase = new Float32Array(PARTICLE_COUNT);

    const textCanvas = document.createElement('canvas');
    textCanvas.width = 1920;
    textCanvas.height = 900;
    const ctx = textCanvas.getContext('2d', { willReadFrequently: true });

    if (ctx) {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, textCanvas.width, textCanvas.height);
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Explicit wide letter spacing helper to ensure distinct, readable character contours
      const drawSpacedText = (text: string, yPos: number, fontSize: number, letterSpacing: number) => {
        ctx.font = `700 ${fontSize}px "Plus Jakarta Sans", "Inter", -apple-system, sans-serif`;
        const chars = text.split('');
        const charWidths = chars.map(ch => ctx.measureText(ch).width);
        const totalTextWidth = charWidths.reduce((sum, w) => sum + w, 0) + (chars.length - 1) * letterSpacing;
        
        let startX = (textCanvas.width - totalTextWidth) / 2;
        chars.forEach((ch, idx) => {
          ctx.fillText(ch, startX + charWidths[idx] / 2, yPos);
          startX += charWidths[idx] + letterSpacing;
        });
      };

      // Three centered lines: name, initials, and professional role.
      // The smaller third line keeps the full profession readable inside the display.
      drawSpacedText('KARTHIKEYAN', 190, 70, 16);
      drawSpacedText('S   A', 435, 62, 30);
      drawSpacedText('AI & DATA SCIENCE DEVELOPER', 690, 42, 3);

      const imgData = ctx.getImageData(0, 0, textCanvas.width, textCanvas.height);
      const data = imgData.data;

      const line1Samples: [number, number, number][] = [];
      const line2Samples: [number, number, number][] = [];
      const line3Samples: [number, number, number][] = [];

      // Sampling with 3px grid for uniform contour definition
      for (let y = 0; y < textCanvas.height; y += 3) {
        for (let x = 0; x < textCanvas.width; x += 3) {
          const idx = (y * textCanvas.width + x) * 4;
          if (data[idx] > 150) {
            // World coordinate mapping: perfectly fits in camera FOV
            const wx = (x - textCanvas.width / 2) * 0.0152;
            const wy = -(y - textCanvas.height / 2) * 0.0152;
            const wz = (Math.random() - 0.5) * 0.2; // Controlled 3D holographic depth
            
            if (y < 310) {
              line1Samples.push([wx, wy, wz]);
            } else if (y < 565) {
              line2Samples.push([wx, wy, wz]);
            } else {
              line3Samples.push([wx, wy, wz]);
            }
          }
        }
      }

      // Distribute particles across all three lines so the profession remains legible.
      // Name: 58%, initials: 14%, professional role: 28%.
      const count1 = Math.floor(PARTICLE_COUNT * 0.58);
      const count2 = Math.floor(PARTICLE_COUNT * 0.14);
      const count3 = PARTICLE_COUNT - count1 - count2;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        let pt: [number, number, number];
        let lineId: number;

        if (i < count1) {
          const sIdx = Math.floor((i / count1) * line1Samples.length);
          pt = line1Samples[sIdx] || [0, 3.5, 0];
          lineId = 1.0;
        } else if (i < count1 + count2) {
          const localIndex = i - count1;
          const sIdx = Math.floor((localIndex / count2) * line2Samples.length);
          pt = line2Samples[sIdx] || [0, 0, 0];
          lineId = 2.0;
        } else {
          const localIndex = i - count1 - count2;
          const sIdx = Math.floor((localIndex / count3) * line3Samples.length);
          pt = line3Samples[sIdx] || [0, -3.5, 0];
          lineId = 3.0;
        }

        // Controlled micro-jitter for organic particle density
        const jitterX = (Math.random() - 0.5) * 0.02;
        const jitterY = (Math.random() - 0.5) * 0.02;

        aTarget[i3 + 0] = pt[0] + jitterX;
        aTarget[i3 + 1] = pt[1] + jitterY;
        aTarget[i3 + 2] = pt[2];

        // Spherical scattered cloud (radius 10 to 22)
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);
        const r = Math.cbrt(Math.random()) * 14 + 5;
        const sinPhi = Math.sin(phi);

        aScatter[i3 + 0] = r * sinPhi * Math.cos(theta);
        aScatter[i3 + 1] = r * sinPhi * Math.sin(theta);
        aScatter[i3 + 2] = r * Math.cos(phi);

        aLineId[i] = lineId;
        aPhase[i] = Math.random();
      }
    }

    // --- 5. GPU PARTICLE SYSTEM & SHADER MATERIAL ---
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(PARTICLE_COUNT * 3), 3));
    geometry.setAttribute('aTarget', new THREE.BufferAttribute(aTarget, 3));
    geometry.setAttribute('aScatter', new THREE.BufferAttribute(aScatter, 3));
    geometry.setAttribute('aLineId', new THREE.BufferAttribute(aLineId, 1));
    geometry.setAttribute('aPhase', new THREE.BufferAttribute(aPhase, 1));

    // Circular glowing particle texture
    const createCircleTexture = () => {
      const c = document.createElement('canvas');
      c.width = 32;
      c.height = 32;
      const x = c.getContext('2d');
      if (x) {
        const g = x.createRadialGradient(16, 16, 0, 16, 16, 16);
        g.addColorStop(0, 'rgba(255, 255, 255, 1)');
        g.addColorStop(0.3, 'rgba(0, 245, 255, 0.85)');
        g.addColorStop(0.7, 'rgba(0, 229, 255, 0.25)');
        g.addColorStop(1, 'rgba(0, 0, 0, 0)');
        x.fillStyle = g;
        x.fillRect(0, 0, 32, 32);
      }
      return new THREE.CanvasTexture(c);
    };

    const particleTexture = createCircleTexture();

    const particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0.0 },
        uFormLine1: { value: 0.0 },
        uFormLine2: { value: 0.0 },
        uFormLine3: { value: 0.0 },
        uDissolve: { value: 0.0 },
        uRipple: { value: 0.0 },
        pointSize: { value: 1.5 },
        pointTexture: { value: particleTexture },
      },
      vertexShader: `
        attribute vec3 aTarget;
        attribute vec3 aScatter;
        attribute float aLineId;
        attribute float aPhase;

        uniform float uTime;
        uniform float uFormLine1;
        uniform float uFormLine2;
        uniform float uFormLine3;
        uniform float uDissolve;
        uniform float uRipple;
        uniform float pointSize;

        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          float lineWeight = aLineId < 1.5
            ? uFormLine1
            : (aLineId < 2.5 ? uFormLine2 : uFormLine3);

          // Swirling vortex physics around center (Y-axis & Z-axis)
          float angle = uTime * 0.65 + aPhase * 6.28318;
          float r = length(aScatter.xy);
          vec3 swirlPos = vec3(
            cos(angle) * r,
            sin(angle) * (r * 0.75),
            aScatter.z * 0.6 + sin(uTime * 1.5 + aPhase * 3.14) * 1.5
          );

          // Smooth interpolation from swirl to assigned character position
          vec3 currentPos = mix(swirlPos, aTarget, lineWeight);

          // Subtle energy ripples and waves during holding phase (restricted to Z depth to preserve 2D legibility)
          if (lineWeight > 0.85) {
            float rippleWave = sin(uTime * 3.0 + aTarget.x * 1.2 + aTarget.y * 1.0) * uRipple;
            currentPos.z += rippleWave * 0.18;
            currentPos.y += cos(uTime * 2.0 + aPhase * 6.28) * 0.012 * uRipple;
          }

          // Dissolution phase: smooth disintegration into swirling particle cloud
          if (uDissolve > 0.005) {
            vec3 dir = normalize(currentPos + vec3(0.001, 0.001, 0.001));
            currentPos += dir * (uDissolve * 10.0);
            currentPos += vec3(
              sin(uTime * 3.0 + aPhase * 8.0) * (uDissolve * 3.0),
              cos(uTime * 2.5 + aPhase * 6.0) * (uDissolve * 3.0),
              sin(uTime * 2.0 + aPhase * 4.0) * (uDissolve * 2.5)
            );
          }

          vec4 mvPosition = modelViewMatrix * vec4(currentPos, 1.0);
          gl_PointSize = pointSize * (22.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;

          // Electric Cyan (#00F5FF), Bright Aqua (#00E5FF), Ice Blue (#A5F3FC), Pure White highlights
          vec3 cCyan = vec3(0.0, 0.96, 1.0);
          vec3 cAqua = vec3(0.0, 0.85, 1.0);
          vec3 cIce  = vec3(0.65, 0.95, 1.0);
          vec3 cWhite = vec3(1.0, 1.0, 1.0);

          float tCol = sin(uTime * 1.8 + aTarget.x * 0.6) * 0.5 + 0.5;
          vec3 col = mix(cCyan, cIce, tCol);

          if (aPhase > 0.86) {
            col = cWhite; // Pure White highlight specks
          }

          vColor = col;
          vAlpha = smoothstep(50.0, 8.0, -mvPosition.z) * (1.0 - uDissolve * 0.35);
        }
      `,
      fragmentShader: `
        uniform sampler2D pointTexture;
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          vec4 texColor = texture2D(pointTexture, gl_PointCoord);
          if (texColor.a < 0.05) discard;
          gl_FragColor = vec4(vColor * 1.05, texColor.a * vAlpha * 0.88);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    // A single 3D identity object: particle typography on the front, profession panel on the back.
    const identityGroup = new THREE.Group();
    const particleSystem = new THREE.Points(geometry, particleMaterial);
    identityGroup.add(particleSystem);

    // Back-side holographic profession panel. It is rotated locally so it faces the camera
    // after the parent identityGroup completes its 180-degree Y-axis flip.
    const backCanvas = document.createElement('canvas');
    backCanvas.width = 1600;
    backCanvas.height = 360;
    const backCtx = backCanvas.getContext('2d');
    const backTexture = new THREE.CanvasTexture(backCanvas);
    backTexture.colorSpace = THREE.SRGBColorSpace;
    const backMaterial = new THREE.MeshBasicMaterial({
      map: backTexture,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const backPanel = new THREE.Mesh(new THREE.PlaneGeometry(19, 4.3), backMaterial);
    backPanel.position.z = -0.12;
    backPanel.rotation.y = Math.PI;
    identityGroup.add(backPanel);
    scene.add(identityGroup);

    const drawProfession = (title: string) => {
      if (!backCtx) return;
      backCtx.clearRect(0, 0, backCanvas.width, backCanvas.height);
      backCtx.textAlign = 'center';
      backCtx.textBaseline = 'middle';
      backCtx.shadowColor = '#00E5FF';
      backCtx.shadowBlur = 34;
      backCtx.fillStyle = '#A5F3FC';
      let fontSize = 92;
      backCtx.font = `800 ${fontSize}px "Plus Jakarta Sans", "Inter", sans-serif`;
      while (backCtx.measureText(title).width > 1460 && fontSize > 48) {
        fontSize -= 2;
        backCtx.font = `800 ${fontSize}px "Plus Jakarta Sans", "Inter", sans-serif`;
      }
      backCtx.fillText(title, backCanvas.width / 2, backCanvas.height / 2);
      backTexture.needsUpdate = true;
    };
    drawProfession(PROFESSION_TITLES[0]);

    // --- 6. TWO-SIDED FLIP + PROFESSION ROTATION ---
    // Front identity forms, flips to the reverse side, cycles through 10 titles,
    // then flips back to the name. Each profession remains visible for 2 seconds.
    const FRONT_FORM_DURATION = 3.0;
    const FRONT_HOLD_DURATION = 3.0;
    const FLIP_TO_BACK_DURATION = 1.1;
    const PROFESSION_HOLD_DURATION = 2.0;
    const FLIP_TO_FRONT_DURATION = 1.1;
    const FINAL_FRONT_HOLD = 2.0;
    const PROFESSIONS_DURATION = PROFESSION_TITLES.length * PROFESSION_HOLD_DURATION;
    const FRONT_TO_BACK_START = FRONT_FORM_DURATION + FRONT_HOLD_DURATION;
    const BACK_START = FRONT_TO_BACK_START + FLIP_TO_BACK_DURATION;
    const FRONT_RETURN_START = BACK_START + PROFESSIONS_DURATION;
    const CYCLE_DURATION = FRONT_RETURN_START + FLIP_TO_FRONT_DURATION + FINAL_FRONT_HOLD;
    const clock = new THREE.Clock();
    let currentProfessionIndex = -1;

    const easeInOut = (t: number) => t * t * (3 - 2 * t);

    const animate = () => {
      if (isDisposed) return;
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      const cycleTime = elapsedTime % CYCLE_DURATION;
      let formLine1 = 0;
      let formLine2 = 0;
      let dissolve = 0;
      let ripple = 0.1;
      let rotationY = 0;
      let backOpacity = 0;

      if (cycleTime < FRONT_FORM_DURATION) {
        const progress = cycleTime / FRONT_FORM_DURATION;
        formLine1 = Math.min(1, Math.pow(progress, 1.15));
        formLine2 = Math.min(1, Math.pow(Math.max(0, (progress - 0.35) / 0.65), 1.15));
      } else if (cycleTime < FRONT_TO_BACK_START) {
        formLine1 = 1;
        formLine2 = 1;
        ripple = 0.35 + Math.sin(elapsedTime * 2.5) * 0.12;
      } else if (cycleTime < BACK_START) {
        const progress = (cycleTime - FRONT_TO_BACK_START) / FLIP_TO_BACK_DURATION;
        rotationY = Math.PI * easeInOut(progress);
        formLine1 = 1 - easeInOut(progress);
        formLine2 = 1 - easeInOut(progress);
        dissolve = easeInOut(progress);
        backOpacity = easeInOut(progress);
      } else if (cycleTime < FRONT_RETURN_START) {
        rotationY = Math.PI;
        backOpacity = 1;
        const titleIndex = Math.min(
          PROFESSION_TITLES.length - 1,
          Math.floor((cycleTime - BACK_START) / PROFESSION_HOLD_DURATION)
        );
        if (titleIndex !== currentProfessionIndex) {
          currentProfessionIndex = titleIndex;
          drawProfession(PROFESSION_TITLES[titleIndex]);
        }
      } else if (cycleTime < FRONT_RETURN_START + FLIP_TO_FRONT_DURATION) {
        const progress = (cycleTime - FRONT_RETURN_START) / FLIP_TO_FRONT_DURATION;
        rotationY = Math.PI * (1 - easeInOut(progress));
        backOpacity = 1 - easeInOut(progress);
        dissolve = 1 - easeInOut(progress);
        formLine1 = easeInOut(progress);
        formLine2 = easeInOut(progress);
      } else {
        rotationY = 0;
        formLine1 = 1;
        formLine2 = 1;
        ripple = 0.25 + Math.sin(elapsedTime * 2.2) * 0.1;
      }

      identityGroup.rotation.y = rotationY;
      // Keep the front particle lettering from appearing mirrored through the back side.
      particleSystem.visible = rotationY < Math.PI * 0.5;
      backMaterial.opacity = backOpacity;
      particleMaterial.uniforms.uTime.value = elapsedTime;
      particleMaterial.uniforms.uFormLine1.value = formLine1;
      particleMaterial.uniforms.uFormLine2.value = formLine2;
      // The third sampled line is intentionally disabled on the front side:
      // profession titles belong exclusively to the reverse side.
      particleMaterial.uniforms.uFormLine3.value = 0;
      particleMaterial.uniforms.uDissolve.value = dissolve;
      particleMaterial.uniforms.uRipple.value = ripple;

      controls.update();
      composer.render();
    };

    animate();

    // --- 7. RESIZE LISTENER ---
    const handleResize = () => {
      if (!container || isDisposed) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);
      composer.setSize(newWidth, newHeight);
      bloomPass.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      renderer.dispose();
      geometry.dispose();
      backPanel.geometry.dispose();
      backMaterial.dispose();
      backTexture.dispose();
      particleMaterial.dispose();
      particleTexture.dispose();
      composer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isFullscreen]);

  return (
    <div
      className={`relative w-full rounded-3xl overflow-hidden bg-black border border-cyan-500/35 shadow-[0_0_50px_rgba(0,245,255,0.22)] ${
        isFullscreen
          ? 'fixed inset-0 z-50 rounded-none border-none'
          : 'h-[440px] sm:h-[480px] lg:h-[520px]'
      } ${className}`}
    >
      {/* Three.js Pure Black Canvas Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing bg-black" />

      {/* Minimal fullscreen control; all previously unwanted HUD labels are removed. */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          title={isFullscreen ? 'Exit Fullscreen' : 'View Fullscreen'}
          aria-label={isFullscreen ? 'Exit fullscreen' : 'View fullscreen'}
          className="p-2 rounded-xl bg-black/80 backdrop-blur-md border border-cyan-500/30 text-cyan-300 hover:text-white hover:border-cyan-400 transition-colors shadow-md"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};
