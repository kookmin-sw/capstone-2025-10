"use client";
import React, { useState, useEffect } from "react";
import styles from "./page.module.scss";
import CardContainer from "@/components/CardContainer";
import { useRouter } from "next/navigation";
import { fetchUserById, mapUserFromBackend } from "@/lib/api/user";

export default function MemberDetailPage({ params }) {
  const router = useRouter();
  const { id } = params;
  const [memberInfo, setMemberInfo] = useState({
    name: "",
    userId: "",
    password: "",
    phone: "",
    date: "",
    visits: 0,
    registerDate: "",
    privacyAccepted: "",
    serviceAccepted: ""
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 방문객 정보 로드
  useEffect(() => {
    const getUserDetails = async () => {
      setIsLoading(true);
      try {
        const userData = await fetchUserById(id);
        const mappedData = mapUserFromBackend(userData);
        setMemberInfo(mappedData);
        setError(null);
      } catch (err) {
        console.error(`방문객 ID ${id} 데이터 로딩 실패:`, err);
        setError("방문객 정보를 불러오는데 실패했습니다.");
        
        // 개발 목적으로 더미 데이터 사용 (실제 환경에서는 제거)
        if (id === "1") {
          setMemberInfo({
            id: 1,
            name: "김민준",
            userId: "minjun",
            password: "********",
            phone: "010-1234-1234",
            date: "2025.02.06",
            visits: 0,
            registerDate: "2025.02.06",
            privacyAccepted: "Y",
            serviceAccepted: "Y"
          });
        } else {
          // 방문객을 찾을 수 없는 경우 목록 페이지로 리디렉션
          alert("방문객 정보를 찾을 수 없습니다.");
          router.push("/member");
        }
      } finally {
        setIsLoading(false);
      }
    };

    getUserDetails();
  }, [id, router]);

  // 뒤로가기 버튼 핸들러
  const handleGoBack = () => {
    router.back();
  };

  // 헤더 액션 요소
  const headerActions = (
    <button
      className={styles.backButton}
      onClick={handleGoBack}
    >
      뒤로가기
    </button>
  );

  if (isLoading) {
    return (
      <div className={styles.layout}>
        <div className={styles.mainContent}>
          <div className={styles.loading}>데이터를 불러오는 중...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.layout}>
        <div className={styles.mainContent}>
          <div className={styles.error}>
            {error}
            <button onClick={() => router.push("/member")} className={styles.backButton}>
              목록으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.layout}>
      <div className={styles.mainContent}>
        <CardContainer
          title="방문객 상세 정보"
          headerActions={headerActions}
        >
          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>기본 정보</h3>

            <div className={styles.formGrid}>
              <div className={styles.formRow}>
                <label className={styles.formLabel}>방문객명</label>
                <div className={styles.formInput}>
                  <input
                    type="text"
                    name="name"
                    value={memberInfo.name}
                    readOnly
                    className={styles.inputField}
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <label className={styles.formLabel}>아이디</label>
                <div className={styles.formInput}>
                  <input
                    type="text"
                    name="userId"
                    value={memberInfo.userId}
                    readOnly
                    className={styles.inputField}
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <label className={styles.formLabel}>전화번호</label>
                <div className={styles.formInput}>
                  <input
                    type="tel"
                    name="phone"
                    value={memberInfo.phone}
                    readOnly
                    className={styles.inputField}
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <label className={styles.formLabel}>첫 방문 예약일</label>
                <div className={styles.formInput}>
                  <input
                    type="text"
                    name="date"
                    value={memberInfo.date}
                    readOnly
                    className={styles.inputField}
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <label className={styles.formLabel}>가입 일자</label>
                <div className={styles.formInput}>
                  <input
                    type="text"
                    name="registerDate"
                    value={memberInfo.registerDate}
                    readOnly
                    className={styles.inputField}
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <label className={styles.formLabel}>개인정보 동의</label>
                <div className={styles.formInput}>
                  <input
                    type="text"
                    name="privacyAccepted"
                    value={memberInfo.privacyAccepted === 'Y' ? '동의함' : '동의하지 않음'}
                    readOnly
                    className={styles.inputField}
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <label className={styles.formLabel}>서비스 약관 동의</label>
                <div className={styles.formInput}>
                  <input
                    type="text"
                    name="serviceAccepted"
                    value={memberInfo.serviceAccepted === 'Y' ? '동의함' : '동의하지 않음'}
                    readOnly
                    className={styles.inputField}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContainer>
      </div>
    </div>
  );
} 