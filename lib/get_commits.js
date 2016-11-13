const path = require('path');
const fs = require('fs');
const readline = require('readline');
const NodeManager = require('./node_manager');
const createEdge = require('./create_edge');
const createNode = require('./create_node');

function getCommits(directory, branchNames){

  const nodeManager = new NodeManager();

  const _getCommits = () => (
    new Promise( resolve => {
      const promises = branchNames.map(readCommitFile);
      resolve(Promise.all(promises).then(finish));
    })
  );

  const readCommitFile = fileName => (
    new Promise( resolve => {

      const filePath = path.join(directory, '.git/logs/refs/heads', fileName);

      const lineReader = readline.createInterface({
        input: fs.createReadStream(filePath)
      });

      let lineNumber = 1;

      lineReader.on('line', function (line) {
        parseCommit(nodeManager, line, lineNumber, fileName);
        lineNumber++;
      });

      lineReader.on('close', () => resolve());
    })
  );

  function parseCommit(...args){
    createNode(...args);
    createEdge(...args);
  }

  function finish() {
    return {nodes: nodeManager.nodes, edges: nodeManager.edges};
  }

  return _getCommits();

}

module.exports = getCommits;
