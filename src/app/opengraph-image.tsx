import { siteConfig } from '@/lib/seo';
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = siteConfig.name;
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 64,
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontFamily: 'sans-serif',
      }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 24,
        }}>
        <span
          style={{
            fontSize: 80,
            fontWeight: 'bold',
            background: 'linear-gradient(90deg, #ff675b, #ff8f85)',
            backgroundClip: 'text',
            color: 'transparent',
          }}>
          {siteConfig.name}
        </span>
      </div>
      <div
        style={{
          fontSize: 28,
          color: '#a0a0a0',
          textAlign: 'center',
          maxWidth: 800,
          lineHeight: 1.5,
        }}>
        프론트엔드 개발자 포트폴리오 & 기술 블로그
      </div>
      <div
        style={{
          display: 'flex',
          gap: 16,
          marginTop: 40,
          fontSize: 20,
          color: '#ff675b',
        }}>
        <span>React</span>
        <span>•</span>
        <span>Next.js</span>
        <span>•</span>
        <span>TypeScript</span>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
