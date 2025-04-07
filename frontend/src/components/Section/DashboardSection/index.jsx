import React from "react";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement,
    ArcElement,
} from "chart.js";

import styles from "./index.module.scss";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement,
    ArcElement
);

const DashboardSection = () => {
    const lineData = {
        labels: ["09-11시", "11-13시", "13-15시", "15-17시", "17-19시", "19-21시", "21-23시"],
        datasets: [
            {
                label: "남성",
                data: [-20, 70, 40, -60, -10, 60, -70],
                borderColor: "#0047AB",
                backgroundColor: "#0047AB",
                tension: 0.3,
            },
            {
                label: "여성",
                data: [20, -10, 10, 10, 70, -40, 20],
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
                data: [32.5, 62.5],
                backgroundColor: ["#0047AB", "#7FFFD4"],
                borderWidth: 1,
            },
        ],
    };

    const barData = {
        labels: ["9세 이하", "10대", "20대", "30대", "40대", "50대", "60대 이상"],
        datasets: [
            {
                label: "연령대",
                data: [0, 3, 10, 58.2, 8, 5, 0],
                backgroundColor: "#0047AB",
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <section className={styles["visitor-stats-section"]}>
            <div className={styles["chart-full"]}>
                <h3>
                    <b>11-13시</b>에는 <b>남성</b>이 68.2%로, <b>17-19시</b>에는 <b>여성</b>이 80%로 가장 많이 방문했습니다.
                </h3>
                <div style={{ height: "300px" }}>
                    <Line data={lineData} options={chartOptions} />
                </div>
            </div>
            <div className={styles["chart-half-wrapper"]}>
                <div className={styles["chart-half"]}>
                    <h3>
                        <b>여성</b>이 62.5%로 더 많이 방문했습니다.
                    </h3>
                    <div style={{ height: "280px" }}>
                        <Doughnut data={doughnutData} options={chartOptions} />
                    </div>
                </div>
                <div className={styles["chart-half"]}>
                    <h3>
                        <b>30대</b>가 58.2%로 가장 많이 방문했습니다.
                    </h3>
                    <div style={{ height: "280px" }}>
                        <Bar data={barData} options={chartOptions} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DashboardSection;
