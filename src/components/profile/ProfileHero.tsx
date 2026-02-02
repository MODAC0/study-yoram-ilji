'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin } from 'lucide-react';
import { SphereModel } from '../common/SphereModel';

export function ProfileHero() {
  const email = process.env.GMAIL_USER;
  return (
    <div className="w-full bg-slate-50 dark:bg-dark-900 flex items-center justify-center">
      <div className="flex flex-col-reverse justify-between items-center max-w-6xl w-full">
        <div className="px-8 md:px-12 flex flex-col justify-center shrink flex-1">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}>
            <div className="text-center pb-6 mb-6 border-b border-slate-200 dark:border-slate-800">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
                JUNHEI KIM
              </h1>

              <p className="text-xl text-slate-500 dark:text-slate-400 *:font-medium">
                Frontend Developer
              </p>
            </div>
            <div className="space-y-4 mb-8">
              <p className="text-slate-600 dark:text-slate-300 leading-6">
                UI/UX 디자이너로 커리어를 시작했으나, 더 주도적으로 프로덕트의
                가치를 실현하고자 프론트엔드 개발자로 전향했습니다. 디자인
                시스템에 대한 깊은 이해와 꼼꼼한 UI 아키텍처 설계 능력은 협업
                과정에서 커뮤니케이션 비용을 줄이고 결과물의 퀄리티를 높이는
                저만의 무기입니다.
                <br />
                <br />
                첫 실무를 경험했던 프로젝트에서는 도전을 성과로 증명하는
                적응력을 보여주었습니다. 익숙한 React 대신 사내 기술 스택인
                Angular/Ionic을 빠르게 습득하여 부동산 앱의 핵심 기능(지도
                뷰포트 렌더링, 서버리스 DSR 계산기)을 고도화했습니다. 이후
                이직한 회사에서는 대규모 LMS 구축을 통해 대용량 데이터 처리
                경험을 쌓았고, 곧이어 AI 에이전트 SDK 개발이라는 새로운 미션에
                투입되었습니다.
                <br />
                <br />
                최근 5개월간은 LLM 백엔드와 통신하는 채팅 서비스와 3D 상품
                전시를 시각화(Three.js)하는 프로젝트를 전담했습니다. 생소한
                분야였지만 철저한 기술 검증과 목업 제작을 통해 AI 에이전트
                서비스를 성공적으로 구현했으며, Next.js 기반의 인증/결제
                시스템까지 붙여 실제 비즈니스 모델이 작동하는 데모를
                완성했습니다.
                <br />
                <br />
                변화하는 기술 파도 위에서도 중심을 잃지 않고, 사용자에게 최적의
                경험을 제공하는 서비스를 만드는 것이 저의 목표입니다. 어떤 기술
                스택 환경에서도 빠르게 적응하여 즉시 전력으로 기여하겠습니다.
              </p>

              <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <MapPin className="size-4" />
                  <span>Seoul, South Korea</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail className="size-4" />
                  <span>{email}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 오른쪽 - 원형 3D 모델 */}
        <div className="hidden md:flex items-center justify-center">
          <SphereModel className="w-full h-[200px]" />
        </div>
      </div>
    </div>
  );
}
