import type { Shape } from "../shapes";

const SELECT_COLOR = "rgba(255, 251, 0, 0.7)";
const HIGHLIGHT_COLOR = "rgba(0, 76, 255, 0.3)";

export const drawShape = (
  ctx: CanvasRenderingContext2D,
  { color, point: { x, y }, ...s }: Shape
): void => {
  ctx.fillStyle = color;

  if ("radius" in s) {
    const { radius } = s;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, true);
    ctx.fill();
    return;
  }

  ctx.fillRect(x, y, s.width, s.height);
};

const makeShapeSelector =
  (clr: "rgba(255, 251, 0, 0.7)" | "rgba(0, 76, 255, 0.3)") =>
  (ctx: CanvasRenderingContext2D, { point: { x, y }, ...s }: Shape): void => {
    const isSelectDraw = clr == "rgba(255, 251, 0, 0.7)";

    ctx.strokeStyle = clr;
    ctx.lineWidth = isSelectDraw ? 5 : 10;

    if ("radius" in s) {
      ctx.beginPath();
      ctx.arc(x, y, s.radius + (isSelectDraw ? 10 : 5), 0, Math.PI * 2, true);
      ctx.stroke();
      return;
    }

    const rectOffset = isSelectDraw ? 10 : 2.5;
    const rectGrowth = isSelectDraw ? 20 : 5;

    ctx.strokeRect(
      x - rectOffset,
      y - rectOffset,
      s.width + rectGrowth,
      s.height + rectGrowth
    );
  };

export const highlightShape = makeShapeSelector(HIGHLIGHT_COLOR);
export const selectShape = makeShapeSelector(SELECT_COLOR);
