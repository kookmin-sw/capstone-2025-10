[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/gFPznrUY)
# AI 비전 기반 오프라인 데이터 시각화 서비스, OFFFLOW
<br/> <br/> 
<div align="center"> 
    <p align = "center">
        <img src = "https://raw.githubusercontent.com/kookmin-sw/capstone-2025-10/master/assets/offflow_logo.svg"" width = "40%"/>
    </p>
</div>

<br/> <br/> 

## 🔗 목차 
[💡 프로젝트 소개](#-프로젝트-소개) 

[📝 주요 기능](#-주요-기능)

[🎬 시연 영상](#-시연-영상)

[👋 팀원 소개](#-팀원-소개)

[🌐 시스템 구조](#-시스템-구조)

[🛠 기술 스택](#-기술-스택)   

[🚀 실행 방법](#-실행-방법)  

[📂 디렉토리 구조](#-디렉토리-구조)  

[📑 프로젝트 연구 성과](#-프로젝트-연구-성과)

[📝 참고 자료](#-참고-자료)

<br/> 

## 💡 프로젝트 소개

<div align="center"> 
    <p align = "center">
    <img src = "https://raw.githubusercontent.com/kookmin-sw/capstone-2025-10/master/assets/poster.png" width = "60%"/>
    </p>
  <a href="https://drive.google.com/file/d/101BuD1QRINqIVViTEKw_8v96uTytM03h/view?usp=sharing" target="_blank">
    <img src="https://raw.githubusercontent.com/kookmin-sw/capstone-2025-10/master/assets/paper_1.png" width="40%">
  <a/>
  <a href="https://drive.google.com/file/d/1zuieTjI2CBtVPmgTzUbhb4PyNx5jjB6E/view?usp=sharing" target="_blank">
    <img src="https://raw.githubusercontent.com/kookmin-sw/capstone-2025-10/master/assets/paper_2.png" width="40%">
  </a>
</div>

### | AI 비전 기반 오프라인 데이터 시각화 서비스
-  **OFFFLOW**는 팝업스토어와 같은 오프라인 공간에서 AI기반 객체인식 기술을 활용하여 **고객 동선 및 군중 밀집도를 실시간으로 분석**하고 방문 고객의 **성별, 연령대와 체류 시간을 온라인 데이터로 변환 및 시각화**하여 제공합니다.

-  **OFFFLOW**는 변환된 데이터를 안전하게 수집하고 다양한 채널에서 발생하는 **고객 데이터를 통합 관리할 수 있는 대시보드 서비스**를 제공합니다.

-  **OFFFLOW**는 매장 운영자가 **실시간으로 고객 흐름**을 파악하고, 혼잡 구간을 조정하거나 상품 배치를 최적화함으로써 **오프라인 공간의 운영 효율성**을 높일 수 있도록 지원합니다.

#### 🔗 [OFFFLOW 소개 페이지 바로 가기](https://kookmin-sw.github.io/capstone-2025-10/)

<br/>


## 📝 주요 기능

### 🗺️ **트래킹 맵을 통한 고객 동선 시각화**
Yolov8 + DeepSort 알고리즘을 활용해 고객의 이동 경로를 실시간으로 수집하고, 트래킹 맵 위에 경로를 선 형태로 시각화하여 공간 내 이동 흐름을 한눈에 확인할 수 있습니다.

### 🔥 **히트맵을 통한 군중 밀집도 분석**
Point-based Crowd Counting 모델인 APGCC를 활용하여 공간별 밀집도를 분석하고 히트맵으로 시각화합니다.

### 📸 **AI 기반 객체 인식 및 성별·연령대 추론**
Yolov8을 활용하여 사람의 얼굴을 인식하고, EfficientNet 기반 분류형 모델을 활용하여 오프라인 공간 내 고객의 성별과 연령대를 파악하여 수치화합니다.

### 📊 **대시보드 기반 통계 제공**
각 대시보드는 성별 비율, 연령대 분포, 평균 체류시간, 방문자 수 등의 주요 통계 데이터를 실시간으로 제공합니다.

### 🎯 **사용자 정의 커스텀 이벤트 조건 설정**
방문자 체류시간, 위치, 시간대 등 조건을 조합하여 사용자 맞춤형 이벤트(예: 구매 가능성 높은 구간 탐지)를 생성하고 통계를 필터링할 수 있습니다.

### 🧠 **AI 분석 데이터 저장 시스템**
AI 분석 결과는 Redis 및 Kafka를 활용하여 비동기식 메모리큐에 저장 후 실시간으로 서버에 전송되며, 사용자는 대시보드를 통해 분석 결과를 빠르게 확인하고 인사이트를 얻을 수 있습니다.

### 📱 **QR기반 방문자 등록 시스템**
각 대시보드에 연동된 QR 코드를 통해 방문객 정보를 자동으로 등록하고, 방문 이력을 저장하여 맞춤형 분석 및 리타겟팅에 활용할 수 있습니다.

### 🧩 **상품-구역(섹션) 매핑 기능**
각 상품을 특정 구역(Section)과 매핑하여 고객 동선과 상품 배치를 연계 분석할 수 있으며, 매핑된 섹션별 성과 데이터도 확인할 수 있습니다.

<br/>

## 🎬 소개 영상

[![Video Label]( https://img.youtube.com/vi/xR-jQg1DCww/0.jpg)](https://youtu.be/xR-jQg1DCww)

<br/>

## 👋 팀원 소개

<table>
    <tr align="center">
        <td style="min-width: 100px;">
            <a href="https://github.com/millook">
              <img src="https://avatars.githubusercontent.com/u/134192611?v=4" width="80">
              <br />
              <b>김민준</b>
            </a> 
            <br/>
              20171591
        </td>
        <td style="min-width: 100px;">
            <a href="https://github.com/skan9708">
              <img src="https://avatars.githubusercontent.com/u/19978313?v=4" width="80">
              <br />
              <b>최진혁</b>
            </a>
            <br/>
              20171715
        </td>
        <td style="min-width: 10px;">
            <a href="https://github.com/HO22">
              <img src="https://avatars.githubusercontent.com/u/38872856?v=4" width="80">
              <br />
              <b>김린회 </b>
            </a> 
            <br/>
              20181581
        </td>
        <td style="min-width: 100px;">
            <a href="https://github.com/seongjeongkyu1">
              <img src="https://avatars.githubusercontent.com/u/113752290?v=4" width="80">
              <br />
              <b>성정규</b>
            </a> 
            <br/>
              20191610
        </td>
        <td style="min-width: 100px;">
            <a href="https://github.com/minsang22">
              <img src="https://avatars.githubusercontent.com/u/55175192?v=4" width="80">
              <br />
              <b>윤민상</b>
            </a> 
            <br/>
              20191631 
        </td>
    </tr>
    <tr align="center">
        <td>
            팀장, Backend, DB
        </td>
        <td>
            Frontend, Infra
        </td>
        <td>
            Frontend, Backend
        </td>
                <td>
            AI Engineer
        </td>
                <td>
            AI Engineer
        </td>
    </tr>
</table>

<br/>

## 🌐 시스템 구조
<br/>

<div align="center"> 
    <p align = "center">
    <img src = "https://raw.githubusercontent.com/kookmin-sw/capstone-2025-10/master/assets/system_architecture.png" width = 90%/>
    </p>
</div>

<br/>

## 🛠 기술 스택

### 💻 Frontend
|역할|종류|
|-|-|
|**Programming Language**| ![Javascript](https://img.shields.io/badge/Javascript-F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=white)
|**Library**| ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white)
|**Styling**| ![Sass](https://img.shields.io/badge/sass-CC6699.svg?style=for-the-badge&logo=sass&logoColor=white)
|**Formatting**| ![ESLint](https://img.shields.io/badge/ESLint-4B32C3.svg?style=for-the-badge&logo=ESLint&logoColor=white) ![Prettier](https://img.shields.io/badge/Prettier-F7B93E.svg?style=for-the-badge&logo=Prettier&logoColor=white)
|**Package Manager**|![Yarn](https://img.shields.io/badge/Yarn-2C8EBB.svg?style=for-the-badge&logo=Yarn&logoColor=white)                             
|**Web Server**|![Nginx](https://img.shields.io/badge/Nginx-009639.svg?style=for-the-badge&logo=Nginx&logoColor=white)

<br />

### 💻 Backend
|역할|종류|
|-|-|
|**Programming Language**| ![JAVA](https://img.shields.io/badge/JAVA-004027?style=for-the-badge&logo=Jameson&logoColor=white) 
|**Framework**| ![SpringBoot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=SpringBoot&logoColor=white)
|**Build Tool**| ![Gradle](https://img.shields.io/badge/Gradle-02303A?style=for-the-badge&logo=Gradle&logoColor=white) 
|**API**| ![Rest](https://img.shields.io/badge/Rest_API-000000?style=for-the-badge&logo=iRobot&logoColor=white)
|**Database**| ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=PostgreSQL&logoColor=white)
|**Database Service**| ![Redis](https://img.shields.io/badge/Redis-FF4438?style=for-the-badge&logo=Redis&logoColor=white)
|**Application Service**| ![NaverSMS](https://img.shields.io/badge/Naver_SMS-03C75A?style=for-the-badge&logo=Naver&logoColor=white) 
|**Message Queue**| ![ApacheKafka](https://img.shields.io/badge/Apache_Kafka-231F20?style=for-the-badge&logo=ApacheKafka&logoColor=white) 

<br />

### 💻 AI
|역할|종류|
|-|-|
|**Programming Language**| ![Python](https://img.shields.io/badge/Python_3.10-3776AB?style=for-the-badge&logo=python&logoColor=white) 
|**Operating System**| ![Ubuntu](https://img.shields.io/badge/ubuntu_22.04-E95420?style=for-the-badge&logo=ubuntu&logoColor=white) 
|**AI Env**| ![CudDa](https://img.shields.io/badge/CuDa_11.8-76B900?style=for-the-badge&logo=nvidia&logoColor=white)
| **Development Platform** | ![RunPod](https://img.shields.io/badge/RunPod-5C3EE8?style=for-the-badge)
|**Deep Learning Framework**| ![PyTorch](https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=PyTorch&logoColor=white)
|**Numerical Computing**| ![NumPy](https://img.shields.io/badge/NumPy-013243?style=for-the-badge&logo=NumPy&logoColor=white)
|**Visitor Tracking**|  ![YOLO](https://img.shields.io/badge/YOLO-111F68?style=for-the-badge&logo=yolo&logoColor=white) ![OpenCV](https://img.shields.io/badge/OpenCV-5C3EE8?style=for-the-badge&logo=OpenCV&logoColor=white) ![DeepSORT](https://img.shields.io/badge/DeepSORT-4D4D4D?style=for-the-badge)
|**Crowd Counting**| ![OpenCV](https://img.shields.io/badge/OpenCV-5C3EE8?style=for-the-badge&logo=OpenCV&logoColor=white) ![APGCC](https://img.shields.io/badge/APGCC-4D4D4D?style=for-the-badge)
|**Gender/Age Classification** | ![YOLO](https://img.shields.io/badge/YOLO-111F68?style=for-the-badge&logo=yolo&logoColor=white) ![OpenCV](https://img.shields.io/badge/OpenCV-5C3EE8?style=for-the-badge&logo=OpenCV&logoColor=white) ![EfficientNet](https://img.shields.io/badge/EfficientNet-4D4D4D?style=for-the-badge)


<br />

### 💻 Deployment

|역할|종류|
|-|-|
|**Deployment**| ![AmazonEC2](https://img.shields.io/badge/Amazon_EC2-FF9900?style=for-the-badge&logo=AmazonEC2&logoColor=white) ![Docker](https://img.shields.io/badge/Docker-2088FF?style=for-the-badge&logo=Docker&logoColor=white) 

<br/>

### 💻 Common
|역할|종류|
|-|-|
|**Communication**| ![Discord](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=Discord&logoColor=white) 
|**Design**| ![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white)
|**Version Control**|![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white) ![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)
|**Project Management**| ![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white) ![Trello](https://img.shields.io/badge/Trello-0052CC?style=for-the-badge&logo=Trello&logoColor=white)

<br />

## 🚀 실행 가이드

### 1. 소스 다운로드

```bash
git clone https://github.com/kookmin-sw/capstone-2025-10.git
cd capstone-2025-10
```

---

### 2. 프론트엔드 실행

① 환경 준비
- Node.js v20 이상
- npm 또는 yarn 설치

② `.env.local` 설정 (`frontend/.env.local`)
```env
NEXT_PUBLIC_NAVER_SMS_SERVICE_ID=
NEXT_PUBLIC_NAVER_SMS_ACCESS_KEY=
NEXT_PUBLIC_NAVER_SMS_SECRET_KEY=
NEXT_PUBLIC_NAVER_SMS_SENDER_PHONE=
```
③ 실행 명령어
```bash
cd frontend
npm install
npm run dev
```
④ 접속 포트
```
http://localhost:3000
```

---

### 3. 백엔드 실행

① Docker 설치  
- [공식 설치 가이드](https://docs.docker.com/get-docker/)

② 실행 명령어

**macOS / Linux**
```bash
docker compose up --build
```

**Windows**
```bash
docker-compose up --build
```

③ 접속 포트
- 웹 서버: `8080`
- Kafka: `9092`

---

### 4. 군중 밀집도 + 객체 추적 AI 모듈 배포
① 가상환경 생성 및 의존성 설치
```bash
cd ai
python3.10 -m venv venv
source venv/bin/activate      # Windows는 venv\Scripts\activate
pip install -r requirements.txt
```
② YOLOv8 + DeepSORT 설치
```bash
cd src/YOLOv8-DeepSORT-Object-Tracking
pip install -e '.[dev]'
```
③ 가중치 파일 다운로드
- [모델 다운로드 링크](https://drive.google.com/drive/u/0/folders/12lejFGm62maG2IVYcJbUjRRHoz5woQ68)
- 아래 3개의 파일을 다운로드 후 다음 경로에 저장:
  ```
  src/YOLOv8-DeepSORT-Object-Tracking/ultralytics/yolo/v8/detect/
  ```
  - `yolov8n.pt`
  - `vgg16_bn-6c64b313.pth`
  - `SHHA_best.pth`

④ Kafka 설정
- 다음 두 파일에서 `bootstrap_servers` 항목을 실제 Kafka 브로커 IP로 수정:
  - `ai/src/YOLOv8-DeepSORT-Object-Tracking/ultralytics/yolo/data/dataloaders/stream_loaders.py`
  - `ai/src/YOLOv8-DeepSORT-Object-Tracking/ultralytics/yolo/v8/detect/predict.py`

⑤ 실행 명령어
```bash
python3.10 predict.py source="kafka://"
```

---

### 5. 성별·연령대 AI 모듈 배포

① Python 가상환경 설정
```bash
cd ai
python3.10 -m venv venv
source venv/bin/activate      # Windows는 venv\Scripts\activate
pip install -r requirements.txt
```
② 모델 파일 다운로드 및 저장
아래 파일들을 다운로드하여 `ai/model/` 디렉토리에 저장:
- `model_checkpoint.pt`
- `yolov8n-face.pt`

③ Kafka IP 설정
- `ai/test.py` 파일에서 Kafka 브로커 IP 주소를 실제 IP로 수정

④ 실행 명령어
```bash
python3.10 test.py
```


<br/>

## 📂 폴더 구조
```
📦 capstone-2025-10
│
├── 📁 .github                        
│
├── 📁 frontend                           # 프론트엔드 (Next.js)
│   ├── 📁 public                         # 정적 파일 (favicon, 이미지 등)
│   │
│   ├── 📁 src
│   │   ├── 📁 app                        # App Router 기반 페이지
│   │   │   └── /login, /dashboard 등
│   │   │
│   │   ├── 📁 components                # 공통 UI 컴포넌트
│   │   ├── 📁 contexts                  # 전역 상태 관리 (예: Modal, UserSession)
│   │   ├── 📁 hooks                     # 커스텀 훅 모음
│   │   ├── 📁 lib
│   │   │   └── 📁 api                  # API 호출 함수 (user, visitor 등)
│   │   ├── 📁 utils                    # 유틸 함수 (화살표, 위치 계산 등)
│   │   └── 📁 styles                   # SCSS 등 스타일 파일
│   │
│   ├── .env                             # 환경변수
│   ├── next.config.mjs                  # Next.js 설정
│   ├── jsconfig.json                    # 경로 alias 등
│   ├── package.json
│   ├── yarn.lock / package-lock.json
│   └── README.md
│
├── 📁 backend                            # 백엔드 (Spring Boot)
│   ├── build.gradle                     # Gradle 빌드 스크립트
│   ├── Dockerfile.dev                   # 개발용 Dockerfile
│   ├── gradlew / gradlew.bat            # Gradle Wrapper 실행 파일
│   ├── settings.gradle                  # 프로젝트 및 모듈 설정
│   ├── HELP.md                          # 초기 Spring 도움말
│   ├── .gitignore / .gitattributes
│   │
│   └── 📁 src
│       ├── 📁 main
│       │   ├── 📁 java/capstone/offflow
│       │   │   ├── 📁 Common              # 전역 설정 및 유틸리티
│       │   │   ├── 📁 Dashboard           # 대시보드/섹션/상품
│       │   │   │   ├── Controller/         # REST API 정의
│       │   │   │   ├── Domain/             # Dashboard, Section, Product 엔티티
│       │   │   │   ├── Dto/                # 요청/응답 객체
│       │   │   │   ├── Repository/         # JPA 인터페이스
│       │   │   │   └── Service/            # 비즈니스 로직
│       │   │   ├── 📁 Event               # 이벤트 조건 및 통계
│       │   │   │   ├── Controller/
│       │   │   │   ├── Domain/             # Event, EventCondition 엔티티
│       │   │   │   ├── Dto/
│       │   │   │   ├── Repository/
│       │   │   │   └── Service/
│       │   │   ├── 📁 Login               # 인증/로그인
│       │   │   │   ├── Controller/
│       │   │   │   ├── Dto/                # 로그인 요청/응답
│       │   │   │   └── Service/            # UserDetailsService 구현 등
│       │   │   ├── 📁 User                # 사용자 등록/정보
│       │   │   │   ├── Controller/
│       │   │   │   ├── Domain/             # User 엔티티
│       │   │   │   ├── Dto/
│       │   │   │   ├── Repository/
│       │   │   │   └── Service/
│       │   │   ├── 📁 Vision              # AI 비전 데이터 (Tracking, Heatmap 등)
│       │   │   │   ├── Controller/
│       │   │   │   ├── Domain/             # Heatmap, Tracking, Session, GenderAge 등 엔티티
│       │   │   │   ├── Dto/
│       │   │   │   ├── Repository/
│       │   │   │   ├── Scheduler/          # Redis to DB 저장 스케줄링 등
│       │   │   │   └── Service/
│       │   │   ├── 📁 Visitor             # 방문자 등록/조회
│       │   │   │   ├── Controller/
│       │   │   │   ├── Domain/             # Visitor, VisitHistory 등
│       │   │   │   ├── Dto/
│       │   │   │   ├── Repository/
│       │   │   │   └── Service/
│       │   │   └── OffflowApplication.java # 메인 실행 클래스
│       │   │
│       │   └── 📁 resources
│       │       ├── application.properties  # DB, Redis 설정 등
│       │       ├── static/                 # 정적 리소스
│       │       └── templates/              # Thymeleaf 템플릿
│       │
│       └── 📁 test                         # 유닛/통합 테스트
│
├── 📁 ai                                 # AI 
│   ├── 📁 crowd_counting                 # 군중 밀집도
│   │   ├── 📁 configs                   # 모델 설정 파일
│   │   ├── 📁 models
│   │   │   ├── 📁 backbones            # 백본 네트워크 (예: VGG)
│   │   │   ├── APGCC.py                # 메인 모델 구조
│   │   │   ├── Encoder.py / Decoder.py
│   │   │   ├── matcher.py / modules.py
│   │   ├── 📁 output                    # 결과 이미지 저장
│   │   ├── 📁 util                      # 유틸 함수
│   │   └── apgcc_infer.py              # 군중밀집도 인퍼런스 예시코드
│
│   ├── 📁 model                         
│   │   ├── visitor_detect.py           # 성별 연령대 메인 모델 구조
│   │   └── test.py                     # 성별 연령대 인퍼런스 예시코드
│
│   ├── 📁 src
│   │   ├── 📁 YOLOv8-DeepSORT-Object-Tracking  # YOLO+DeepSORT 동선추적 모델
│   │   └── visitor_detect.ipynb  /  movement_detecting.ipynb  # 실험 노트북
│   │
│   └── requirements.txt                # 패키지 버전 관리
│
└── 📄 README.md                        # 프로젝트 전체 설명서

```

<br/>

## 📑 프로젝트 연구 성과
- [논문 1: 딥러닝 기반 객체 인식을 통한 군중밀집도 및 동선 추적 알고리즘에 관한 연구](https://drive.google.com/file/d/101BuD1QRINqIVViTEKw_8v96uTytM03h/view?usp=sharing)
    - YOLOv8과 DeepSORT를 이용한 고객 동선 추적과 APGCC 기반 군중 밀집도 분석을 결합한 실시간 행동 분석 시스템을 제안
    - 다양한 시나리오의 영상 데이터를 활용한 실험 진행
    - 동선 추적 실험 결과, MOTA 71.2%, ID Switch 116회로 높은 정확도를 보임
    - 군중 밀집도 분석은  MAE 48명, MSE 76명으로 기존 모델 대비 최대 30% 개선
        
- [논문 2: AI 비전 기반 오프라인 공간의 온라인 데이터를 활용한 행동 예측 모델 설계에 관한 연구](https://drive.google.com/file/d/1zuieTjI2CBtVPmgTzUbhb4PyNx5jjB6E/view?usp=sharing)
    - YOLOv8과 DeepSORT 기반의 실시간 객체 추적 시스템을 활용하여 고객 행동을 분석하는 통합 모니터링 시스템을 설계
    - MOTA 71.2%, ID Switch 116회의 성능으로 기존 Tracking-by-Detection 방식 대비 우수한 정확도를 달성
    - 분석된 동선과 체류 데이터를 기반으로 히트맵과 트래픽맵을 시각화하여 혼잡도와 이동 패턴을 직관적으로 제공
    - 공간 배치 전략, 상품 진열, 마케팅 기획 등 다양한 비즈니스 의사결정에 활용 가능함을 입증

<br/>

## 📝 참고 자료

### <a href="https://drive.google.com/file/d/101BuD1QRINqIVViTEKw_8v96uTytM03h/view?usp=sharing" target="_blank">논문1 </a> | <a href="https://drive.google.com/file/d/1zuieTjI2CBtVPmgTzUbhb4PyNx5jjB6E/view?usp=sharing" target="_blank">논문2</a>

### <a href="https://drive.google.com/file/d/1pW4vdfuD9rNDTnepp86kpLcfVblzdRKL/view?usp=sharing" target="_blank">수행 계획서</a>

### <a href="https://drive.google.com/file/d/1NgPYaJ0WWilvp6KvgJUXREqFU6bwhMLK/view?usp=sharing" target="_blank">중간 발표 자료</a>

### <a href="https://youtu.be/iDVUIyVrkfc" target="_blank">시연 동영상</a>

### <a href="https://drive.google.com/file/d/1l8P5uDkvgciT3G50BEa2qxZpi9-E_244/view?usp=sharing" target="_blank">포스터</a>

### <a href="https://drive.google.com/file/d/1cN-sJrkvVY67GOnmQtYVh9RUbG3kZ9rW/view?usp=sharing" target="_blank">최종 발표 자료</a>

### <a href="" target="_blank">결과 보고서</a>

### <a href="https://stingy-class-db5.notion.site/183bbb466427805fbbc4c5304230a5f6?pvs=4" target="_blank">회의록</a>
