"use client";
import React, { useState, useEffect } from "react";
import styles from "./page.module.scss";
import Header from "../../components/Header";
import CardContainer from "../../components/CardContainer";

export default function MemberDetailPage() {
  // 회원 정보 상태 (실제로는 API에서 가져올 데이터)
  const [memberInfo, setMemberInfo] = useState({
    name: "홍길동",
    userId: "hong123",
    password: "••••••••", // 보안상 실제 비밀번호는 표시하지 않음
    phone: "010-1234-5678"
  });

  // 뒤로가기 버튼 핸들러
  const handleBack = () => {
    window.history.back();
  };

  // 헤더 액션 요소 (뒤로가기 버튼만 표시)
  const headerActions = (
    <>
      <button 
        className={styles.backButton}
        onClick={handleBack}
      >
        목록으로
      </button>
    </>
  );

  return (
    <div className={styles.layout}>
      {/* 헤더 */}
      <Header />
      
      {/* 메인 콘텐츠 */}
      <div className={styles.mainContent}>
        {/* 회원 상세 정보 카드 */}
        <CardContainer 
          title="방문객 계정 상세" 
          headerActions={headerActions}
        >
          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>기본 정보</h3>
            
            <div className={styles.formGrid}>
              <div className={styles.formRow}>
                <label className={styles.formLabel}>방문객명</label>
                <div className={styles.formInput}>
                  <div className={styles.readOnlyField}>
                    {memberInfo.name}
                  </div>
                </div>
              </div>
              
              <div className={styles.formRow}>
                <label className={styles.formLabel}>아이디</label>
                <div className={styles.formInput}>
                  <div className={styles.readOnlyField}>
                    {memberInfo.userId}
                  </div>
                </div>
              </div>
              
              <div className={styles.formRow}>
                <label className={styles.formLabel}>비밀번호</label>
                <div className={styles.formInput}>
                  <div className={styles.readOnlyField}>
                    {memberInfo.password}
                  </div>
                </div>
              </div>
              
              <div className={styles.formRow}>
                <label className={styles.formLabel}>전화번호</label>
                <div className={styles.formInput}>
                  <div className={styles.readOnlyField}>
                    {memberInfo.phone}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContainer>
      </div>
    </div>
  );
}