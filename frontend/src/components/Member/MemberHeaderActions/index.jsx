import React from "react";
import styles from "./index.module.scss";
import Link from "next/link";

const MemberHeaderActions = ({ searchTerm, setSearchTerm, handleDeleteSelected }) => {
  return (
    <div className={styles.headerActions}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="방문객명 검색"
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

      <button className={styles.createButton}>
        <Link href="/member/create">계정 생성</Link>
      </button>
      <button 
        className={styles.primaryButton}
        onClick={handleDeleteSelected}
      >
        계정 삭제
      </button>
    </div>
  );
};

export default MemberHeaderActions; 