import React, { useEffect, useRef, useState } from "react";
import { getEquationCoeffValues } from "../../../../../helpers/equations";
// import { displayEqObj } from "../../../../../helpers/equations";
import { EquationSolver } from "../../../../../modules/equationSolver";
import CanvasStore from "../../../../../stores/canvasStore";
import { EquationsEl } from "../../../elements";

function Equations() {
  const [loading, setLoading] = useState(true);
  const [eqCoeff, setEqCoeff] = useState(null);
  const equations = useRef(null);
  const { canvas } = CanvasStore.useContainer();

  useEffect(() => {
    equations.current = EquationSolver(canvas);
    console.log(equations.current);
    setEqCoeff(getEquationCoeffValues(equations.current, "length"));
    setLoading(false);
  }, [setLoading, setEqCoeff, canvas]);

  return (
    <EquationsEl>
      {loading || !equations.current ? (
        "loading ..."
      ) : (
        <>
          {equations.current.length === 0
            ? "Equations can't be generated for this mechanism."
            : equations.current.map((eq, ind) => {
                return (
                  <li key={`eq-${ind}`}>
                    {eq.map(({ title, sign }, i) => {
                      return (
                        <span key={`eq-param-${title}-${i}`}>
                          {i !== 0 || sign === "-" ? sign : ""} l
                          <sub style={{ whiteSpace: "nowrap" }}>{title}</sub>e
                          <sup>
                            <i>i</i>&theta;<sub>{title} </sub>
                          </sup>
                          {i === eq.length - 1 && " = 0"}
                        </span>
                      );
                    })}
                  </li>
                );
              })}
          {eqCoeff && eqCoeff.length > 0 && (
            <>
              <h5>
                <b>Values:</b>
              </h5>
              <ul>
                {eqCoeff.map(({ type, title, value }, i) => (
                  <li key={`eqCoeff-${title}-${i}`}>
                    {type === "length" && "l"}
                    <sub style={{ whiteSpace: "nowrap" }}>{title}</sub>={value}
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </EquationsEl>
  );
}

export default Equations;
