import React, { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls, Grid, Line } from '@react-three/drei';
import * as THREE from 'three';
import { monuments, connections, KIND_COLOR } from './worldData';

/**
 * The Explore world.
 *
 * This module is only ever reached through a lazy import behind an explicit
 * "Enter" action, so none of Three.js touches the main portfolio's critical
 * path (§20, §28).
 *
 * Art direction: an abstract infrastructure district, not a game level and
 * not a Bruno Simon pastiche. Monoliths are the site's lattice idea extruded
 * into space — height encodes scope, colour encodes kind, and the ground
 * lines are lineage: research feeding the work that came out of it.
 *
 * Interaction is deliberately shallow. Orbit, hover, click. There are no
 * game mechanics to learn, and every monument links back into the real
 * portfolio, so nothing here is a dead end.
 */

function Monument({ data, selected, onSelect, reducedEffects }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const color = KIND_COLOR[data.kind];
  const isActive = selected === data.id;

  // Hover and selection lift. Lerped rather than set, so the response has
  // weight instead of snapping.
  useFrame((state, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const targetY = data.size[1] / 2 + (isActive ? 0.55 : hovered ? 0.22 : 0);
    mesh.position.y = THREE.MathUtils.damp(mesh.position.y, targetY, 6, delta);

    if (!reducedEffects) {
      const targetScale = isActive ? 1.04 : 1;
      const s = THREE.MathUtils.damp(mesh.scale.x, targetScale, 8, delta);
      mesh.scale.setScalar(s);
    }
  });

  return (
    <group position={[data.position[0], 0, data.position[2]]}>
      <mesh
        ref={meshRef}
        position={[0, data.size[1] / 2, 0]}
        castShadow
        receiveShadow
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(isActive ? null : data.id);
        }}
      >
        <boxGeometry args={data.size} />
        <meshStandardMaterial
          color={color}
          roughness={0.62}
          metalness={0.12}
          emissive={color}
          emissiveIntensity={isActive ? 0.38 : hovered ? 0.2 : 0.06}
        />
      </mesh>

      {/* Label. Rendered as DOM through drei's Html so it stays crisp and
          is readable by assistive tech, unlike baked texture text. */}
      <Html
        position={[0, data.size[1] + 0.75, 0]}
        center
        distanceFactor={22}
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        {/* Colours are hard-coded rather than tokenised: the world's ground
            is always near-black regardless of the site theme, so a label
            using var(--text) turns black-on-black in light mode. The chip
            backdrop keeps labels readable against bright monuments too. */}
        <div
          style={{
            whiteSpace: 'nowrap',
            textAlign: 'center',
            padding: '4px 9px',
            borderRadius: '6px',
            background: isActive
              ? 'rgba(242,115,60,0.16)'
              : 'rgba(11,10,9,0.72)',
            border: `1px solid ${isActive ? 'rgba(242,115,60,0.5)' : 'rgba(148,138,124,0.22)'}`,
            backdropFilter: 'blur(3px)',
            opacity: isActive || hovered ? 1 : 0.8,
            transition: 'opacity 200ms ease, background 200ms ease',
          }}
        >
          <div
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '12px',
              fontWeight: 600,
              color: '#f4efe7',
              lineHeight: 1.25,
            }}
          >
            {data.label}
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              fontSize: '9px',
              color: '#a89f92',
              lineHeight: 1.35,
            }}
          >
            {data.sub}
          </div>
        </div>
      </Html>
    </group>
  );
}

/** Lineage lines. These are the same edges the site draws in 2D elsewhere. */
function Connections({ selected }) {
  const byId = useMemo(
    () => Object.fromEntries(monuments.map((m) => [m.id, m])),
    []
  );

  return (
    <>
      {connections.map(([a, b]) => {
        const from = byId[a];
        const to = byId[b];
        if (!from || !to) return null;
        const active = selected === a || selected === b;
        return (
          <Line
            key={`${a}-${b}`}
            points={[
              [from.position[0], 0.06, from.position[2]],
              [to.position[0], 0.06, to.position[2]],
            ]}
            color={active ? '#f2733c' : '#8a8073'}
            lineWidth={active ? 2.5 : 1.2}
            transparent
            opacity={selected && !active ? 0.14 : active ? 0.95 : 0.55}
          />
        );
      })}
    </>
  );
}

export default function World({ selected, onSelect, reducedEffects = false }) {
  return (
    <Canvas
      shadows={!reducedEffects}
      dpr={reducedEffects ? 1 : [1, 1.75]}
      camera={{ position: [15, 13, 19], fov: 42 }}
      gl={{ antialias: !reducedEffects, powerPreference: 'high-performance' }}
      // Clicking empty space clears the selection — a familiar, discoverable
      // way out that needs no instruction.
      onPointerMissed={() => onSelect(null)}
    >
      <color attach="background" args={['#0b0a09']} />
      <fog attach="fog" args={['#0b0a09', 22, 52]} />

      <ambientLight intensity={0.55} />
      <directionalLight
        position={[8, 14, 6]}
        intensity={1.15}
        castShadow={!reducedEffects}
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[-8, 6, -8]} intensity={18} color="#5fbdb4" distance={26} />
      <pointLight position={[6, 5, 6]} intensity={14} color="#f2733c" distance={22} />

      {/* Ground. The grid is the drafting language the whole site uses. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial color="#12100e" roughness={0.95} />
      </mesh>

      <Grid
        args={[80, 80]}
        cellSize={1}
        cellThickness={0.5}
        cellColor="#2a2621"
        sectionSize={5}
        sectionThickness={0.9}
        sectionColor="#3d3830"
        fadeDistance={44}
        fadeStrength={1.4}
        followCamera={false}
        infiniteGrid={false}
        position={[0, 0.01, 0]}
      />

      <Connections selected={selected} />

      {monuments.map((m) => (
        <Monument
          key={m.id}
          data={m}
          selected={selected}
          onSelect={onSelect}
          reducedEffects={reducedEffects}
        />
      ))}

      <OrbitControls
        makeDefault
        enablePan={false}
        // Clamped so the camera can never drop below the ground plane or
        // fly overhead — you cannot get lost or break the view.
        minPolarAngle={0.22}
        maxPolarAngle={Math.PI / 2.35}
        minDistance={8}
        maxDistance={34}
        enableDamping
        dampingFactor={0.06}
        autoRotate={!reducedEffects && !selected}
        autoRotateSpeed={0.28}
        target={[0, 1.5, 0]}
      />
    </Canvas>
  );
}
