import React from "react";
import { UNDIRECTED_EDGE } from "../../../../../../../data/config";

function Edges({
  edgeNodeMap,
  node: { id: nodeId, edges },
  otherNodes,
  addEdge,
}) {
  return (
    <>
      <h5>Edges:</h5>
      {edges.length > 0 ? (
        <ul>
          {Object.entries(edgeNodeMap).map(([key]) => {
            const ids = key.split("-").map((id) => `node-${id}`);

            if (ids[0] === nodeId)
              return <li key={`${ids[1]}`}>Edge with {ids[1]}</li>;
            else if (ids[1] === nodeId)
              return <li key={`${ids[0]}`}>Edge with {ids[0]}</li>;
            else return "";
          })}
        </ul>
      ) : (
        <p>No edges for this node.</p>
      )}
      {otherNodes.length > 0 ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addEdge(
              nodeId,
              e.target.getElementsByTagName("select")[0].value,
              UNDIRECTED_EDGE
            );
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
    </>
  );
}

export default Edges;
