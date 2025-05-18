'use client';

import "@/app/styles/globals.scss";
import { Noto_Sans_KR } from 'next/font/google';
import { ModalProvider } from "@/contexts/ModalContext";
import { useEffect } from "react";
import styles from "./page.module.scss";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-primary",
});

// 전체 화면 너비를 사용하는 스타일
const containerStyle = {
  width: '100%',
  maxWidth: '100vw',
  padding: '0',
  margin: '0',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  background: '#fff',  // 흰색 배경
  position: 'relative',
  zIndex: 10  // 높은 z-index로 다른 요소보다 앞에 표시
};

export default function SurveyLayout({ children }) {
  // 컴포넌트가 마운트되면 사이드바를 숨기는 스타일을 적용
  useEffect(() => {
    // 사이드바 숨김
    const sidebarElements = document.querySelectorAll('nav, .sidebar, .sideNav, .sideNavigation, #sideNav, .side-navigation, aside, [data-testid="sidebar"]');
    sidebarElements.forEach(el => {
      if (el) {
        el.style.display = 'none';
        el.style.width = '0';
        el.style.opacity = '0';
        el.style.visibility = 'hidden';
        el.style.position = 'absolute';
        el.style.left = '-9999px';
      }
    });
    
    // SideNavigation 컴포넌트 직접 타겟팅 (클래스명이 다를 수 있어 모든 가능성 시도)
    const allElements = document.querySelectorAll('*');
    allElements.forEach(el => {
      if (el.tagName && 
          (el.id && el.id.toLowerCase().includes('side') || 
           el.className && typeof el.className === 'string' && el.className.toLowerCase().includes('side'))) {
        el.style.display = 'none';
        el.style.width = '0';
        el.style.opacity = '0';
        el.style.visibility = 'hidden';
      }
    });
    
    // 콘텐츠 영역 조정
    const contentElements = document.querySelectorAll('.content');
    contentElements.forEach(el => {
      if (el) {
        el.style.display = 'block';
        el.style.width = '100%';
        el.style.marginLeft = '0';
        el.style.paddingLeft = '0';
      }
    });
    
    // 컴포넌트가 언마운트되면 원래대로 복원
    return () => {
      sidebarElements.forEach(el => {
        if (el) {
          el.style.display = '';
          el.style.width = '';
          el.style.opacity = '';
          el.style.visibility = '';
        }
      });
      
      contentElements.forEach(el => {
        if (el) {
          el.style.display = '';
          el.style.width = '';
          el.style.marginLeft = '';
          el.style.paddingLeft = '';
        }
      });
    };
  }, []);
  
  return (
    <div className={notoSansKr.variable} style={containerStyle}>
      <ModalProvider>
        <div style={{ width: '100%', maxWidth: '100%', margin: 0, padding: 0 }}>
          {children}
        </div>
      </ModalProvider>
    </div>
  );
} 