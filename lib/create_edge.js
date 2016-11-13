const UTIL = require("./util.js");

function createEdge(nodeManager, line, lineNumber, branchName){
  let [_, hash, ...rest] = line.split(" ");
  let from;
  let dashes = false;
  let arrows = {to: false};
  const type = UTIL.classifyCommit(line);

  const to = `${hash}_${branchName}_${type}_${lineNumber}`;

  if (lineNumber === 1) {
    from = nodeManager.findLastId(hash);
  } else {
    const lastEdge = nodeManager.edges[nodeManager.edges.length - 1];
    from = lastEdge.to;
  }

  switch(type){
    case "MERGE":
      arrows.to = true;
      break;
    case "BRANCH":
      dashes = true;
      break;
  }

  const edge = {from, to, dashes, arrows};
  nodeManager.edges.push(edge);
}

module.exports = createEdge;
