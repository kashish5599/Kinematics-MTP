import React from "react";
import CanvasStore from "../../../../stores/canvasStore";
import { SidebarEl } from "../../elements";
import GraphOptions from "./components/graphOptions";
import GraphProperties from "./components/graphProperties";
import NodeOptions from "./components/nodeOptions";

function Sidebar() {
  const { selected } = CanvasStore.useContainer();

  return (
    <SidebarEl>
      {selected
        ? (() => {
            switch (selected.type) {
              case "node":
                return <NodeOptions />;
              case "graph":
                return <GraphOptions />;
              case "graph-properties":
                return <GraphProperties />;
              default:
                return <div>Error</div>;
            }
          })()
        : "Select an object to view its properties"}
    </SidebarEl>
  );
}

export default Sidebar;
