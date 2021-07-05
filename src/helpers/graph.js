import { constants } from "../data/config";
import Stack from "../modules/stack";
import { getNodeNumber } from "./misc";

export const checkGraphInput = (type = "ADJMAT", input = "") => {
  let output = { message: "all good", status: "true" };
  if (type === "ADJMAT") {
    const mat = input
      .replace(/\n+/g, "\n")
      .trim()
      .split("\n")
      .map((arr) => arr.replace(/\s+/g, " ").trim().split(" "));

    mat.every((row, i) => {
      if (row.length !== mat.length) {
        output = {
          message: `Please input a square matrix. Row ${i + 1} of invalid size`,
          status: false,
        };
        return false;
      }
      return true;
    });
    if (!output.status) return output;
    else
      output = {
        status: true,
        message: mat,
      };
  }
  return output;
};

const getAdjacencyMatrix = (canvas) => {
  const n = canvas.getObjects("node").length;
  let g = [...Array(n)].map((e) => Array(n).fill(0));

  canvas.getObjects("node").forEach((node) => {
    const p = getNodeNumber(node) - 1;
    node.edges.forEach(({ type, nodeId }) => {
      const c = getNodeNumber(nodeId) - 1;
      g[p][c] = 1;
      if (type === constants.UNDIRECTED_EDGE) g[c][p] = 1;
    });
  });

  return g;
};

const fundamentalCircuit = (pred = [], start, end) => {
  if (typeof start !== "number" || typeof end !== "number") {
    console.error("Expected a number value for current node.");
    return [];
  }
  let ans = [];
  let i = start;

  while (i !== pred[end]) {
    ans.push(i + 1);
    i = pred[i];
  }
  ans.push(pred[end] + 1);
  ans.push(end + 1);

  return ans;
};

export const fundamentalMatrix = (canvas) => {
  let X = getAdjacencyMatrix(canvas);
  let TW = new Stack();
  let level = new Array(X.length).fill(-1);
  let pred = new Array(X.length);
  let ans = [];

  level.forEach((value, root) => {
    if (value === -1) {
      TW.push(root);
      let T = [root];
      level[root] = pred[root] = 0;
      while (!TW.isEmpty()) {
        const z = TW.pop();
        X[z].forEach((edge, p) => {
          if (Boolean(edge)) {
            if (T.indexOf(p) === -1) {
              pred[p] = z;
              level[p] = level[z] + 1;
              T.push(p);
              TW.push(p);
            } else ans.push(fundamentalCircuit(pred, z, p));
            X[z][p] = X[p][z] = 0;
          }
        });
      }
    }
  });

  return ans;
};
