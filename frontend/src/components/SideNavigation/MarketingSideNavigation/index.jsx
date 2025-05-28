"use client";

import { usePathname } from "next/navigation";
import styles from "./index.module.scss";

const MarketingSidebar = () => {
  const pathname = usePathname();
  const isActive = (path) => pathname.startsWith(path);

  return (
    <div className={styles["side-nav"]}>
      <div className={styles["profile-card"]}>
        <p className={styles.title}>마케팅</p>
        <p className={styles.name}>김관리 님</p>
      </div>

      <div className={styles.menu}>
        <a
          className={
            isActive("/event")
              ? styles["menu-item-active"]
              : styles["menu-item"]
          }
          href="/event/1"
        >
          <span>이벤트</span>
        </a>
        <a
          className={
            isActive("/member")
              ? styles["menu-item-active"]
              : styles["menu-item"]
          }
          href="/member"
        >
          <span>방문객 관리</span>
        </a>
        <a
          className={
            isActive("/notice")
              ? styles["menu-item-active"]
              : styles["menu-item"]
          }
          href="/notice"
        >
          <span>알림 전송</span>
        </a>
        <a
          className={
            isActive("/survey")
              ? styles["menu-item-active"]
              : styles["menu-item"]
          }
          href="/survey"
        >
          <span>설문 조사</span>
        </a>
      </div>
    </div>
  );
};

export default MarketingSidebar;
