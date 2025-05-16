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

[📝 참고 자료](#-참고-자료)

<br/> 

## 💡 프로젝트 소개

<div align="center"> 
    <p align = "center">
    <img src = "https://raw.githubusercontent.com/kookmin-sw/capstone-2025-10/master/assets/poster.png" width = "60%"/>
    </p>
</div>

### | AI 비전 기반 오프라인 데이터 시각화 서비스
-  **OFFFLOW**는 팝업스토어와 같은 오프라인 공간에서 AI기반 객체인식 기술을 활용하여 **고객 동선 및 군중 밀집도를 실시간으로 분석**하고 방문 고객의 **성별, 연령대와 체류 시간을 온라인 데이터로 변환 및 시각화**하여 제공합니다.

-  **OFFFLOW**는 변환된 데이터를 안전하게 수집하고 다양한 채널에서 발생하는 **고객 데이터를 통합 관리할 수 있는 대시보드 서비스**를 제공합니다.

-  **OFFFLOW**는 매장 운영자가 **실시간으로 고객 흐름**을 파악하고, 혼잡 구간을 조정하거나 상품 배치를 최적화함으로써 **오프라인 공간의 운영 효율성**을 높일 수 있도록 지원합니다.

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


<br/>

## 👋 팀원 소개

<table>
    <tr align="center">
        <td style="min-width: 150px;">
            <a href="https://github.com/millook">
              <img src="https://avatars.githubusercontent.com/u/134192611?v=4" width="80">
              <br />
              <b>김민준</b>
            </a> 
            <br/>
              20171591
        </td>
        <td style="min-width: 150px;">
            <a href="https://github.com/skan9708">
              <img src="https://avatars.githubusercontent.com/u/19978313?v=4" width="80">
              <br />
              <b>최진혁</b>
            </a>
            <br/>
              20171715
        </td>
        <td style="min-width: 150px;">
            <a href="https://github.com/HO22">
              <img src="https://avatars.githubusercontent.com/u/38872856?v=4" width="80">
              <br />
              <b>김린회 </b>
            </a> 
            <br/>
              20181581
        </td>
        <td style="min-width: 150px;">
            <a href="https://github.com/seongjeongkyu1">
              <img src="https://avatars.githubusercontent.com/u/113752290?v=4" width="80">
              <br />
              <b>성정규</b>
            </a> 
            <br/>
              20191610
        </td>
        <td style="min-width: 150px;">
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
            AI
        </td>
                <td>
            AI
        </td>
    </tr>
    <tr align="center">
        <td>
            <span style="font-size: 12px;">kkmj1374@kookmin.ac.kr</span>
        </td>
        <td>
            <span style="font-size: 12px;">skan9708@kookmin.ac.kr</span>
        </td>
        <td>
            <span style="font-size: 12px;">flsghl@kookmin.ac.kr</span>
        </td>
                <td>
            <span style="font-size: 12px;">juku1133@gmail.com</span>
        </td>
                <td>
            <span style="font-size: 12px;">nornen20@kookmin.ac.kr</span>
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

## 🚀 실행 방법


<br/>

## 📂 폴더 구조
```
├── 📂.github

├── 📂frontend 

├── 📂backend       

├── 📂ai      

└── 📜 package

└── 📕 README.md
```

<br/>

## 📝 참고 자료
### 논문
<a href="" target="_blank">
<p align = "center">
  <img src="https://raw.githubusercontent.com/kookmin-sw/capstone-2025-10/master/assets/paper_1.png" width="40%">
<a href="" target="_blank">
  <img src="https://raw.githubusercontent.com/kookmin-sw/capstone-2025-10/master/assets/paper_2.png" width="40%">
</a>

### [중간 발표 자료]()
### [중간 보고서]()
### [시연 동영상]()
### [포스터]()
### [최종 발표 자료]()
### [결과 보고서]()
### [회의록]()
