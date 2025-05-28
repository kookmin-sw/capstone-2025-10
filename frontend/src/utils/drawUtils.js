const userColorMap = new Map();

export function drawArrow(ctx, fromX, fromY, toX, toY, options = {}) {
  //if (
  //  [fromX, fromY, toX, toY].some((v) => isNaN(v)) ||
  //  (fromX === toX && fromY === toY)
  //) {
  //  console.warn("❌ 무효 좌표", { fromX, fromY, toX, toY });
  //  return;
  //}
  //
  //console.log("🎯 화살표 그리기", { fromX, fromY, toX, toY });
  const color = options.color || "rgba(0, 0, 0, 0.4)";
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

export function drawSectionArrows(ctx, arrows) {
  console.log("🖊️ drawSectionArrows 호출됨", arrows.length);
  function hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  }

  function getBrightColorFromHash(hash) {
    const goldenRatio = 0.61803398875; // 잘 퍼지도록 하는 고정 비율
    const hue = Math.floor(((hash * goldenRatio) % 1) * 360);
    const saturation = 70 + (hash % 30); // 70~99%
    const lightness = 60 + (hash % 20); // 60~79%
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }

  const getColorById = (id) => {
    const hash = hashCode(id || "default");
    return getBrightColorFromHash(hash);
  };

  const anyHighlighted = arrows.some((arrow) => !arrow.isDimmed);

  arrows.forEach(({ from, to, userId, isDimmed }) => {
    const baseColor = getColorById(userId);
    const shouldDim = anyHighlighted && isDimmed;

    const finalColor = shouldDim ? "rgba(0, 0, 0, 0.1)" : baseColor;

    drawArrow(ctx, from.x, from.y, to.x, to.y, {
      color: finalColor,
      width: shouldDim ? 1 : 2,
    });
  });
}
