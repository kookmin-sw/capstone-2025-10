"use client";

import React, { useState } from 'react';
import styles from './index.module.scss';

/**
 * 알림 전송 폼 컴포넌트
 * @param {Object} props - 컴포넌트 props
 * @param {Object} props.noticeData - 알림 데이터
 * @returns {JSX.Element} - 폼 JSX
 */
const NoticeForm = ({ noticeData = {} }) => {
  // 폼 상태 관리
  const [title, setTitle] = useState(noticeData.title || '');
  const [content, setContent] = useState(noticeData.content || '');
  const [recipients, setRecipients] = useState(noticeData.recipients || []);
  const [isLoading, setIsLoading] = useState(false);
  
  /**
   * 폼 제출 핸들러
   * @param {Event} e - 이벤트 객체
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title || !content || recipients.length === 0) {
      alert('제목, 내용, 그리고 최소 한 명의 수신자를 입력해주세요.');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // API 요청
      const response = await fetch('http://localhost:8080/api/notice/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content, recipients }),
        credentials: 'include',
      });
      
      if (response.ok) {
        alert('알림이 성공적으로 전송되었습니다.');
        // 폼 초기화
        setTitle('');
        setContent('');
        setRecipients([]);
      } else {
        const errorData = await response.json();
        alert(`알림 전송 실패: ${errorData.message || '알 수 없는 오류'}`);
      }
    } catch (error) {
      console.error('알림 전송 중 오류:', error);
      alert('알림 전송 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };
  
  /**
   * 수신자 추가 핸들러
   */
  const handleAddRecipient = () => {
    const input = document.getElementById('newRecipient');
    const newRecipient = input.value.trim();
    
    if (newRecipient) {
      // 중복 확인
      if (!recipients.includes(newRecipient)) {
        setRecipients([...recipients, newRecipient]);
      }
      input.value = '';
    }
  };
  
  /**
   * 수신자 제거 핸들러
   * @param {number} index - 제거할 수신자 인덱스
   */
  const handleRemoveRecipient = (index) => {
    setRecipients(recipients.filter((_, i) => i !== index));
  };
  
  return (
    <div className={styles.formContainer}>
      <h1 className={styles.formTitle}>알림 전송</h1>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* 제목 필드 */}
        <div className={styles.formGroup}>
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.formControl}
            placeholder="알림 제목을 입력하세요"
            required
          />
        </div>
        
        {/* 내용 필드 */}
        <div className={styles.formGroup}>
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={styles.formTextarea}
            placeholder="알림 내용을 입력하세요"
            rows={8}
            required
          />
        </div>
        
        {/* 수신자 관리 */}
        <div className={styles.formGroup}>
          <label>수신자</label>
          <div className={styles.recipientsList}>
            {recipients.length === 0 ? (
              <p className={styles.noRecipients}>수신자가 없습니다. 수신자를 추가해주세요.</p>
            ) : (
              <ul>
                {recipients.map((recipient, index) => (
                  <li key={index} className={styles.recipientItem}>
                    {recipient}
                    <button 
                      type="button" 
                      className={styles.removeButton}
                      onClick={() => handleRemoveRecipient(index)}
                      aria-label={`${recipient} 삭제`}
                    >
                      X
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          {/* 수신자 추가 UI */}
          <div className={styles.addRecipientContainer}>
            <input
              type="text"
              id="newRecipient"
              placeholder="새 수신자 (전화번호)"
              className={styles.formControl}
            />
            <button 
              type="button" 
              className={styles.addButton}
              onClick={handleAddRecipient}
            >
              추가
            </button>
          </div>
        </div>
        
        {/* 제출 버튼 */}
        <div className={styles.formActions}>
          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? '전송 중...' : '알림 전송'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoticeForm; 