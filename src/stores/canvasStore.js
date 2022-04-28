import { useCallback, useState } from "react";
import { createContainer } from "unstated-next";
import fabric from "../modules/fabric";
import { defaultNode, DIRECTED_EDGE, UNDIRECTED_EDGE } from "../data/config";
import {
  createNode,
  updateNodeData,
} from "../components/content/components/canvas/components/node";
import { fundamentalMatrix } from "../helpers/graph";
import { getNodeNumber } from "../helpers/misc";

const CanvasStore = createContainer(() => {
  const [canvas, setCanvas] = useState(null);
  const [selected, setSelected] = useState(null);

  const initCanvas = useCallback((node, canvasId, canvasOptions) => {
    if (!!node) {
      var canvas = new fabric.Canvas(canvasId, canvasOptions);

      canvas.on("custom:update", (option) =>
        setSelected((prevState) =>
          prevState ? { ...prevState, ...option } : option
        )
      );
      canvas.on("node:selection", (option) =>
        updateNodeData("SELECTION", { canvas, selected: true, node: option })
      );
      canvas.on("custom:deselection", () => setSelected(null));
      canvas.on("node:deselection", (option) =>
        updateNodeData("SELECTION", { canvas, selected: false, node: option })
      );
      canvas.on("node:moving", (option) =>
        updateNodeData("MOVE", { canvas, node: option })
      );
      setCanvas(canvas);
      console.log(canvas);
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
          id: `node-${canvas.nodeCount + 1}`,
          title: options?.title || canvas.nodeCount + 1,
        });

        canvas.add(newNode).setActiveObject(newNode);
        canvas.set({ nodeCount: canvas.nodeCount + 1 });
        console.log(canvas);
      }
      return;
    },
    [canvas]
  );

  const updateNode = useCallback(
    (action, data) => {
      if (canvas) {
        updateNodeData(action, { canvas, ...data });
        canvas.renderAll();
      }
    },
    [canvas]
  );

  const addEdge = useCallback(
    (src, dest, type) => {
      updateNode("ADD_EDGE", {
        target: dest,
        source: src,
        type,
        title: canvas.edgeCount + 1,
        id: `edge-${canvas.edgeCount + 1}`,
      });
      canvas.set({
        edgeNodeMap: {
          ...canvas.edgeNodeMap,
          [`${getNodeNumber(src)}-${getNodeNumber(dest)}`]:
            canvas.edgeCount + 1,
        },
        edgeCount: canvas.edgeCount + 1,
      });
    },
    [canvas, updateNode]
  );

  const addGraph = useCallback(
    (type, graph = []) => {
      if (type === "ADJMAT") {
        const prevNodeCount = canvas.nodeCount;
        let nodes = [];
        [...Array(graph.length)].forEach((_, i) => {
          const newNode = createNode(canvas, {
            id: `node-${prevNodeCount + i + 1}`,
            title: prevNodeCount + i + 1,
          });

          canvas.add(newNode);
          nodes.push(newNode);
        });

        graph.forEach((r, i) => {
          const curNode = nodes[i];
          r.forEach((el, j) => {
            if (el !== "0" && i !== j && !(graph[j][i] === el && j > i)) {
              addEdge(
                curNode.id,
                nodes[j].id,
                graph[j][i] === el ? UNDIRECTED_EDGE : DIRECTED_EDGE
              );
            }
          });
        });
        setSelected(null);
      } else {
        console.log("Jld hi");
      }
    },
    [canvas, addEdge]
  );

  const getFundamentalMatrix = useCallback(() => {
    return fundamentalMatrix(canvas);
  }, [canvas]);

  const generateEquations = useCallback(() => {
    canvas.discardActiveObject().renderAll();
    const groundNodes = canvas
      .getObjects()
      .filter(({ type, isGrounded }) => type === "node" && isGrounded);
    if (groundNodes.length < 2) {
      alert("Please ground atleast two nodes.");
      return;
    }
    setSelected({ type: "equations" });
  }, [canvas]);

  return {
    canvas,
    initCanvas,
    resetCanvas,
    isCanvasActive: !!canvas,
    addNode,
    selected,
    updateNode,
    setSelected,
    addGraph,
    getFundamentalMatrix,
    generateEquations,
    addEdge,
  };
});

export default CanvasStore;
