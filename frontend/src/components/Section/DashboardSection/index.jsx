"use client";

import React, { useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";

import styles from "./index.module.scss";
import RequireLogin from "@/components/Login/RequireLogin";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
);

const timeSlots = [
  { label: "09-11시", start: 9, end: 11 },
  { label: "11-13시", start: 11, end: 13 },
  { label: "13-15시", start: 13, end: 15 },
  { label: "15-17시", start: 15, end: 17 },
  { label: "17-19시", start: 17, end: 19 },
  { label: "19-21시", start: 19, end: 21 },
  { label: "21-23시", start: 21, end: 23 },
];

const getChartDataFromVisitors = (visitors) => {
  const genderCount = { male: 0, female: 0 };
  const ageGroups = {
    "9세 이하": 0,
    "10대": 0,
    "20대": 0,
    "30대": 0,
    "40대": 0,
    "50대": 0,
    "60대 이상": 0,
  };
  const timeGender = timeSlots.map(() => ({ male: 0, female: 0 }));

  visitors.forEach((v) => {
    const dateUTC = new Date(v.detectedTime);
    const dateKST = new Date(dateUTC.getTime() + 9 * 60 * 60 * 1000); // ✅ UTC → KST 변환
    const hour = dateKST.getHours();

    // 성별 카운트
    const gender = v.gender?.toLowerCase();
    if (gender === "male" || gender === "female") {
      genderCount[gender]++;
    }

    // 연령 카운트
    let age = parseInt(v.age);
    if (isNaN(age)) {
      const match = v.age.match(/\d+/);
      age = match ? parseInt(match[0]) : -1;
    }
    if (age >= 0) {
      if (age <= 9) ageGroups["9세 이하"]++;
      else if (age <= 19) ageGroups["10대"]++;
      else if (age <= 29) ageGroups["20대"]++;
      else if (age <= 39) ageGroups["30대"]++;
      else if (age <= 49) ageGroups["40대"]++;
      else if (age <= 59) ageGroups["50대"]++;
      else ageGroups["60대 이상"]++;
    }

    // 시간대별 성별 카운트
    timeSlots.forEach((slot, index) => {
      if (hour >= slot.start && hour < slot.end) {
        if (gender === "male") timeGender[index].male++;
        if (gender === "female") timeGender[index].female++;
      }
    });
  });

  return { genderCount, ageGroups, timeGender };
};

const DashboardSection = ({ visitors }) => {
  const [test, setTest] = useState(visitors);
  const { genderCount, ageGroups, timeGender } =
    getChartDataFromVisitors(visitors);

  const totalGenderCount = genderCount.male + genderCount.female;
  const dominantGender =
    genderCount.female > genderCount.male ? "여성" : "남성";
  const genderRatioDiff =
    totalGenderCount > 0
      ? Math.abs(
          ((genderCount.male - genderCount.female) / totalGenderCount) * 100,
        ).toFixed(1)
      : 0;

  const timeSlotStats = timeGender.map((t, i) => {
    const total = t.male + t.female;
    const maleRatio = total > 0 ? (t.male / total) * 100 : 0;
    const femaleRatio = total > 0 ? (t.female / total) * 100 : 0;
    return {
      label: timeSlots[i].label,
      maleRatio,
      femaleRatio,
    };
  });

  const maxMaleTime = timeSlotStats.reduce((a, b) =>
    a.maleRatio > b.maleRatio ? a : b,
  );
  const maxFemaleTime = timeSlotStats.reduce((a, b) =>
    a.femaleRatio > b.femaleRatio ? a : b,
  );

  const totalAgeCount = Object.values(ageGroups).reduce((a, b) => a + b, 0);
  const mostVisitedAgeGroup = Object.entries(ageGroups).reduce((a, b) =>
    a[1] > b[1] ? a : b,
  );
  const mostVisitedAgeGroupLabel = mostVisitedAgeGroup[0];
  const mostVisitedAgeGroupRatio =
    totalAgeCount > 0
      ? ((mostVisitedAgeGroup[1] / totalAgeCount) * 100).toFixed(1)
      : 0;

  const lineData = {
    labels: timeSlots.map((slot) => slot.label),
    datasets: [
      {
        label: "남성",
        data: timeGender.map((t) => t.male),
        borderColor: "#0047AB",
        backgroundColor: "#0047AB",
        tension: 0.3,
      },
      {
        label: "여성",
        data: timeGender.map((t) => t.female),
        borderColor: "#7FFFD4",
        backgroundColor: "#7FFFD4",
        tension: 0.3,
      },
    ],
  };

  const doughnutData = {
    labels: ["남성", "여성"],
    datasets: [
      {
        label: "성별",
        data: [genderCount.male, genderCount.female],
        backgroundColor: ["#0047AB", "#7FFFD4"],
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: Object.keys(ageGroups),
    datasets: [
      {
        label: "연령대",
        data: Object.values(ageGroups),
        backgroundColor: "#0047AB",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  if (Object.keys(visitors).length === 0) {
    //router.push("/login");
    return <RequireLogin></RequireLogin>;
  }

  return (
    <RequireLogin>
      <section className={styles["visitor-stats-section"]}>
        <div className={styles["chart-full"]}>
          <h3>
            <b>{maxMaleTime.label}</b>에는 <b>남성</b>이{" "}
            <b>{maxMaleTime.maleRatio.toFixed(1)}%</b>로,{" "}
            <b>{maxFemaleTime.label}</b>에는 <b>여성</b>이{" "}
            <b>{maxFemaleTime.femaleRatio.toFixed(1)}%</b>로 가장 많이
            방문했습니다.
          </h3>
          <div style={{ height: "300px" }}>
            <Line data={lineData} options={chartOptions} />
          </div>
        </div>
        <div className={styles["chart-half-wrapper"]}>
          <div className={styles["chart-half"]}>
            <h3>
              <b>{dominantGender}</b>이{" "}
              <b>
                {(
                  (Math.max(genderCount.male, genderCount.female) /
                    totalGenderCount) *
                  100
                ).toFixed(1)}
                %
              </b>
              로 더 많이 방문했습니다.
            </h3>
            <div style={{ height: "280px" }}>
              <Doughnut data={doughnutData} options={chartOptions} />
            </div>
          </div>
          <div className={styles["chart-half"]}>
            <h3>
              <b>{mostVisitedAgeGroupLabel}</b>가{" "}
              <b>{mostVisitedAgeGroupRatio}%</b>로 가장 많이 방문했습니다.
            </h3>
            <div style={{ height: "280px" }}>
              <Bar data={barData} options={chartOptions} />
            </div>
          </div>
        </div>
      </section>
    </RequireLogin>
  );
};

export default DashboardSection;
