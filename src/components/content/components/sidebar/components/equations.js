import React, { useEffect, useRef, useState } from "react";
// import { displayEqObj } from "../../../../../helpers/equations";
import { EquationSolver } from "../../../../../modules/equationSolver";
import CanvasStore from "../../../../../stores/canvasStore";
import { EquationsEl } from "../../../elements";

function Equations() {
  const [loading, setLoading] = useState(true);
  const equations = useRef(null);
  const { canvas } = CanvasStore.useContainer();

  useEffect(() => {
    equations.current = EquationSolver(canvas);
    console.log(equations.current);
    setLoading(false);
  }, [setLoading]);

  return (
    <EquationsEl>
      {loading ? (
        "loading ..."
      ) : (
        <>
          {equations.current.map((eq, ind) => {
            let e = "";
            eq.forEach(({ title, sign }, i) => {
              if (i !== 0 || sign === "-") e = e.concat(`${sign} `);
              e = e.concat(`l_${title}e^(itheta_${title}) `);
            });
            e = e.concat(`= 0`);
            console.log(e);
            return <li key={`eq-${ind}`}>{e}</li>;
          })}
        </>
      )}
    </EquationsEl>
  );
}

export default Equations;
