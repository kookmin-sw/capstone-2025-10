"use client";

import React from "react";
import styles from "./login.module.scss";
import LoginForm from "../../components/Login/LoginForm";

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <LoginForm />
    </div>
  );
}
