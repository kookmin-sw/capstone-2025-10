"use client"; // 클라이언트 컴포넌트로 명시

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react'; // useState 제거
// import Lottie from "lottie-react"; // Lottie 제거
import styles from './page.module.scss';

// 임시 로고 경로입니다. 실제 경로로 수정해주세요.
const LOGO_URL = '/logo.png'; // 예시: public 폴더의 logo.png

export default function RegistrationSuccessPage() {
  // const [animationData, setAnimationData] = useState(null); // Lottie 관련 state 제거

  // 헤더 및 사이드 메뉴 숨김 처리
  useEffect(() => {
    const header = document.querySelector('header');
    const sideMenu = document.querySelector('.side-menu-selector'); // 실제 사이드 메뉴 선택자로 변경 필요

    if (header) header.style.display = 'none';
    if (sideMenu) sideMenu.style.display = 'none';

    // fetch('/Animation - 1748527190437.json') // Lottie 데이터 fetch 제거
    //   .then((response) => response.json())
    //   .then((data) => setAnimationData(data))
    //   .catch((error) => console.error('Error fetching animation data:', error));

    return () => {
      if (header) header.style.display = ''; // 원래 상태로 복원
      if (sideMenu) sideMenu.style.display = ''; // 원래 상태로 복원
    };
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.pageHeader}>
        <h1 className={styles.mainTitle}>행사 신청이 완료되었습니다.</h1>
      </header>

      <section id="event-details" className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>신청 행사 정보</h2>
          {/* <span className={styles.arrowIcon}>^</span> */}
        </div>
        <div className={styles.cardBody}>
          <p className={styles.eventMainTitle}>2025 KMUCS EXPO</p> {/* 요청하신 텍스트로 수정 */}
          <p className={styles.eventTimeDate}>05월30일 (금) 09:30 ~ 17:30</p>
          <p className={styles.eventLocation}>국민대학교 본부관 1층, 학술회의장</p>
          <a href="https://calendar.google.com" className={styles.calendarLink} target="_blank" rel="noopener noreferrer"> 
            {/* 구글 캘린더 아이콘은 SVG나 FontAwesome 등으로 추가 가능 */}
            구글캘린더에 추가하기
          </a>
        </div>
      </section>

      <div className={styles.buttonGroup}>
        <Link href="https://expo.cs.kookmin.ac.kr/" className={`${styles.button} ${styles.viewButton}`}>
          신청행사 보기
        </Link>
        <Link href="https://github.com/kookmin-sw/capstone-2025-10/tree/fix/frontend/%ED%9A%8C%EC%9B%90%EA%B4%80%EB%A6%AC" className={`${styles.button} ${styles.moreButton}`}>
          오프플로우 소개
        </Link>
      </div>

      {/* <section className={styles.userInfoSection}>
        <h2 className={styles.infoTitle}>신청 정보</h2>
        <p className={styles.userDetail}>이름: [사용자 이름]</p>
        <p className={styles.userDetail}>전화번호: [사용자 전화번호]</p>
      </section> */} {/* 신청 정보 섹션 삭제 */}

      {/* 기존 로고 및 확인 버튼은 제거되었으므로 주석 처리 또는 삭제합니다. 
          로고가 필요하다면 pageHeader나 다른 적절한 위치에 배치할 수 있습니다.
      <Image src={LOGO_URL} alt="로고" width={150} height={50} className={styles.logo} /> 
      <Link href="/" className={styles.homeButton}>확인</Link> 
      */}
    </div>
  );
} 