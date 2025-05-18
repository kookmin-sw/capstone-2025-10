'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './page.module.scss';

export default function VisitorRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    source: '',
    agreeToTerms: false
  });

  // 모바일 환경에서 뷰포트 높이 설정 및 헤더 숨기기
  useEffect(() => {
    // 뷰포트 높이 설정
    const setVhVariable = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // 헤더 요소 숨기기
    const header = document.querySelector('header');
    if (header) {
      header.style.display = 'none';
    }

    setVhVariable();
    window.addEventListener('resize', setVhVariable);
    
    return () => {
      // 컴포넌트 언마운트 시 헤더 다시 표시
      const header = document.querySelector('header');
      if (header) {
        header.style.display = '';
      }
      window.removeEventListener('resize', setVhVariable);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSourceChange = (source) => {
    setFormData({
      ...formData,
      source,
    });
  };

  const toggleTermsAgreement = () => {
    setFormData({
      ...formData,
      agreeToTerms: !formData.agreeToTerms,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 필수 항목 검증
    if (!formData.name || !formData.phoneNumber || !formData.agreeToTerms) {
      alert('모든 항목을 입력하고 개인정보 수집에 동의해주세요.');
      return;
    }
    
    // API 호출을 위한 데이터 구성
    const visitorData = {
      visitorName: formData.name,
      phoneNumber: formData.phoneNumber,
      privacyAccepted: formData.agreeToTerms,
      serviceAccepted: true, // 기본값 설정
      marketingAccepted: false, // 기본값 설정
      phoneVerified: true, // 기본값 설정
      userId: "testUser2", // 고정값
      dashboardId: 1 // 고정값
    };
    
    console.log('방문객 등록 제출:', visitorData);
    
    // API 호출
    fetch('http://localhost:8080/api/visitors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(visitorData),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('서버 응답이 올바르지 않습니다');
      }
      return response.json();
    })
    .then(data => {
      console.log('방문객 등록 성공:', data);
      alert('방문객 등록이 완료되었습니다. 감사합니다.');
    })
    .catch(error => {
      console.error('방문객 등록 실패:', error);
      alert('방문객 등록 중 오류가 발생했습니다. 다시 시도해주세요.');
    });
  };

  // 팝업 스토어 정보 데이터
  const storeInfo = {
    name: "국민대학교 캡스톤 EXPO",
    period: "2024.05.29 - 2024.05.30",
    location: "서울시 성북구 정릉로77, 본부관",
    openHours: "11:00 - 18:00",
    posterImage: "/kookmin.jpg" // 이미지 파일 변경
  };

  return (
    <div className={styles.container}>
      {/* <h1 className={styles.title}>방문객 등록</h1> */}
      
      {/* 팝업 스토어 정보 섹션 */}
      <div className={styles.storeInfoContainer}>
        <h2 className={styles.storeTitle}>팝업 스토어 정보</h2>
        
        <div className={styles.storeDetails}>
          <div className={styles.storeInfoItem}>
            <span className={styles.storeInfoLabel}>매장명</span>
            <span className={styles.storeInfoValue}>{storeInfo.name}</span>
          </div>
          <div className={styles.storeInfoItem}>
            <span className={styles.storeInfoLabel}>기간</span>
            <span className={styles.storeInfoValue}>{storeInfo.period}</span>
          </div>
          <div className={styles.storeInfoItem}>
            <span className={styles.storeInfoLabel}>위치</span>
            <span className={styles.storeInfoValue}>{storeInfo.location}</span>
          </div>
          <div className={styles.storeInfoItem}>
            <span className={styles.storeInfoLabel}>영업시간</span>
            <span className={styles.storeInfoValue}>{storeInfo.openHours}</span>
          </div>
        </div>
        
        <div className={styles.posterContainer}>
          <Image 
            src={storeInfo.posterImage}
            alt="팝업 스토어 포스터"
            width={320}
            height={180}
            className={styles.posterImage}
          />
        </div>
      </div>
      
      {/* 방문객 등록 폼 */}
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.questionContainer}>
          <h2 className={styles.questionTitle}>이름</h2>
          <input
            type="text"
            className={styles.input}
            name="name"
            placeholder="이름을 입력해주세요."
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className={styles.divider} />
        
        <div className={styles.questionContainer}>
          <h2 className={styles.questionTitle}>전화번호</h2>
          <input
            type="tel"
            className={styles.input}
            name="phoneNumber"
            placeholder="전화번호를 입력해주세요."
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
            pattern="[0-9]{3}[0-9]{4}[0-9]{4}"
            title="전화번호 형식에 맞게 입력해주세요 (예: 01012345678)"
          />
        </div>
        
        <div className={styles.divider} />
                
        
        
        <div className={styles.termsContainer}>
          <div className={styles.termsCheckbox} onClick={toggleTermsAgreement}>
            <Image 
              src={formData.agreeToTerms ? '/checkblue.svg' : '/checkgray.svg'} 
              alt="동의 체크박스" 
              width={20} 
              height={20} 
            />
            <span className={styles.termsText}>개인정보 수집 및 이용 동의</span>
          </div>
        </div>
        
        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.submitButton}>
            등록하기
          </button>
        </div>
      </form>
    </div>
  );
}
