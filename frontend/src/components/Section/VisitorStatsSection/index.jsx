"use client";

import React, { useState } from "react";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

import styles from "./index.module.scss";
import RequireLogin from "@/components/Login/RequireLogin";
import DateFilter from "@/components/Filter/DateFilter";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
);

const GRID_WIDTH = 10;
const GRID_HEIGHT = 10;
const CANVAS_WIDTH = 640;
const CANVAS_HEIGHT = 640;
const CELL_WIDTH = CANVAS_WIDTH / GRID_WIDTH;
const CELL_HEIGHT = CANVAS_HEIGHT / GRID_HEIGHT;

const timeSlots = [
  { label: "00-03시", start: 0, end: 3 },
  { label: "03-06시", start: 3, end: 6 },
  { label: "06-09시", start: 6, end: 9 },
  { label: "09-12시", start: 9, end: 12 },
  { label: "12-15시", start: 12, end: 15 },
  { label: "15-18시", start: 15, end: 18 },
  { label: "18-21시", start: 18, end: 21 },
  { label: "21-24시", start: 21, end: 24 },
];

const evaluateCondition = (a, operator, b) => {
  console.log(a, b);
  a = parseFloat(a);
  b = parseFloat(b);
  switch (operator) {
    case "같음":
      return a === b;
    case "같지 않음":
      return a !== b;
    case "다음값보다 큼":
      return a > b;
    case "다음값보다 크거나 같음":
      return a >= b;
    case "다음값보다 작음":
      return a < b;
    case "다음값보다 작거나 같음":
      return a <= b;
    default:
      return false;
  }
};

const getSectionStats = (sections, tracking, dateRange) => {
  const result = {};
  const stayTimeMap = {};
  const sectionTimeSeries = {};
  const sectionRecentVisitors = {};

  sections.forEach((s) => {
    result[s.name] = new Set();
    stayTimeMap[s.name] = {};
    sectionTimeSeries[s.name] = timeSlots.map(() => 0);
    sectionRecentVisitors[s.name] = new Set();
  });

  const now = Date.now();
  const fiveMinAgo = now - 5 * 60 * 1000;

  tracking.forEach((t) => {
    const time = new Date(t.detectedTime);
    if (time < dateRange[0] || time > dateRange[1]) return;

    const [x, y] = JSON.parse(t.gridList)[0];
    const cellX = Math.floor(x / CELL_WIDTH);
    const cellY = Math.floor(y / CELL_HEIGHT);
    const cell = cellX + cellY * GRID_WIDTH;
    const hour = time.getHours();

    sections.forEach((s) => {
      if (s.positionList.includes(String(cell))) {
        result[s.name].add(t.visitorLabel);

        const ts = time.getTime();
        if (!stayTimeMap[s.name][t.visitorLabel])
          stayTimeMap[s.name][t.visitorLabel] = [];
        stayTimeMap[s.name][t.visitorLabel].push(ts);

        const slotIdx = timeSlots.findIndex(
          (slot) => hour >= slot.start && hour < slot.end,
        );
        if (slotIdx !== -1) sectionTimeSeries[s.name][slotIdx]++;

        if (ts >= fiveMinAgo) {
          sectionRecentVisitors[s.name].add(t.visitorLabel);
        }
      }
    });
  });

  const counts = {};
  const avgTimes = {};
  const recentCounts = {};
  const userDurations = {};
  for (const name in result) {
    counts[name] = result[name].size;
    recentCounts[name] = sectionRecentVisitors[name].size;
    userDurations[name] = {};
    for (const label in stayTimeMap[name]) {
      const times = stayTimeMap[name][label];
      const dur =
        times.length > 1 ? Math.max(...times) - Math.min(...times) : 0;
      userDurations[name][label] = Math.floor(dur);
    }
    const allDurations = Object.values(userDurations[name]);
    avgTimes[name] = allDurations.length
      ? Math.floor(
          allDurations.reduce((a, b) => a + b, 0) / allDurations.length,
        )
      : 0;
  }
  console.log(userDurations);

  return { counts, avgTimes, sectionTimeSeries, recentCounts, userDurations };
};

