"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

import { RendererCleanup } from "@/components/common/RendererCleanup";
import fragmentShader from "@/components/home/fragmentShader.glsl";
import vertexShader from "@/components/home/vertexShader.glsl";

interface SphereModelProps {
  className?: string;
}

/**
 * 메인 페이지의 CONTACT 상태 구체를 단독으로 렌더링하는 컴포넌트
 * morph=1, spread=0 상태의 완전한 구체
 */
export function SphereModel({ className }: SphereModelProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const saturation = mounted && theme === "dark" ? 0.4 : 0.7;
  const lightness = mounted && theme === "dark" ? 0.3 : 0.5;

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.5} />
        <ResponsiveParticles saturation={saturation} lightness={lightness} />
        <RendererCleanup />
      </Canvas>
    </div>
  );
}

interface ResponsiveParticlesProps {
  saturation: number;
  lightness: number;
}

const ResponsiveParticles = ({
  saturation,
  lightness,
}: ResponsiveParticlesProps) => {
  const { viewport } = useThree();
  const baseScale = Math.max(0.5, viewport.width / 5);

  return (
    <SphereParticles
      saturation={saturation}
      lightness={lightness}
      scale={baseScale}
    />
  );
};

interface SphereParticlesProps {
  saturation: number;
  lightness: number;
  scale: number;
}

const SphereParticles = ({
  saturation,
  lightness,
  scale,
}: SphereParticlesProps) => {
  const points = useRef<THREE.Points>(null!);
  const initialCount = 15000;
  const count = Math.floor(initialCount * Math.max(0.5, scale));

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);

    const phi = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1.0)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;
      positions.set([x, y, z], i * 3);
    }

    return positions;
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0.0 },
      uSaturation: { value: saturation },
      uLightness: { value: lightness },
      uOpacity: { value: 1.0 },
      uMorph: { value: 1.0 }, // 완전한 구체
      uSpread: { value: 0.0 }, // 모인 상태
      uPositionOffset: { value: new THREE.Vector3(0, 0, 0) },
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
        transparent={true}
        depthWrite={false}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
      />
    </points>
  );
};
