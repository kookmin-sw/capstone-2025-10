"use client";
import React from "react";
import styles from "./index.module.scss";

export default function LoginButton({ children, type = "submit", onClick, disabled }) {
  return (
    <button 
      type={type} 
      className={styles.loginButton}
      onClick={onClick}
      disabled={disabled}
    >
      {children || "로그인"}
    </button>
  );
} 