export const getRandomNumberInterval = (min = 0, max = 1) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getNodeNumber = (node) => {
  let nodeId = typeof node === "string" ? node : node?.id;
  if (!nodeId) {
    console.error("Invalid node");
    return -1;
  }
  return parseInt(nodeId.match(/[^-]*$/g)[0]);
};

export const getNodes = (canvas) => {
  return canvas.getObjects().filter(({ type }) => type === "node");
};

export const getNodeFromNN = (canvas, nn) =>
  canvas.getObjects("node").find(({ id }) => id === `node-${nn}`);

//Takes nodenumbers and return edge length b/w them else returns -1
export const getEdge = (canvas, nn1, nn2) => {
  const edges = canvas
    .getObjects("node")
    .filter(({ id }) => id === `node-${nn1}`)[0]
    .edges.filter(
      ({ source, target }) =>
        source === `node-${nn2}` || target === `node-${nn2}`
    );
  if (edges.length < 1) return null;
  return edges[0];
};

function dfs_cycle(u, p, color, mark, par, graph, cyclenumber) {
  if (color[u] === 2) {
    return;
  }

  // seen vertex, but was not
  // completely visited -> cycle
  // detected. backtrack based on
  // parents to find the complete
  // cycle.
  if (color[u] === 1) {
    cyclenumber++;
    var cur = p;
    mark[cur] = cyclenumber;

    // backtrack the vertex which
    // are in the current cycle
    // thats found
    while (cur !== u) {
      cur = par[cur];
      mark[cur] = cyclenumber;
    }
    return;
  }
  par[u] = p;

  // partially visited.
  color[u] = 1;

  // simple dfs on graph
  for (var v of graph[u]) {
    // if it has not been
    // visited previously
    if (v === par[u]) {
      continue;
    }
    dfs_cycle(v, u, color, mark, par);
  }

  // completely visited.
  color[u] = 2;
}

export const fCyc = (adj) => {
  let N = adj.length;
  var cycles = Array.from(Array(N), () => Array());
  var color = Array(N).fill(0);
  var par = Array(N).fill(0);
  // mark with unique numbers
  var mark = Array(N).fill(0);
  var cyclenumber = 0;
  var edges = 13;
  console.log(adj);
  dfs_cycle(0, -1, color, mark, par, adj, cyclenumber);
  for (var i = 1; i <= edges; i++) {
    if (mark[i] !== 0) cycles[mark[i]].push(i);
  }

  return cycles;
};
