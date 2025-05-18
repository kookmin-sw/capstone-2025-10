import React from "react";
import styles from "./index.module.scss";
import Image from "next/image";
import Pagination from "@/components/Pagination";

const SurveyTable = ({ 
  surveys, 
  checkedItems, 
  currentPage, 
  totalPages, 
  handleCheckboxClick, 
  handleDetail, 
  handlePageChange 
}) => {
  return (
 
    <div style={{ width: "100%" }}>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.checkboxColumn}>
                {/* 헤더의 체크박스 칸은 비워둠 */}
              </th>
              <th>설문조사명</th>
              <th>생성일</th>
              <th>응답수</th>
              <th>상태</th>
              <th>상세</th>
            </tr>
          </thead>
          <tbody>
            {surveys.map((survey) => (
              <tr key={survey.id}>
                <td>
                  <Image
                    src={checkedItems[survey.id] ? "/checkblue.svg" : "/checkgray.svg"}
                    alt="체크박스"
                    width={20}
                    height={20}
                    className={styles.checkbox}
                    onClick={() => handleCheckboxClick(survey.id)}
                  />
                </td>
                <td>{survey.title}</td>
                <td>{survey.createdAt}</td>
                <td>{survey.responseCount}개</td>
                <td>{survey.status}</td>
                <td>
                  <button
                    className={styles.detailButton}
                    onClick={() => handleDetail(survey.id)}
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

export default SurveyTable; 