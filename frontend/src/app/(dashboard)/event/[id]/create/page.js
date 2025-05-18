"use client";

import React, { useState } from "react";
import styles from "./page.module.scss";

export default function CreateEventPage() {
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [dashboard, setDashboard] = useState("");
  const [conditions, setConditions] = useState([
    { metric: "", operator: "같음", value: "" },
  ]);

  const handleAddCondition = () => {
    setConditions([...conditions, { metric: "", operator: "같음", value: "" }]);
  };

  const handleRemoveCondition = (index) => {
    const updated = [...conditions];
    updated.splice(index, 1);
    setConditions(updated);
  };

  const handleConditionChange = (index, field, value) => {
    const updated = [...conditions];
    updated[index][field] = value;
    setConditions(updated);
  };

  const handleSubmit = async () => {
    const payload = {
      name: eventName,
      description: eventDescription,
      dashboard,
      conditions,
    };

    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("이벤트 생성 실패");
      }
      alert("이벤트가 성공적으로 생성되었습니다.");
      setEventName("");
      setEventDescription("");
      setDashboard("");
      setConditions([{ metric: "", operator: "같음", value: "" }]);
    } catch (err) {
      alert("오류 발생: " + err.message);
    }
  };

  return (
    <div className={styles["event-create-container"]}>
      <h2>이벤트 만들기</h2>

      <section className={styles.section}>
        <h3>만들고자 하는 이벤트 속성</h3>
        <label>
          1. 이벤트 이름
          <input
            type="text"
            placeholder="이벤트 이름"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </label>
        <label>
          2. 이벤트 설명
          <input
            type="text"
            placeholder="이벤트 설명"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
          />
        </label>
      </section>

      <section className={styles.section}>
        <h3>이벤트 생성방법</h3>
        <label>
          1. 대시보드 선택
          <select
            value={dashboard}
            onChange={(e) => setDashboard(e.target.value)}
          >
            <option value="">대시보드 이름</option>
            <option value="dashboard1">대시보드 1</option>
            <option value="dashboard2">대시보드 2</option>
          </select>
        </label>

        <label>2. 지표 및 값 선정</label>
        {conditions.map((condition, index) => (
          <div key={index} className={styles.conditionRow}>
            <select
              value={condition.metric}
              onChange={(e) =>
                handleConditionChange(index, "metric", e.target.value)
              }
            >
              <option value="">지표 이름</option>
              <option value="visit_count">방문자 수</option>
              <option value="avg_time">평균 체류 시간</option>
            </select>

            <select
              value={condition.operator}
              onChange={(e) =>
                handleConditionChange(index, "operator", e.target.value)
              }
            >
              <option value="같음">같음</option>
              <option value="보다 큼">보다 큼</option>
              <option value="보다 작음">보다 작음</option>
            </select>

            <input
              type="text"
              placeholder="값"
              value={condition.value}
              onChange={(e) =>
                handleConditionChange(index, "value", e.target.value)
              }
            />

            <button onClick={() => handleRemoveCondition(index)}>
              <img src="/x.svg" alt="delete button" />
            </button>
          </div>
        ))}

        <button className={styles.addButton} onClick={handleAddCondition}>
          조건 추가
        </button>
      </section>

      <div className={styles.footer}>
        <button className={styles.createButton} onClick={handleSubmit}>
          만들기
        </button>
      </div>
    </div>
  );
}
