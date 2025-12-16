"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

import { RendererCleanup } from "@/components/common/RendererCleanup";
import fragmentShader from "./fragmentShader.glsl";
import vertexShader from "./vertexShader.glsl";

// 스크롤 진행률을 0-1 사이 값으로 계산
function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const newProgress = maxScroll > 0 ? scrollY / maxScroll : 0;
      setProgress(Math.min(1, Math.max(0, newProgress)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
}

// 섹션별 스크롤 상태 계산 (텍스트 오버레이용)
function useSectionProgress() {
  const [state, setState] = useState({
    section: 0,
    sectionProgress: 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const scrollProgress = scrollY / viewportHeight;

      const section = Math.floor(scrollProgress);
      const sectionProgress = scrollProgress - section;

      setState({ section, sectionProgress });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return state;
}

// 텍스트 오버레이 섹션 데이터
const textSections = [
  {
    title: "Essentialism in Interaction",
    subtitle: "화려함보다는 명확함을",
  },
  {
    title: "Frontend Developer",
    subtitle: "사용자 경험을 디자인합니다",
  },
  {
    title: "Creative Coding",
    subtitle: "코드로 예술을 만들어냅니다",
  },
];

export default function BubbleModelScene() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const scrollProgress = useScrollProgress();
  const { section, sectionProgress } = useSectionProgress();

  useEffect(() => {
    setMounted(true);
  }, []);

  const saturation = mounted && theme === "dark" ? 0.4 : 0.7;
  const lightness = mounted && theme === "dark" ? 0.3 : 0.5;

  return (
    <div className="w-full h-full fixed top-0 left-0 right-0 bottom-0 pointer-events-none">
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        style={{ width: "100%", height: "100vh" }}
      >
        <ambientLight intensity={0.5} />
        <CameraController scrollProgress={scrollProgress} />
        <ResponsiveParticles saturation={saturation} lightness={lightness} />
        <RendererCleanup />
      </Canvas>

      {/* 텍스트 오버레이 */}
      <TextOverlay section={section} sectionProgress={sectionProgress} />
    </div>
  );
}

// 스크롤에 따라 카메라를 움직이는 컴포넌트
const CameraController = ({ scrollProgress }: { scrollProgress: number }) => {
  const { camera } = useThree();
  const targetRef = useRef({ x: 0, y: 0, z: 4 });

  useFrame(() => {
    // 스크롤에 따른 카메라 위치 계산
    // 0% -> 정면에서 보기
    // 25% -> 왼쪽 위에서 보기
    // 50% -> 오른쪽에서 보기
    // 75% -> 아래에서 보기
    // 100% -> 뒤에서 보기

    const angle = scrollProgress * Math.PI * 2; // 0 ~ 2π
    const radius = 4;

    // 카메라가 구체 주위를 회전
    targetRef.current.x = Math.sin(angle) * radius * 0.5;
    targetRef.current.y = Math.cos(angle * 0.5) * radius * 0.3;
    targetRef.current.z = Math.cos(angle) * radius * 0.5 + radius * 0.7;

    // 부드러운 카메라 이동
    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      targetRef.current.x,
      0.05
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      targetRef.current.y,
      0.05
    );
    camera.position.z = THREE.MathUtils.lerp(
      camera.position.z,
      targetRef.current.z,
      0.05
    );

    // 항상 원점(구체 중심)을 바라보도록
    camera.lookAt(0, 0, 0);
  });

  return null;
};

// 텍스트 오버레이 컴포넌트
const TextOverlay = ({
  section,
  sectionProgress,
}: {
  section: number;
  sectionProgress: number;
}) => {
  // 각 섹션의 텍스트 opacity 계산
  // 섹션 시작: fade in (0-0.2), 중간: 보임 (0.2-0.8), 끝: fade out (0.8-1)
  const getOpacity = (targetSection: number) => {
    if (section === targetSection) {
      if (sectionProgress < 0.2) {
        return sectionProgress / 0.2; // fade in
      } else if (sectionProgress > 0.8) {
        return 1 - (sectionProgress - 0.8) / 0.2; // fade out
      }
      return 1;
    }
    return 0;
  };

  // Y 위치 계산 (스크롤에 따라 위로 이동)
  const getTransform = (targetSection: number) => {
    if (section === targetSection) {
      const offset = (sectionProgress - 0.5) * -50; // -25px ~ +25px
      return `translateY(${offset}px)`;
    }
    return "translateY(50px)";
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {textSections.map((text, index) => (
        <div
          key={index}
          className="absolute flex flex-col gap-4 items-center justify-center transition-all duration-300 ease-out"
          style={{
            opacity: getOpacity(index),
            transform: getTransform(index),
            pointerEvents: getOpacity(index) > 0.5 ? "auto" : "none",
          }}
        >
          <p className="text-2xl text-dark-500 dark:text-light-500 max-sm:text-base">
            {text.title}
          </p>
          <h2 className="text-5xl text-dark-600 dark:text-light-500 font-bold max-sm:text-3xl">
            {text.subtitle}
          </h2>
        </div>
      ))}
    </div>
  );
};

const ResponsiveParticles = (props: {
  saturation: number;
  lightness: number;
}) => {
  const { viewport } = useThree();
  const scale = Math.max(0.5, viewport.width / 6);

  return (
    <CustomGeometryParticles
      saturation={props.saturation}
      lightness={props.lightness}
      scale={scale}
    />
  );
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
      uOpacity: {
        value: 1.0,
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
        transparent={true}
        depthWrite={false}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
      />
    </points>
  );
};
