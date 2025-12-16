"use client";

import { useTheme } from "next-themes";
import { useCallback, useEffect, useRef, useState } from "react";

interface PointillismImageProps {
  src: string;
}

interface Dot {
  x: number;
  y: number;
  r: number;
  colorR: number;
  colorG: number;
  colorB: number;
  colorA: number;
  colorProgress: number;
}

export default function PointillismImage({ src }: PointillismImageProps) {
  const spacing = 3;
  const dotSize = 1;
  const mouseRadius = 120;

  const { resolvedTheme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // 테마에 따른 베이스 컬러
  const getBaseColor = useCallback(() => {
    return { r: 0x61, g: 0x61, b: 0x61 }; // #eee
  }, [resolvedTheme]);

  const initCanvas = useCallback(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight || containerWidth;

      const imgAspect = img.width / img.height;
      const containerAspect = containerWidth / containerHeight;

      let canvasWidth: number;
      let canvasHeight: number;
      let offsetX = 0;
      let offsetY = 0;

      if (containerAspect > imgAspect) {
        canvasHeight = containerHeight;
        canvasWidth = containerHeight * imgAspect;
        // offsetX = 0 유지 - 왼쪽 정렬
      } else {
        canvasWidth = containerWidth;
        canvasHeight = containerWidth / imgAspect;
        offsetY = (containerHeight - canvasHeight) / 2;
      }

      canvas.width = containerWidth;
      canvas.height = containerHeight;
      canvas.style.width = `${containerWidth}px`;
      canvas.style.height = `${containerHeight}px`;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = canvasWidth;
      tempCanvas.height = canvasHeight;
      const tempCtx = tempCanvas.getContext("2d");
      if (!tempCtx) return;

      tempCtx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
      const imageData = tempCtx.getImageData(0, 0, canvasWidth, canvasHeight);
      const data = imageData.data;

      const dots: Dot[] = [];

      for (let y = 0; y < canvasHeight; y += spacing) {
        for (let x = 0; x < canvasWidth; x += spacing) {
          const i =
            (Math.floor(y) * Math.floor(canvasWidth) + Math.floor(x)) * 4;
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];

          if (a < 128) continue;

          const brightness = (r + g + b) / 9;
          const radius = dotSize * (0.5 + (1 - brightness / 255) * 0.5);

          const posX = x + offsetX;
          const posY = y + offsetY;

          dots.push({
            x: posX,
            y: posY,
            r: radius,
            colorR: r,
            colorG: g,
            colorB: b,
            colorA: a / 255,
            colorProgress: 0,
          });
        }
      }

      dotsRef.current = dots;
      setIsLoaded(true);
    };

    img.src = src;
  }, [src, spacing, dotSize]);

  useEffect(() => {
    initCanvas();

    const handleResize = () => {
      initCanvas();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [initCanvas]);

  useEffect(() => {
    if (!isLoaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const colorFadeInSpeed = 0.2;
    const colorFadeOutSpeed = 0.05;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const dots = dotsRef.current;
      const mouse = mouseRef.current;
      const baseColor = getBaseColor();

      dots.forEach((dot) => {
        const dx = dot.x - mouse.x;
        const dy = dot.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // 마우스 반경 30px 내에 있으면 컬러로 전환
        if (distance < mouseRadius) {
          dot.colorProgress += (1 - dot.colorProgress) * colorFadeInSpeed;
          dot.colorProgress = Math.min(dot.colorProgress, 1);
        } else {
          dot.colorProgress -= colorFadeOutSpeed;
          dot.colorProgress = Math.max(dot.colorProgress, 0);
        }

        // 베이스 컬러와 원본 컬러 사이 보간
        const progress = dot.colorProgress;
        const displayR = Math.round(
          baseColor.r + (dot.colorR - baseColor.r) * progress
        );
        const displayG = Math.round(
          baseColor.g + (dot.colorG - baseColor.g) * progress
        );
        const displayB = Math.round(
          baseColor.b + (dot.colorB - baseColor.b) * progress
        );

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${displayR}, ${displayG}, ${displayB}, ${dot.colorA})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isLoaded, getBaseColor, mouseRadius]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: -1000, y: -1000 };
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      mouseRef.current = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    },
    []
  );

  const handleTouchEnd = useCallback(() => {
    mouseRef.current = { x: -1000, y: -1000 };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`absolute inset-0 transition-opacity duration-500 cursor-crosshair ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
