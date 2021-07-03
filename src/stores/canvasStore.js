import { useCallback, useState } from "react";
import { createContainer } from "unstated-next";
import fabric from "../modules/fabric";
import {
  defaultNode,
  initCanvasState,
  nodeUpdateOptions,
} from "../data/config";
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
          title: options?.title || canvasState.nodeCount + 1,
        });

        canvas.add(newNode).setActiveObject(newNode);
        setCanvasState({
          ...canvasState,
          nodeCount: canvasState.nodeCount + 1,
        });
      }
      return;
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

  const addDirectedEdge = useCallback(
    (parent, target) => {
      updateNode({
        edge: target,
        node: parent,
        type: nodeUpdateOptions.DIRECTED_EDGE,
      });
    },
    [updateNode]
  );

  const addUndirectedEdge = useCallback(
    (src, dest) => {
      updateNode({
        edge: dest,
        node: src,
        type: nodeUpdateOptions.UNDIRECTED_EDGE,
      });
    },
    [updateNode]
  );

  const addGraph = useCallback(
    (type, graph = []) => {
      if (type === "ADJMAT") {
        const prevNodeCount = canvas.getObjects("node").length;
        let nodes = [];

        [...Array(graph.length)].forEach((_, i) => {
          const newNode = createNode(canvas, {
            id: `node-${prevNodeCount + i + 1}`,
            title: prevNodeCount + i + 1,
          });

          canvas.add(newNode);
          nodes.push(newNode);
        });
        setCanvasState((prevState) => ({
          ...prevState,
          nodeCount: prevState?.nodeCount
            ? prevState?.nodeCount + graph.length
            : graph.length,
        }));

        graph.forEach((r, i) => {
          const curNode = nodes[i];
          r.forEach((el, j) => {
            if (el !== "0" && i !== j) {
              addDirectedEdge(curNode, nodes[j].id);
            }
          });
        });
        setSelected(null);
      } else {
        console.log("Jld hi");
      }
    },
    [canvas, addDirectedEdge]
  );

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
    addDirectedEdge,
    setSelected,
    addGraph,
    addUndirectedEdge,
  };
});

export default CanvasStore;
