'use client';

import "../styles/globals.scss";
import { Noto_Sans_KR } from 'next/font/google';
import {ModalProvider} from "@/contexts/ModalContext";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-primary",
});

export default function SurveyLayout({ children }) {
  return (
    <div className={notoSansKr.variable}>
      <ModalProvider>
        {children}
      </ModalProvider>
    </div>
  );
} 