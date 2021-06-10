import { useCallback, useState } from "react";
import { createContainer } from "unstated-next";
import fabric from "../modules/fabric";
import { defaultNode, initCanvasState } from "../data/config";
import {
  createNode,
  updateNodeData,
} from "../components/content/components/canvas/components/node";

const CanvasStore = createContainer(() => {
  const [canvas, setCanvas] = useState(null);
  const [selected, setSelected] = useState(null);
  const [canvasState, setCanvasState] = useState(initCanvasState);

  const initCanvas = useCallback((node, canvasId, canvasOptions) => {
    if (!!node) {
      var canvas = new fabric.Canvas(canvasId, canvasOptions);

      canvas.on("custom:update", (option) =>
        setSelected((prevState) =>
          prevState ? { ...prevState, ...option } : option
        )
      );
      canvas.on("node:selection", (option) =>
        updateNodeData(canvas, { selected: true, node: option })
      );
      canvas.on("custom:deselection", () => setSelected(null));
      canvas.on("node:deselection", (option) =>
        updateNodeData(canvas, { selected: false, node: option })
      );
      canvas.on("node:moving", (option) =>
        updateNodeData(canvas, { move: true, node: option })
      );
      setCanvas(canvas);
    }
  }, []);

  const resetCanvas = useCallback(() => {
    canvas.dispose();
    // setCanvas(null);
    // // eslint-disable-next-line
  }, [canvas]);

  const addNode = useCallback(
    (options = defaultNode) => {
      if (canvas) {
        const newNode = createNode(canvas, {
          id: `node-${canvasState.nodeCount + 1}`,
          title: canvasState.nodeCount + 1,
        });

        canvas.add(newNode).setActiveObject(newNode);
        setCanvasState({
          ...canvasState,
          nodeCount: canvasState.nodeCount + 1,
        });
      }
    },
    [canvas, canvasState, setCanvasState]
  );

  const updateNode = useCallback(
    (data) => {
      if (canvas) {
        updateNodeData(canvas, data);
        canvas.renderAll();
      }
    },
    [canvas]
  );

  const addEdge = useCallback((data) => console.log(data), []);

  return {
    canvas,
    initCanvas,
    resetCanvas,
    isCanvasActive: !!canvas,
    addNode,
    selected,
    canvasState,
    setCanvasState,
    updateNode,
    addEdge,
  };
});

export default CanvasStore;
