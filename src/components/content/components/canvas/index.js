import React, { useEffect, useRef } from "react";
import CanvasStore from "../../../../stores/canvasStore";
import { CanvasEl } from "../../elements";

function Canvas() {
  const canvasContainer = useRef(null);
  const canvasRef = useRef(null);

  const { initCanvas } = CanvasStore.useContainer();

  useEffect(() => {
    if (!canvasRef.current) return;
    initCanvas(canvasRef, "main-canvas", {
      width: canvasContainer.current.clientWidth,
      height: canvasContainer.current.clientHeight,
      backgroundColor: "lightgray",
      preserveObjectStacking: true,
    });
  }, [initCanvas]);

  return (
    <CanvasEl ref={canvasContainer}>
      <canvas id="main-canvas" ref={canvasRef} />
    </CanvasEl>
  );
}

export default Canvas;
