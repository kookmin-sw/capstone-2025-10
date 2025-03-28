"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header/components/Header";
import CardContainer from "@/components/Card/CardContainer";

// 예시용 방문객 데이터
const dummyVisitors = [
  { id: 1, name: "kea", phone: "010-1111-1111", date: "2025.01.01", visits: 1 },
  { id: 2, name: "theyday1", phone: "010-2222-2222", date: "2025.02.02", visits: 12 },
  { id: 3, name: "ashercom", phone: "010-3333-3333", date: "2025.03.03", visits: 5 },
  { id: 4, name: "jungdo1000", phone: "010-4444-4444", date: "2025.04.04", visits: 80 },
  { id: 5, name: "minjae97", phone: "010-5555-5555", date: "2025.05.05", visits: 3 },
  { id: 6, name: "devsunny", phone: "010-6666-6666", date: "2025.06.06", visits: 42 },
  { id: 7, name: "codeman", phone: "010-7777-7777", date: "2025.07.07", visits: 15 },
  { id: 8, name: "techstar", phone: "010-8888-8888", date: "2025.08.08", visits: 27 },
];

export default function VisitorPage() {
  // 체크박스 상태 관리
  const [checkedItems, setCheckedItems] = useState({});
  const [allChecked, setAllChecked] = useState(false);
  
  // 개별 체크박스 클릭 핸들러
  const handleCheckboxClick = (id) => {
    setCheckedItems(prev => {
      const newState = { ...prev, [id]: !prev[id] };
      
      // 모든 체크박스가 선택되었는지 확인
      const allSelected = dummyVisitors.every(visitor => newState[visitor.id]);
      setAllChecked(allSelected);
      
      return newState;
    });
  };
  
  // 전체 체크박스 클릭 핸들러
  const handleSelectAll = () => {
    const newAllChecked = !allChecked;
    setAllChecked(newAllChecked);
    
    const newCheckedItems = {};
    dummyVisitors.forEach(visitor => {
      newCheckedItems[visitor.id] = newAllChecked;
    });
    
    setCheckedItems(newCheckedItems);
  };

  const handleDetail = (visitorId) => {
    // 실제 상세 페이지 이동 로직을 넣으세요 (예: router.push)
    alert(`상세 페이지로 이동: 방문객 ID ${visitorId}`);
  };

  // 헤더 액션 요소 (검색창, 버튼 등)
  const headerActions = (
    <>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="방문객명 검색"
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
      
      <button className={styles.createButton}>계정 생성</button>
      <button className={styles.primaryButton}>계정 삭제</button>
    </>
  );

  return (
    <div className={styles.layout}>
      {/* 헤더 */}
      <Header />
      
      {/* 메인 콘텐츠 */}
      <div className={styles.mainContent}>
        {/* 방문객 관리 카드 - 컴포넌트로 변경 */}
        <CardContainer 
          title="방문객 관리" 
          headerActions={headerActions}
        >
          {/* 방문객 테이블 */}
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.checkboxColumn}>
                    {/* 헤더의 체크박스 칸은 비워둠 */}
                  </th>
                  <th>방문객명</th>
                  <th>전화번호</th>
                  <th>방문일자</th>
                  <th>방문횟수</th>
                  <th>상세</th>
                </tr>
              </thead>
              <tbody>
                {dummyVisitors.map((visitor) => (
                  <tr key={visitor.id}>
                    <td>
                      <Image 
                        src={checkedItems[visitor.id] ? "/checkblue.svg" : "/checkgray.svg"} 
                        alt="체크박스" 
                        width={20} 
                        height={20} 
                        className={styles.checkbox}
                        onClick={() => handleCheckboxClick(visitor.id)}
                      />
                    </td>
                    <td>{visitor.name}</td>
                    <td>{visitor.phone}</td>
                    <td>{visitor.date}</td>
                    <td>{visitor.visits}회</td>
                    <td>
                      <button
                        className={styles.detailButton}
                        onClick={() => handleDetail(visitor.id)}
                      >
                        보기
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContainer>
      </div>
    </div>
  );
}
