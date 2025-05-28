import styles from "./index.module.scss";
import { useState } from "react";

// 유틸 함수: 라벨별 count 및 가장 최근 created_at 계산
function getLabelSummary(trafficPoints) {
  const summaryMap = new Map();

  trafficPoints.forEach(({ userLabel, createdAt }) => {
    if (!summaryMap.has(userLabel)) {
      summaryMap.set(userLabel, {
        count: 1,
        latestCreatedAt: new Date(createdAt),
      });
    } else {
      const entry = summaryMap.get(userLabel);
      entry.count += 1;
      const newDate = new Date(createdAt);
      if (newDate > entry.latestCreatedAt) {
        entry.latestCreatedAt = newDate;
      }
    }
  });

  // Map → Array 변환
  return Array.from(summaryMap.entries()).map(
    ([label, { count, latestCreatedAt }]) => ({
      label,
      count,
      createdAt: latestCreatedAt.toLocaleString(), // 원하는 포맷으로 조정 가능
    }),
  );
}
export default function DashboardTable({ trafficPoints, onSectionSelect }) {
  const [selectedLabel, setSelectedLabel] = useState(null);

  const labelSummaries = getLabelSummary(trafficPoints);

  const handleRowClick = (label) => {
    const nextLabel = label === selectedLabel ? null : label; // 토글
    setSelectedLabel(nextLabel);
    onSectionSelect?.(nextLabel);
  };

  return (
    <div className={styles["summary-table"]}>
      <table>
        <thead>
          <tr onClick={() => handleRowClick(null)}>
            <th>방문자 라벨</th>
            <th>방문 횟수</th>
            <th>최근 방문 시각</th>
          </tr>
        </thead>
        <tbody>
          {labelSummaries.map((summary, i) => (
            <tr
              key={i}
              className={`${styles["section-row"]} ${
                summary.label === selectedLabel ? styles["active"] : ""
              }`}
              onClick={() => handleRowClick(summary.label)}
            >
              <td>{summary.label}</td>
              <td>{summary.count}</td>
              <td>{summary.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
