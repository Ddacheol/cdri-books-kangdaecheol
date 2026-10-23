# CDRI BOOKS 프로젝트

본 프로젝트는 Kakao 도서 검색 API를 이용한 도서 검색 서비스 웹 애플리케이션입니다.
검색 조건과 키워드를 통해 원하는 도서를 검색할 수 있고, 도서의 상세 정보나 가격을 확인할 수 있습니다.
관심 있는 도서는 찜 목록에 추가한 뒤 내가 찜한 책 페이지에서 다시 확인할 수 있습니다.

## 실행 방법 및 환경 설정

### 요구 사항

- Node.js 최소 20.19 이상이거나 22.12 이상
- Kakao REST API KEY

### 프로젝트 실행 방법

1. 프로젝트 루트에서 npm install 로 프로젝트 의존성 설치
2. npm run dev 명령어로 로컬 개발 서버 실행
3. http://localhost:5173 로 접속

### 환경 설정

프로젝트 루트에 .env 파일 생성 후 아래와 같이 입력합니다.

```env
VITE_API_BASE_URL=https://dapi.kakao.com
VITE_API_KEY=KAKAO_REST_API_KEY
```

- VITE_API_BASE_URL: 카카오 REST API의 기본 URL
- VITE_API_KEY: 카카오 REST API Key

## 폴더 구조

```text
├── public/
│   ├── fonts/                      # 폰트
│   └── icons/                      # 아이콘 이미지
├── src/
│   ├── api/
│   │   ├── client.ts               # Axios 인스턴스 설정
│   │   └── books.ts                # 도서 검색 API 호출
│   ├── components/
│   │   ├── books/                  # 도서 목록, 로딩, 빈 상태 및 에러 컴포넌트 UI
│   │   ├── layout/                 # 공통 레이아웃
│   │   └── ui/                     # 공통 컴포넌트 UI
│   ├── hooks/                      # 커스텀 훅
│   │   ├── use-infinite-books.ts   # 도서 검색 API 호출 및 무한 스크롤 데이터 처리 훅
│   │   └── use-infinite-scroll.ts  # IntersectionObserver 기반 무한 스크롤 공통 훅
│   ├── lib/
│   │   └── utils.ts               # 공통 유틸리티 함수
│   ├── pages/
│   │   ├── search-books/
│   │   │   ├── components/        # 도서 검색 내부 컴포넌트 UI
│   │   │   └── index.tsx          # 도서 검색 페이지
│   │   └── favorite-books/
│   │       └── index.tsx          # 내가 찜한 책 페이지
│   ├── router/
│   │   └── routes.ts              # 라우트 객체 정의
│   ├── styles/                    # 전역 스타일 및 테마
│   ├── types/
│   │   └── books.ts               # 도서 관련 타입
│   ├── App.tsx                    # 앱 구성
│   └── main.tsx                   # 앱 진입점
├── package.json                   # 의존성 및 실행 스크립트
├── vite.config.ts                 # Vite 설정
└── tsconfig.json                  # TypeScript 설정
```

## 사용 라이브러리

- axios: 외부 API와 통신을 처리하고, Axios 인스턴스를 통해 공통 설정을 원할하게 하기 위해 사용했습니다.
- TanStack React Query: 서버 데이터 관리와 무한 스크롤 구현을 위해 사용했습니다.
- Tailwind CSS: 유틸리티 클래스를 활용해 효율적으로 UI를 스타일링 하고, 별도 CSS 파일 관리 부담을 줄이기 위해 사용했습니다.
- shadcn/ui: 컴포넌트의 소스 코드를 직접 관리하고, Tailwind CSS와의 높은 호환성으로 프로젝트의 요구사항에 맞춰 자유롭게 컴포넌트를 커스터마이징하기 위해 사용했습니다.
- Base UI: shadcn/ui의 기반이 되는 Headless UI 컴포넌트 라이브러리입니다.
- Lucide React: 다양한 SVG 아이콘을 제공하는 라이브러리로, 필요한 아이콘을 프로젝트에서 사용하기 위해 사용했습니다.
- cn: 조건부 클래스 조합을 간결하게 처리하기 위해 사용했습니다.
- Class Variance Authority: 공통 컴포넌트의 스타일을 variant에 맞춰 효율적으로 관리하기 위해 사용했습니다.

## 강조하고 싶은 기능

1. TanStack Query의 useInfiniteQuery와 IntersectionObserver 기반 공통 훅을 활용한 무한 스크롤 기능 구현
2. LocalStorage를 활용한 최근 검색어 및 찜한 도서 데이터 유지 기능
3. 아코디언 UI를 이용한 도서 상세 정보 확인 및 펼침/닫힘 상태에 따른 전환 애니메이션
