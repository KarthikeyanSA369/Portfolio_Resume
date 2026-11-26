import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// --- LAYER 1: INTERACTIVE BACKGROUND GEOMETRIC NETWORK GRAPH ---
interface GraphNode {
  basePos: [number, number, number];
  currentPos: THREE.Vector3;
  targetPos: THREE.Vector3;
  driftPhase: number;
}

function InteractiveBackgroundGraph() {
  const linesRef = useRef<THREE.LineSegments>(null);
  const pointsRef = useRef<THREE.Points>(null);

  // 24 geometrically balanced nodes across background space (Z: -4.5 to -6.2)
  const { nodes, edgePairs, linePositions, pointPositions } = useMemo(() => {
    const rawCoords: [number, number, number][] = [
      [-7.2, 3.8, -5.2],
      [-5.5, 4.6, -5.8],
      [-3.2, 4.0, -5.0],
      [-1.0, 4.5, -5.5],
      [1.5, 4.2, -5.2],
      [4.2, 4.5, -5.7],
      [6.8, 3.5, -5.0],

      [-7.8, 1.2, -5.4],
      [-5.0, 1.8, -4.8],
      [-2.8, 1.0, -5.5],
      [2.5, 1.2, -5.6],
      [5.2, 1.5, -4.9],
      [7.5, 1.0, -5.3],

      [-7.5, -1.5, -5.0],
      [-4.8, -1.2, -5.3],
      [-2.2, -1.8, -5.6],
      [1.8, -1.5, -5.2],
      [4.5, -1.2, -5.5],
      [7.2, -1.6, -5.1],

      [-6.5, -3.8, -5.5],
      [-3.8, -4.2, -5.2],
      [-0.8, -3.9, -5.6],
      [2.8, -4.2, -5.1],
      [6.0, -3.8, -5.4],
    ];

    const nodeList: GraphNode[] = rawCoords.map((coord, idx) => ({
      basePos: coord,
      currentPos: new THREE.Vector3(...coord),
      targetPos: new THREE.Vector3(...coord),
      driftPhase: idx * 0.75,
    }));

    // Find edges between nearby nodes (distance between 2.2 and 3.8 units)
    const pairs: [number, number][] = [];
    for (let i = 0; i < nodeList.length; i++) {
      for (let j = i + 1; j < nodeList.length; j++) {
        const p1 = new THREE.Vector3(...nodeList[i].basePos);
        const p2 = new THREE.Vector3(...nodeList[j].basePos);
        const dist = p1.distanceTo(p2);
        if (dist > 2.0 && dist < 3.7) {
          pairs.push([i, j]);
        }
      }
    }

    const linePos = new Float32Array(pairs.length * 2 * 3);
    const ptPos = new Float32Array(nodeList.length * 3);

    return {
      nodes: nodeList,
      edgePairs: pairs,
      linePositions: linePos,
      pointPositions: ptPos,
    };
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const pointer = state.pointer; // Normalized [-1, 1]

    // Cursor position in world coordinates at Z = -5.2 approx
    const cursorWorldX = pointer.x * 7.5;
    const cursorWorldY = pointer.y * 5.0;

    // Update node target positions with smooth cursor reactivity & ambient drift
    nodes.forEach((node) => {
      const ambientX = Math.sin(t * 0.6 + node.driftPhase) * 0.18;
      const ambientY = Math.cos(t * 0.5 + node.driftPhase * 1.2) * 0.16;

      const dx = cursorWorldX - node.basePos[0];
      const dy = cursorWorldY - node.basePos[1];
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Nearby graph nodes within 4.5 units shift slightly based on cursor
      let shiftX = 0;
      let shiftY = 0;
      if (dist < 4.5) {
        const factor = (1 - dist / 4.5) * 0.45;
        shiftX = dx * factor;
        shiftY = dy * factor;
      }

      node.targetPos.set(
        node.basePos[0] + ambientX + shiftX,
        node.basePos[1] + ambientY + shiftY,
        node.basePos[2]
      );

      // Smooth interpolation (lerp) toward target
      node.currentPos.lerp(node.targetPos, 0.05);
    });

    // Update line segments geometry attribute
    if (linesRef.current) {
      const posAttr = linesRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const array = posAttr.array as Float32Array;

      let idx = 0;
      for (let k = 0; k < edgePairs.length; k++) {
        const [a, b] = edgePairs[k];
        const posA = nodes[a].currentPos;
        const posB = nodes[b].currentPos;

        array[idx++] = posA.x;
        array[idx++] = posA.y;
        array[idx++] = posA.z;

        array[idx++] = posB.x;
        array[idx++] = posB.y;
        array[idx++] = posB.z;
      }
      posAttr.needsUpdate = true;
    }

    // Update points geometry attribute
    if (pointsRef.current) {
      const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const array = posAttr.array as Float32Array;

      let idx = 0;
      for (let k = 0; k < nodes.length; k++) {
        const pos = nodes[k].currentPos;
        array[idx++] = pos.x;
        array[idx++] = pos.y;
        array[idx++] = pos.z;
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Dynamic Connecting Lines (Subtle, Thin, Low Opacity) */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#1763E8"
          transparent={true}
          opacity={0.16}
          depthWrite={false}
        />
      </lineSegments>

      {/* Connection Points (Small, Subtle Neutral Nodes) */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[pointPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.065}
          color="#3978ED"
          transparent={true}
          opacity={0.38}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

// --- LAYER 2: TRANSPARENT GLASS CUBES (CURSOR-RESPONSIVE) ---
interface GlassCubeItem {
  basePos: [number, number, number];
  size: number;
  initialRotation: [number, number, number];
  floatSpeed: number;
  rotationSpeed: number;
  repelFactor: number; // Positive = moves toward cursor, Negative = moves away
  depthParallax: number;
}

function CursorResponsiveGlassCube({ cube }: { cube: GlassCubeItem }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const currentPos = useRef(new THREE.Vector3(...cube.basePos));
  const targetPos = useRef(new THREE.Vector3(...cube.basePos));

  const edgesGeometry = useMemo(() => {
    const box = new THREE.BoxGeometry(cube.size, cube.size, cube.size);
    return new THREE.EdgesGeometry(box);
  }, [cube.size]);

  useFrame((state) => {
    if (!meshRef.current) return;

    const t = state.clock.getElapsedTime();
    const pointer = state.pointer; // Normalized [-1, 1]

    // Cursor position projected onto world coordinates
    const cursorX = pointer.x * 6.5;
    const cursorY = pointer.y * 4.2;

    const dx = cursorX - cube.basePos[0];
    const dy = cursorY - cube.basePos[1];
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Natural ambient float oscillation
    const floatOffsetY = Math.sin(t * cube.floatSpeed) * 0.18;
    const floatOffsetX = Math.cos(t * cube.floatSpeed * 0.7) * 0.12;

    // Cursor-responsive displacement
    let cursorShiftX = 0;
    let cursorShiftY = 0;

    if (dist < 6.0) {
      // Proximity intensity with smooth cubic falloff
      const intensity = (1 - dist / 6.0) * cube.repelFactor * cube.depthParallax;
      cursorShiftX = dx * intensity * 0.45;
      cursorShiftY = dy * intensity * 0.45;
    }

    // Additional subtle global parallax based on cursor offset
    const parallaxX = pointer.x * 0.35 * cube.depthParallax;
    const parallaxY = pointer.y * 0.25 * cube.depthParallax;

    // Target position calculation
    targetPos.current.set(
      cube.basePos[0] + floatOffsetX + cursorShiftX + parallaxX,
      cube.basePos[1] + floatOffsetY + cursorShiftY + parallaxY,
      cube.basePos[2]
    );

    // Smooth continuous interpolation (lerp)
    currentPos.current.lerp(targetPos.current, 0.045);
    meshRef.current.position.copy(currentPos.current);

    // Cursor-responsive rotation & natural spin
    meshRef.current.rotation.x =
      cube.initialRotation[0] +
      Math.sin(t * cube.rotationSpeed) * 0.35 +
      pointer.y * 0.25 * cube.depthParallax;

    meshRef.current.rotation.y =
      cube.initialRotation[1] +
      t * cube.rotationSpeed * 0.75 +
      pointer.x * 0.35 * cube.depthParallax;

    meshRef.current.rotation.z =
      cube.initialRotation[2] +
      Math.cos(t * cube.rotationSpeed * 0.6) * 0.25;
  });

  return (
    <mesh ref={meshRef} position={cube.basePos}>
      <boxGeometry args={[cube.size, cube.size, cube.size]} />
      {/* Crystal-Clear Transparent Glass Material (High Transparency, No Grey/Opaque Shader) */}
      <meshPhysicalMaterial
        color="#FFFFFF"
        transparent={true}
        opacity={0.22}
        roughness={0.02}
        metalness={0.03}
        clearcoat={1.0}
        clearcoatRoughness={0.02}
        reflectivity={0.96}
        depthWrite={false}
      />

      {/* Subtle Transparent Glass Edge Highlights: Soft White / Neutral Silver Reflection (No Blue Outlines) */}
      <lineSegments geometry={edgesGeometry}>
        <lineBasicMaterial
          color="#FFFFFF"
          transparent={true}
          opacity={0.26}
          depthWrite={false}
        />
      </lineSegments>

      {/* Subtle Back-Face Glass Refraction (Pure Neutral Crystal Brilliance, No Blue Core) */}
      <mesh>
        <boxGeometry args={[cube.size * 0.96, cube.size * 0.96, cube.size * 0.96]} />
        <meshPhysicalMaterial
          color="#FFFFFF"
          transparent={true}
          opacity={0.08}
          roughness={0.02}
          clearcoat={1.0}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
    </mesh>
  );
}

// Exactly 18 Transparent Glass Cubes (5 Large, 8 Medium, 5 Small) Distributed Across Negative Space
function GlassCubesEnvironment() {
  const cubes: GlassCubeItem[] = useMemo(
    () => [
      // --- 1. Far Left & Upper Left Perimeter (Clear of text, buttons & social links) ---
      { basePos: [-5.8, 3.2, -2.4], size: 1.40, initialRotation: [0.3, 0.4, 0.2], floatSpeed: 1.5, rotationSpeed: 0.08, repelFactor: 0.55, depthParallax: 1.1 }, // Large
      { basePos: [-6.8, 1.4, -3.0], size: 1.50, initialRotation: [0.5, 0.2, 0.6], floatSpeed: 1.3, rotationSpeed: 0.07, repelFactor: -0.45, depthParallax: 0.9 }, // Large
      { basePos: [-6.2, -0.8, -2.6], size: 1.35, initialRotation: [0.2, 0.5, 0.3], floatSpeed: 1.4, rotationSpeed: 0.08, repelFactor: 0.50, depthParallax: 1.0 }, // Large
      { basePos: [-4.2, 4.0, -2.8], size: 0.90, initialRotation: [0.4, 0.1, 0.5], floatSpeed: 1.9, rotationSpeed: 0.11, repelFactor: -0.60, depthParallax: 1.2 }, // Medium
      { basePos: [-5.6, -2.8, -2.5], size: 0.95, initialRotation: [0.1, 0.7, 0.4], floatSpeed: 1.8, rotationSpeed: 0.10, repelFactor: 0.45, depthParallax: 0.95 }, // Medium
      { basePos: [-4.5, -4.0, -2.2], size: 0.80, initialRotation: [0.6, 0.3, 0.2], floatSpeed: 2.0, rotationSpeed: 0.12, repelFactor: -0.50, depthParallax: 1.15 }, // Medium

      // --- 2. Top Ceiling Space & Bottom Floor Space (Clear of center content) ---
      { basePos: [-2.0, 4.3, -3.0], size: 0.75, initialRotation: [0.3, 0.6, 0.1], floatSpeed: 2.1, rotationSpeed: 0.13, repelFactor: 0.50, depthParallax: 1.0 }, // Medium
      { basePos: [-0.3, 4.1, -3.4], size: 0.55, initialRotation: [0.5, 0.2, 0.4], floatSpeed: 2.2, rotationSpeed: 0.14, repelFactor: -0.40, depthParallax: 0.85 }, // Small
      { basePos: [1.6, 4.3, -3.2], size: 0.80, initialRotation: [0.2, 0.8, 0.3], floatSpeed: 1.9, rotationSpeed: 0.12, repelFactor: 0.55, depthParallax: 1.05 }, // Medium
      { basePos: [0.4, -4.2, -2.8], size: 0.75, initialRotation: [0.3, 0.5, 0.2], floatSpeed: 2.0, rotationSpeed: 0.11, repelFactor: -0.45, depthParallax: 1.1 }, // Medium
      { basePos: [2.2, -4.3, -3.2], size: 0.85, initialRotation: [0.5, 0.1, 0.4], floatSpeed: 1.8, rotationSpeed: 0.10, repelFactor: 0.50, depthParallax: 0.9 }, // Medium

      // --- 3. Far Right Perimeter (Surrounding portrait without covering face) ---
      { basePos: [5.5, 3.5, -2.2], size: 1.35, initialRotation: [0.4, 0.5, 0.1], floatSpeed: 1.6, rotationSpeed: 0.09, repelFactor: 0.50, depthParallax: 1.1 }, // Large
      { basePos: [6.8, 1.8, -2.8], size: 1.50, initialRotation: [0.2, 0.3, 0.7], floatSpeed: 1.2, rotationSpeed: 0.07, repelFactor: -0.40, depthParallax: 0.95 }, // Large
      { basePos: [5.8, -2.4, -2.1], size: 0.95, initialRotation: [0.3, 0.7, 0.2], floatSpeed: 1.8, rotationSpeed: 0.11, repelFactor: 0.45, depthParallax: 1.15 }, // Medium
      { basePos: [6.7, -3.2, -3.2], size: 1.05, initialRotation: [0.5, 0.4, 0.3], floatSpeed: 1.5, rotationSpeed: 0.09, repelFactor: -0.50, depthParallax: 0.85 }, // Medium

      // --- 4. Deep Background Accents (Z: -3.8 to -4.5) for multi-layer 3D depth ---
      { basePos: [-2.8, 1.6, -4.2], size: 0.50, initialRotation: [0.1, 0.3, 0.5], floatSpeed: 2.3, rotationSpeed: 0.15, repelFactor: 0.35, depthParallax: 0.75 }, // Small
      { basePos: [2.8, 0.4, -4.4], size: 0.52, initialRotation: [0.5, 0.2, 0.3], floatSpeed: 2.2, rotationSpeed: 0.14, repelFactor: -0.35, depthParallax: 0.70 }, // Small
      { basePos: [4.6, -4.1, -2.6], size: 0.58, initialRotation: [0.1, 0.6, 0.5], floatSpeed: 2.0, rotationSpeed: 0.12, repelFactor: 0.40, depthParallax: 1.0 }, // Small
    ],
    []
  );

  return (
    <group>
      {cubes.map((cube, idx) => (
        <CursorResponsiveGlassCube key={idx} cube={cube} />
      ))}
    </group>
  );
}

// Smooth camera parallax on mouse movement with reduced motion support
function SceneController() {
  const isReducedMotion = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    isReducedMotion.current = mediaQuery.matches;

    const handler = (e: MediaQueryListEvent) => {
      isReducedMotion.current = e.matches;
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useFrame(({ camera, pointer }) => {
    if (isReducedMotion.current) return;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.40, 0.035);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.y * 0.28, 0.035);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export const HeroScene = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        {/* Soft Ambient Light (Pure white for crystal transparency) */}
        <ambientLight intensity={1.5} color="#FFFFFF" />

        {/* Directional Lights for Specular Facet Highlights */}
        <directionalLight position={[10, 10, 10]} intensity={2.0} color="#FFFFFF" />
        <directionalLight position={[-10, 8, -5]} intensity={1.2} color="#F1F5F9" />
        <directionalLight position={[0, -10, 5]} intensity={0.6} color="#FFFFFF" />

        {/* Neutral Specular Point Lights for Pure Glass Highlights (No Blue Tint) */}
        <pointLight position={[-6, 4, 4]} intensity={1.5} color="#FFFFFF" distance={20} />
        <pointLight position={[6, -4, 4]} intensity={1.2} color="#F8FAFC" distance={20} />

        <SceneController />

        {/* Depth Layer 1 (Background): Subtle Interactive Geometric Network Graph */}
        <InteractiveBackgroundGraph />

        {/* Depth Layer 2 (Middle): 18 Transparent Glass Cubes (Cursor-Responsive) */}
        <GlassCubesEnvironment />

        {/* STRICTLY NO particles, spheres, ribbons, or unrelated 3D objects */}
      </Canvas>
    </div>
  );
};
