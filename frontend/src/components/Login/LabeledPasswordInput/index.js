"use client";
import React from "react";
import styles from "./index.module.scss";
import Image from "next/image";

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
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <div className={styles.passwordContainer}>
        <input
          type={showPassword ? "text" : "password"}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          //pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$"
        />
        <button
          type="button"
          className={styles.togglePassword}
          onClick={togglePassword}
        >
          <Image
            src={
              showPassword ? "/IP-password_open.svg" : "/IP-password_close.svg"
            }
            alt={showPassword ? "숨기기" : "보기"}
            width={20}
            height={20}
          />
        </button>
      </div>
    </>
  );
}
