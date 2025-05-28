📦 frontend
├── 📁 public
│   └── 정적 파일 저장 (이미지, 폰트, favicon 등)
│
├── 📁 src
│   ├── 📁 app
│   │   └── 페이지 라우팅 구성 (Next.js App Router 사용)
│   │       └── 각 페이지별 폴더 구조 (예: /login, /dashboard 등)
│   │
│   ├── 📁 components
│   │   └── 재사용 가능한 UI 컴포넌트 모음
│   │       └── 기타 UI 요소들
│   │
│   ├── 📁 contexts
│   │   └── 전역 상태 관리 (예: 모달, 사용자 세션 등)
│   │       └── ModalContext.js
│   │
│   ├── 📁 hooks
│   │   └── 커스텀 훅 모음
│   │       └── 로그인 세션, 이미지 업로드 훅 등
│   │
│   ├── 📁 lib
│   │   └── 📁 api
│   │       └── 서버 API 호출 함수 정리
│   │           └── 각 도메인별 API (user, visitor, section 등)
│   │   
│   ├── 📁 utils
│   │   └── 일반 유틸리티 함수
│   │       └── 화살표 그리기, 구역 관련 계산 등
│   │
│   └── 📁 styles
│       └── 전역 및 모듈별 SCSS 스타일 정의
│
├── 📄 .env                    # 환경변수 정의
├── 📄 next.config.mjs         # Next.js 설정
├── 📄 jsconfig.json           # 경로 alias 등 개발 편의 설정
├── 📄 package.json            # 의존성 및 스크립트
├── 📄 yarn.lock / package-lock.json
└── 📄 README.md               # 프로젝트 설명서
