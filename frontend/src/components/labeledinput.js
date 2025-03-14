"use client"; 
// 클라이언트 컴포넌트에서 상태/이벤트를 다루기 위해 선언

import React from "react";
import styles from "../app/login/login.module.scss";

export default function LabeledInput({
  label,         // 라벨에 표시할 텍스트 (예: "아이디")
  type = "text", // 기본 인풋 타입을 text로 설정 (필요에 따라 변경 가능)
  id,            // <input>의 id
  value,         // 상태 값
  onChange,      // 상태 변경 함수
  placeholder,   // 플레이스홀더
  required = false,
}) {
  return (
    <>
      {/* 라벨 */}
      <label htmlFor={id}>{label}</label>

      {/* 밑줄 인풋 래퍼 */}
      <div className={styles.inputWrapper}>
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
        />
      </div>
    </>
  );
}
