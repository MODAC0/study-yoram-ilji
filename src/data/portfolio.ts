// 포트폴리오 카테고리 타입
export type PortfolioCategory = 'development' | 'design';

// 공통 포트폴리오 베이스 타입
interface PortfolioBase {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  period: string;
  role: string;
  images: string[];
  color: string;
  thumbnail: string;
  category: PortfolioCategory;
}

// 기술 과제 타입
export interface TechnicalChallenge {
  challenge: string; // 기술 과제 설명
  solution: string; // 해결 방법
  codeSnippet?: string; // 코드 스니펫 (선택)
}

// 개발 프로세스 타입 (문제 발견 → 기능 분류 → 기술과제 → 성과)
export interface DevelopmentProcess {
  // 1단계: 요구사항 분석 / 문제 발견
  problemDiscovery: {
    background: string; // 프로젝트 배경
    problems: string[]; // 발견된 문제점들
  };
  // 2단계: 기능/비기능 요구사항 분류
  requirements: {
    functional: string[]; // 기능적 요구사항
    nonFunctional: string[]; // 비기능적 요구사항 (성능, 보안, 확장성 등)
  };
  // 3단계: 기술 과제 구현
  technicalChallenges: TechnicalChallenge[];
  // 4단계: 성과 및 향상
  achievements: {
    metrics?: string[]; // 정량적 성과 (성능 개선율, 사용자 증가 등)
    qualitative?: string[]; // 정성적 성과 (코드 품질, 유지보수성 등)
    learnings?: string[]; // 배운 점
  };
}

// 개발 포트폴리오 타입
export interface DevelopmentPortfolio extends PortfolioBase {
  category: 'development';
  team?: string;
  techStack: string[];
  features: string[];
  process?: DevelopmentProcess; // 개발 프로세스 (선택)
  links?: {
    github?: string;
    live?: string;
    appStore?: string;
    playStore?: string;
  };
}

// 디자인 포트폴리오 타입
export interface DesignPortfolio extends PortfolioBase {
  category: 'design';
  tools: string[]; // Figma, Photoshop 등
  type: string; // UI/UX, 그래픽, 브랜딩 등
}

// 통합 타입
export type PortfolioProject = DevelopmentPortfolio | DesignPortfolio;

// 타입 가드
export function isDevelopmentPortfolio(
  project: PortfolioProject,
): project is DevelopmentPortfolio {
  return project.category === 'development';
}

export function isDesignPortfolio(
  project: PortfolioProject,
): project is DesignPortfolio {
  return project.category === 'design';
}

const DESIGN_PORTFOLIOS: DesignPortfolio[] = [
  // 디자인 포트폴리오
  {
    id: 'anneklein',
    category: 'design',
    title: 'ANNE KLEIN Promotion',
    subtitle: '앤클라인 프로모션 페이지 디자인',
    description:
      '2021 시즌의 룩북 촬영을 보조하고 선별된 컷을 활용하여 프로모션 페이지를 디자인했습니다. 세련된 비주얼과 셀링 포인트를 강조하여 브랜드 인지도를 높였습니다.',
    period: '2021',
    role: '웹 디자인',
    type: 'Promotion Design',
    tools: ['Figma', 'Adobe Photoshop'],
    images: Array.from(
      { length: 3 },
      (_, i) => `/portfolio/anneklein/${i + 1}.webp`,
    ),
    color: '#6B6B6B',
    thumbnail: '/portfolio/anneklein/1.webp',
  },
  {
    id: 'youandus',
    category: 'design',
    title: 'YOUANDUS',
    subtitle: '하이엔드 인테리어 큐레이션 브랜드 웹사이트',
    description:
      '30여 년의 노하우를 바탕으로 패브릭, 카펫, 바닥재, 벽 마감재, 주방, 가구에 이르기까지 하이엔드 공간을 위한 토탈 큐레이션 브랜드의 웹사이트 디자인입니다. 세련된 비주얼과 직관적인 네비게이션으로 브랜드 아이덴티티를 효과적으로 전달합니다.',
    period: '2021',
    role: '웹 디자인',
    type: 'UI&UX Design',
    tools: ['Figma', 'Adobe Photoshop'],
    images: Array.from(
      { length: 25 },
      (_, i) => `/portfolio/youandus/${i + 1}.webp`,
    ),
    color: '#F5D5D5',
    thumbnail: '/portfolio/youandus/1.webp',
  },
  {
    id: 'ottogimall',
    category: 'design',
    title: 'Ottogi Mall',
    subtitle: '오뚜기 이커머스 웹사이트 리뉴얼 프로젝트',
    description:
      '사용자 경험을 중심으로 한 직관적인 UI/UX 개선과 브랜드 아이덴티티를 살린 현대적인 디자인 시스템 구축을 통한 이커머스 웹사이트 리뉴얼 프로젝트입니다.',
    period: '2022',
    role: '웹 디자인',
    type: 'UI&UX Design',
    tools: ['Figma', 'Adobe Photoshop'],
    images: Array.from(
      { length: 3 },
      (_, i) => `/portfolio/ottogimall/${i + 1}.webp`,
    ),
    color: '#D4C4B0',
    thumbnail: '/portfolio/ottogimall/1.webp',
  },
];

