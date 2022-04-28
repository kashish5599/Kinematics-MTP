import React from "react";
import CanvasStore from "../../stores/canvasStore";
import { NavbarEl } from "./elements/index";

function Navbar() {
  const { isCanvasActive, addNode, setSelected, generateEquations, canvas } =
    CanvasStore.useContainer();
  return (
    <NavbarEl>
      <button
        onClick={() =>
          isCanvasActive ? addNode() : console.log("Canvas not loaded")
        }
        className="navbar-btn"
        disabled={!isCanvasActive}
      >
        Add Node
      </button>
      <button
        onClick={() =>
          isCanvasActive
            ? canvas.discardActiveObject().renderAll() &&
              setSelected({ type: "graph" })
            : console.error("Canvas not loaded")
        }
        className="navbar-btn"
        disabled={!isCanvasActive}
      >
        Add Graph
      </button>
      <button
        onClick={() => {
          canvas.discardActiveObject().renderAll();
          setSelected({ type: "graph-properties" });
        }}
        className="navbar-btn"
      >
        View Cycles
      </button>
      <button
        onClick={() =>
          isCanvasActive
            ? generateEquations()
            : console.error("Canvas not loaded")
        }
        className="navbar-btn"
        disabled={!isCanvasActive}
      >
        Generate equations
      </button>
    </NavbarEl>
  );
}

export default Navbar;
