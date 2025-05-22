"use client";

import styles from "./index.module.scss";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import LogoutButton from "@/components/Button/LogoutButton";
import useSession from "@/hooks/useSession";
import LoginButton from "@/components/Button/LoginButton";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLogin, setIsLogin] = useState(false);
  const { isLoggedIn, loading } = useSession();

  const headerItems = [
    {
      title: "통계",
      path: "/dashboard/1",
    },
    {
      title: "대시보드",
      path: "/campaign/1",
    },
    {
      title: "마케팅",
      path: "/member",
    },
  ];

  const headerAuthItems = [
    {
      title: "마이페이지",
      path: "/mypage",
    },
  ];
  return (
    <header className={styles.header}>
      <div className={styles["header-container"]}>
        <Link href="/">
          <Image
            src="/logo.png"
            width={112}
            height={20}
            priority
            alt={"logo"}
          />
        </Link>
        <div className={styles["header-items-wrapper"]}>
          {headerItems.map((item) => (
            <a
              className={`${item.path === pathname ? styles.strong : ""}`}
              key={item.title}
              href={item.path}
            >
              {item.title}
            </a>
          ))}
        </div>
        <div className={styles["header-auth-items-wrapper"]}>
          {headerAuthItems.map((item) => (
            <a
              className={`${item.path === pathname ? styles.strong : ""}`}
              key={item.title}
              href={item.path}
            >
              {item.title}
            </a>
          ))}
          {!loading && !isLoggedIn ? (
            <LoginButton onLogin={() => router.push("/login")} />
          ) : (
            <LogoutButton />
          )}
        </div>
      </div>
    </header>
  );
}
