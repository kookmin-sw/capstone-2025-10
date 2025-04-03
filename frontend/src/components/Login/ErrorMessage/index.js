"use client";
import React from "react";
import styles from "./index.module.scss";

export default function ErrorMessage({ message }) {
  if (!message) return null;
  
  // 메시지가 문자열인 경우
  if (typeof message === 'string') {
    return <div className={styles.errorMessage}>{message}</div>;
  }
  
  // 메시지가 여러 줄로 구성된 배열인 경우
  if (Array.isArray(message)) {
    return (
      <div className={styles.errorMessage}>
        {message.map((line, index) => (
          <React.Fragment key={index}>
            {line}
            {index < message.length - 1 && <br />}
          </React.Fragment>
        ))}
      </div>
    );
  }
  
  return null;
} 