import type { Dispatch } from "react";
import type { RootAction } from "../../func/reducer";
import type { Shape } from "../../shapes";

import React from "react";

import { ShapeEditor } from "./ShapeEditor";

type ShapeEditorListProps = {
  shapes: Shape[];
  dispatch: Dispatch<RootAction>;
};

export const ShapeEditorList = ({ shapes, dispatch }: ShapeEditorListProps) => {
  return (
    <div className="flex flex-col gap-2 max-h-[500px] overflow-y-auto">
      {shapes.map((s) => (
        <ShapeEditor shape={s} key={s.id} dispatch={dispatch} />
      ))}
    </div>
  );
};
