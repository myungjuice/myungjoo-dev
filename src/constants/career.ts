import type { CareerFilterItem, CareerCompany } from '@/types/career';

export const CareerFilterList: CareerFilterItem[] = ['supertree', 'd.dive', 'ellen'];

export const careerMockData: CareerCompany[] = [
  {
    id: 'supertree',
    name: '㈜ 수퍼트리',
    period: '2021.06 - 2025.01',
    isWorking: false,
    slogan: 'PlayDapp을 중심으로 다양한 게임·포털·텔레그램 미니앱 등 플랫폼 구축',
    role: 'Frontend Developer (React, Next.js)',
    logoUrl: '/images/supertree.png',
    imageSize: {
      width: 97,
      height: 100,
    },
    projects: [
      {
        id: 1745139281,
        title: 'EzPlay 사이트 개편 및 텔레그램 연동',
        period: '2024.11 - 2024.12',
        description:
          '기존 EzPlay 사이트를 개편하고 텔레그램 로그인/미니앱/광고 시스템을 추가하여 런칭',
      },
      {
        id: 1745139223,
        title: 'Roblox 관리자 사이트 런칭 및 고도화',
        period: '2024.06 - 2024.09',
        description: '내부에서 사용하는 Roblox 포인트 지급/권한 관리 관리자 페이지 개발',
      },
      {
        id: 1745139236,
        title: '멤버스 홈페이지 리뉴얼 및 런칭',
        period: '2023.09 - 2024.03',
        description:
          '스크롤/애니메이션 기반 멤버스 홈페이지를 Locomotive Scroll, framer-motion 등으로 구현',
      },
      {
        id: 1745139302,
        title: 'PlayDapp Marketplace 사이트 전체 리뉴얼',
        period: '2022.06',
        description:
          'Polygon, Ethereum 기반 Marketplace를 TS + Emotion + Next.js 기반으로 전체 리뉴얼',
      },
      {
        id: 1745139218,
        title: 'PlayDapp Developers 사이트 런칭 및 고도화',
        period: '2022.03 - 2022.06',
        description: 'NFT 등록/관리 기능 포함한 관리자 및 랜딩 페이지 개발',
      },
    ],
  },
  {
    id: 'd.dive',
    name: '㈜ 디다이브',
    period: '2019.08 - 2021.06',
    isWorking: false,
    slogan: '다양한 AI·광고·SNS 플랫폼 프로토타입을 주도적으로 개발',
    role: 'Frontend Developer (React)',
    logoUrl: '/images/d.dive.png',
    imageSize: {
      width: 200,
      height: 80,
    },
    projects: [
      {
        id: 1745139273,
        title: '광고주 플랫폼 백오피스 개발',
        period: '2020.01 - 2021.01',
        description: '광고 데이터를 시각화하는 통합 백오피스를 React로 구현하고 EC2 환경에 배포',
      },
      {
        id: 1745139252,
        title: 'Project UYI (AI 기반 SNS 프로토타입)',
        period: '2021.03 - 2021.05',
        description: '텍스트/음성 기반 AI 그림 생성 SNS 프로토타입을 React로 개발',
      },
      {
        id: 1745139307,
        title: 'KBS 드라마 AI 시청률 예측 데모 사이트',
        period: '2020.11 - 2020.11',
        description: 'Python으로 드라마 데이터를 크롤링하고 React로 예측 시각화 데모를 개발',
      },
    ],
  },
  {
    id: 'ellen',
    name: '㈜ 엘렌',
    period: '2017.07 - 2019.07',
    isWorking: false,
    slogan: '다양한 외주 프로젝트와 제휴 서비스를 개발한 첫 커리어',
    role: 'Fullstack Developer (ASP, MSSQL)',
    logoUrl: '',
    projects: [
      {
        id: 1745139259,
        title: 'OPWEE 반응형 웹사이트 개발',
        period: '2019.04 - 2019.05',
        description: 'W3C 웹 표준을 준수하여 반응형으로 웹 사이트를 개발하였습니다.',
      },
      {
        id: 1745139209,
        title: '프랑켄모노 제휴업체 주문 및 관리자 페이지',
        period: '2018.01 - 2019.06',
        description: '제휴업체 주문/관리 기능과 관리자 페이지 기능을 지속적으로 개발하고 유지보수.',
      },
      {
        id: 1745139255,
        title: '프랑켄모노 오프라인 매장 포스 개발',
        period: '2017.09 - 2017.11',
        description: '홍대 오프라인 매장에서 사용할 POS 시스템을 개발하였습니다.',
      },
    ],
  },
];
