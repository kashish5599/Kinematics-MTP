import React from "react";
import Canvas from "./components/canvas";
import Sidebar from "./components/sidebar";
import { ContentEl } from "./elements";

function Content() {
  return (
    <ContentEl>
      <Sidebar />
      <Canvas />
    </ContentEl>
  );
}

export default Content;
