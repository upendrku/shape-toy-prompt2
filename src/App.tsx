import React from "react";

import { Canvas } from "./components/Canvas";
import { ShapeEditorList } from "./components/Edit/ShapeEditorList";
import { ShapeAdder } from "./components/ShapeAdder";
import useCanvas from "./hooks/useCanvas";
import useShapes from "./hooks/useShapes";

/**
 * @param {Object} AppProps  Props for root level component. Used to pass mocked context for jest runtime
 */
type AppProps = {
  context?: CanvasRenderingContext2D;
};

export const App = (props: AppProps) => {
  const [canvas, ctx] = useCanvas(props.context);
  const [shapes, selected, dispatch] = useShapes(canvas);

  return (
    <div className="flex flex-row justify-start gap-8 px-32 pt-16">
      <ShapeAdder dispatch={dispatch}></ShapeAdder>
      <Canvas shapes={shapes} ctx={ctx} canvas={canvas}></Canvas>
      <ShapeEditorList shapes={selected} dispatch={dispatch} />
    </div>
  );
};
