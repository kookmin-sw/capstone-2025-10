"use client";

import { usePathname } from "next/navigation";
import styles from "./index.module.scss";

const SideNavigation = () => {
  const pathname = usePathname();

  const isActive = (path) => pathname.startsWith(path);

  return (
    <div className={styles["side-nav"]}>
      <div className={styles["profile-card"]}>
        <p className={styles.title}>통계</p>
        <p className={styles.name}>김관리 님</p>
      </div>

      <div className={styles.menu}>
        <a
          className={
            isActive("/dashboard")
              ? styles["menu-item-active"]
              : styles["menu-item"]
          }
          href="/dashboard/1"
        >
          <span>대시보드</span>
        </a>
        <a
          className={
            isActive("/traffic-map")
              ? styles["menu-item-active"]
              : styles["menu-item"]
          }
          href="/traffic-map/1"
        >
          <span>동선추적</span>
        </a>
        <a
          className={
            isActive("/heat-map")
              ? styles["menu-item-active"]
              : styles["menu-item"]
          }
          href="/heat-map/1"
        >
          <span>히트맵</span>
        </a>
        <a
          className={
            isActive("/visitor-stats")
              ? styles["menu-item-active"]
              : styles["menu-item"]
          }
          href="/visitor-stats/1"
        >
          <span>사용자 통계</span>
        </a>
      </div>
    </div>
  );
};

export default SideNavigation;
