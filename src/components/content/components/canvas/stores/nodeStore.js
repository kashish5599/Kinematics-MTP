import { useState, useCallback } from "react";
import { createContainer } from "unstated-next";
import { defaultNode } from "../../../../../data/config";
import CanvasStore from "../../../../../stores/canvasStore";
import { createNode } from "../components/node";
// import { defaultNode } from "../data/config";

const NodeStore = createContainer(() => {
  const [nodeCount, setNodeCount] = useState(0);
  const { canvas } = CanvasStore.useContainer();

  const addNode = useCallback(
    (options = defaultNode) => {
      if (canvas) {
        canvas.add(
          createNode({
            id: `node-${nodeCount + 1}`,
            title: nodeCount + 1,
          })
        );
        canvas.setActiveObject(
          canvas.getObjects().find(({ id }) => id === `node-${nodeCount + 1}`)
        );
        setNodeCount((prev) => prev + 1);
      }
    },
    [canvas, setNodeCount]
  );

  return {
    addNode,
  };
});

export default NodeStore;
