const UTIL = require("./util.js");

function createNode(nodeManager, line, label, branchName){

  let [_, hash, author, email, timeStamp, type, message] = UTIL.parseLine(line);
  const id = `${hash}_${branchName}_${type}_${label}`;

  const node = { id, author, email, timeStamp, message, hash, type, label, group: branchName };

  if (type !== "BRANCH" && type !== "CLONE"){
    nodeManager.addCommit(node);
  }

  nodeManager.nodes.push(node);
}



module.exports = createNode;
