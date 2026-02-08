'use client';

import {
  DevelopmentPortfolio,
  getPortfoliosByCategory,
  isDevelopmentPortfolio,
} from '@/data/portfolio';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay, EffectFade, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

// 최신 개발 포트폴리오 최대 3개 가져오기
function getLatestDevelopmentPortfolios(): DevelopmentPortfolio[] {
  const devPortfolios = getPortfoliosByCategory('development').filter(
    isDevelopmentPortfolio,
  );

  return devPortfolios
    .sort((a, b) => {
      const dateA = a.period.split(' - ')[0] || a.period;
      const dateB = b.period.split(' - ')[0] || b.period;
      return dateB.localeCompare(dateA);
    })
    .slice(0, 3);
}

export default function DevelopmentHeroSection() {
  const portfolios = useMemo(() => getLatestDevelopmentPortfolios(), []);
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  if (portfolios.length === 0) {
    return null;
  }

  return (
    <div className="w-full h-full flex items-center justify-center relative z-10 pointer-events-auto px-6">
      <div className="max-w-7xl w-full">
        <div className="relative w-full aspect-video max-md:aspect-3/4 rounded-2xl overflow-hidden">
          <Swiper
            modules={[Autoplay, EffectFade, Navigation]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              prevEl: '.dev-swiper-prev',
              nextEl: '.dev-swiper-next',
            }}
            loop={portfolios.length > 1}
            speed={700}
            onSwiper={setSwiperInstance}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="w-full h-full">
            {portfolios.map((portfolio) => (
              <SwiperSlide key={portfolio.id}>
                <Link
                  href={`/portfolio/${portfolio.id}`}
                  className="w-full h-full group relative block overflow-hidden rounded-2xl">
                  <Image
                    src={portfolio.thumbnail}
                    alt={portfolio.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500 pointer-events-none"
                    priority
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />

                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
                    <div className="max-w-2xl text-left">
                      <div className="flex flex-col gap-2 mb-3">
                        <span className="text-light-100/70 text-sm w-fit">
                          {portfolio.period}
                        </span>
                      </div>
                      <h3 className="w-fit text-3xl md:text-4xl font-medium text-light-100 mb-2">
                        {portfolio.title}
                      </h3>
                      <p className="w-fit text-light-100/80 text-sm md:text-base mb-12">
                        {portfolio.subtitle}
                      </p>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {portfolios.length > 1 && (
            <>
              <button
                className="dev-swiper-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-litext-light-100/20 backdrop-blur-sm flex items-center justify-center text-light-100 hover:bg-litext-light-100/40 transition-colors"
                aria-label="이전">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                className="dev-swiper-next absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-litext-light-100/20 backdrop-blur-sm flex items-center justify-center text-light-100 hover:bg-litext-light-100/40 transition-colors"
                aria-label="다음">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}

          {portfolios.length > 1 && (
            <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 z-10 flex gap-2">
              {portfolios.map((_, index) => (
                <button
                  key={index}
                  onClick={() => swiperInstance?.slideToLoop(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'bg-litext-light-100 w-6'
                      : 'bg-litext-light-100/40 hover:bg-litext-light-100/60 w-2'
                  }`}
                  aria-label={`슬라이드 ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
