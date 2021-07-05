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
