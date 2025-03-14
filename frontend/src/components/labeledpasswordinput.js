"use client";
import React from "react";
import styles from "../app/login/login.module.scss";

export default function LabeledPasswordInput({
  label,
  id,
  value,
  onChange,
  placeholder,
  required = false,
  showPassword,
  togglePassword,
}) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <div className={styles.passwordContainer}>
        <input
          type={showPassword ? "text" : "password"}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
        />
        <button
          type="button"
          className={styles.togglePassword}
          onClick={togglePassword}
        >
          <img
            src={showPassword ? "/IP-password_open.svg" : "/IP-password_close.svg"}
            alt={showPassword ? "숨기기" : "보기"}
          />
        </button>
      </div>
    </>
  );
}
