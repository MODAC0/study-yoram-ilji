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
  {
    id: 'andbag',
    category: 'design',
    title: 'ANDBAG',
    subtitle: '가방 수입 브랜드 통합 웹사이트',
    description:
      '다양한 가방 수입 브랜드를 카테고리화하고 체계적인 사이트맵을 설계한 신규 브랜드 웹사이트입니다. 호스팅 템플릿을 효과적으로 응용하여 비용 최적화와 안정성을 동시에 확보한 UI/UX 디자인 프로젝트입니다.',
    period: '2020.12 - 2021.03',
    role: 'UI/UX 디자인',
    type: 'UI&UX Design',
    tools: ['Figma', 'Adobe Photoshop'],
    images: Array.from(
      { length: 6 },
      (_, i) => `/portfolio/andbag/${i + 1}.webp`,
    ),
    color: '#2C2C2C',
    thumbnail: '/portfolio/andbag/thumbnail.webp',
  },
];

const DEVELOPMENT_PORTFOLIOS: DevelopmentPortfolio[] = [
  {
    id: 'kma-lms',
    category: 'development',
    title: 'KMA stud.io LMS',
    subtitle: '기업교육 학습관리시스템',
    description:
      'KMA stud.io는 한국능률협회의 기업교육 학습관리시스템(LMS)으로, 이러닝 콘텐츠, 라이브 강의, 자격인증 과정 등 다양한 교육 서비스를 제공하는 통합 플랫폼입니다. 사용자 웹과 관리자 페이지를 Monorepo 아키텍처로 구축하여 기업 임직원들에게 최적화된 학습 경험을 제공합니다.',
    period: '2024.01 - 2026.02',
    role: '프론트엔드 개발',
    team: '4인',
    techStack: [
      'Next.js 15',
      'React 18',
      'TypeScript 5',
      'Vite',
      'Turborepo',
      'TanStack Query v5',
      'Zustand v5',
      'Tailwind CSS',
      'Ant Design 5',
      'Emotion',
      'CKEditor 5',
      'HLS.js',
      'NextAuth',
      'Framer Motion',
      'MSW',
      'Playwright',
    ],
    features: [
      'HLS 기반 동영상 스트리밍 플레이어 (진도율 추적, 미리보기)',
      '나이스페이 결제 시스템 연동 (멤버십/과정 결제)',
      '교육담당자 대시보드 및 기업교육과정 관리',
      'AI 챗봇 시스템 (SSE 기반 실시간 응답)',
      '수료증/자격증 발급 및 인쇄 기능',
      'CKEditor 기반 콘텐츠 에디터 (이미지, 영상 임베드)',
      '회원/비회원/교담자 권한별 접근 제어',
      '반응형 웹앱 (모바일/태블릿/데스크톱)',
    ],
    process: {
      problemDiscovery: {
        background:
          '기업교육 시장에서 이러닝, 라이브 강의, 자격인증 과정 등 다양한 교육 콘텐츠를 통합 관리하고, 기업 고객과 개인 사용자 모두에게 최적화된 학습 경험을 제공하는 플랫폼이 필요했습니다. 또한 관리자가 콘텐츠, 회원, 결제를 효율적으로 관리할 수 있는 백오피스 시스템이 요구되었습니다.',
        problems: [
          '사용자/관리자 앱 간 코드 중복 및 일관성 유지 어려움',
          '복잡한 권한 체계(회원사/비회원사/교담자/일반사용자) 관리',
          '동영상 스트리밍 진도율 정확도 및 비정상 종료 시 데이터 손실',
          '다양한 결제 상태 및 멤버십 관리의 복잡성',
          '대용량 영상/첨부파일 업로드 시 타임아웃 및 UX 문제',
        ],
      },
      requirements: {
        functional: [
          '이러닝/라이브/자격인증 콘텐츠 학습 및 관리',
          'HLS 기반 동영상 플레이어 및 진도율 추적',
          '나이스페이 결제 연동 (카드/무통장입금)',
          '멤버십 구독 및 과정별 결제 시스템',
          '수료증/자격증 발급 및 인쇄',
          '교육담당자 전용 기업교육과정 관리',
          'AI 챗봇 기반 학습 지원',
          '공지사항/FAQ/1:1문의 시스템',
        ],
        nonFunctional: [
          '모바일/태블릿/데스크톱 반응형 UI',
          '서버 컴포넌트 기반 초기 로딩 최적화',
          '결제 시스템 안정성 및 보안',
          'Monorepo 기반 코드 재사용성 및 일관성',
          'MSW 기반 백엔드 독립적 개발 환경',
        ],
      },
      technicalChallenges: [
        {
          challenge:
            'Monorepo 환경에서 사용자 웹(Next.js)과 관리자(Vite+React) 간 공통 패키지 관리 및 빌드 최적화',
          solution:
            'Turborepo + pnpm Workspaces 조합으로 효율적인 멀티 프로젝트 관리 체계 수립. @repo/ui, @repo/utils, @repo/tailwind-config 등 공유 패키지 분리로 코드 재사용성 극대화. 빌드 캐싱을 통한 CI/CD 파이프라인 최적화',
        },
        {
          challenge:
            '복잡한 권한 시스템(회원사/비회원사/교담자/일반사용자)에 따른 콘텐츠 접근 제어',
          solution:
            'Next.js 미들웨어 기반 권한 처리 로직 구현. Context API를 활용한 전역 권한 상태 관리로 컴포넌트별 조건부 렌더링 및 라우트 보호 적용',
        },
        {
          challenge:
            'HLS 동영상 스트리밍 진도율 정확도 확보 및 비정상 종료 시 데이터 보존',
          solution:
            'beforeunload 이벤트 활용한 종료 시점 데이터 저장. 주기적 서버 동기화 로직으로 실시간 진도 업데이트. 브라우저 탭 전환 감지를 통한 학습 상태 관리',
        },
        {
          challenge:
            '나이스페이 결제 시스템 연동 및 다양한 결제/환불 상태 관리',
          solution:
            '결제 상태별(미결제/결제완료/미입금/결제취소) UI 피드백 및 예외 처리 로직 구현. 멤버십 구독과 과정별 결제를 구분한 결제 플로우 설계. 계산서 발행 및 영수증 기능 통합',
        },
        {
          challenge:
            '대용량 영상/첨부파일 업로드 시 안정성 및 사용자 경험 확보',
          solution:
            '청크 업로드 방식 도입으로 대용량 파일 안정적 전송. 프로그레스 바 UI로 실시간 업로드 상태 피드백. CDN 연동을 통한 파일 배포 최적화',
        },
      ],
      achievements: {
        metrics: [
          'Turborepo 기반 Monorepo 아키텍처로 2개 앱 + 6개 공유 패키지 통합 관리',
          '17개 도메인 feature 모듈 기반 Feature-Sliced Design 적용',
          '700+ 커밋 이력의 지속적인 기능 개선 및 유지보수',
          '3단계 반응형 브레이크포인트(sm/l/xl) 완전 대응',
        ],
        qualitative: [
          'Next.js 15 App Router 및 서버 컴포넌트 활용 SEO/성능 최적화',
          'TanStack Query + Zustand 조합의 효율적인 상태 관리 패턴 확립',
          'MSW 기반 목업 시스템으로 백엔드 독립적 개발 환경 구축',
          'PR 기반 코드 리뷰 및 TC(Test Case) 기반 체계적 QA 프로세스 수립',
        ],
        learnings: [
          '대규모 Monorepo 아키텍처 설계 및 패키지 관리 경험',
          'Next.js App Router와 React Server Components 심화 활용',
          'PG사(나이스페이) 결제 연동 및 금융 트랜잭션 처리 노하우',
          'HLS 기반 동영상 스트리밍 및 진도 추적 시스템 구현',
          '복잡한 권한 체계 설계 및 미들웨어 기반 접근 제어',
        ],
      },
    },
    links: {},
    images: [],
    color: '#242525',
    thumbnail: '/portfolio/kma/thumbnail.webp',
  },
  {
    id: 'aresa-app',
    category: 'development',
    title: 'ARESA Mobile App',
    subtitle: '부동산 전세안전진단 하이브리드 앱',
    description:
      '주거형 부동산 데이터를 기반으로 전세안전진단 및 DSR 계산 서비스를 제공하는 하이브리드 모바일 애플리케이션입니다.',
    period: '2024.01 - 2024.05',
    role: '프론트엔드 개발',
    team: '4인',
    techStack: [
      'Angular 16',
      'Ionic 7',
      'Capacitor 5',
      'TypeScript',
      'Tailwind CSS',
      'NGXS',
      'Naver Maps API',
      'amCharts 5',
      'Chart.js',
      'RxJS',
    ],
    features: [
      'Naver Maps API 기반 부동산 위치 시각화 및 GPS 연동',
      '서버리스 환경 DSR(총부채원리금상환비율) 계산 서비스',
      '전세안전진단 서비스 및 진단 결과 리포트',
      '공용 데이터와 운영 데이터 전처리 및 일원화',
      'PWA 지원 및 오프라인 기능',
      'iOS/Android 네이티브 앱 배포',
    ],
    process: {
      problemDiscovery: {
        background:
          '부동산 전세 사기 예방을 위해 사용자가 전세 계약 전 해당 물건의 안전도를 진단하고, 자신의 DSR을 계산하여 대출 가능 여부를 확인할 수 있는 모바일 플랫폼이 필요했습니다.',
        problems: [
          '공공 데이터와 내부 운영 데이터의 형식 불일치로 인한 데이터 전처리 복잡도',
          'DSR 계산 로직의 다양한 대출 유형별 분기 처리',
          '네이버 지도에서 다수의 부동산 마커 렌더링 시 성능 저하',
          '다양한 디바이스 환경에서의 일관된 UI/UX 제공',
        ],
      },
      requirements: {
        functional: [
          '전세안전진단 주소 검색 및 진단 결과 조회',
          '지도 기반 부동산 위치 시각화 및 상세 정보 조회',
          'DSR/DTI 계산기 (대출 유형별 원리금 계산)',
          '사용자 연봉 기반 대출 한도 계산',
          '진단 이력 관리 및 결제 시스템 연동',
        ],
        nonFunctional: [
          '모바일 최적화 반응형 UI',
          '오프라인 모드 지원 (PWA Service Worker)',
          'iOS/Android 동시 배포',
          '대출 계산 결과의 정확성 보장',
        ],
      },
      technicalChallenges: [
        {
          challenge:
            '공용 데이터(공공 부동산 API)와 운영 데이터(내부 DB)의 데이터 형식 불일치',
          solution:
            '인터페이스 기반 데이터 정규화 레이어 구축. 공통 DTO 타입을 정의하고 데이터 변환 파이프라인을 통해 일관된 데이터 구조로 전처리하여 프론트엔드에서 통합 사용',
        },
        {
          challenge:
            'DSR 계산 시 대출 유형별(주택담보, 신용대출, 전세보증금담보 등) 복잡한 분기 처리',
          solution:
            'CalculatorService에서 대출 유형별 전략 패턴 적용. Cookie 기반 상태 유지로 비로그인 사용자도 계산 결과 보존. DSR 포함/미포함 대출 분류 체계 구축',
        },
        {
          challenge:
            '네이버 지도에서 다수 마커 렌더링 시 성능 저하 및 사용자 경험 문제',
          solution:
            'Supercluster 라이브러리를 활용한 마커 클러스터링 구현. 뷰포트 기반 동적 로딩으로 화면에 보이는 영역의 마커만 렌더링. InfoWindow를 통한 상세 정보 제공으로 초기 로딩 시간 최적화',
        },
      ],
      achievements: {
        metrics: [
          'Angular 16 + Ionic 7 기반 모바일 최적화 웹앱 아키텍처 구축',
          'DSR 계산기 서비스 기획부터 배포까지 풀사이클 개발',
          '10개 이상의 대출 유형별 계산 로직 구현',
          'PWA Service Worker 적용으로 오프라인 캐싱 지원',
        ],
        qualitative: [
          'NGXS 상태 관리 도입으로 전역 상태(인증, 진단 로그) 체계적 관리',
          'Capacitor 활용 iOS/Android 동시 배포 파이프라인 구축',
          'Standalone Component 아키텍처로 모듈 독립성 확보',
          '다음 우편번호 API 연동 주소 검색 시스템 구현',
        ],
        learnings: [
          'Angular Zone 메커니즘과 변화 감지 전략 심화 이해',
          '금융 도메인(DSR/DTI) 계산 로직 설계 및 구현 경험',
          '하이브리드 앱 개발 및 네이티브 기능(GPS, 지도) 연동 경험',
          '부동산 도메인 데이터 모델링 및 전처리 역량 강화',
        ],
      },
    },
    links: {},
    images: Array.from(
      { length: 13 },
      (_, i) => `/portfolio/aresa-app/${i + 1}.webp`,
    ),
    color: '#4F46E5',
    thumbnail: '/portfolio/aresa-app/thumbnail.webp',
  },
  {
    id: 'odocs',
    category: 'development',
    title: 'O-DOCS',
    subtitle: '공문서 간편 열람 서비스',
    description:
      '오독스(O-DOCS)는 등기부등본, 토지대장, 건축물대장 등 부동산 관련 정보를 한 곳에서 조회하고 발급할 수 있는 통합 플랫폼입니다. 온라인으로 편리하게 필요한 서류를 확인하고 발급받을 수 있어 부동산 거래 시 유용하게 활용할 수 있습니다.',
    period: '2023.11 - 2024.01',
    role: '프론트엔드 개발',
    team: '3인',
    techStack: [
      'Next.js 14',
      'React 18',
      'TypeScript',
      'Tailwind CSS',
      'Daum Postcode API',
      'Danal Payment API',
      'RxJS',
    ],
    features: [
      '지번/도로명 주소 기반 부동산 공문서 검색',
      '표제부 데이터 기반 층/호실 시각화 UI',
      '등기부등본, 토지대장, 건축물대장 열람 서비스',
      '다날 결제 시스템 연동 (카드/계좌)',
      '오독스 머니 충전 및 환불 시스템',
      '반응형 웹앱 (모바일/데스크톱 최적화)',
    ],
    process: {
      problemDiscovery: {
        background:
          '부동산 거래 시 필요한 등기부등본, 토지대장, 건축물대장 등 공문서를 여러 기관에서 개별적으로 발급받아야 하는 불편함을 해소하기 위해, 한 곳에서 통합 조회 및 발급이 가능한 플랫폼이 필요했습니다.',
        problems: [
          '여러 기관에 분산된 부동산 공문서로 인한 사용자 불편',
          '복잡한 주소 체계(지번/도로명)에 대한 직관적인 검색 UX 부재',
          '다양한 결제 수단 및 유료 재화 관리의 복잡성',
          '모바일/데스크톱 환경에서의 일관된 사용자 경험 제공 필요',
        ],
      },
      requirements: {
        functional: [
          '지번/도로명 주소 검색 및 건물명 조회',
          '표제부 기반 층/호실 정보 시각화',
          '공문서(등기부등본, 토지대장, 건축물대장) 열람 및 발급',
          '다날 결제 연동 (카드, 계좌이체)',
          '오독스 머니 충전/사용/환불 관리',
          '사용자 조회 이력 관리',
        ],
        nonFunctional: [
          '모바일/데스크톱 반응형 UI',
          '결제 시스템 안정성 및 보안',
          '직관적인 주소 검색 UX',
          '빠른 검색 응답 속도',
        ],
      },
      technicalChallenges: [
        {
          challenge:
            '복잡한 주소 체계(지번/도로명)와 건물 정보를 직관적으로 표현하는 UI 설계',
          solution:
            '다음 우편번호 API를 활용한 통합 주소 검색 구현. 표제부 데이터를 파싱하여 층/호실 정보를 시각적 계층 구조로 표현, 사용자가 원하는 호실을 쉽게 선택할 수 있는 인터랙티브 UI 개발',
        },
        {
          challenge:
            '다날 결제 시스템 연동 및 다양한 결제 상태(충전, 환불, 취소) 관리',
          solution:
            '다날 결제 API와의 안정적인 연동을 위한 결제 플로우 설계. 결제 상태별 UI 피드백 및 오류 처리 로직 구현, 오독스 머니와 연동된 포인트 시스템으로 사용자 재화 관리',
        },
        {
          challenge: '다양한 디바이스 환경에서의 일관된 UX 제공',
          solution:
            '모바일 우선 반응형 설계로 터치 인터페이스 최적화. Tailwind CSS 기반 브레이크포인트 시스템으로 디바이스별 레이아웃 분기, 핵심 기능에 집중한 미니멀한 UI로 사용자 집중도 향상',
        },
      ],
      achievements: {
        metrics: [
          'Next.js 14 App Router 기반 SSR/SSG 하이브리드 아키텍처 구축',
          '주소 검색부터 공문서 발급까지 원스톱 서비스 플로우 구현',
          '다날 결제 시스템 연동 및 안정적인 금융 서비스 제공',
          '모바일/데스크톱 완전 반응형 UI 구현',
        ],
        qualitative: [
          '다음 우편번호 API 연동 및 주소 데이터 전처리 경험',
          '결제 시스템 연동 및 금융 트랜잭션 처리 노하우 축적',
          '복잡한 부동산 데이터 시각화 UI 설계 역량 확보',
          '사용자 이탈을 줄이는 직관적인 UX 설계',
        ],
        learnings: [
          'Next.js 14 App Router와 서버 컴포넌트 활용법',
          'PG사 결제 연동 프로세스 및 보안 고려사항',
          '부동산 도메인 데이터(표제부, 등기부등본 등) 이해',
          '사용자 중심 UX 설계 및 이탈률 최소화 전략',
        ],
      },
    },
    links: {},
    images: Array.from(
      { length: 5 },
      (_, i) => `/portfolio/odocs/${i + 1}.webp`,
    ),
    color: '#292A35',
    thumbnail: '/portfolio/odocs/thumbnail.webp',
  },
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
