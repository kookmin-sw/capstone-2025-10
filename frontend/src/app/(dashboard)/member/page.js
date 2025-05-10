"use client";
import React from "react";
import styles from "./page.module.scss";
import CardContainer from "@/components/CardContainer";
import MemberTable from "@/components/Member/MemberTable";
import MemberHeaderActions from "@/components/Member/MemberHeaderActions";
import useVisitorManagement from "@/hooks/useVisitorManagement";

export default function VisitorPage() {
  const {
    visitors,
    checkedItems,
    currentPage,
    totalPages,
    searchTerm,
    setSearchTerm,
    handlePageChange,
    handleCheckboxClick,
    handleDetail
  } = useVisitorManagement();

  return (
    <div className={styles.layout}>
      <div className={styles.mainContent}>
        <CardContainer
          title="방문객 관리"
          headerActions={
            <MemberHeaderActions 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm} 
            />
          }
        >
          <MemberTable
            visitors={visitors}
            checkedItems={checkedItems}
            currentPage={currentPage}
            totalPages={totalPages}
            handleCheckboxClick={handleCheckboxClick}
            handleDetail={handleDetail}
            handlePageChange={handlePageChange}
          />
        </CardContainer>
      </div>
    </div>
  );
}
