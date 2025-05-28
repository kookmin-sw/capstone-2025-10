"use client";

import BaseCanvas from "../";
import h337 from "heatmap.js";

function drawHeatmap(
  ctx,
  heatmapData,
  originalWidth,
  originalHeight,
  canvasWidth,
  canvasHeight,
) {
  const container = ctx.canvas.parentElement;

  // 기존 heatmap div 제거 (중복 방지)
  const existing = container.querySelector(".heatmap-canvas");
  if (existing) {container.removeChild(existing);}

  const heatmapInstance = h337.create({
    container,
    radius: 200,
    maxOpacity: 0.6,
    minOpacity: 0.1,
    blur: 0.9,
  });

  // ⬇️ 1. 좌표 파싱
  const raw = Object.entries(heatmapData).map(([key, value]) => {
    const [x, y] = key.split(",").map(Number);
    return { x, y, value };
  });

  if (raw.length === 0) {return;}

  // ⬇️ 2. 음수 좌표 정규화
  const minX = Math.min(...raw.map((d) => d.x));
  const minY = Math.min(...raw.map((d) => d.y));
  const offsetWidth = originalWidth - minX;
  const offsetHeight = originalHeight - minY;

  const normalizedData = raw.map(({ x, y, value }) => ({
    x: ((x - minX) / offsetWidth) * canvasWidth,
    y: ((y - minY) / offsetHeight) * canvasHeight,
    value,
  }));

  const max = Math.max(...normalizedData.map((d) => d.value)) || 1;

  requestAnimationFrame(() => {
    heatmapInstance.setData({
      max,
      data: normalizedData,
    });
  });
}

export default function HeatmapCanvas({
  canvasRef,
  heatmapData,
  originalWidth = 480,
  originalHeight = 480,
}) {
  const draw = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    drawHeatmap(
      ctx,
      heatmapData,
      originalWidth,
      originalHeight,
      ctx.canvas.width,
      ctx.canvas.height,
    );
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <BaseCanvas
        canvasRef={canvasRef}
        draw={draw}
        dependencies={[heatmapData]}
      />
    </div>
  );
}
