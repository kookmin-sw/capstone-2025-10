"use client";
import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header/components/Header";

// 예시용 방문객 데이터
const dummyVisitors = [
  { id: 1, name: "kea", phone: "010-1111-1111", date: "2025.01.01", visits: 1 },
  { id: 2, name: "theyday1", phone: "010-2222-2222", date: "2025.02.02", visits: 12 },
  { id: 3, name: "ashercom", phone: "010-3333-3333", date: "2025.03.03", visits: 5 },
  { id: 4, name: "jungdo1000", phone: "010-4444-4444", date: "2025.04.04", visits: 80 },
];

export default function VisitorPage() {
  const handleDetail = (visitorId) => {
    // 실제 상세 페이지 이동 로직을 넣으세요 (예: router.push)
    alert(`상세 페이지로 이동: 방문객 ID ${visitorId}`);
  };

  return (
    <div className={styles.layout}>
      {/* 헤더 */}
      <Header />
      
      {/* 메인 콘텐츠 */}
      <div className={styles.mainContent}>
        {/* 방문객 관리 카드 */}
        <div className={styles.card}>
          <div className={styles.contentHeader}>
            <h2 className={styles.pageTitle}>방문객 관리</h2>
            
            <div className={styles.contentActions}>
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
            </div>
          </div>

          {/* 구분선 */}
          <div className={styles.divider}></div>

          {/* 방문객 테이블 */}
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.checkboxColumn}>
                    <input type="checkbox" />
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
                      <input type="checkbox" />
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
        </div>
      </div>
    </div>
  );
}
