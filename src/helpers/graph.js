import Stack from "../modules/stack";

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

export const getAdjacencyMatrix = (canvas) => {
  const n = canvas.getObjects("node").length;
  let g = [...Array(n)].map((e) => Array(n).fill(0));
  Object.entries(canvas.edgeNodeMap).forEach(([key]) => {
    const ids = key.split("-");
    g[ids[0] - 1][ids[1] - 1] = g[ids[1] - 1][ids[0] - 1] = 1;
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

//Implementation of Paton's algorithm
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

//Implementation of Gibbs algorithm
export const getCycles = (canvas) => {
  const fm = fundamentalMatrix(canvas);
  let cycles = [];
  let B = [];

  if (fm.length === 1) {
    return { fm, cycles: fm };
  }
  // console.log(fCyc(getAdjacencyMatrix(canvas)));
  for (let i = 0; i < fm.length; i++) {
    B.push(new Array(canvas.edgeCount + 2).join("0"));
    for (let j = 0; j < fm[i].length; j++) {
      const idx =
        j === 0
          ? canvas.edgeNodeMap[`${fm[i][j]}${fm[i][fm[i].length - 1]}`] ||
            canvas.edgeNodeMap[`${fm[i][fm[i].length - 1]}${fm[i][j]}`]
          : canvas.edgeNodeMap[`${fm[i][j]}${fm[i][j - 1]}`] ||
            canvas.edgeNodeMap[`${fm[i][j - 1]}${fm[i][j]}`];
      if (idx) B[i] = B[i].replaceAt(idx, "1");
    }
  }
  console.log(B);

  let BASIC = fm.length;
  let Q = new Array(2 ** BASIC);
  let qflag = new Array(2 ** BASIC).fill(0);
  Q[1] = B[0];
  for (let i = 2; i <= BASIC; i++) {
    let lower = 2 ** (i - 1);
    let upper = 2 ** i - 1;

    for (let qidx = 1; qidx < lower; qidx++) {
      if (B[i - 1].bitAND(Q[qidx]) !== "0") {
        Q[upper] = B[i - 1].bitXOR(Q[qidx]);
        upper--;
      } else {
        Q[lower] = B[i - 1].bitXOR(Q[qidx]);
        qflag[lower] = 1;
        lower++;
      }
      Q[lower] = B[i - 1];
    }
    for (let j = lower; j < 2 ** i - 1; j++) {
      for (let k = j + 1; k < 2 ** i; k++) {
        if (qflag[j]) break;
        if (qflag[k]) continue;
        if (parseInt(Q[j].bitOR(Q[k]), 2) === parseInt(Q[j], 2)) qflag[k] = 1;
        else if (parseInt(Q[j].bitOR(Q[k]), 2) === parseInt(Q[k], 2))
          qflag[j] = 1;
      }
    }
    console.log(`itr${i - 1}`, Q, qflag);
  }
  let n_cyc = 0;
  for (let i = 1; i < 2 ** BASIC; i++) {
    if (qflag[i]) continue;
    Q[n_cyc + 1] = Q[i];
    n_cyc++;
  }

  console.log(qflag, n_cyc, Q);

  // let cyc = fm.length;
  // let C = [B[0]];
  // let Q = C,
  //   D = (R = "0");

  // for (let i = 1; i < cyc; i++) {
  //   Q.forEach((T) => {
  //     if (T.bitAND(B[i]) === "0") {
  //       D = D.bitOR(T.bitXOR(B[i]));
  //     } else {
  //       R = R.bitOR(T.bitXOR(B[i]));
  //     }
  //   });
  // }

  // console.log(fm, B);

  return {
    fm,
    cycles,
  };
};
