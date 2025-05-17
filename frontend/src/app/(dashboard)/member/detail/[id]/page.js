"use client";
import React, { useState, useEffect } from "react";
import styles from "./page.module.scss";
import CardContainer from "@/components/CardContainer";
import { useRouter } from "next/navigation";
import { fetchVisitorById } from "@/lib/api/visitor";

export default function MemberDetailPage({ params }) {
  const router = useRouter();
  const { id } = params;
  const [memberInfo, setMemberInfo] = useState({
    name: "",
    userId: "",
    password: "",
    phone: "",
    date: "",
    visits: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 방문객 정보 로드
  useEffect(() => {
    const loadVisitorDetails = async () => {
      try {
        setLoading(true);
        const visitorId = parseInt(id);
        const visitorData = await fetchVisitorById(visitorId);
        
        if (visitorData) {
          setMemberInfo({
            name: visitorData.name,
            userId: visitorData.userId || "-",
            password: visitorData.password || "********",
            phone: visitorData.phone || "-",
            date: visitorData.date || "-",
            visits: visitorData.visits || 0
          });
          setError(null);
        } else {
          setError("방문객 정보를 찾을 수 없습니다.");
          // 에러 발생 시 3초 후 목록 페이지로 리디렉션
          setTimeout(() => router.push("/member"), 3000);
        }
      } catch (err) {
        console.error("방문객 상세 정보 로딩 실패:", err);
        setError("방문객 상세 정보를 불러오는데 실패했습니다.");
        
        // 개발용 더미 데이터 사용 (실제 환경에서는 제거)
        const dummyVisitors = [
          { id: 1, name: "kea", phone: "010-1111-1111", date: "2025.01.01", visits: 1, userId: "kea123", password: "********" },
          { id: 2, name: "theyday1", phone: "010-2222-2222", date: "2025.02.02", visits: 12, userId: "theyday", password: "********" },
          { id: 3, name: "ashercom", phone: "010-3333-3333", date: "2025.03.03", visits: 5, userId: "asher", password: "********" },
          { id: 4, name: "jungdo1000", phone: "010-4444-4444", date: "2025.04.04", visits: 80, userId: "jungdo", password: "********" },
          { id: 5, name: "minjae97", phone: "010-5555-5555", date: "2025.05.05", visits: 3, userId: "minjae", password: "********" },
          { id: 6, name: "devsunny", phone: "010-6666-6666", date: "2025.06.06", visits: 42, userId: "sunny", password: "********" },
          { id: 7, name: "codeman", phone: "010-7777-7777", date: "2025.07.07", visits: 15, userId: "codeman", password: "********" },
          { id: 8, name: "techstar", phone: "010-8888-8888", date: "2025.08.08", visits: 27, userId: "techstar", password: "********" },
        ];
        
        const visitorId = parseInt(id);
        const visitor = dummyVisitors.find(v => v.id === visitorId);
        
        if (visitor) {
          setMemberInfo({
            name: visitor.name,
            userId: visitor.userId,
            password: visitor.password,
            phone: visitor.phone,
            date: visitor.date,
            visits: visitor.visits
          });
        }
      } finally {
        setLoading(false);
      }
    };

    loadVisitorDetails();
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

  if (loading) {
    return (
      <div className={styles.layout}>
        <div className={styles.mainContent}>
          <CardContainer title="방문객 상세 정보" headerActions={headerActions}>
            <div className={styles.loadingContainer}>데이터를 불러오는 중...</div>
          </CardContainer>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.layout}>
        <div className={styles.mainContent}>
          <CardContainer title="방문객 상세 정보" headerActions={headerActions}>
            <div className={styles.errorContainer}>
              <p>{error}</p>
              <p>잠시 후 목록 페이지로 이동합니다...</p>
            </div>
          </CardContainer>
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
                <label className={styles.formLabel}>비밀번호</label>
                <div className={styles.formInput}>
                  <input
                    type="password"
                    name="password"
                    value={memberInfo.password}
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
                <label className={styles.formLabel}>첫 방문일</label>
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
                <label className={styles.formLabel}>방문 횟수</label>
                <div className={styles.formInput}>
                  <input
                    type="text"
                    name="visits"
                    value={`${memberInfo.visits}회`}
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