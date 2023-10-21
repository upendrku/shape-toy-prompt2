import type { ChangeEvent, Dispatch } from "react";
import type { RootAction } from "../../func/reducer";
import type { Rectangle } from "../../shapes";

import React from "react";

type RectangleEditorProps = {
  shape: Rectangle;
  dispatch: Dispatch<RootAction>;
};

export const RectangleEditor = ({ shape, dispatch }: RectangleEditorProps) => {
  const { id, width, height } = shape;

  function onWidthChange(e: ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: "UPDATE",
      payload: {
        ...shape,
        width: e.target.valueAsNumber,
      },
    });
  }

  function onHeightChange(e: ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: "UPDATE",
      payload: {
        ...shape,
        height: e.target.valueAsNumber,
      },
    });
  }

  return (
    <>
      <div className="flex flex-row justify-between px-5">
        <p>width:</p>
        <input
          className="w-3/6"
          aria-label={`height-${id}`}
          type="range"
          value={width}
          onChange={onWidthChange}
        />
      </div>
      <div className="flex flex-row justify-between px-5">
        <p>height:</p>
        <input
          className="w-3/6"
          aria-label={`height-${id}`}
          type="range"
          value={height}
          onChange={onHeightChange}
        />
      </div>
    </>
  );
};
