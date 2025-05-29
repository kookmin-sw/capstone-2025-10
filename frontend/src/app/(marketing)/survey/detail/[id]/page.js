"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import styles from './page.module.scss'; // SCSS 모듈 import

export default function SurveyDetailPage() {
  const params = useParams();
  const surveyId = params.id; // URL에서 surveyId 가져오기
  const [surveyAnswers, setSurveyAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!surveyId) {return;}

    const fetchSurveyAnswers = async () => {
      setLoading(true);
      setError(null);
      try {
        // API URL의 포트가 8080으로 되어 있어 CORS 문제가 발생할 수 있습니다.
        // 실제 운영 시에는 Next.js API 라우트를 통해 호출하거나 백엔드에서 CORS 설정을 해야 합니다.
        const response = await fetch(`https://back.offflow.co.kr/api/survey/${surveyId}/surveyAnswer`);
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        const data = await response.json();
        setSurveyAnswers(data);
      } catch (err) {
        console.error("Failed to fetch survey answers:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSurveyAnswers();
  }, [surveyId]);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  if (surveyAnswers.length === 0) {
    return <div className={styles.noData}>No survey answers found for this survey.</div>;
  }

  // member/detail 페이지와 유사한 구조로 내용을 표시 (임시)
  // 실제 디자인은 member/detail의 page.js와 page.module.scss를 참조하여 구성해야 합니다.
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>설문조사 상세 결과</h1>
      <h2 className={styles.surveyIdText}>Survey ID: {surveyId}</h2>
      
      {surveyAnswers.map((answer) => (
        <div key={answer.id} className={styles.answerCard}>
          <h3 className={styles.answerTitle}>답변 ID: {answer.id} (방문객 ID: {answer.visitorId})</h3>
          <ul className={styles.answerList}>
            <li><strong>연령:</strong> {answer.ageQuestion}</li>
            <li><strong>성별:</strong> {answer.genderQuestion}</li>
            <li><strong>인지 경로:</strong> {answer.knowRoute}</li>
            <li><strong>가장 좋았던 점:</strong> {answer.bestThing}</li>
            <li><strong>개선되었으면 하는 점:</strong> {answer.worstThing}</li>
            <li><strong>추가 건의사항:</strong> {answer.additionalThing}</li>
            <li><strong>등록일:</strong> {new Date(answer.registerDate).toLocaleString()}</li>
          </ul>
        </div>
      ))}
    </div>
  );
}
