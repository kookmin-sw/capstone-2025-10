"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import CardContainer from "@/components/CardContainer";
import RequireLogin from "@/components/Login/RequireLogin";
import ArrowCanvas from "@/components/Canvas/ArrowCanvas";
import DashboardTable from "@/components/Table/DashboardTable";
import Image from "next/image";
import DateFilter from "@/components/Filter/DateFilter";
import ImageGrid from "@/components/ImageGrid";

const gridCols = 10;
const cellSize = 480 / 10;

function generateArrowsFromTracking(
  trackingData,
  imageWidth,
  imageHeight,
  originalImageWidth,
  originalImageHeight,
) {
  const scaleX = imageWidth / originalImageWidth;
  const scaleY = imageHeight / originalImageHeight;
  const arrows = [];

  const userGroups = new Map();
  trackingData.forEach((item) => {
    const userId = item.userLabel ?? "unknown";
    if (!userGroups.has(userId)) {userGroups.set(userId, []);}
    userGroups.get(userId).push(item);
  });

  for (const [userId, tracks] of userGroups.entries()) {
    tracks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    for (let i = 0; i < tracks.length - 1; i++) {
      const fromX = tracks[i].x * scaleX;
      const fromY = tracks[i].y * scaleY;
      const toX = tracks[i + 1].x * scaleX;
      const toY = tracks[i + 1].y * scaleY;

      const isInBounds =
        fromX >= 0 &&
        fromX <= imageWidth &&
        fromY >= 0 &&
        fromY <= imageHeight &&
        toX >= 0 &&
        toX <= imageWidth &&
        toY >= 0 &&
        toY <= imageHeight;

      if (isInBounds) {
        arrows.push({
          from: { x: fromX, y: fromY },
          to: { x: toX, y: toY },
          userId: userId,
        });
      }
    }
  }

  return arrows;
}

const TrafficMapSection = ({ sections, dashboardId }) => {
  const canvasRef = useRef(null);
  const [dateRange, setDateRange] = useState([
    new Date("2024-01-01"),
    new Date("2024-12-31"),
  ]);
  const [selectedSectionId, setSelectedSectionId] = useState(null);
  const [filteredTraffic, setFilteredTraffic] = useState([]);
  const [arrows, setArrows] = useState([]);

  const fetchTraffic = useCallback(async () => {
    try {
      const res = await fetch(
        `https://back.offflow.co.kr/api/tracking/${dashboardId}`,
        {
          cache: "no-store",
          credentials: "include",
        },
      );
      const data = await res.json();

      const parsed = data.map((item) => {
        const [gridX, gridY] = JSON.parse(item.gridList)[0].map(Number);
        return {
          id: item.id,
          dashboardId: item.dashboardId,
          createdAt: item.detectedTime,
          x: gridX,
          y: gridY,
          userLabel: item.visitorLabel,
        };
      });

      const [start, end] = dateRange;
      const filtered = parsed.filter((p) => {
        const d = new Date(p.createdAt);
        return d >= start && d <= end;
      });

      setFilteredTraffic(filtered);

      const newArrows = generateArrowsFromTracking(
        filtered,
        1080,
        608,
        1280,
        720,
      );

      const mappedArrows = newArrows.map((arrow) => ({
        ...arrow,
        isDimmed: selectedSectionId ? arrow.userId !== selectedSectionId : true,
      }));

      setArrows(mappedArrows);
    } catch (err) {
      console.error("❌ fetchTraffic 실패", err);
    }
  }, [dashboardId, dateRange, selectedSectionId]);

  useEffect(() => {
    const interval = setInterval(fetchTraffic, 1500);
    fetchTraffic(); // 초기 1회
    return () => clearInterval(interval);
  }, [fetchTraffic]);

  return (
    <RequireLogin>
      <section className={styles.section}>
        <div className={styles["header"]}>
          <p>동선 추적</p>
          <DateFilter dateRange={dateRange} setDateRange={setDateRange} />
        </div>
        <CardContainer showDivider={false} margin="40px">
          <div className={styles["image-grid-wrapper"]}>
            <Image
              src="/output_result.png"
              alt={"img"}
              width={1080}
              height={608}
            />
            <ImageGrid sections={sections} />
            <div className={styles.canvas}>
              <ArrowCanvas
                canvasRef={canvasRef}
                sections={sections}
                arrows={arrows}
              />
            </div>
          </div>
          <DashboardTable
            trafficPoints={filteredTraffic}
            onSectionSelect={setSelectedSectionId}
          />
        </CardContainer>
      </section>
    </RequireLogin>
  );
};

export default TrafficMapSection;
