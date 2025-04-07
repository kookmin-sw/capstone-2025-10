import React, { useState } from 'react';
import styles from './index.module.scss';

const NoticeCustomList = ({ 
  isOpen, 
  onClose, 
  memberGroups, 
  onSelectGroups 
}) => {
  // 그룹 체크박스 상태 관리
  const [checkedGroups, setCheckedGroups] = useState({});
  
  // 개별 그룹 체크박스 클릭 핸들러
  const handleGroupCheckboxClick = (id) => {
    setCheckedGroups(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  // 선택한 그룹 추가 핸들러
  const handleAddSelectedGroups = () => {
    // 선택된 그룹 ID 배열
    const selectedGroupIds = Object.keys(checkedGroups)
      .filter(id => checkedGroups[id])
      .map(id => parseInt(id));
    
    // 선택된 그룹 정보 가져오기
    const selectedGroups = memberGroups.filter(group => 
      selectedGroupIds.includes(group.id)
    );
    
    // 선택한 그룹을 부모 컴포넌트로 전달
    onSelectGroups(selectedGroups);
    
    // 체크박스 상태 초기화
    setCheckedGroups({});
  };

  if (!isOpen) return null;
  
  return (
    <div className={styles.popupOverlay}>
      <div className={styles.memberPagePopup}>
        <button className={styles.closeButton} onClick={onClose}>
          <svg width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="#333333"/>
          </svg>
        </button>
        
        {/* 멤버 페이지 스타일을 그대로 가져옴 */}
        <div className={styles.memberPageContent}>
          {/* 카드 컨테이너 스타일 */}
          <div className={styles.memberCard}>
            {/* 카드 헤더 */}
            <div className={styles.memberCardHeader}>
              <h2 className={styles.memberCardTitle}>회원 그룹 선택</h2>
              
              {/* 검색창과 버튼 */}
              <div className={styles.memberCardActions}>
                <div className={styles.searchContainer}>
                  <input
                    type="text"
                    placeholder="그룹명 검색"
                    className={styles.searchInput}
                  />
                  <svg
                    className={styles.searchIcon}
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#6e6e6e"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </div>
              </div>
            </div>
            
            {/* 구분선 */}
            <div className={styles.memberCardDivider}></div>
            
            {/* 테이블 컨테이너 */}
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.checkboxColumn}></th>
                    <th>그룹명</th>
                    <th>회원 수</th>
                    <th>생성일</th>
                  </tr>
                </thead>
                <tbody>
                  {memberGroups.map((group) => (
                    <tr key={group.id}>
                      <td>
                        <div 
                          className={styles.checkbox}
                          onClick={() => handleGroupCheckboxClick(group.id)}
                        >
                          {checkedGroups[group.id] ? (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect width="20" height="20" rx="4" fill="#004BD6"/>
                              <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" fill="white"/>
                            </svg>
                          ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect width="20" height="20" rx="4" fill="#EBEBEB"/>
                            </svg>
                          )}
                        </div>
                      </td>
                      <td>{group.name}</td>
                      <td>{group.count}명</td>
                      <td>{group.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* 페이지네이션 */}
            <div className={styles.paginationContainer}>
              <button className={styles.paginationButton}>&lt;</button>
              <button className={`${styles.paginationButton} ${styles.active}`}>1</button>
              <button className={styles.paginationButton}>2</button>
              <button className={styles.paginationButton}>&gt;</button>
            </div>
            
            {/* 버튼 컨테이너 */}
            <div className={styles.buttonContainer}>
              <button 
                className={styles.confirmButton} 
                onClick={handleAddSelectedGroups}
              >
                선택 완료
              </button>
              <button 
                className={styles.cancelButton} 
                onClick={onClose}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeCustomList;
