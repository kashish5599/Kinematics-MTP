import React, { useEffect, useRef, useState } from "react";
import CanvasStore from "../../../../../stores/canvasStore";
import { GraphPropertiesEl } from "../../../elements";

function GraphProperties() {
  const { getFundamentalMatrix } = CanvasStore.useContainer();
  const [loading, setLoading] = useState(true);
  const fundamentalMatrix = useRef(null);

  useEffect(() => {
    fundamentalMatrix.current = getFundamentalMatrix();
    setLoading(false);
  }, [setLoading, getFundamentalMatrix]);

  return (
    <GraphPropertiesEl>
      {loading ? (
        "loading..."
      ) : (
        <>
          <h3>Fundamental Circuits:</h3>
          <ul>
            {fundamentalMatrix?.current?.length &&
              fundamentalMatrix.current.map((row, i) => (
                <li key={`fundamental-${i}`}>{row.map((el) => el + " ")}</li>
              ))}
          </ul>
        </>
      )}
    </GraphPropertiesEl>
  );
}

export default GraphProperties;
