const UTIL = require("./util.js");

function createEdge(line, lineNumber, branchName){
  let [from, to, ...rest] = line.split(" ");
  let dashes = false;
  let arrows = {to: false};

  switch(UTIL.classifyCommit(line)){
    case "INITIAL":
      to = `${to}_${branchName}`;
      break;
    case "MERGE":
      if (lineNumber === 2){
        from = `${from}_${branchName}`;
      }
      arrows.to = true;
      break;
    case "COMMIT":
      if (lineNumber === 2){
        from = `${from}_${branchName}`;
      }
      break;
    case "BRANCH":
      from = to;
      to = `${to}_${branchName}`;
      dashes = true;
      break;
  }

  return {from, to, dashes, arrows};
}

module.exports = createEdge;
