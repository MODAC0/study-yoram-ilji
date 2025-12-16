"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

import { RendererCleanup } from "@/components/common/RendererCleanup";
import fragmentShader from "./fragmentShader.glsl";
import vertexShader from "./vertexShader.glsl";

// 섹션 정의
const SECTIONS = {
  TEXT_1: 0, // 화려함보다는 명확함을 - 퍼져있는 상태
  TEXT_2: 1, // 사용자 경험을 디자인합니다 - 중간 상태
  TEXT_3: 2, // 코드로 예술을 만들어냅니다 - 모인 상태
  BLOG: 3, // 블로그 섹션
  PORTFOLIO: 4, // 포트폴리오 - 구체
  CONTACT: 5, // Contact - 구체가 왼쪽으로
};

// 섹션별 스크롤 상태 계산
function useScrollState() {
  const [state, setState] = useState({
    scrollProgress: 0,
    section: 0,
    sectionProgress: 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const maxScroll = document.documentElement.scrollHeight - viewportHeight;

      const scrollProgress = maxScroll > 0 ? scrollY / maxScroll : 0;
      const scrollInSections = scrollY / viewportHeight;
      const section = Math.floor(scrollInSections);
      const sectionProgress = scrollInSections - section;

      setState({
        scrollProgress: Math.min(1, Math.max(0, scrollProgress)),
        section,
        sectionProgress,
      });
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

// 섹션별 3D 오브젝트 상태 계산
function useObjectState(section: number, sectionProgress: number) {
  // spread: 1 = 완전히 퍼짐, 0 = 모임
  // morph: 0 = blob (일렁임), 1 = 구체
  // scale: 오브젝트 크기
  // positionX: 오브젝트 X 위치

  const getState = () => {
    switch (section) {
      case SECTIONS.TEXT_1:
        // 텍스트 1: "화려함보다는 명확함을" - 퍼진 상태에서 시작
        return {
          spread: 1 - sectionProgress * 0.5, // 1.0 -> 0.5 (점점 모임)
          morph: 0,
          scale: 1.0,
          positionX: 0,
        };

      case SECTIONS.TEXT_2:
        // 텍스트 2: "사용자 경험을 디자인합니다" - 중간 상태
        return {
          spread: 0.8 - sectionProgress * 0.3, // 0.5 -> 0.2
          morph: 0,
          scale: 1.0,
          positionX: 0,
        };

      case SECTIONS.TEXT_3:
        // 텍스트 3: "코드로 예술을 만들어냅니다" - 완전히 모인 상태
        return {
          spread: 0.4 - sectionProgress * 0.2, // 0.2 -> 0
          morph: 0,
          scale: 1.1,
          positionX: 0,
        };

      case SECTIONS.BLOG:
        // 블로그: 모인 상태 유지, 왼쪽으로 이동
        const blogX = -2 + sectionProgress * 3;
        return {
          spread: 0.2 - sectionProgress * 0.2, // 0.2 -> 0,
          morph: sectionProgress * 0.5, // 구체화 시작
          scale: 1.2,
          positionX: blogX,
        };

      case SECTIONS.PORTFOLIO:
        // 포트폴리오: 구체로 변환, 왼쪽에 유지
        return {
          spread: 0,
          morph: 0.5 + sectionProgress * 0.5, // 0.5 -> 1.0 (완전한 구체)
          scale: 1.1,
          positionX: -0.1, // 왼쪽에 고정
        };

      case SECTIONS.CONTACT:
      default:
        return {
          spread: 0,
          morph: 1, // 완전한 구체
          scale: 1.0,
          positionX: 0,
        };
    }
  };

  return getState();
}

export default function BubbleModelScene() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { scrollProgress, section, sectionProgress } = useScrollState();
  const objectState = useObjectState(section, sectionProgress);

  useEffect(() => {
    setMounted(true);
  }, []);

  const saturation = mounted && theme === "dark" ? 0.4 : 0.7;
  const lightness = mounted && theme === "dark" ? 0.3 : 0.5;

  // 텍스트 섹션에서만 텍스트 오버레이 표시 (섹션 0-2)
  const showTextOverlay = section <= SECTIONS.TEXT_3;

  return (
    <div className="w-full h-full fixed top-0 left-0 right-0 bottom-0 pointer-events-none">
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        style={{ width: "100%", height: "100vh" }}
      >
        <ambientLight intensity={0.5} />
        <CameraController
          scrollProgress={scrollProgress}
          section={section}
          objectPositionX={objectState.positionX}
        />
        <ResponsiveParticles
          saturation={saturation}
          lightness={lightness}
          spread={objectState.spread}
          morph={objectState.morph}
          objectScale={objectState.scale}
          positionX={objectState.positionX}
        />
        <RendererCleanup />
      </Canvas>

      {/* 텍스트 오버레이 - 텍스트 섹션에서만 표시 */}
      {showTextOverlay && (
        <TextOverlay section={section} sectionProgress={sectionProgress} />
      )}

      {/* 스크롤 힌트 - 첫 번째 섹션에서만 표시 */}
      {section === 0 && (
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-500"
          style={{ opacity: 1 - sectionProgress * 2 }}
        >
          <span className="text-sm text-dark-400 dark:text-light-500">
            Scroll to explore
          </span>
          <div className="w-6 h-10 rounded-full border-2 border-dark-300 dark:border-light-500 flex justify-center pt-2">
            <div className="w-1.5 h-3 rounded-full bg-dark-400 dark:bg-light-400 animate-bounce" />
          </div>
        </div>
      )}
    </div>
  );
}

// 스크롤에 따라 카메라를 움직이는 컴포넌트
const CameraController = ({
  scrollProgress,
  section,
  objectPositionX,
}: {
  scrollProgress: number;
  section: number;
  objectPositionX: number;
}) => {
  const { camera } = useThree();
  const targetRef = useRef({ x: 0, y: 0, z: 4 });
  const lookAtRef = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    let targetX = 0;
    let targetY = 0;
    let targetZ = 4;
    let lookAtX = objectPositionX;

    if (section <= SECTIONS.TEXT_3) {
      // 텍스트 섹션: 정면에서 약간씩 회전
      const angle = scrollProgress * Math.PI * 0.5;
      targetX = Math.sin(angle) * 0.5;
      targetY = Math.cos(angle) * 0.3;
      targetZ = 4;
      lookAtX = 0;
    } else if (section === SECTIONS.BLOG) {
      // 블로그: 살짝 왼쪽에서 봄 (오른쪽으로 간 오브젝트를 보기 위해)
      targetX = -0.5;
      targetY = 0;
      targetZ = 4;
    } else if (section === SECTIONS.PORTFOLIO) {
      // 포트폴리오: 정면
      targetX = 0;
      targetY = 0;
      targetZ = 4;
      lookAtX = 0;
    } else {
      // Contact: 살짝 왼쪽에서 봄 (오른쪽에 있는 구체를 보기 위해)
      targetX = -1;
      targetY = 0;
      targetZ = 4;
    }

    targetRef.current = { x: targetX, y: targetY, z: targetZ };

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

    // 오브젝트 위치를 바라보도록
    lookAtRef.current.x = THREE.MathUtils.lerp(
      lookAtRef.current.x,
      lookAtX,
      0.05
    );
    camera.lookAt(lookAtRef.current);
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
          key={index + 1}
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

interface ResponsiveParticlesProps {
  saturation: number;
  lightness: number;
  spread: number;
  morph: number;
  objectScale: number;
  positionX: number;
}

const ResponsiveParticles = (props: ResponsiveParticlesProps) => {
  const { viewport } = useThree();
  const baseScale = Math.max(0.5, viewport.width / 6);

  return (
    <CustomGeometryParticles
      saturation={props.saturation}
      lightness={props.lightness}
      scale={baseScale * props.objectScale}
      spread={props.spread}
      morph={props.morph}
      positionX={props.positionX}
    />
  );
};

interface CustomGeometryParticlesProps {
  saturation: number;
  lightness: number;
  scale: number;
  spread: number;
  morph: number;
  positionX: number;
}

const CustomGeometryParticles = ({
  saturation,
  lightness,
  scale,
  spread,
  morph,
  positionX,
}: CustomGeometryParticlesProps) => {
  const points = useRef<THREE.Points>(null!);
  const initialCount = 20000;
  const count = Math.floor(initialCount * Math.max(0.5, scale));

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
      uTime: { value: 0.0 },
      uSaturation: { value: saturation },
      uLightness: { value: lightness },
      uOpacity: { value: 1.0 },
      uMorph: { value: morph },
      uSpread: { value: spread },
      uPositionOffset: { value: new THREE.Vector3(positionX, 0, 0) },
    }),
    []
  );

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.elapsedTime;
    uniforms.uSaturation.value = saturation;
    uniforms.uLightness.value = lightness;
    uniforms.uMorph.value = THREE.MathUtils.lerp(
      uniforms.uMorph.value,
      morph,
      0.05
    );
    uniforms.uSpread.value = THREE.MathUtils.lerp(
      uniforms.uSpread.value,
      spread,
      0.05
    );
    uniforms.uPositionOffset.value.x = THREE.MathUtils.lerp(
      uniforms.uPositionOffset.value.x,
      positionX,
      0.05
    );
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
