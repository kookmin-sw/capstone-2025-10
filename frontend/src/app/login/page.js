"use client";

import React, { useState } from "react";
import styles from "./login.module.scss";
import LoginFormFields from "@/components/Login/LoginFormFields";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api/auth";

export default function LoginPage() {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleRememberMe = () => setRememberMe(!rememberMe);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("https://back.offflow.co.kr/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, password }),
        credentials: "include", // 세션 인증용 기본 설정
      });
      router.push("/dashboard/1");
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
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
            style={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span style={{ width: "100%", textAlign: "center" }}>로그인</span>
          </button>
        </form>
      </div>
    </div>
  );
}
