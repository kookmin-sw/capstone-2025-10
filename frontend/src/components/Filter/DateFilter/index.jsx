import React from "react";
import styles from "./index.module.scss";

const DateFilter = ({ dateRange, setDateRange }) => {
  const [startDate, endDate] = dateRange;

  const toDateInputValue = (date) => {
    return date.toISOString().split("T")[0]; // 'YYYY-MM-DD'
  };

  const handleStartChange = (e) => {
    const newStart = new Date(e.target.value);
    setDateRange([newStart, endDate]);
  };

  const handleEndChange = (e) => {
    const newEnd = new Date(e.target.value);
    setDateRange([startDate, newEnd]);
  };

  const handleShortcut = (days) => {
    const now = new Date();
    now.setHours(23, 59, 59, 999); // ✅ 오늘의 끝

    const from = new Date();
    from.setDate(now.getDate() - days + 1);
    from.setHours(0, 0, 0, 0); // ✅ from은 시작 시각

    setDateRange([from, now]);
  };

  return (
    <div className={styles["date-filter"]}>
      <input
        type="date"
        value={toDateInputValue(startDate)}
        onChange={handleStartChange}
        className={styles.dateInput}
      />
      <span>~</span>
      <input
        type="date"
        value={toDateInputValue(endDate)}
        onChange={handleEndChange}
        className={styles.dateInput}
      />

      <button onClick={() => handleShortcut(7)}>지난 7일</button>
      <button onClick={() => handleShortcut(28)}>지난 28일</button>
    </div>
  );
};

export default DateFilter;
