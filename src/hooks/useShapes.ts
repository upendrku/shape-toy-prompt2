import type { RefObject } from "react";

import { useEffect, useReducer, useState } from "react";

import {
  getSelectedShapes,
  getShapes,
  initialState,
  reducer,
} from "../func/reducer";
import { getMouseDownAction, isPointInShape } from "../func/utils";

const useShapes = (canvasRef: RefObject<HTMLCanvasElement>) => {
  const [isMouseDown, setMouseDown] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [state, dispatch] = useReducer(reducer, initialState);

  // derived data
  const shapes = getShapes(state);
  const selected = getSelectedShapes(state);
  const highlightedId = state.highlighted;

  useEffect(() => {
    const ref = canvasRef.current;

    if (ref) {
      const mouseDownHandler = ({
        clientX,
        clientY,
        shiftKey,
        offsetX,
        offsetY,
      }: MouseEvent) => {
        setMouseDown(true);
        setOffset({ x: clientX, y: clientY });

        dispatch(
          getMouseDownAction(shapes, shiftKey, { x: offsetX, y: offsetY })
        );
      };

      const mouseMoveHandler = ({
        clientX,
        clientY,
        offsetX,
        offsetY,
      }: MouseEvent) => {
        const point = {
          x: offsetX,
          y: offsetY,
        };

        let isPointInAnyShape = false;
        for (const s of shapes) {
          if (s.isSelected && isMouseDown) {
            const dx = clientX - offset.x; // true movement along the x plane
            const dy = clientY - offset.y; // true movement along the y plane

            const movePoint = {
              x: dx + s.point.x,
              y: dy + s.point.y,
            };

            // after creating the move point update the offset with new mouse position
            setOffset({ x: clientX, y: clientY });

            dispatch({
              type: "MOVE",
              payload: { shape: s, point: movePoint },
            });
          }

          if (isPointInShape(point, s)) {
            // highlighting something that is highlighted is a waste of log space
            // highlighting on mouse down causes collision and lag (most likely time to have mouse point in two or more shapes)
            const dontHightlight = s.isHighlighted || isMouseDown;

            // is both conditions are false and point is in shape go highlight
            dontHightlight || dispatch({ type: "HIGHLIGHT", payload: s });
            isPointInAnyShape = true;
          }
        }

        // point is not in any shape AND something is highlighted DISPATCH REMOVE_HIGHLIGHT Action
        if (!isPointInAnyShape && highlightedId && !isMouseDown) {
          dispatch({ type: "REMOVE_HIGHLIGHT" });
        }
      };

      const mouseUpHandler = () => {
        setMouseDown(false);
        setOffset({ x: 0, y: 0 });
      };

      ref.addEventListener("mousedown", mouseDownHandler);
      ref.addEventListener("mousemove", mouseMoveHandler);
      ref.addEventListener("mouseup", mouseUpHandler);

      return () => {
        if (ref) {
          ref.removeEventListener("mousedown", mouseDownHandler);
          ref.removeEventListener("mousemove", mouseMoveHandler);
          ref.removeEventListener("mouseup", mouseUpHandler);
        }
      };
    }
  }, [canvasRef, shapes, isMouseDown, offset.x, offset.y, highlightedId]);

  return [shapes, selected, dispatch] as const;
};

export default useShapes;
