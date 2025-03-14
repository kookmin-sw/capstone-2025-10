"use client";
import React from "react";
import styles from "./user.module.scss";

// 외부에서 가져올 헤더, 사이드바 컴포넌트 (여기서는 가상으로 import)
// import Header from "@/components/Header";
// import Sidebar from "@/components/Sidebar";

// 예시용 더미 데이터
const dummyMembers = [
  { id: 1, name: "kea", phone: "010-1111-1111", date: "2025-03-01", visits: 1 },
  { id: 2, name: "thebyl", phone: "010-2222-2222", date: "2025-03-02", visits: 2 },
  { id: 3, name: "zherom", phone: "010-3333-3333", date: "2025-03-03", visits: 3 },
  { id: 4, name: "jungko1000", phone: "010-4444-4444", date: "2025-03-04", visits: 4 },
];

export default function MemberPage() {
  return (
    <div className={styles.container}>
      {/* 상단 헤더 (외부 컴포넌트) */}
      {/* <Header /> */}

      <div className={styles.content}>
        {/* 좌측 메뉴 (외부 컴포넌트) */}
        {/* <Sidebar /> */}

        {/* 메인 영역 */}
        <main className={styles.main}>
          <h2 className={styles.pageTitle}>회원관리</h2>

          {/* 검색 영역 */}
          <div className={styles.searchBar}>
            <input type="text" placeholder="방문객 검색" />
            <button>검색</button>
          </div>

          {/* 테이블 영역 */}
          <div className={styles.tableContainer}>
            <table>
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" />
                  </th>
                  <th>방문객</th>
                  <th>연락처</th>
                  <th>방문일자</th>
                  <th>방문횟수</th>
                  <th>상세</th>
                </tr>
              </thead>
              <tbody>
                {dummyMembers.map((member) => (
                  <tr key={member.id}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>{member.name}</td>
                    <td>{member.phone}</td>
                    <td>{member.date}</td>
                    <td>{member.visits}</td>
                    <td>
                      <button className={styles.detailButton}>보기</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
