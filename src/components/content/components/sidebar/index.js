import React from "react";
import CanvasStore from "../../../../stores/canvasStore";
import { SidebarEl } from "../../elements";
import Equations from "./components/equations";
import GraphOptions from "./components/graphOptions";
import GraphProperties from "./components/graphProperties";
import Node from "./components/node";

function Sidebar() {
  const { selected } = CanvasStore.useContainer();

  return (
    <SidebarEl>
      {selected
        ? (() => {
            switch (selected.type) {
              case "node":
                return <Node />;
              case "graph":
                return <GraphOptions />;
              case "graph-properties":
                return <GraphProperties />;
              case "equations":
                return <Equations />;
              default:
                return <div>Error</div>;
            }
          })()
        : "Select an object to view its properties"}
    </SidebarEl>
  );
}

export default Sidebar;
