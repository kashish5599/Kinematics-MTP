import React, { useState } from "react";
import { checkGraphInput } from "../../../../../helpers/graph";
import CanvasStore from "../../../../../stores/canvasStore";
import { GraphOptionsEl } from "../../../elements";

function GraphOptions() {
  const [input, setInput] = useState("");
  const [inputType, setInputType] = useState("ADJMAT");
  const { addGraph } = CanvasStore.useContainer();

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  // const setGraphInputType = (e) => {
  //   //TO DO: Change current input to diff form
  //   setInput("");
  //   setInputType(e.target.value);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputCheck = checkGraphInput(inputType, input);
    if (!inputCheck.status) alert(inputCheck.message);
    else {
      addGraph(inputType, inputCheck.message);
      setInput("");
    }
  };

  return (
    <GraphOptionsEl>
      <h3>Add a graph</h3>
      <form>
        <p>Insert Adjacency Matrix</p>
        {/* <div></div> */}
        {/* <div className="graph-input-select" onChange={setGraphInputType}>
          <input
            type="radio"
            defaultChecked
            id="graph-option-adj-mat"
            name="graph-input-type"
            value="ADJMAT"
          />
          <label htmlFor="graph-option-adj-mat">Adjacency Matrix</label>
          <input
            type="radio"
            id="graph-option-edges"
            name="graph-input-type"
            value="EDGE"
          />
          <label htmlFor="graph-option-edges">Edges</label>
        </div> */}
        <textarea
          rows="4"
          name="graph-input"
          value={input}
          onChange={handleChange}
        />
        <br />
        <button type="submit" onClick={handleSubmit}>
          Add
        </button>
      </form>
    </GraphOptionsEl>
  );
}

export default GraphOptions;
