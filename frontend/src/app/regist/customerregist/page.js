"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import { sendSMS } from "@/app/api/sms";

export default function VisitorRegistration() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    source: "",
    agreeToTerms: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 모바일 환경에서 뷰포트 높이 설정 및 헤더 숨기기
  useEffect(() => {
    // 뷰포트 높이 설정
    const setVhVariable = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    // 헤더 요소 숨기기
    const header = document.querySelector("header");
    if (header) {
      header.style.display = "none";
    }

    setVhVariable();
    window.addEventListener("resize", setVhVariable);

    return () => {
      // 컴포넌트 언마운트 시 헤더 다시 표시
      const header = document.querySelector("header");
      if (header) {
        header.style.display = "";
      }
      window.removeEventListener("resize", setVhVariable);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    // 필수 항목 (이름, 전화번호) 및 개인정보 동의 확인
    if (!formData.name || !formData.phoneNumber) {
      alert("이름과 전화번호를 모두 입력해주세요.");
      setIsSubmitting(false);
      return;
    }

    if (!formData.agreeToTerms) {
      alert("개인정보 수집 및 이용에 동의해주세요.");
      setIsSubmitting(false);
      return;
    }

    try {
      // 1. 방문자 정보 백엔드 API로 전송
      const visitorData = {
        visitorName: formData.name,
        phoneNumber: formData.phoneNumber,
        privacyAccepted: formData.agreeToTerms,
        serviceAccepted: true, // 고정값
        marketingAccepted: false, // 고정값
        phoneVerified: true, // 고정값 (SMS 인증 후 변경 가능)
        userId: "testUser2", // 고정값 또는 동적 할당 필요
        dashboardId: 1, // 고정값 또는 동적 할당 필요
      };

      const visitorResponse = await fetch("https://back.offflow.co.kr/api/visitors", { // HTTP 프로토콜 명시
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(visitorData),
      });

      if (!visitorResponse.ok) {
        // API 호출 실패 시 처리
        const errorData = await visitorResponse.json().catch(() => ({ message: "방문자 정보 저장에 실패했습니다." }));
        console.error("방문자 정보 저장 실패:", visitorResponse.status, errorData);
        alert(`방문자 정보 저장에 실패했습니다: ${errorData.message || visitorResponse.statusText}. 문제가 지속되면 관리자에게 문의하세요.`);
        setIsSubmitting(false);
        return;
      }

      const visitorResult = await visitorResponse.json();
      console.log("방문자 정보 저장 성공:", visitorResult);

      // 2. SMS 발송 및 페이지 이동 로직
      const smsContent = `[오프플로우] ${formData.name}님\n2025 KMUCS EXPO 행사 등록이 완료되었습니다.\n\n■ 2025 KMUCS EXPO\n기간 : 05/30 (금)\n장소 : 국민대학교 본부관 1층, 학술회의장\n시간 : 09:30 ~ 17:30\n\n■ 문의처\n오프플로우 : 010-7494-1426`;

      const smsResult = await sendSMS({
        recipients: [formData.phoneNumber],
        content: smsContent,
        title: "2025 KMUCS EXPO 등록 완료",
        type: "LMS"
      });

      if (smsResult && smsResult.success) {
        console.log("SMS 발송 성공:", smsResult);
        router.push("/regist/customerregist/success");
      } else {
        console.error("SMS 발송 실패:", smsResult ? smsResult.error : '알 수 없는 오류');
        alert(
          "SMS 발송에 실패했습니다. 잠시 후 다시 시도해주세요. 문제가 지속되면 관리자에게 문의하세요."
        );
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("등록 처리 중 오류:", error);
      alert(
        "등록 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요. 문제가 지속되면 관리자에게 문의하세요."
      );
      setIsSubmitting(false);
    }
  };

  // 팝업 스토어 정보 데이터
  const storeInfo = {
    name: "국민대학교 캡스톤 EXPO",
    period: "2024.05.29 - 2024.05.30",
    location: "서울시 성북구 정릉로77, 본부관",
    openHours: "11:00 - 18:00",
    posterImage: "/kookmin.jpg", // 이미지 파일 변경
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
              src={formData.agreeToTerms ? "/checkblue.svg" : "/checkgray.svg"}
              alt="동의 체크박스"
              width={20}
              height={20}
            />
            <span className={styles.termsText}>개인정보 수집 및 이용 동의</span>
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
            {isSubmitting ? '등록 중...' : '등록하기'}
          </button>
        </div>
      </form>
    </div>
  );
}
