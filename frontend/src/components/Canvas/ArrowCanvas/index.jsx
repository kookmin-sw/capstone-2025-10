"use client";

import BaseCanvas from "../";
import { drawSectionArrows } from "@/utils/drawUtils";

export default function ArrowCanvas({
  canvasRef,
  sections,
  arrows,
  gridCols,
  cellSize,
}) {
  const draw = (ctx) => {
    drawSectionArrows(ctx, arrows, gridCols, cellSize);
  };

  return (
    <BaseCanvas
      canvasRef={canvasRef}
      draw={draw}
      dependencies={[sections, arrows]}
    />
  );
}
