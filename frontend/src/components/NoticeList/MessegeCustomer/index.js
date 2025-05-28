import React from "react";
import styles from "./index.module.scss";

const MessegeCustomer = ({
  phoneNumber,
  setPhoneNumber,
  recipientList,
  setRecipientList,
  showGroupPopup,
  toggleGroupPopup,
}) => {
  // 전화번호 추가 핸들러
  const handleAddPhoneNumber = () => {
    if (!phoneNumber) {
      return;
    }

    // 간단한 전화번호 유효성 검사 (숫자와 하이픈만 허용)
    const phoneRegex = /^[0-9-]+$/;
    if (!phoneRegex.test(phoneNumber)) {
      alert("유효한 전화번호를 입력해주세요.");
      return;
    }

    // 중복 검사
    if (recipientList.includes(phoneNumber)) {
      alert("이미 추가된 전화번호입니다.");
      return;
    }

    // 리스트에 추가
    setRecipientList([...recipientList, phoneNumber]);
    setPhoneNumber(""); // 입력 필드 초기화
  };

  // 전화번호 삭제 핸들러
  const handleRemovePhoneNumber = (indexToRemove) => {
    setRecipientList(
      recipientList.filter((_, index) => index !== indexToRemove),
    );
  };

  return (
    <div className={styles.messageTargetCardWrapper}>
      <div className={styles.customCard}>
        <div className={styles.customCardHeader}>
          <h2 className={styles.customCardTitle}>메시지 발송 대상</h2>
        </div>
        <div className={styles.dividerContainer}>
          <div className={styles.customDivider}></div>
        </div>
        <div className={styles.targetSection}>
          <div className={styles.inputGroup}>
            <div className={styles.phoneInputContainer}>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="휴대폰 번호를 입력해주세요."
                className={styles.phoneInput}
              />
              <button
                className={styles.addButton}
                onClick={handleAddPhoneNumber}
              >
                추가
              </button>
            </div>
            <button className={styles.groupButton} onClick={toggleGroupPopup}>
              그룹 선택
            </button>
          </div>

          <div className={styles.recipientListContainer}>
            {recipientList.length > 0 ? (
              <ul className={styles.recipientList}>
                {recipientList.map((recipient, index) => (
                  <li key={index} className={styles.recipientItem}>
                    <span>{recipient}</span>
                    <button
                      className={styles.removeButton}
                      onClick={() => handleRemovePhoneNumber(index)}
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className={styles.emptyList}>
                발송 대상이 없습니다. 전화번호를 추가하거나 그룹을 선택해주세요.
              </div>
            )}
          </div>

          <div className={styles.totalRecipients}>
            <strong>총 발송 대상:</strong> {recipientList.length}명
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessegeCustomer;
