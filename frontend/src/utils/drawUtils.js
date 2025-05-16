export function drawArrow(ctx, fromX, fromY, toX, toY, options = {}) {
  const color = options.color || "rgba(0, 0, 0, 0.4)"; // 기본: 반투명 검정
  const width = options.width || 2;
  const headLength = 10;
  const angle = Math.atan2(toY - fromY, toX - fromX);

  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.stroke();

  const arrowX1 = toX - headLength * Math.cos(angle - Math.PI / 6);
  const arrowY1 = toY - headLength * Math.sin(angle - Math.PI / 6);
  const arrowX2 = toX - headLength * Math.cos(angle + Math.PI / 6);
  const arrowY2 = toY - headLength * Math.sin(angle + Math.PI / 6);

  ctx.beginPath();
  ctx.moveTo(toX, toY);
  ctx.lineTo(arrowX1, arrowY1);
  ctx.lineTo(arrowX2, arrowY2);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

export function drawSectionArrows(ctx, arrows, gridCols, cellSize) {
  const getCenter = ([col, row]) => ({
    x: col * cellSize + cellSize / 2,
    y: row * cellSize + cellSize / 2,
  });

  const getSectionCenter = (cells) => {
    if (!Array.isArray(cells) || cells.length === 0) {
      return { x: 0, y: 0 };
    }
    const centers = cells.map(getCenter);
    const sum = centers.reduce(
      (acc, pos) => ({ x: acc.x + pos.x, y: acc.y + pos.y }),
      { x: 0, y: 0 },
    );
    return { x: sum.x / centers.length, y: sum.y / centers.length };
  };

  // 💡 사용자 고유 색상 생성기 (예: 해시 기반)
  const getColorById = (id) => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    const r = (hash >> 0) & 0xff;
    const g = (hash >> 8) & 0xff;
    const b = (hash >> 16) & 0xff;
    return `rgba(${r}, ${g}, ${b}, 0.4)`; // 🎯 투명도 0.4 적용
  };

  arrows.forEach(({ from, to, userId, isDimmed = false }) => {
    //if (!Array.isArray(from) || !Array.isArray(to)) {
    //  return;
    //}

    //const fromCenter = getSectionCenter(from);
    //const toCenter = getSectionCenter(to);
    const color = getColorById(userId || "default");
    const style = isDimmed
      ? "rgba(0, 0, 0, 0.1)" // 흐리게
      : color || "rgba(0, 255, 0, 0.6)"; // 선명하게
    if (isDimmed) {
      drawArrow(ctx, from.x, from.y, to.x, to.y, {
        color,
        width: isDimmed ? 1 : 2,
        curveOffset: 15,
      });
    }
  });
}
