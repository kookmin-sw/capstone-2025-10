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
  const heatmapInstance = h337.create({
    container: ctx.canvas.parentElement,
    radius: 45,
    maxOpacity: 0.6,
    minOpacity: 0.1,
    blur: 0.85,
  });

  // 정규화된 위치 적용
  const normalizedData = Object.entries(heatmapData).map(([key, value]) => {
    const [x, y] = key.split(",").map(Number);
    console.log(
      "x y",
      (x / originalWidth) * canvasWidth,
      (y / originalHeight) * canvasHeight,
    );

    return {
      x: (x / originalWidth) * canvasWidth,
      y: (y / originalHeight) * canvasHeight,
      value,
    };
  });

  const max = Math.max(...normalizedData.map((d) => d.value));

  heatmapInstance.setData({
    max,
    data: normalizedData,
  });
}

export default function HeatmapCanvas({
  canvasRef,
  heatmapData,
  gridCols,
  gridRows,
  cellSize,
  originalWidth = 480,
  originalHeight = 480,
}) {
  const draw = (ctx) => {
    ctx.clearRect(0, 0, 1280, 720);
    console.log(
      "ctx.canvas.width, ctx.canvas.height",
      ctx.canvas.width,
      ctx.canvas.height,
    );
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
    <BaseCanvas
      canvasRef={canvasRef}
      draw={draw}
      dependencies={[heatmapData]}
    />
  );
}
