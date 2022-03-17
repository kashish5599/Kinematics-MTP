import { DIRECTED_EDGE, UNDIRECTED_EDGE } from "../../../../../data/config";
import { getEdgeAngle } from "../../../../../helpers/edge";
import { getAdjacencyMatrix } from "../../../../../helpers/graph";
import fabric from "../../../../../modules/fabric";

export const createEdge = (canvas, { target, source, type, title, id }) => {
  const p = canvas.getObjects().find(({ id }) => id === source);
  const c = canvas.getObjects().find(({ id }) => id === target);
  let edge = null;
  const edgeOptions = {
    id,
    fill: "red",
    stroke: "red",
    strokeWidth: 5,
    selectable: false,
    type,
    eangle: {},
    evented: false,
    destCurve: { a: c.width, b: c.height },
    text: title,
    target,
    source,
  };

  if (type === DIRECTED_EDGE) {
    edge = new fabric.LineArrow([p.left, p.top, c.left, c.top], edgeOptions);
  } else {
    edge = new fabric.Line([p.left, p.top, c.left, c.top], edgeOptions);
  }

  return edge;
};

export const moveEdge = (canvas, { id, left, top, edges }) => {
  edges.forEach((edgeId) => {
    const edge = canvas.getObjects().find(({ id }) => id === edgeId);
    if (edge.source === id) edge.set({ x1: left, y1: top });
    else edge.set({ x2: left, y2: top });
  });
};

export const setEdgeAngles = (canvas) => {
  canvas.getObjects(UNDIRECTED_EDGE).forEach((edge) => {
    edge.set({
      eangle: getEdgeAngle(edge),
    });
  });
};
