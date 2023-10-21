import type { ChangeEvent, Dispatch } from "react";
import type { RootAction } from "../../func/reducer";
import type { Circle } from "../../shapes";

import React from "react";

type CircleEditorProps = {
  shape: Circle;
  dispatch: Dispatch<RootAction>;
};

export const CircleEditor = ({ shape, dispatch }: CircleEditorProps) => {
  const { id, radius } = shape;

  function onRadiusChange(e: ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: "UPDATE",
      payload: {
        ...shape,
        radius: e.target.valueAsNumber,
      },
    });
  }

  return (
    <div className="flex flex-row justify-between px-5">
      <p>radius:</p>
      <input
        className="w-3/6"
        aria-label={`radius-${id}`}
        type="range"
        value={radius}
        onChange={onRadiusChange}
      />
    </div>
  );
};
