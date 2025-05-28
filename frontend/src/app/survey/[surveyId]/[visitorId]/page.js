"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import Image from "next/image";

export default function SurveyPage() {
  const [formData, setFormData] = useState({
    ageQuestion: "",
    genderQuestion: "",
    knowRoute: [],
    otherRoute: "",
    bestThing: "",
    worstThing: "",
    additionalThing: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRequiredCompleted, setIsRequiredCompleted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const ageOptions = ["10대", "20대", "30대", "40대", "50대 이상"];
  const genderOptions = ["남자", "여자"];
  const routeOptions = [
    "SNS(페이스북, 인스타그램)",
    "지인 추천",
    "홍보 현수막",
    "기타",
  ];

  // 필수 항목(1-3번) 완료 여부를 체크하는 함수
  const checkRequiredFields = () => {
    const isAgeCompleted = !!formData.ageQuestion;
    const isGenderCompleted = !!formData.genderQuestion;
    const isRouteCompleted = formData.knowRoute.length > 0;

    // 기타 항목이 선택되었지만 내용이 입력되지 않은 경우 처리
    const isOtherRouteCompleted = formData.knowRoute.includes("기타")
      ? !!formData.otherRoute
      : true;

    return (
      isAgeCompleted &&
      isGenderCompleted &&
      isRouteCompleted &&
      isOtherRouteCompleted
    );
  };

  // formData가 변경될 때마다 필수 항목 완료 여부 체크
  useEffect(() => {
    setIsRequiredCompleted(checkRequiredFields());
  }, [formData]);

  const handleOptionSelect = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const handleRouteSelect = (route) => {
    if (formData.knowRoute.includes(route)) {
      // 이미 선택된 항목 제거
      setFormData({
        ...formData,
        knowRoute: formData.knowRoute.filter((item) => item !== route),
        // 기타 항목 제거 시 기타 텍스트도 초기화
        ...(route === "기타" ? { otherRoute: "" } : {}),
      });
    } else {
      // 새 항목 추가
      setFormData({
        ...formData,
        knowRoute: [...formData.knowRoute, route],
      });
    }

    if (errors.knowRoute) {
      setErrors({ ...errors, knowRoute: null });
    }
  };

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.ageQuestion) {
      newErrors.ageQuestion = "연령대를 선택해주세요.";
    }

    if (!formData.genderQuestion) {
      newErrors.genderQuestion = "성별을 선택해주세요.";
    }

    if (formData.knowRoute.length === 0) {
      newErrors.knowRoute = "최소 한 개 이상의 경로를 선택해주세요.";
    }

    if (formData.knowRoute.includes("기타") && !formData.otherRoute) {
      newErrors.otherRoute = "기타 경로를 입력해주세요.";
    }

    return newErrors;
  };

  const closeModal = () => {
    setShowModal(false);
    // 폼 초기화
    setFormData({
      ageQuestion: "",
      genderQuestion: "",
      knowRoute: [],
      otherRoute: "",
      bestThing: "",
      worstThing: "",
      additionalThing: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);

    // 서버에 제출할 데이터 형식 구성
    const submitData = {
      visitorId: 3, // 이 부분은 실제로는 동적으로 설정되어야 함
      surveyId: 1, // 이 부분은 실제로는 동적으로 설정되어야 함
      ageQuestion: formData.ageQuestion,
      genderQuestion: formData.genderQuestion,
      knowRoute:
        formData.knowRoute.join(", ") +
        (formData.otherRoute ? `, ${formData.otherRoute}` : ""),
      bestThing: formData.bestThing,
      worstThing: formData.worstThing,
      additionalThing: formData.additionalThing,
    };

    try {
      // API 호출
      const response = await fetch(
        "https://back.offflow.co.kr/api/survey/surveyAnswer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(submitData),
        },
      );

      if (!response.ok) {
        throw new Error("서버 응답이 정상적이지 않습니다.");
      }

      const result = await response.json();
      console.log("제출 결과:", result);

      // 성공 시 모달 표시
      setShowModal(true);
    } catch (error) {
      console.error("설문 제출 중 오류 발생:", error);
      alert("설문 제출 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div style={{ width: "100%" }}>
        <form
          className={styles.form}
          onSubmit={handleSubmit}
          style={{ width: "100%", maxWidth: "100%", boxSizing: "border-box" }}
        >
          <h1 className={styles.title}>설문조사</h1>

          {/* 1. 연령대 질문 */}
          <div className={styles.question}>
            <p>1. 귀하의 연령대는 무엇입니까?</p>
            {ageOptions.map((age) => (
              <button
                key={age}
                type="button"
                className={`${styles.routeButton} ${formData.ageQuestion === age ? styles.selected : ""}`}
                onClick={() => handleOptionSelect("ageQuestion", age)}
              >
                {age}
              </button>
            ))}
            {errors.ageQuestion && (
              <p className={styles.errorText}>{errors.ageQuestion}</p>
            )}
          </div>

          {/* 2. 성별 질문 */}
          <div className={styles.question}>
            <p>2. 귀하의 성별은 무엇입니까?</p>
            {genderOptions.map((gender) => (
              <button
                key={gender}
                type="button"
                className={`${styles.routeButton} ${formData.genderQuestion === gender ? styles.selected : ""}`}
                onClick={() => handleOptionSelect("genderQuestion", gender)}
              >
                {gender}
              </button>
            ))}
            {errors.genderQuestion && (
              <p className={styles.errorText}>{errors.genderQuestion}</p>
            )}
          </div>

          {/* 3. 팝업을 알게된 경로 */}
          <div className={styles.question}>
            <p>3. 해당 팝업을 알게된 경로가 무엇입니까? (복수 선택 가능)</p>
            {routeOptions.map((route) => (
              <button
                key={route}
                type="button"
                className={`${styles.routeButton} ${formData.knowRoute.includes(route) ? styles.selected : ""}`}
                onClick={() => handleRouteSelect(route)}
              >
                {route}
              </button>
            ))}

            {errors.knowRoute && (
              <p className={styles.errorText}>{errors.knowRoute}</p>
            )}

            {formData.knowRoute.includes("기타") && (
              <div>
                <label className={styles.otherLabel}>
                  기타의 내용을 작성해주세요. (주관식)
                </label>
                <input
                  type="text"
                  name="otherRoute"
                  value={formData.otherRoute}
                  onChange={handleTextChange}
                  maxLength={80}
                  placeholder="내용을 입력해주세요."
                  className={styles.otherInput}
                />
                {errors.otherRoute && (
                  <p className={styles.errorText}>{errors.otherRoute}</p>
                )}
              </div>
            )}
          </div>

          {/* 4. 좋았던 점 */}
          <div className={styles.question}>
            <p>4. 해당 행사에서 가장 좋았던 점은 무엇입니까? (주관식)</p>
            <textarea
              name="bestThing"
              value={formData.bestThing}
              onChange={handleTextChange}
              maxLength={160}
              placeholder="내용을 입력해주세요."
              className={styles.textarea}
            />
            <div className={styles.charCount}>
              {formData.bestThing.length}/160
            </div>
          </div>

          {/* 5. 안좋았던 점 */}
          <div className={styles.question}>
            <p>5. 해당 행사에서 가장 안좋았던 점은 무엇입니까? (주관식)</p>
            <textarea
              name="worstThing"
              value={formData.worstThing}
              onChange={handleTextChange}
              maxLength={160}
              placeholder="내용을 입력해주세요."
              className={styles.textarea}
            />
            <div className={styles.charCount}>
              {formData.worstThing.length}/160
            </div>
          </div>

          {/* 6. 추가 사항 */}
          <div className={styles.question}>
            <p>6. 추가적으로 바라는 사항은 무엇입니까? (주관식)</p>
            <textarea
              name="additionalThing"
              value={formData.additionalThing}
              onChange={handleTextChange}
              maxLength={160}
              placeholder="내용을 입력해주세요."
              className={styles.textarea}
            />
            <div className={styles.charCount}>
              {formData.additionalThing.length}/160
            </div>
          </div>

          <button
            type="submit"
            className={`${styles.submitButton} ${isRequiredCompleted ? styles.active : ""}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "제출 중..." : "제출하기"}
          </button>
        </form>
      </div>

      {/* 완료 모달 */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button className={styles.closeButton} onClick={closeModal}>
              ×
            </button>
            <Image
              src="/check-circle.svg"
              alt="완료"
              width={56}
              height={56}
              className={styles.checkIcon}
            />
            <p className={styles.completeText}>제출이 완료되었습니다.</p>
          </div>
        </div>
      )}
    </>
  );
}
