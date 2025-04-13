"use client";
import React from "react";
import styles from "./index.module.scss";

export default function LabeledInput({
  label,
  type = "text",
  id,
  value,
  onChange,
  placeholder,
  required = false,
}) {
  return (
    <>
      <label htmlFor={id} className={styles.label}>{label}</label>
      <div className={styles.inputWrapper}>
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          maxLength={32}
          pattern="^[A-Za-z0-9가-힣]*$"
        />
      </div>
    </>
  );
}
