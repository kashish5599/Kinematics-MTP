import React, { useEffect, useState } from "react";
import CanvasStore from "../../../../../../stores/canvasStore";
import Edges from "./components/edges";
import NodeInfo from "./components/info";

function NodeOptions() {
  const { canvas, updateNode, selected, addEdge } = CanvasStore.useContainer();
  const [nodeState, setNodeState] = useState(selected);
  const [otherNodes, setOtherNodes] = useState([]);

  const handleChange = (e) => {
    let update;
    if (e.target.name === "isGrounded") {
      update = {
        [e.target.name]: e.target.checked,
        lockMovementX: e.target.checked,
        lockMovementY: e.target.checked,
      };
    } else {
      update = { [e.target.name]: e.target.value };
    }
    setNodeState((prev) => ({ ...prev, ...update }));

    updateNode(e.target.getAttribute("data-action"), update);
  };

  useEffect(() => {
    setNodeState((prev) => ({ ...prev, ...selected }));
  }, [selected]);

  //Create list of nodes not connected to current
  useEffect(() => {
    console.log(canvas);
    setOtherNodes(
      canvas
        .getObjects("node")
        .filter(
          ({ id }) =>
            id !== selected.id &&
            Object.entries(canvas.edgeNodeMap)
              .map(([key]) => {
                const nodeIds = key.split("-").map((nn) => `node-${nn}`);
                return !(
                  (nodeIds[0] === selected.id && nodeIds[1] === id) ||
                  (nodeIds[1] === selected.id && nodeIds[0] === id)
                );
              })
              .reduce((prev, curr) => prev & curr, true)
        )
        .map(({ id }) => id)
    );
  }, [setOtherNodes, selected, canvas]);

  return (
    <div className="node-options">
      <NodeInfo node={nodeState} handleChange={handleChange} />
      <Edges
        node={selected}
        edgeNodeMap={canvas.edgeNodeMap}
        otherNodes={otherNodes}
        addEdge={addEdge}
      />
    </div>
  );
}

export default NodeOptions;
