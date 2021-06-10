import React from "react";
import { AppEl } from "../elements/app";
import CanvasStore from "../stores/canvasStore";
import { withStore } from "../utils/withStore";
import Content from "./content";
import Navbar from "./navbar";

function App() {
  return (
    <AppEl>
      <Navbar />
      <Content />
    </AppEl>
  );
}

export default withStore([CanvasStore])(App);
