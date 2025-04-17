"use client";
import React, { useState } from "react";
import styles from "./page.module.scss";
import LoginFormFields from "@/components/Login/LoginFormFields";
import RequireLogin from "@/components/Login/RequireLogin";

export default function LoginPage() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  // 로그인 실패 상태 (실제 구현에 따라 에러 메시지 처리 방법은 다를 수 있음)
  const [loginError, setLoginError] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleRememberMe = () => setRememberMe(!rememberMe);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 실제 로그인 로직 구현 후, 실패 시 setLoginError(true) 호출
    // 예시로 로그인 실패를 강제로 표시:
    setLoginError(true);
    console.log("로그인 시도:", { userId, password, rememberMe });
  };

  return (
    <RequireLogin>
      <div className={styles.container}>
        <div className={styles.card}>
          {/* 로고 */}
          <img src="/logo.svg" alt="Logo" className={styles.logo} />
          <form onSubmit={handleSubmit} className={styles.form}>
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
            {loginError && (
              <div className={styles.errorMessage}>
                아이디 또는 비밀번호가 잘못 되었습니다.
                <br />
                아이디와 비밀번호를 정확히 입력해 주세요.
              </div>
            )}

            <button type="submit" className={styles.loginButton}>
              로그인
            </button>
          </form>
        </div>
      </div>
    </RequireLogin>
  );
}
