"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

import fragmentShader from "./fragmentShader.glsl";
import vertexShader from "./vertexShader.glsl";

export default function BubbleModelScene() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const saturation = mounted && theme === "dark" ? 0.4 : 0.7;
  const lightness = mounted && theme === "dark" ? 0.3 : 0.5;

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <CustomGeometryParticles
          count={50000}
          saturation={saturation}
          lightness={lightness}
        />
      </Canvas>
    </div>
  );
}

const CustomGeometryParticles = ({
  count,
  saturation,
  lightness,
}: {
  count: number;
  saturation: number;
  lightness: number;
}) => {
  const points = useRef<THREE.Points>(null!);

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);

    let phi = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < count; i++) {
      let y = 1 - (i / (count - 1.0)) * 2;
      let radius = Math.sqrt(1 - y * y);
      let theta = phi * i;

      let x = Math.cos(theta) * radius;
      let z = Math.sin(theta) * radius;
      positions.set([x, y, z], i * 3);
    }

    return positions;
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: {
        value: 0.0,
      },
      uSaturation: {
        value: saturation,
      },
      uLightness: {
        value: lightness,
      },
    }),
    []
  );

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.elapsedTime;
    uniforms.uSaturation.value = saturation;
    uniforms.uLightness.value = lightness;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particlesPosition, 3]}
        />
      </bufferGeometry>
      <shaderMaterial
        depthWrite={true}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
      />
    </points>
  );
};
