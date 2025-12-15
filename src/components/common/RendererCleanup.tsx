import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';

export function RendererCleanup() {
  const { gl } = useThree();
  useEffect(() => {
    return () => {
      gl.dispose();
    };
  }, [gl]);
  return null;
}
