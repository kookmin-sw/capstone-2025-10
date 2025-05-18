"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";

export default function EventTable({ events }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const menuRef = useRef(null);

  const toggleMenu = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  const handleDelete = (eventId) => {
    console.log(`Delete event with id: ${eventId}`);
  };

  // 외부 클릭 감지 후 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setActiveIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles["summary-table"]}>
      <table>
        <thead>
          <tr>
            <th>이벤트 이름</th>
            <th>이벤트 설명</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, i) => (
            <tr key={i}>
              <td>{event.eventName}</td>
              <td>{event.description}</td>
              <td style={{ position: "relative" }}>
                <button
                  className={styles["menu-button"]}
                  onClick={() => toggleMenu(i)}
                >
                  ⋯
                </button>
                {activeIndex === i && (
                  <div className={styles["dropdown-menu"]} ref={menuRef}>
                    <button
                      className={styles["delete-button"]}
                      onClick={() => handleDelete(event.id)}
                    >
                      삭제
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
