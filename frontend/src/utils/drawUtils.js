export function drawArrow(ctx, fromX, fromY, toX, toY, options = {}) {
  const color = options.color || "#000";
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

export function drawSectionArrows(ctx, sections, arrows, gridCols, cellSize) {
  const getCenter = (index) => {
    const row = Math.floor(index / gridCols);
    const col = index % gridCols;
    return {
      x: col * cellSize + cellSize / 2,
      y: row * cellSize + cellSize / 2,
    };
  };

  const getSectionCenter = (section) => {
    const centers = section.cells.map(getCenter);
    const sum = centers.reduce(
      (acc, pos) => {
        acc.x += pos.x;
        acc.y += pos.y;
        return acc;
      },
      { x: 0, y: 0 },
    );

    return {
      x: sum.x / centers.length,
      y: sum.y / centers.length,
    };
  };

  arrows.forEach(({ from, to }) => {
    const fromCenter = getSectionCenter(sections[from]);
    const toCenter = getSectionCenter(sections[to]);
    drawArrow(ctx, fromCenter.x, fromCenter.y, toCenter.x, toCenter.y);
  });
}
