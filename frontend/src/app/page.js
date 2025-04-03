"use client";
import React from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import styles from "./notification.module.scss";

export default function NotificationPage() {
  // "전송" 버튼 클릭 시 동작할 로직
  const handleSend = () => {
    alert("알림을 전송했습니다!");
    // 실제로는 서버 API 호출 등 로직을 추가
  };

  return (
    <div className={styles.container}>
      {/* 상단 헤더 */}
      <Header />

      <div className={styles.content}>
        {/* 좌측 메뉴 (현재 구현된 컴포넌트라고 가정) */}
        <Sidebar />

        {/* 메인 영역 */}
        <main className={styles.main}>
          <h1 className={styles.title}>알림 전송</h1>

          {/* 예: 일괄 전송 / 개별 전송 탭 (디자인 시안에 맞춰 필요시 구현) */}
          <div className={styles.tabMenu}>
            <button className={`${styles.tabButton} ${styles.active}`}>
              일괄 전송
            </button>
            <button className={styles.tabButton}>개별 전송</button>
          </div>

          {/* 그리드 레이아웃: 왼쪽 설정 / 오른쪽 미리보기 */}
          <div className={styles.gridContainer}>
            {/* 왼쪽 영역 */}
            <section className={styles.leftColumn}>
              {/* 알림 발송 건수 카드 */}
              <div className={styles.card}>
                <h2>알림 발송 건수</h2>
                <p>고객수: 0명</p>
                <p>조건 없음</p>
                {/* 필요한 경우 조건이 없을 때의 안내 문구 등을 표시 */}
              </div>

              {/* 알림 사항 설정 카드 */}
              <div className={styles.card}>
                <h2>알림 사항 설정</h2>

                {/* 메시지 제목 */}
                <div className={styles.formGroup}>
                  <label>메시지 제목</label>
                  <input
                    type="text"
                    placeholder="메시지 제목을 입력해 주세요."
                  />
                </div>

                {/* 메시지 내용 */}
                <div className={styles.formGroup}>
                  <label>메시지 내용</label>
                  <textarea
                    placeholder="메시지 내용을 입력해 주세요."
                    rows={4}
                  ></textarea>
                </div>

                {/* 발송 채널 */}
                <div className={styles.formGroup}>
                  <label>발송 채널</label>
                  <div className={styles.checkboxes}>
                    <label>
                      <input type="checkbox" /> 문자
                    </label>
                    <label>
                      <input type="checkbox" /> 알림톡
                    </label>
                  </div>
                </div>
              </div>
            </section>

            {/* 오른쪽 영역: 메시지 미리보기 */}
            <section className={styles.rightColumn}>
              <div className={styles.card}>
                <h2>메시지 미리보기</h2>
                <div className={styles.previewBox}>
                  {/* 실제 입력된 메시지 내용이 보이도록 구현 가능 */}
                  수정된 메시지가 미리보기로 표시됩니다.
                </div>
              </div>
            </section>
          </div>

          {/* 하단 전송 버튼 */}
          <div className={styles.sendButtonWrapper}>
            <button className={styles.sendButton} onClick={handleSend}>
              전송
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
