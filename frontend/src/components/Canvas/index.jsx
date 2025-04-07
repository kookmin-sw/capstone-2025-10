"use client";

import { useEffect } from "react";

export default function MyCanvas({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      // 1. CSS 사이즈 설정 (화면에 보이는 크기)
      canvas.style.width = "100%";
      canvas.style.height = "100%";

      // 2. 실제 캔버스 해상도 설정 (픽셀 단위, 선명하게)
      const width = parent.clientWidth;
      const height = parent.clientHeight;

      canvas.width = width;
      canvas.height = height;
    };

    // 초기 렌더 + resize 시
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    ctx.strokeStyle = "#007cf8";
    ctx.fillStyle = "#007cf8";
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return <canvas ref={canvasRef} />;
}
export function drawArrow(ctx, fromX, fromY, toX, toY, options) {
  const color = options?.color || "#000";
  const width = options?.width || 2;
  const headLength = 10;
  const headAngle = Math.PI / 6;
  const fillHead = true;

  const dx = toX - fromX;
  const dy = toY - fromY;
  const angle = Math.atan2(dy, dx);

  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.stroke();

  const arrowX1 = toX - headLength * Math.cos(angle - headAngle);
  const arrowY1 = toY - headLength * Math.sin(angle - headAngle);
  const arrowX2 = toX - headLength * Math.cos(angle + headAngle);
  const arrowY2 = toY - headLength * Math.sin(angle + headAngle);

  ctx.beginPath();
  ctx.moveTo(toX, toY);
  ctx.lineTo(arrowX1, arrowY1);
  ctx.lineTo(arrowX2, arrowY2);
  ctx.lineTo(toX, toY);

  if (fillHead) {
    ctx.fillStyle = color;
    ctx.fill();
  } else {
    ctx.stroke();
  }
}

function getCellCenter(index, gridCols, cellSize) {
  const row = Math.floor(index / gridCols);
  const col = index % gridCols;
  return {
    x: col * cellSize + cellSize / 2,
    y: row * cellSize + cellSize / 2,
  };
}

function getSectionCenter(section, gridCols, cellSize) {
  const positions = section.cells.map((i) =>
    getCellCenter(i, gridCols, cellSize),
  );
  const sum = positions.reduce(
    (acc, pos) => {
      acc.x += pos.x;
      acc.y += pos.y;
      return acc;
    },
    { x: 0, y: 0 },
  );

  return {
    x: sum.x / positions.length,
    y: sum.y / positions.length,
  };
}

export function drawSectionArrows(ctx, sections, arrows, gridCols, cellSize) {
  arrows.forEach(({ from, to }) => {
    const fromCenter = getSectionCenter(sections[from], gridCols, cellSize);
    const toCenter = getSectionCenter(sections[to], gridCols, cellSize);

    drawArrow(ctx, fromCenter.x, fromCenter.y, toCenter.x, toCenter.y, {
      color: "black",
      width: 2,
    });
  });
}
