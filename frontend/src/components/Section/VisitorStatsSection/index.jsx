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

// 시간대 구간
const timeSlots = [
  { label: "09-11시", start: 9, end: 11 },
  { label: "11-13시", start: 11, end: 13 },
  { label: "13-15시", start: 13, end: 15 },
  { label: "15-17시", start: 15, end: 17 },
  { label: "17-19시", start: 17, end: 19 },
  { label: "19-21시", start: 19, end: 21 },
  { label: "21-23시", start: 21, end: 23 },
];

// 섹션별 시간대 사용자 수 계산
const getSectionTimeSeries = (visitors) => {
  const sectionSeries = {
    A: timeSlots.map(() => 0),
    B: timeSlots.map(() => 0),
    C: timeSlots.map(() => 0),
  };

  visitors.forEach((v) => {
    const date = new Date(
      new Date(v.detectedTime).getTime() + 9 * 60 * 60 * 1000,
    ); // KST
    const hour = date.getHours();
    const section = v.section?.toUpperCase(); // sectionA, sectionB 등

    if (["A", "B", "C"].includes(section)) {
      const index = timeSlots.findIndex(
        (slot) => hour >= slot.start && hour < slot.end,
      );
      if (index !== -1) sectionSeries[section][index]++;
    }
  });

  return sectionSeries;
};

// 요약 데이터 계산
const getSummaryStats = (visitors) => {
  const total = visitors.length;
  const avgStayTime =
    total > 0
      ? Math.floor(
          visitors.reduce((sum, v) => sum + (v.stayTime || 0), 0) / total,
        )
      : 0;

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
  const sectionUserCount = { A: 0, B: 0, C: 0 };

  visitors.forEach((v) => {
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

    const section = v.section?.toUpperCase();
    if (["A", "B", "C"].includes(section)) sectionUserCount[section]++;
  });

  const mostGender =
    genderCount.male >= genderCount.female
      ? `남성 (${((genderCount.male / total) * 100).toFixed(0)}%)`
      : `여성 (${((genderCount.female / total) * 100).toFixed(0)}%)`;

  const mostAge = Object.entries(ageGroupCount).reduce((a, b) =>
    a[1] > b[1] ? a : b,
  );
  const mostAgeGroup = `${mostAge[0]} (${((mostAge[1] / total) * 100).toFixed(0)}%)`;

  return {
    total,
    avgStayTime,
    mostGender,
    mostAgeGroup,
    sectionUserCount,
  };
};

const VisitorStatusSection = ({ visitors }) => {
  const [dateRange, setDateRange] = useState([
    new Date("2024-01-01"),
    new Date("2024-01-07"),
  ]);

  if (!visitors || visitors.length === 0) {
    return <RequireLogin />;
  }

  console.log(visitors);

  const filtered = visitors.filter((v) => {
    const t = new Date(v.detectedTime);
    return t >= dateRange[0] && t <= dateRange[1];
  });

  const sectionSeries = getSectionTimeSeries(filtered);
  const { total, avgStayTime, mostGender, mostAgeGroup, sectionUserCount } =
    getSummaryStats(filtered);

  const lineData = {
    labels: timeSlots.map((s) => s.label),
    datasets: [
      {
        label: "섹션A",
        data: sectionSeries.A,
        borderColor: "#0047AB",
        backgroundColor: "#0047AB",
        tension: 0.3,
      },
      {
        label: "섹션B",
        data: sectionSeries.B,
        borderColor: "#00C896",
        backgroundColor: "#00C896",
        tension: 0.3,
      },
      {
        label: "섹션C",
        data: sectionSeries.C,
        borderColor: "#7FFFD4",
        backgroundColor: "#7FFFD4",
        tension: 0.3,
      },
    ],
  };

  return (
    <RequireLogin>
      <section className={styles["visitor-stats-section"]}>
        {/* 상단 필터 */}
        <div className={styles["header"]}>
          <p>사용자 통계</p>
          <DateFilter dateRange={dateRange} setDateRange={setDateRange} />
        </div>

        {/* 라인 차트 */}
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

          {/* 통계 테이블 */}
          <div className={styles["table-wrapper"]}>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>사용자수</th>
                  <th>평균 체류시간</th>
                  <th>가장 많은 성별</th>
                  <th>가장 많은 연령대</th>
                  <th>총 이벤트 수</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>합계</td>
                  <td>
                    {total}명<br />
                    <span>총 건수와 동일</span>
                  </td>
                  <td>
                    {avgStayTime}초<br />
                    <span>평균과 동일</span>
                  </td>
                  <td>
                    {mostGender}
                    <br />
                    <span>평균과 동일</span>
                  </td>
                  <td>
                    {mostAgeGroup}
                    <br />
                    <span>평균과 동일</span>
                  </td>
                  <td>
                    53건
                    <br />
                    <span>총 건수와 동일</span>
                  </td>
                </tr>
                {["A", "B", "C"].map((sec) => (
                  <tr key={sec}>
                    <td>섹션{sec}</td>
                    {Array(5)
                      .fill(null)
                      .map((_, i) => (
                        <td key={i}>{sectionUserCount[sec]} (A%)</td>
                      ))}
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
