const UTIL = require("./util.js");

class NodeManager {
  constructor(){
    this.nodes = [];
    this.edges = [];
    this.commitNodes = {};
  }

  addCommit(node){
    this.commitNodes[node.hash] = node;
  }

  findLastId(hash){
    const node = this.commitNodes[hash];
    return node ? node.id : "00000";
  }
}

module.exports = NodeManager;
