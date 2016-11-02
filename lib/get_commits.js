const path = require("path");
const fs = require('fs');
const readline = require('readline');
const createEdge = require("./create_edge");
const createNode = require("./create_node");

const HEADS_FOLDER = path.join(__dirname+'/../.git/logs/refs/heads/');

const getCommits = branchNames => (
  new Promise( resolve => {
    const promises = branchNames.map(readCommitFile);

    // mergeCommitData --> {nodes: [], edges: []}
    resolve(Promise.all(promises).then(mergeCommitData));
  })
);

const readCommitFile = fileName => (
  new Promise( resolve => {
    const filePath = HEADS_FOLDER + fileName;
    const commits = {nodes: [], edges: []};
    let lineNumber = 1;

    const lineReader = readline.createInterface({
      input: fs.createReadStream(filePath)
    });

    lineReader.on('line', function (line) {
      // parseCommit --> {node: {}, edge: {}}
      const commitData = parseCommit(line, lineNumber, fileName);
      commits.nodes.push(commitData.node);
      commits.edges.push(commitData.edge);
      lineNumber++;
    });

    // commits --> {nodes: [], edges: []}
    lineReader.on('close', () => resolve(commits));
  })
);

function parseCommit(...args){
  const edge = createEdge(...args);
  const node = createNode(...args);
  return {node, edge};
}

function mergeCommitData(objs) {
  // sigle obj --> {nodes: [], edges: []}
  const data = {nodes: [], edges: []};

  objs.forEach( obj => {
    data.nodes = data.nodes.concat(obj.nodes);
    data.edges = data.edges.concat(obj.edges);
  });

  // return --> {nodes: [], edges: []}}
  return data;
}

module.exports = getCommits;