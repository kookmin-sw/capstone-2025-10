"use client";

import styles from "./index.module.scss";
import Image from 'next/image';
import Link from 'next/link';
import {usePathname, useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import LogoutButton from "@/components/Button/LogoutButton";

export default function Header() {
    const router = useRouter();
    const pathname = usePathname();
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        async function checkAuth() {
            //try {
            //    const response = await fetch("/api/user", {
            //        method: "GET",
            //        credentials: "include",
            //    });
            //    if (!response.ok) {
            //    } else {
            //        setIsLogin(true)
            //    }
            //} catch (error) {
            //    console.error("Failed to check authentication:", error);
            //}
        }

        checkAuth();
    }, [router]);


    const headerItems = [
        {
            title: "대시보드",
            path: "/dashboard",
        },
        {
            title:"캠페인 추가",
            path: "/campaign",
        },
        {
            title:"제품관리",
            path: "/product",
        },
        {
            title:"회원 관리",
            path: "/user",
        },
        {
            title:"알림 전송",
            path: "/notice",
        }
    ]

    const headerAuthItems = [
        {
            title: "마이페이지",
            path: "/mypage",
        },
        {
            title: "결제 팝업",
            path: "/mypage",
        }
    ]
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
                    {
                        headerItems.map((item) => (
                            <a className={`${item.path === pathname ? styles.strong : ''}`} key={item.title} href={item.path}>{item.title}</a>
                        ))
                    }
                </div>
                <div className={styles["header-auth-items-wrapper"]}>
                    {
                        headerAuthItems.map((item) => (
                            <a className={`${item.path === pathname ? styles.strong : ''}`} key={item.title} href={item.path}>{item.title}</a>
                        ))
                    }
                    <LogoutButton />
                </div>
            </div>
        </header>
    )
}
