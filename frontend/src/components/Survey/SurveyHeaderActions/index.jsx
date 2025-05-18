import React from "react";
import styles from "./index.module.scss";
import Link from "next/link";

const SurveyHeaderActions = ({ searchTerm, setSearchTerm, handleDeleteSelected, refreshSurveys }) => {
  return (
    <div className={styles.headerActions}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="설문조사명 검색"
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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

      <button 
        className={styles.refreshButton}
        onClick={refreshSurveys}
        title="설문조사 목록 새로고침"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M21.5 2v6h-6"></path>
          <path d="M2.5 12a10 10 0 0 1 17.75-6H21.5"></path>
          <path d="M2.5 22v-6h6"></path>
          <path d="M21.5 12a10 10 0 0 1-17.75 6H2.5"></path>
        </svg>
      </button>

      <button className={styles.createButton}>
        <Link href="/survey/create">설문조사 생성</Link>
      </button>
      <button 
        className={styles.primaryButton}
        onClick={handleDeleteSelected}
      >
        설문조사 삭제
      </button>
    </div>
  );
};

export default SurveyHeaderActions; 