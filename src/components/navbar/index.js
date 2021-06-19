import React from "react";
import CanvasStore from "../../stores/canvasStore";
import { NavbarEl } from "./elements/index";

function Navbar() {
  const { isCanvasActive, addNode, setSelected } = CanvasStore.useContainer();
  return (
    <NavbarEl>
      <button
        onClick={() =>
          isCanvasActive ? addNode() : console.log("Canvas not loaded")
        }
        className="sidebar-btn"
        disabled={!isCanvasActive}
      >
        Add Node
      </button>
      <button
        onClick={() =>
          isCanvasActive
            ? setSelected({ type: "graph" })
            : console.log("Canvas not loaded")
        }
        className="sidebar-btn"
        disabled={!isCanvasActive}
      >
        Add Graph
      </button>
    </NavbarEl>
  );
}

export default Navbar;
