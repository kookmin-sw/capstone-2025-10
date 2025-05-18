"use client";
import React from "react";
import styles from "./page.module.scss";
import CardContainer from "@/components/CardContainer";
import SurveyTable from "@/components/Survey/SurveyTable";
import SurveyHeaderActions from "@/components/Survey/SurveyHeaderActions";
import useSurveyManagement from "@/hooks/useSurveyManagement";

export default function SurveyListPage() {
  const {
    surveys,
    checkedItems,
    currentPage,
    totalPages,
    searchTerm,
    setSearchTerm,
    loading,
    error,
    handlePageChange,
    handleCheckboxClick,
    handleDetail,
    handleDeleteSelected,
    refreshSurveys
  } = useSurveyManagement();

  return (
    <div className={styles.layout}>
      <div className={styles.mainContent}>
        <CardContainer
          title="설문조사 관리"
          headerActions={
            <SurveyHeaderActions 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm}
              handleDeleteSelected={handleDeleteSelected}
              refreshSurveys={refreshSurveys}
            />
          }
        >
          {loading ? (
            <div className={styles.loadingContainer}>데이터를 불러오고 있습니다...</div>
          ) : error ? (
            <div className={styles.errorContainer}>{error}</div>
          ) : (
            <SurveyTable
              surveys={surveys}
              checkedItems={checkedItems}
              currentPage={currentPage}
              totalPages={totalPages}
              handleCheckboxClick={handleCheckboxClick}
              handleDetail={handleDetail}
              handlePageChange={handlePageChange}
            />
          )}
        </CardContainer>
      </div>
    </div>
  );
} 