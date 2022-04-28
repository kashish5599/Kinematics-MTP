import { gray } from "../../../../../elements/colorSchema";
import { getRandomNumberInterval } from "../../../../../helpers/misc";
import fabric from "../../../../../modules/fabric";
import { createEdge, moveEdge } from "./edge";

export const createNode = (canvas, { id, title }) => {
  const canvasBoundaries = canvas.vptCoords.br;
  const radius = 30;

  const circle = new fabric.Circle({
    radius: radius,
    fill: gray,
    originX: "center",
    originY: "center",
  });
  const text = new fabric.Text(title.toString(), {
    fontSize: 20,
    originX: "center",
    originY: "center",
  });

  const grp = new fabric.Group([circle, text], {
    left: getRandomNumberInterval(radius, canvasBoundaries.x - radius),
    top: getRandomNumberInterval(radius, canvasBoundaries.y - radius),
    type: "node",
    id,
    text: title,
    edges: [], //Each edge -> {origin: "", target: "", type: "", line: lineData}
    incomingEdges: [],
    isGrounded: false,
    controls: false,
  });

  grp
    .on("selected", function (e) {
      canvas.fire("custom:update", e.target);
      canvas.fire("node:selection", e.target);
    })
    .on("deselected", function (e) {
      canvas.fire("node:deselection", e.target);
      canvas.fire("custom:deselection", e.target);
    })
    .on("scaling", function (e) {
      canvas.fire("custom:update", e.target);
    })
    .on("moving", function (e) {
      canvas.fire("node:moving", e.transform.target);
    });

  return grp;
};

//actions - PROPERTY_CHANGE, MOVE, SELECTION, ADD_EDGE
export const updateNodeData = (action, { canvas, ...data }) => {
  const node = data?.node || canvas.getActiveObject();

  switch (action) {
    case "PROPERTY_CHANGE":
      node.item(1).set(data);
      node.set(data);
      return;
    case "MOVE":
      moveEdge(canvas, node);
      canvas.renderAll();
      return;
    case "ADD_EDGE":
      const edge = createEdge(canvas, data);
      canvas.getObjects("node").forEach(({ id, ...node }) => {
        if (id === data.target || id === data.source) {
          node.edges.push(edge.id);
        }
      });
      canvas.add(edge).sendToBack(edge).renderAll();
      canvas.fire("custom:update", node);
      return;
    case "SELECTION":
      node.item(0).set({ fill: data.selected ? "red" : gray });
      canvas.renderAll();
      return;
    default:
      console.log("tf u doing");
      return;
  }
};
