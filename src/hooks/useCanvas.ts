import { useEffect, useRef, useState } from "react";

const useCanvas = (mockContext?: CanvasRenderingContext2D) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(
    mockContext || null
  );

  useEffect(() => {
    if (!context && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      setContext(ctx);
    }
  }, [context]);

  return [canvasRef, context] as const;
};

export default useCanvas;
