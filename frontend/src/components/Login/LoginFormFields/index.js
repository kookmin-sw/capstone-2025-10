"use client";
import React from "react";
import LabeledInput from "../LabeledInput";
import LabeledPasswordInput from "../LabeledPasswordInput";
import styles from "./index.module.scss";

export default function LoginFormFields({
  userId,
  setUserId,
  password,
  setPassword,
  showPassword,
  toggleShowPassword,
  rememberMe,
  toggleRememberMe,
}) {
  return (
    <>
      {/* 아이디 입력 필드 */}
      <LabeledInput
        label="아이디"
        type="text"
        id="userId"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="아이디 입력"
        required
      />

      {/* 비밀번호 입력 필드 */}
      <LabeledPasswordInput
        label="비밀번호"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호 입력(영문,숫자,특수문자 조합)"
        required
        showPassword={showPassword}
        togglePassword={toggleShowPassword}
      />

      {/* 로그인 유지 체크박스 */}
      <div className={styles.rememberMe}>
        <input
          type="checkbox"
          id="remember"
          checked={rememberMe}
          onChange={toggleRememberMe}
        />
        <label htmlFor="remember">로그인 유지</label>
      </div>
    </>
  );
}
