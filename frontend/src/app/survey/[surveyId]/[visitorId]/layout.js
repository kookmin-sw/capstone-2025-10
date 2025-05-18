'use client';

import "@/app/styles/globals.scss";
import { Noto_Sans_KR } from 'next/font/google';
import {ModalProvider} from "@/contexts/ModalContext";

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
  alignItems: 'stretch'
};

export default function SurveyLayout({ children }) {
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