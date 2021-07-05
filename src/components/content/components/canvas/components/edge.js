import { nodeUpdateOptions } from "../../../../../data/config";
import fabric from "../../../../../modules/fabric";

export const createEdge = (canvas, { edge: childId, node, type }) => {
  const p = node;
  const c = canvas.getObjects().find(({ id }) => id === childId);
  let edge = null;
  const edgeOptions = {
    fill: "red",
    stroke: "red",
    strokeWidth: 5,
    selectable: false,
    type,
    evented: false,
    destCurve: { a: c.width, b: c.height },
  };

  if (type === nodeUpdateOptions.DIRECTED_EDGE) {
    edge = new fabric.LineArrow([p.left, p.top, c.left, c.top], edgeOptions);
  } else {
    edge = new fabric.Line([p.left, p.top, c.left, c.top], edgeOptions);
  }

  return edge;
};

export const moveEdge = (node) => {
  node.edges.forEach(({ line }) => line.set({ x1: node.left, y1: node.top }));
  node.incomingEdges.forEach(({ line }) =>
    line.set({ x2: node.left, y2: node.top })
  );
};
