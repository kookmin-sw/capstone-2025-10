"use client";

import BaseCanvas from "../";
import { drawSectionArrows } from "@/utils/drawUtils";

export default function ArrowCanvas({ canvasRef, sections, arrows }) {
  const draw = (ctx) => {
    drawSectionArrows(ctx, arrows);
  };

  return (
    <BaseCanvas
      canvasRef={canvasRef}
      draw={draw}
      dependencies={[sections, arrows]}
    />
  );
}
