"use client";

import React, { useState } from "react";
import styles from "./login.module.scss";
import LoginFormFields from "@/components/Login/LoginFormFields";

export default function LoginPage() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleRememberMe = () => setRememberMe(!rememberMe);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("로그인 시도:", { userId, password, rememberMe });
    // 로그인 API 호출 후 rememberMe 값에 따라 localStorage 또는 sessionStorage에 토큰 저장 등 처리
  };

  return (
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

          {/* 로그인 버튼 */}
          <button 
            type="submit" 
            className={styles.loginButton} 
            style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <span style={{ width: '100%', textAlign: 'center' }}>로그인</span>
          </button>
        </form>
      </div>
    </div>
  );
}
