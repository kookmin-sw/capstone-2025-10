import React from "react";
import styles from "./index.module.scss";
import Image from "next/image";
import Pagination from "@/components/Pagination";

const MemberTable = ({ 
  visitors, 
  checkedItems, 
  currentPage, 
  totalPages, 
  handleCheckboxClick, 
  handleDetail, 
  handlePageChange 
}) => {
  return (
    <div>
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
            {visitors.map((visitor) => (
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

      {/* 페이지네이션 추가 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default MemberTable; 