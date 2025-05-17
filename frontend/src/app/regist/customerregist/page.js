'use client';

import { useState } from 'react';
import styles from './page.module.scss';

export default function SurveyPage() {
  const [answers, setAnswers] = useState({
    question1: '',
    question2: '',
    question3: '',
  });

  const handleChange = (e, question) => {
    setAnswers({
      ...answers,
      [question]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('설문 제출:', answers);
    // 여기에 API 호출 등의 제출 로직 추가
    alert('설문이 제출되었습니다. 감사합니다.');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>설문조사</h1>
      
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.questionContainer}>
          <h2 className={styles.questionTitle}>
            4. 해당 행사에서 가장 좋았던 점은 무엇입니까? (주관식)
          </h2>
          <textarea
            className={styles.textarea}
            placeholder="내용을 입력해주세요."
            value={answers.question1}
            onChange={(e) => handleChange(e, 'question1')}
          />
        </div>
        
        <div className={styles.divider} />
        
        <div className={styles.questionContainer}>
          <h2 className={styles.questionTitle}>
            5. 해당 행사에서 가장 안좋았던 점은 무엇입니까? (주관식)
          </h2>
          <textarea
            className={styles.textarea}
            placeholder="내용을 입력해주세요."
            value={answers.question2}
            onChange={(e) => handleChange(e, 'question2')}
          />
        </div>
        
        <div className={styles.divider} />
        
        <div className={styles.questionContainer}>
          <h2 className={styles.questionTitle}>
            6. 추가적으로 바라는 사항은 무엇입니까? (주관식)
          </h2>
          <textarea
            className={styles.textarea}
            placeholder="내용을 입력해주세요."
            value={answers.question3}
            onChange={(e) => handleChange(e, 'question3')}
          />
        </div>
        
        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.submitButton}>
            제출하기
          </button>
        </div>
      </form>
    </div>
  );
}
