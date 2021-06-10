import React from "react";
import CanvasStore from "../../stores/canvasStore";
import { NavbarEl } from "./elements/index";

function Navbar() {
  const { isCanvasActive, addNode } = CanvasStore.useContainer();
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
    </NavbarEl>
  );
}

export default Navbar;
