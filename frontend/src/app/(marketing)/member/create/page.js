"use client";
import React, { useState, useEffect } from "react";
import styles from "./page.module.scss";
import Header from "@/components/Header";
import CardContainer from "@/components/CardContainer";
import TextInput from "@/components/Input/TextInput";
import { createVisitor } from "@/lib/api/visitor";
import { useRouter } from "next/navigation";

export default function MemberCreatePage() {
  const router = useRouter();
  
  // 회원 정보 상태
  const [memberInfo, setMemberInfo] = useState({
    name: "",
    userId: "",
    password: "",
    passwordConfirm: "",
    phone: ""
  });

  // 폼 유효성 상태
  const [isValid, setIsValid] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [loading, setLoading] = useState(false);

  // 입력값 변경 처리
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMemberInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 비밀번호 일치 여부 및 모든 필드 입력 여부 확인
  useEffect(() => {
    // 비밀번호 일치 여부 체크
    if (memberInfo.password && memberInfo.passwordConfirm) {
      setPasswordMatch(memberInfo.password === memberInfo.passwordConfirm);
    } else {
      setPasswordMatch(true); // 둘 중 하나라도 비어있으면 경고 표시 안함
    }

    // 모든 필드가 입력되었는지 확인
    const allFieldsFilled = Object.values(memberInfo).every(value => value.trim() !== "");
    setIsValid(allFieldsFilled && passwordMatch);
  }, [memberInfo, passwordMatch]);

  // 저장 버튼 핸들러
  const handleSave = async () => {
    if (!isValid || loading) {return;}

    try {
      setLoading(true);
      
      // 서버에 전송할 데이터 준비
      const visitorData = {
        name: memberInfo.name,
        userId: memberInfo.userId,
        password: memberInfo.password,
        phone: memberInfo.phone
      };
      
      // 대시보드 ID 1로 방문객 생성 API 호출
      await createVisitor(visitorData, 1);
      
      alert("방문객 계정이 생성되었습니다.");
      router.push('/member'); // 목록 페이지로 이동
    } catch (error) {
      console.error("방문객 계정 생성 중 오류 발생:", error);
      alert("방문객 계정 생성에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 취소 버튼 핸들러
  const handleCancel = () => {
    // 취소 로직 (예: 이전 페이지로 이동)
    if(confirm("입력 내용이 저장되지 않습니다. 취소하시겠습니까?")) {
      // 취소 처리 (페이지 이동 등)
      router.back();
    }
  };

  // 헤더 액션 요소
  const headerActions = (
    <>
      <button
        className={styles.cancelButton}
        onClick={handleCancel}
        disabled={loading}
      >
        취소
      </button>
      <button
        className={`${styles.createButton} ${isValid ? styles.active : ''}`}
        onClick={handleSave}
        disabled={!isValid || loading}
      >
        {loading ? "생성 중..." : "생성"}
      </button>
    </>
  );

  return (
    <div className={styles.layout}>
      {/* 메인 콘텐츠 */}
      <div className={styles.mainContent}>
        {/* 회원 생성 카드 */}
        <CardContainer
          title="방문객 계정 생성"
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
                    onChange={handleInputChange}
                    placeholder="방문객명을 입력해 주세요"
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
                    onChange={handleInputChange}
                    placeholder="아이디를 입력해 주세요"
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
                    onChange={handleInputChange}
                    placeholder="비밀번호를 입력해 주세요"
                    className={styles.inputField}
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <label className={styles.formLabel}>비밀번호 재입력</label>
                <div className={styles.formInput}>
                  <input
                    type="password"
                    name="passwordConfirm"
                    value={memberInfo.passwordConfirm}
                    onChange={handleInputChange}
                    placeholder="비밀번호를 다시 입력해 주세요"
                    className={`${styles.inputField} ${!passwordMatch && memberInfo.passwordConfirm ? styles.error : ''}`}
                  />
                  {!passwordMatch && (
                    <p className={styles.errorText}>비밀번호가 일치하지 않습니다.{'\n'}다시 입력해 주세요.</p>
                  )}
                </div>
              </div>

              <div className={styles.formRow}>
                <label className={styles.formLabel}>전화번호</label>
                <div className={styles.formInput}>
                  <input
                    type="tel"
                    name="phone"
                    value={memberInfo.phone}
                    onChange={handleInputChange}
                    placeholder="전화번호를 입력해 주세요"
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
