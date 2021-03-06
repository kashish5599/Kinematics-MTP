import { setEdgeAngles } from "../components/content/components/canvas/components/edge";
import { getCycles } from "./graph";
import { decimalRoundOff } from "./math";
import { getEdge } from "./misc";

//return Eq = {A: [](1xn), B[]((nx1))}
//all equations = A.B
export const getEquations = (canvas) => {
  setEdgeAngles(canvas);
  console.log(canvas);
  // Loop to generate eq matrix.
  const { cycles } = getCycles(canvas);
  // console.log(fm);

  let numberingMap = {};
  let valuesMap = {};
  let eqs = [];
  cycles.forEach((r) => {
    let j = 1;
    let e = "";
    let N = r.length;
    for (let i = 1; i < N; i++) {
      if (i !== 1 && i !== N - 1) e = e.concat(" + ");

      let jtmp = j;
      if (`${r[i - 1]}${r[i]}` in numberingMap)
        jtmp = numberingMap[`${r[i - 1]}${r[i]}`];
      else j++;
      e = e.concat(`l_${jtmp}cos(theta_${jtmp})`);
      if (i === N - 1) e = e.concat(" = 0");
      console.log(e, r[i - 1]);
      const edge = getEdge(canvas, r[i - 1], r[i]);
      if (!edge) continue;
      const { x1, x2, y1, y2 } = edge.line;
      valuesMap[`l_${jtmp}`] = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
      valuesMap[`theta_${jtmp}`] = edge.line.eangle.value;
      numberingMap[`${r[i - 1]}${r[i]}`] = jtmp;
    }
    eqs.push(e);
  });
  console.log(valuesMap, numberingMap);
  return eqs;
};

export const getEquationCoeffValues = (equations, type) => {
  let uniq = [];
  return equations.flat().reduce((result, { title, ...eq }) => {
    if (
      uniq.includes(title) ||
      uniq.includes(title.split("-").reverse().join("-"))
    )
      return result;
    uniq.push(title);
    result.push({
      title,
      type,
      value: decimalRoundOff(eq[type]),
    });
    return result;
  }, []);
};
