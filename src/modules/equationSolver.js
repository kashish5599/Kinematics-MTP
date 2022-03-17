import { setEdgeAngles } from "../components/content/components/canvas/components/edge";
import { getEdgeFromNN, getEdgeLength } from "../helpers/edge";
import { fundamentalMatrix } from "../helpers/graph";
import { getNodeFromNN } from "../helpers/misc";

//eq identifier, then solver. TODO
export function EquationSolver(canvas) {
  setEdgeAngles(canvas);

  const fm = fundamentalMatrix(canvas);
  let eq = [];
  console.log(fm);

  fm.forEach((r) => {
    const N = r.length;
    let si = -1,
      e = [];
    for (let i = 0; i < N && si === -1; i++) {
      if (getNodeFromNN(canvas, r[i]).isGrounded) si = i;
    }
    if (si === -1) {
      console.error("No grounded nodes");
      return;
    }
    for (let i = si, j = 0; j < N; j++) {
      let o = r[i],
        t = r[(i + 1) % N],
        sign = "+";
      if (i === (si + N - 1) % N) {
        [o, t] = [t, o];
        sign = "-";
      }
      const edge = getEdgeFromNN(canvas, o, t);
      if (edge.eangle.title !== `${o}-${t}`) {
        edge.set({
          eangle: {
            title: `${o}-${t}`,
            value: (edge.eangle.value + 180) % 360,
          },
        });
      }
      e.push({
        title: edge.eangle.title,
        angle: edge.eangle.value,
        length: getEdgeLength(edge),
        sign,
      });
      i = (i + 1) % N;
    }
    eq.push(e);
  });
  return eq;
}
