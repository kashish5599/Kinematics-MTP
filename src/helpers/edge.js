import { UNDIRECTED_EDGE } from "../data/config";
import { getNodeNumber } from "./misc";

export const getEdgeAngle = ({ x1, x2, y1, y2, source, target }) => {
  const nn1 = getNodeNumber(source);
  const nn2 = getNodeNumber(target);

  let angle = (Math.atan((y1 - y2) / (x2 - x1)) * 180) / Math.PI;
  if (x2 - x1 < 0) angle += 180;
  else if (y1 - y2 < 0) angle += 360;
  return {
    title: `${nn1}-${nn2}`,
    value: angle,
  };
};

export const getEdgeFromNN = (canvas, n1, n2) => {
  const op1 = `${n1}-${n2}`,
    op2 = `${n2}-${n1}`;
  const edgeId = canvas.edgeNodeMap[op1] || canvas.edgeNodeMap[op2];

  return canvas
    .getObjects(UNDIRECTED_EDGE)
    .find(({ id }) => id === `edge-${edgeId}`);
};

export const getEdgeLength = ({ x1, x2, y1, y2 }) => {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
};
