import type { RefObject } from "react";
import type { Shape } from "../shapes";

import React, { useEffect } from "react";

import { drawShape, highlightShape, selectShape } from "../func/draw";

const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;

type CanvasProps = {
  shapes: Shape[];
  ctx: CanvasRenderingContext2D | null;
  canvas: RefObject<HTMLCanvasElement>;
};

export const Canvas = ({ shapes, ctx, canvas }: CanvasProps) => {
  useEffect(() => {
    if (ctx) {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      for (const s of shapes) {
        drawShape(ctx, s);

        // if shape selected skip to next shape
        if (s.isSelected) {
          selectShape(ctx, s);
        }

        if (s.isHighlighted) highlightShape(ctx, s);
      }
    }
  }, [shapes, ctx]);

  return (
    <canvas
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      role="img"
      aria-label="Draw shapes here"
      ref={canvas}
      className="border-2 border-gray-600"
    ></canvas>
  );
};