const DEVELOPMENT_PORTFOLIOS: DevelopmentPortfolio[] = [
  {
    id: 'aresa-app',
    category: 'development',
    title: 'ARESA Mobile App',
    subtitle: '부동산 도메인 하이브리드 앱',
    description:
      '주거형 부동산 데이터를 기반으로 전세안전진단 서비스를 제공하는 하이브리드 모바일 애플리케이션입니다.',
    period: '2023.06 - 2024.02',
    role: '프론트엔드 개발',
    team: '4인',
    techStack: [
      'Angular 16',
      'Ionic 7',
      'Capacitor',
      'TypeScript',
      'Tailwind CSS',
      'Naver Maps API',
      'amCharts 5',
      'Chart.js',
      'NGXS',
    ],
    features: [
      '실시간 부동산 데이터 모니터링 대시보드',
      'Naver Maps API 기반 부동산 위치 시각화 및 클러스터링',
      'amCharts를 활용한 데이터 트렌드 차트',
      'SSE(Server-Sent Events) 실시간 데이터 스트리밍',
      'PWA 지원 및 오프라인 기능',
      'iOS/Android 네이티브 앱 배포',
    ],
    process: {
      problemDiscovery: {
        background:
          '부동산 도메인에서 수집되는 대량의 부동산 데이터를 사용자가 직관적으로 확인하고 관리할 수 있는 모바일 플랫폼이 필요했습니다.',
        problems: [
          '수천 개의 부동산 데이터를 지도에 표시할 때 렌더링 성능 저하',
          '실시간 데이터 업데이트 시 UI 깜빡임 및 불필요한 리렌더링',
          '대용량 시계열 데이터 차트의 메모리 누수 문제',
          '오프라인 환경에서 앱 사용 불가',
        ],
      },
      requirements: {
        functional: [
          '실시간 부동산 데이터 모니터링',
          '지도 기반 부동산 위치 시각화 및 상세 정보 조회',
          '기간별 데이터 트렌드 차트 및 통계',
          '알림 설정 및 푸시 알림',
          '부동산 그룹 관리 및 즐겨찾기',
        ],
        nonFunctional: [
          '1,000개 이상 부동산 마커의 부드러운 지도 렌더링',
          '데이터 업데이트 지연 시간 1초 이내',
          '오프라인 모드 지원 (PWA)',
          'iOS/Android 네이티브 앱 배포',
        ],
      },
      technicalChallenges: [
        {
          challenge:
            '수천 개의 부동산 마커를 지도에 표시할 때 심각한 성능 저하 발생',
          solution:
            'Naver Maps API 클러스터링 기능을 도입하여 줌 레벨에 따른 동적 클러스터링 구현. 뷰포트 기반 가상화로 화면에 보이는 마커만 렌더링하여 초기 로딩 시간 80% 단축',
        },
        {
          challenge:
            'SSE 실시간 데이터 수신 시 Angular 변화 감지로 인한 성능 저하',
          solution:
            'NgZone.runOutsideAngular()로 SSE 이벤트를 Zone 외부에서 처리하고, 필요한 경우에만 ChangeDetectorRef.detectChanges()로 수동 업데이트. OnPush 전략과 결합하여 불필요한 렌더링 90% 감소',
        },
        {
          challenge:
            'amCharts 차트에서 대용량 시계열 데이터 렌더링 시 메모리 누수',
          solution:
            '차트 컴포넌트 destroy 시 dispose() 메서드 호출 및 이벤트 리스너 정리. 데이터 포인트 다운샘플링 알고리즘 적용으로 렌더링 데이터 수 최적화',
        },
      ],
      achievements: {
        metrics: [
          '지도 초기 로딩 시간 3초 → 0.6초 (80% 개선)',
          '실시간 데이터 업데이트 렌더링 최적화로 CPU 사용량 60% 감소',
          '메모리 사용량 40% 절감',
          'Lighthouse 성능 점수 45점 → 89점',
        ],
        qualitative: [
          'NGXS 상태 관리 도입으로 복잡한 데이터 흐름 단순화',
          'Capacitor 활용 iOS/Android 동시 배포 파이프라인 구축',
          'PWA 서비스 워커로 오프라인 캐싱 전략 수립',
        ],
        learnings: [
          'Angular Zone 메커니즘과 변화 감지 전략의 깊은 이해',
          '실시간 데이터 처리 시 성능 최적화 패턴 습득',
          '하이브리드 앱 개발 및 네이티브 기능 연동 경험',
        ],
      },
    },
    links: {},
    images: Array.from(
      { length: 5 },
      (_, i) => `/portfolio/aresa-app/${i + 1}.png`,
    ),
    color: '#4F46E5',
    thumbnail: '/portfolio/aresa-app/1.png',
  },
  // {
  //   id: 'aresa-homepage',
  //   category: 'development',
  //   title: 'ARESA Homepage',
  //   subtitle: '기업 홈페이지 및 제품 소개 웹사이트',
  //   description:
  //     'ARESA 기업의 브랜드 아이덴티티를 담은 반응형 홈페이지입니다. AOS 스크롤 애니메이션과 Swiper 슬라이더를 활용해 인터랙티브한 사용자 경험을 제공합니다.',
  //   period: '2023.11 - 2024.01',
  //   role: '프론트엔드 개발',
  //   team: '2인',
  //   techStack: [
  //     'Next.js 14',
  //     'React 18',
  //     'TypeScript',
  //     'Tailwind CSS',
  //     'SASS',
  //     'Swiper',
  //     'AOS',
  //   ],
  //   features: [
  //     '반응형 기업 홈페이지 구현',
  //     'AOS 라이브러리 활용 스크롤 애니메이션',
  //     'Swiper 기반 제품 슬라이더',
  //     'Next.js Image 최적화',
  //     'SEO 최적화 및 메타태그 관리',
  //   ],
  //   process: {
  //     problemDiscovery: {
  //       background:
  //         'IoT 환경 모니터링 솔루션을 제공하는 ARESA의 브랜드 가치와 제품을 효과적으로 전달할 수 있는 기업 홈페이지가 필요했습니다.',
  //       problems: [
  //         '기존 홈페이지의 느린 로딩 속도와 낮은 SEO 점수',
  //         '모바일 환경에서의 불편한 사용자 경험',
  //         '이미지 최적화 부재로 인한 데이터 낭비',
  //         '정적인 페이지로 인한 낮은 사용자 체류 시간',
  //       ],
  //     },
  //     requirements: {
  //       functional: [
  //         '회사 소개 및 비전 페이지',
  //         '제품 라인업 소개 및 상세 스펙',
  //         '뉴스/공지사항 섹션',
  //         '문의하기 폼 및 위치 안내',
  //       ],
  //       nonFunctional: [
  //         'First Contentful Paint 1.5초 이내',
  //         'Google SEO 점수 90점 이상',
  //         '모든 디바이스에서 일관된 UX 제공',
  //         '이미지 로딩 최적화',
  //       ],
  //     },
  //     technicalChallenges: [
  //       {
  //         challenge: '대용량 제품 이미지로 인한 초기 로딩 지연',
  //         solution:
  //           'Next.js Image 컴포넌트와 next/image의 자동 최적화 기능 활용. WebP 포맷 자동 변환, 반응형 이미지 srcset 생성, lazy loading으로 초기 로딩 시간 70% 단축',
  //       },
  //       {
  //         challenge: '스크롤 애니메이션의 부드러운 동작과 성능 균형',
  //         solution:
  //           'AOS 라이브러리의 throttle 옵션 조정 및 will-change CSS 속성 활용. Intersection Observer 기반으로 뷰포트 진입 시에만 애니메이션 트리거',
  //       },
  //     ],
  //     achievements: {
  //       metrics: [
  //         'Lighthouse 성능 점수 94점 달성',
  //         'First Contentful Paint 1.2초',
  //         'SEO 점수 100점',
  //         '평균 페이지 체류 시간 2분 30초 (기존 대비 150% 증가)',
  //       ],
  //       qualitative: [
  //         'Next.js App Router 기반 SEO 최적화 전략 수립',
  //         'SASS 모듈 시스템을 활용한 스타일 구조화',
  //         'Swiper 커스터마이징으로 브랜드에 맞는 슬라이더 구현',
  //       ],
  //       learnings: [
  //         'Next.js 14 App Router와 서버 컴포넌트 활용법',
  //         '기업 홈페이지의 SEO 최적화 베스트 프랙티스',
  //         '스크롤 기반 애니메이션 성능 최적화 기법',
  //       ],
  //     },
  //   },
  //   links: {},
  //   images: Array.from(
  //     { length: 5 },
  //     (_, i) => `/portfolio/aresa-homepage/${i + 1}.png`,
  //   ),
  //   color: '#0EA5E9',
  //   thumbnail: '/portfolio/aresa-homepage/1.png',
  // },
  // {
  //   id: 'bioroom-client',
  //   category: 'development',
  //   title: 'Bioroom Client',
  //   subtitle: '바이오룸 서비스 클라이언트 웹 애플리케이션',
  //   description:
  //     '바이오룸 서비스의 클라이언트 웹 애플리케이션으로, 네이버 지도 API를 활용한 위치 기반 서비스와 react-hook-form을 통한 폼 관리 기능을 제공합니다.',
  //   period: '2024.04 - 2024.06',
  //   role: '프론트엔드 개발',
  //   team: '3인',
  //   techStack: [
  //     'Next.js 14',
  //     'React 18',
  //     'TypeScript',
  //     'Tailwind CSS',
  //     'Naver Maps API',
  //     'react-hook-form',
  //     'SWR',
  //     'Swiper',
  //     'EmailJS',
  //   ],
  //   features: [
  //     '네이버 지도 API 연동 및 위치 기반 검색',
  //     'react-hook-form 기반 폼 유효성 검사',
  //     'SWR을 활용한 데이터 페칭 및 캐싱',
  //     '반응형 UI 및 모바일 최적화',
  //     'EmailJS 이메일 발송 기능',
  //   ],
  //   process: {
  //     problemDiscovery: {
  //       background:
  //         '바이오룸 서비스 이용자들이 주변 시설을 쉽게 찾고 예약할 수 있는 위치 기반 웹 서비스가 필요했습니다.',
  //       problems: [
  //         '복잡한 예약 폼으로 인한 높은 이탈률',
  //         '위치 기반 검색 시 지도 로딩 지연',
  //         '서버 데이터 변경 시 UI 동기화 문제',
  //         '모바일 환경에서의 지도 조작 불편',
  //       ],
  //     },
  //     requirements: {
  //       functional: [
  //         '네이버 지도 기반 시설 위치 표시 및 검색',
  //         '예약 문의 폼 및 유효성 검사',
  //         '시설 상세 정보 및 이미지 갤러리',
  //         '이메일 문의 발송 기능',
  //       ],
  //       nonFunctional: [
  //         '지도 초기 로딩 2초 이내',
  //         '폼 입력 시 실시간 유효성 검사 피드백',
  //         '모바일 터치 제스처 최적화',
  //         '데이터 캐싱으로 재방문 시 즉시 로딩',
  //       ],
  //     },
  //     technicalChallenges: [
  //       {
  //         challenge: '네이버 지도 API의 복잡한 초기화 및 React 생명주기 충돌',
  //         solution:
  //           '@naver-maps/react 라이브러리와 useEffect를 활용한 지도 인스턴스 관리. 클린업 함수에서 이벤트 리스너 제거 및 메모리 해제 처리',
  //       },
  //       {
  //         challenge: '복잡한 예약 폼의 상태 관리 및 유효성 검사',
  //         solution:
  //           'react-hook-form의 register와 watch를 활용한 선언적 폼 관리. Zod 스키마 연동으로 타입 안전한 유효성 검사 구현',
  //       },
  //       {
  //         challenge: '서버 상태와 클라이언트 캐시 동기화',
  //         solution:
  //           'SWR의 mutate와 revalidate 전략으로 optimistic update 구현. stale-while-revalidate 패턴으로 UX 개선',
  //       },
  //     ],
  //     achievements: {
  //       metrics: [
  //         '예약 폼 이탈률 35% → 15% (57% 감소)',
  //         '지도 초기 로딩 1.5초 달성',
  //         '재방문자 페이지 로딩 시간 80% 단축',
  //         '모바일 사용자 만족도 4.2/5.0',
  //       ],
  //       qualitative: [
  //         'SWR 기반 데이터 페칭 아키텍처 정립',
  //         '네이버 지도 API 활용 노하우 축적',
  //         'react-hook-form을 활용한 복잡한 폼 패턴 정립',
  //       ],
  //       learnings: [
  //         'SWR의 캐싱 전략과 revalidation 메커니즘 이해',
  //         '외부 지도 API와 React의 효과적인 통합 방법',
  //         '폼 라이브러리 선택 기준과 적용 패턴',
  //       ],
  //     },
  //   },
  //   links: {},
  //   images: [],
  //   color: '#10B981',
  //   thumbnail: '/portfolio/youandus/1.webp',
  // },
  // {
  //   id: 'agency-nangman',
  //   category: 'development',
  //   title: 'Agency Nangman',
  //   subtitle: '크리에이티브 에이전시 포트폴리오 웹사이트',
  //   description:
  //     'Three.js와 OGL을 활용한 3D 인터랙티브 요소와 Typed.js 타이핑 애니메이션이 적용된 크리에이티브 에이전시 웹사이트입니다. 시각적으로 인상적인 사용자 경험을 제공합니다.',
  //   period: '2024.02 - 2024.04',
  //   role: '프론트엔드 개발',
  //   team: '2인',
  //   techStack: [
  //     'Next.js 14',
  //     'React 18',
  //     'TypeScript',
  //     'Tailwind CSS',
  //     'Three.js',
  //     'OGL',
  //     'Typed.js',
  //     'AOS',
  //     'SASS',
  //     'Swiper',
  //   ],
  //   features: [
  //     'Three.js/OGL 기반 3D 인터랙티브 배경',
  //     'Typed.js 타이핑 애니메이션 효과',
  //     'AOS 스크롤 트리거 애니메이션',
  //     '포트폴리오 갤러리 및 필터링',
  //     '문의 폼 및 이메일 발송',
  //   ],
  //   process: {
  //     problemDiscovery: {
  //       background:
  //         '크리에이티브 에이전시의 독창성과 기술력을 보여줄 수 있는 인터랙티브 포트폴리오 웹사이트가 필요했습니다.',
  //       problems: [
  //         '일반적인 정적 포트폴리오로는 에이전시의 창의성 표현 한계',
  //         '3D 그래픽 사용 시 저사양 디바이스에서의 성능 저하',
  //         '모바일 환경에서 3D 인터랙션 제한',
  //         '포트폴리오 필터링 시 페이지 새로고침으로 인한 UX 저하',
  //       ],
  //     },
  //     requirements: {
  //       functional: [
  //         '3D 인터랙티브 히어로 섹션',
  //         '카테고리별 포트폴리오 필터링',
  //         '프로젝트 상세 페이지 및 갤러리',
  //         '타이핑 애니메이션 효과',
  //         '문의 폼 이메일 발송',
  //       ],
  //       nonFunctional: [
  //         '저사양 디바이스에서도 30fps 이상 유지',
  //         '모바일에서 대체 애니메이션 제공',
  //         'URL 기반 필터 상태 유지',
  //         'Core Web Vitals 기준 충족',
  //       ],
  //     },
  //     technicalChallenges: [
  //       {
  //         challenge: 'Three.js/OGL 3D 렌더링의 저사양 디바이스 성능 문제',
  //         solution:
  //           'GPU 성능 감지 로직으로 디바이스별 렌더링 품질 자동 조절. requestAnimationFrame 최적화 및 불필요한 렌더링 스킵. 모바일에서는 CSS 기반 대체 애니메이션 제공',
  //       },
  //       {
  //         challenge: 'React 환경에서 Three.js 인스턴스 메모리 관리',
  //         solution:
  //           'useEffect 클린업에서 geometry, material, texture dispose 처리. React 18 Strict Mode 대응을 위한 렌더러 재사용 패턴 적용',
  //       },
  //       {
  //         challenge: 'URL 상태와 필터 UI 동기화',
  //         solution:
  //           'Next.js useSearchParams와 useRouter를 활용한 URL 기반 상태 관리. shallow routing으로 페이지 새로고침 없이 필터 상태 변경',
  //       },
  //     ],
  //     achievements: {
  //       metrics: [
  //         '평균 세션 시간 3분 45초 (업계 평균 대비 200% 증가)',
  //         '문의 전환율 8.5%',
  //         '저사양 디바이스에서도 45fps 유지',
  //         'Lighthouse 성능 점수 87점',
  //       ],
  //       qualitative: [
  //         'Three.js/OGL 기반 3D 웹 개발 역량 확보',
  //         '디바이스별 성능 최적화 전략 수립',
  //         '크리에이티브 웹사이트 제작 경험',
  //       ],
  //       learnings: [
  //         'WebGL 기반 3D 그래픽 프로그래밍 기초',
  //         '성능 프로파일링 및 최적화 기법',
  //         'CSS/JS 애니메이션 조합 전략',
  //       ],
  //     },
  //   },
  //   links: {},
  //   images: [],
  //   color: '#8B5CF6',
  //   thumbnail: '/portfolio/youandus/1.webp',
  // },
  // {
  //   id: 'admin-dashboard',
  //   category: 'development',
  //   title: 'Admin Dashboard',
  //   subtitle: 'Angular Material 기반 관리자 대시보드',
  //   description:
  //     'Angular 17과 Material Design을 활용한 관리자 대시보드입니다. NGXS 상태 관리와 ngx-editor 리치 텍스트 에디터를 적용하여 효율적인 콘텐츠 관리 기능을 제공합니다.',
  //   period: '2023.12 - 2024.02',
  //   role: '프론트엔드 개발',
  //   team: '2인',
  //   techStack: [
  //     'Angular 17',
  //     'TypeScript',
  //     'Angular Material',
  //     'Tailwind CSS',
  //     'NGXS',
  //     'ngx-editor',
  //     'RxJS',
  //   ],
  //   features: [
  //     'Angular Material 기반 UI 컴포넌트',
  //     'NGXS 전역 상태 관리',
  //     '리치 텍스트 에디터 콘텐츠 관리',
  //     '사용자 권한 관리',
  //     '대시보드 통계 시각화',
  //   ],
  //   process: {
  //     problemDiscovery: {
  //       background:
  //         '여러 서비스의 콘텐츠와 사용자를 통합 관리할 수 있는 관리자 대시보드가 필요했습니다.',
  //       problems: [
  //         '기존 관리 도구의 분산으로 운영 효율성 저하',
  //         '복잡한 권한 체계로 인한 접근 제어 어려움',
  //         '콘텐츠 편집 시 HTML 직접 작성 필요',
  //         '여러 화면 간 상태 공유 문제',
  //       ],
  //     },
  //     requirements: {
  //       functional: [
  //         '사용자 계정 및 권한 관리 (CRUD)',
  //         '콘텐츠 관리 (리치 텍스트 에디터)',
  //         '대시보드 통계 및 차트',
  //         '알림 및 공지사항 관리',
  //         '시스템 설정 관리',
  //       ],
  //       nonFunctional: [
  //         '역할 기반 접근 제어 (RBAC)',
  //         '일관된 UI/UX (Material Design)',
  //         '복잡한 폼의 상태 관리',
  //         '실시간 데이터 동기화',
  //       ],
  //     },
  //     technicalChallenges: [
  //       {
  //         challenge: '여러 모듈 간 복잡한 상태 공유 및 동기화',
  //         solution:
  //           'NGXS 상태 관리 라이브러리 도입. Feature State 패턴으로 모듈별 상태 분리 및 Selector 메모이제이션으로 렌더링 최적화',
  //       },
  //       {
  //         challenge: '역할 기반 접근 제어(RBAC) 구현의 복잡성',
  //         solution:
  //           'Angular Guard와 Directive를 조합한 선언적 권한 체크. NGXS에서 사용자 권한 상태 관리 및 API 요청 시 인터셉터에서 권한 검증',
  //       },
  //       {
  //         challenge: 'ngx-editor 커스터마이징 및 이미지 업로드 처리',
  //         solution:
  //           '커스텀 플러그인 개발로 이미지 드래그앤드롭 업로드 구현. Base64 인라인 대신 서버 업로드 후 URL 삽입 방식으로 문서 크기 최적화',
  //       },
  //     ],
  //     achievements: {
  //       metrics: [
  //         '관리자 작업 처리 시간 40% 단축',
  //         '콘텐츠 발행 오류율 80% 감소',
  //         '신규 관리자 온보딩 시간 50% 단축',
  //       ],
  //       qualitative: [
  //         'NGXS 기반 상태 관리 아키텍처 정립',
  //         'Angular Material 커스터마이징 노하우 축적',
  //         '재사용 가능한 관리자 UI 컴포넌트 라이브러리화',
  //       ],
  //       learnings: [
  //         'Angular 17 Standalone Component 패턴',
  //         'NGXS의 Action, State, Selector 패턴 심화',
  //         'RxJS 연산자를 활용한 복잡한 비동기 흐름 처리',
  //       ],
  //     },
  //   },
  //   links: {},
  //   images: [],
  //   color: '#DD0031',
  //   thumbnail: '/portfolio/youandus/1.webp',
  // },
  // {
  //   id: 'odocs-system',
  //   category: 'development',
  //   title: 'ODocs System',
  //   subtitle: '문서 관리 시스템',
  //   description:
  //     'Angular 17 기반의 문서 관리 시스템으로, ngx-editor 리치 텍스트 에디터와 NGXS 상태 관리를 활용하여 효율적인 문서 작성 및 관리 기능을 제공합니다.',
  //   period: '2024.01 - 2024.03',
  //   role: '프론트엔드 개발',
  //   team: '3인',
  //   techStack: [
  //     'Angular 17',
  //     'TypeScript',
  //     'Tailwind CSS',
  //     'NGXS',
  //     'ngx-editor',
  //     'Axios',
  //     'DayJS',
  //   ],
  //   features: [
  //     '리치 텍스트 에디터 기반 문서 작성',
  //     '문서 버전 관리 및 히스토리',
  //     '실시간 자동 저장',
  //     '문서 검색 및 필터링',
  //     '사용자 권한별 접근 제어',
  //   ],
  //   process: {
  //     problemDiscovery: {
  //       background:
  //         '팀 내 문서 작성 및 공유를 위한 체계적인 문서 관리 시스템이 필요했습니다.',
  //       problems: [
  //         '문서 작성 중 브라우저 종료 시 내용 유실',
  //         '동시 편집 시 충돌 및 덮어쓰기 문제',
  //         '문서 변경 이력 추적 불가',
  //         '검색 기능 부재로 원하는 문서 찾기 어려움',
  //       ],
  //     },
  //     requirements: {
  //       functional: [
  //         '리치 텍스트 에디터 기반 문서 작성/편집',
  //         '문서 버전 관리 및 변경 이력 조회',
  //         '자동 저장 및 임시 저장',
  //         '전문 검색 및 태그 기반 필터링',
  //         '문서 공유 및 권한 설정',
  //       ],
  //       nonFunctional: [
  //         '자동 저장 주기 30초 이내',
  //         '동시 편집 충돌 방지',
  //         '대용량 문서(10MB+) 처리',
  //         '빠른 검색 응답 (500ms 이내)',
  //       ],
  //     },
  //     technicalChallenges: [
  //       {
  //         challenge: '문서 자동 저장 시 불필요한 API 호출과 서버 부하',
  //         solution:
  //           'RxJS debounceTime과 distinctUntilChanged 조합으로 변경 감지 최적화. 변경된 부분만 diff 계산하여 전송하는 incremental save 구현',
  //       },
  //       {
  //         challenge: '대용량 문서 렌더링 시 에디터 성능 저하',
  //         solution:
  //           'Virtual scrolling 적용 및 ngx-editor lazy loading 설정. 이미지는 thumbnail 미리보기 후 클릭 시 원본 로드',
  //       },
  //       {
  //         challenge: '문서 버전 관리 및 diff 시각화',
  //         solution:
  //           'Operational Transform 알고리즘 기반 버전 관리. diff-match-patch 라이브러리로 버전 간 변경사항 시각화',
  //       },
  //     ],
  //     achievements: {
  //       metrics: [
  //         '문서 유실 사고 0건 (자동 저장 도입 후)',
  //         '문서 검색 시간 평균 0.3초',
  //         '동시 편집 충돌 해결률 100%',
  //         '사용자 만족도 4.5/5.0',
  //       ],
  //       qualitative: [
  //         'RxJS 기반 실시간 데이터 처리 패턴 정립',
  //         '문서 에디터 커스터마이징 경험',
  //         '버전 관리 시스템 설계 역량 확보',
  //       ],
  //       learnings: [
  //         'RxJS 고급 연산자 활용법 (debounce, throttle, switchMap)',
  //         'Operational Transform 알고리즘의 이해',
  //         '대용량 텍스트 처리 최적화 기법',
  //       ],
  //     },
  //   },
  //   links: {},
  //   images: [],
  //   color: '#6366F1',
  //   thumbnail: '/portfolio/youandus/1.webp',
  // },
];

export const portfolioProjects: PortfolioProject[] = [
  ...DEVELOPMENT_PORTFOLIOS,
  ...DESIGN_PORTFOLIOS,
];

export function getPortfolioById(id: string): PortfolioProject | undefined {
  return portfolioProjects.find((project) => project.id === id);
}

export function getPortfoliosByCategory(
  category: PortfolioCategory,
): PortfolioProject[] {
  return portfolioProjects.filter((project) => project.category === category);
}

// 카테고리 라벨
export const categoryLabels: Record<PortfolioCategory, string> = {
  development: '개발',
  design: '디자인',
};
