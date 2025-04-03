"use client";
import { useState } from "react";

export function useLoginForm() {
  // 상태 관리
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 이벤트 핸들러
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleRememberMe = () => setRememberMe(!rememberMe);

  // 로그인 처리
  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    
    try {
      setIsLoading(true);
      setLoginError(false);
      
      console.log("로그인 시도:", { userId, password, rememberMe });
      
      // 실제 로그인 API 호출 부분
      // const response = await loginApi({ userId, password });
      
      // 예시) 성공 시 처리
      // if (response.success) {
      //   if (rememberMe) {
      //     localStorage.setItem("token", response.token);
      //   } else {
      //     sessionStorage.setItem("token", response.token);
      //   }
      //   return true;
      // } else {
      //   setLoginError(true);
      //   return false;
      // }
      
      // 테스트를 위한 임시 로직
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 테스트: 특정 ID/비밀번호 조합만 성공
      if (userId === "admin" && password === "dbfltkdp45!") {
        return true;
      } else {
        setLoginError(true);
        return false;
      }
      
    } catch (error) {
      console.error("로그인 에러:", error);
      setLoginError(true);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // 에러 메시지 설정
  const errorMessage = loginError ? [
    "아이디 또는 비밀번호가 잘못 되었습니다.",
    "아이디와 비밀번호를 정확히 입력해 주세요."
  ] : null;

  return {
    // 상태
    userId,
    password,
    showPassword,
    rememberMe,
    loginError,
    isLoading,
    errorMessage,
    
    // 상태 변경 메서드
    setUserId,
    setPassword,
    
    // 이벤트 핸들러
    toggleShowPassword,
    toggleRememberMe,
    handleLogin
  };
} 