import fabric from "../../../../../modules/fabric";

export const createEdge = (canvas, { edge: childId, node }) => {
  const p = node;
  const c = canvas.getObjects().find(({ id }) => id === childId);

  const edge = new fabric.LineArrow([p.left, p.top, c.left, c.top], {
    fill: "red",
    stroke: "red",
    strokeWidth: 5,
    selectable: false,
    evented: false,
    destCurve: { a: c.width, b: c.height },
  });

  return edge;
};

export const moveEdge = (node) => {
  node.edges.forEach(({ line }) => line.set({ x1: node.left, y1: node.top }));
  node.incomingEdges.forEach(({ line }) =>
    line.set({ x2: node.left, y2: node.top })
  );
};