const VisitorStatusSection = ({ visitors, trackingData, sections, events }) => {
  const [dateRange, setDateRange] = useState([
    new Date("2024-01-01"),
    new Date("2024-01-07"),
  ]);

  if (!visitors || visitors.length === 0) {
    return <RequireLogin />;
  }

  const filtered = visitors.filter((v) => {
    const t = new Date(v.detectedTime);
    return t >= dateRange[0] && t <= dateRange[1];
  });

  const {
    counts: sectionCounts,
    avgTimes: sectionAvgTimes,
    sectionTimeSeries,
    recentCounts,
    userDurations,
  } = getSectionStats(sections, trackingData, dateRange);

  const total = filtered.length;
  const genderCount = { male: 0, female: 0 };
  const ageGroupCount = {
    "9세 이하": 0,
    "10대": 0,
    "20대": 0,
    "30대": 0,
    "40대": 0,
    "50대": 0,
    "60대 이상": 0,
  };

  filtered.forEach((v) => {
    const gender = v.gender?.toLowerCase();
    if (gender === "male" || gender === "female") genderCount[gender]++;

    let age = parseInt(v.age);
    if (isNaN(age)) {
      const match = v.age?.match(/\d+/);
      age = match ? parseInt(match[0]) : -1;
    }
    if (age >= 0) {
      if (age <= 9) ageGroupCount["9세 이하"]++;
      else if (age <= 19) ageGroupCount["10대"]++;
      else if (age <= 29) ageGroupCount["20대"]++;
      else if (age <= 39) ageGroupCount["30대"]++;
      else if (age <= 49) ageGroupCount["40대"]++;
      else if (age <= 59) ageGroupCount["50대"]++;
      else ageGroupCount["60대 이상"]++;
    }
  });

  const mostGender =
    genderCount.male >= genderCount.female
      ? `남성 (${((genderCount.male / total) * 100).toFixed(0)}%)`
      : `여성 (${((genderCount.female / total) * 100).toFixed(0)}%)`;

  const mostAge = Object.entries(ageGroupCount).reduce((a, b) =>
    a[1] > b[1] ? a : b,
  );
  const mostAgeGroup = `${mostAge[0]} (${((mostAge[1] / total) * 100).toFixed(
    0,
  )}%)`;

  const lineData = {
    labels: timeSlots.map((s) => s.label),
    datasets: sections.map((s, i) => ({
      label: s.name,
      data: sectionTimeSeries[s.name],
      borderColor: `hsl(${(i * 90) % 360}, 70%, 50%)`,
      backgroundColor: `hsl(${(i * 90) % 360}, 70%, 50%)`,
      tension: 0.3,
    })),
  };

  const eventCount = events?.reduce((acc, ev) => {
    const conditionMet = ev.eventConditions.every((cond) => {
      const val = parseFloat(cond.value);
      if (cond.indicatorName === "averageStayTime") {
        console.log("tette", Object.values(userDurations));
        return Object.entries(userDurations).map((entry) =>
          Object.values(entry[1]).map((t) => {
            if (!acc[entry[0]]) {
              acc[entry[0]] = 0;
            }
            if (evaluateCondition(t, cond.operator, val)) {
              ++acc[entry[0]];
              console.log(entry[0], acc[entry[0]]);
            }
          }),
        );
      } else if (cond.indicatorName === "totalVisitors") {
        return Object.entries(recentCounts).map((entry) => {
          if (!acc[entry[0]]) {
            acc[entry[0]] = 0;
          }
          if (evaluateCondition(entry[1], cond.operator, val)) {
            ++acc[entry[0]];
          }
        });
      }
      return false;
    });
    return acc;
  }, {});
  console.log(eventCount);
  return (
    <RequireLogin>
      <section className={styles["visitor-stats-section"]}>
        <div className={styles["header"]}>
          <p>사용자 통계</p>
          <DateFilter dateRange={dateRange} setDateRange={setDateRange} />
        </div>

        <div className={styles.contents}>
          <div className={styles["chart-full"]}>
            <h3>사용자 통계 : 시간 경과에 따른 섹션 참여 사용자 수</h3>
            <div style={{ height: "300px" }}>
              <Line
                data={lineData}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
          </div>

          <div className={styles["table-wrapper"]}>
            <table>
              <thead>
                <tr>
                  <th>섹션 이름</th>
                  <th>고유 방문자 수</th>
                  <th>평균 체류시간</th>
                  <th>가장 많은 성별</th>
                  <th>가장 많은 연령대</th>
                  <th>총 이벤트 수</th>
                </tr>
              </thead>
              <tbody>
                {sections.map((sec) => (
                  <tr key={sec.name}>
                    <td>{sec.name}</td>
                    <td>{sectionCounts[sec.name] || 0}</td>
                    <td>{sectionAvgTimes[sec.name] || 0}초</td>
                    <td>{mostGender}</td>
                    <td>{mostAgeGroup}</td>
                    <td>{eventCount[sec.name]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </RequireLogin>
  );
};

export default VisitorStatusSection;
