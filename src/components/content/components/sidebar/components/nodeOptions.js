import React, { useEffect, useState } from "react";
import CanvasStore from "../../../../../stores/canvasStore";

function NodeOptions() {
  const { canvas, updateNode, selected } = CanvasStore.useContainer();
  const [nodeState, setNodeState] = useState(selected);
  const [otherNodes, setOtherNodes] = useState([]);

  const handleChange = (e) => {
    const update = { [e.target.name]: e.target.value };
    setNodeState((prev) => ({ ...prev, ...update }));
    updateNode(update);
  };

  useEffect(() => {
    setNodeState((prev) => ({ ...prev, ...selected }));
  }, [selected]);

  useEffect(() => {
    setOtherNodes(
      canvas
        .getObjects()
        .filter(
          ({ id, type }) =>
            type === "node" &&
            id !== selected.id &&
            !selected.edges.find(({ nodeId }) => nodeId === id)
        )
        .map(({ id }) => id)
    );
  }, [setOtherNodes, selected, canvas]);

  return (
    <div className="node-options">
      <p>Id: {nodeState.id}</p>
      <label htmlFor="text">Name:</label>
      <input value={nodeState.text} name="text" onChange={handleChange} />
      <h5>Edges:</h5>
      {selected.edges.length > 0 ? (
        <ul>
          {selected.edges.map((edge) => (
            <li key={edge.nodeId}>With {edge.nodeId}</li>
          ))}
        </ul>
      ) : (
        <p>No edges for this node</p>
      )}
      {otherNodes.length > 0 ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateNode({
              [e.target.getElementsByTagName("select")[0].name]:
                e.target.getElementsByTagName("select")[0].value,
            });
          }}
        >
          <label htmlFor="edge">Add edge: </label>
          <select name="edge">
            {otherNodes.map((node) => (
              <option key={node} value={node}>
                {node}
              </option>
            ))}
          </select>
          <button type="submit">Add Edge</button>
        </form>
      ) : (
        <p>No node available for an edge</p>
      )}
    </div>
  );
}

export default NodeOptions;
