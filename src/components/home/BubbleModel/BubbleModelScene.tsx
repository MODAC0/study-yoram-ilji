"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

import { RendererCleanup } from "@/components/common/RendererCleanup";
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
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        style={{ width: "100%", height: "100vh" }}
      >
        <ambientLight intensity={0.5} />
        <ResponsiveParticles saturation={saturation} lightness={lightness} />
        <RendererCleanup />
      </Canvas>
    </div>
  );
}

const ResponsiveParticles = (props: {
  saturation: number;
  lightness: number;
}) => {
  const { viewport } = useThree();

  const scale = Math.max(0.5, viewport.width / 6);

  return <CustomGeometryParticles {...props} scale={scale} />;
};

const CustomGeometryParticles = ({
  saturation,
  lightness,
  scale,
}: {
  saturation: number;
  lightness: number;
  scale: number;
}) => {
  const points = useRef<THREE.Points>(null!);
  const initialCount = 20000;
  const count = Math.floor(initialCount * scale);

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
    <points ref={points} scale={scale}>
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
