"use client";
import React from "react";
import styles from "./index.module.scss";
import LoginFormFields from "../LoginFormFields";
import ErrorMessage from "../ErrorMessage";
import LoginButton from "../LoginButton";
import Logo from "../Logo";
import LoadingIndicator from "../LoadingIndicator";
import { useLoginForm } from "../../../hooks/useLoginForm";

export default function LoginForm() {
  const {
    // 상태
    userId,
    password,
    showPassword,
    rememberMe,
    isLoading,
    errorMessage,
    
    // 상태 변경 메서드
    setUserId,
    setPassword,
    
    // 이벤트 핸들러
    toggleShowPassword,
    toggleRememberMe,
    handleLogin
  } = useLoginForm();

  return (
    <div className={styles.card}>
      {isLoading && <LoadingIndicator />}
      
      {/* 로고 */}
      <Logo />

      <form onSubmit={handleLogin} className={styles.form}>
        {/* 입력 필드 */}
        <LoginFormFields
          userId={userId}
          setUserId={setUserId}
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          toggleShowPassword={toggleShowPassword}
          rememberMe={rememberMe}
          toggleRememberMe={toggleRememberMe}
        />

        {/* 로그인 실패 시 에러 메시지 표시 */}
        <ErrorMessage message={errorMessage} />

        {/* 로그인 버튼 */}
        <LoginButton disabled={isLoading}>
          {isLoading ? "로그인 중..." : "로그인"}
        </LoginButton>
      </form>
    </div>
  );
}