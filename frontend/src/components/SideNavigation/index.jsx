import React from "react";
import styles from "./index.module.scss";

const SideNavigation = () => {
    return (
        <div className={styles["side-nav"]}>
            <div className={styles["profile-card"]}>
                <p className={styles.title}>알림 전송</p>
                <p className={styles.name}>김관리 님</p>
            </div>

            <div className={styles.menu}>
                <div className={styles["menu-item-active"]}>
                    <span>알림 전송</span>
                </div>
                <div className={styles["menu-item"]}>
                    <span>설문조사</span>
                </div>
                <div className={styles["menu-item"]}>
                    <span>환경설정</span>
                </div>
            </div>
        </div>
    );
};

export default SideNavigation;
