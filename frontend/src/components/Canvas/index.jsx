"use client";

import { useEffect } from "react";

export default function BaseCanvas({ canvasRef, draw, dependencies = [] }) {
  useEffect(() => {
    console.log("test clear canvas");
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      canvas.style.width = "100%";
      canvas.style.height = "100%";

      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    draw(ctx, canvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, dependencies);

  return <canvas ref={canvasRef} />;
}
