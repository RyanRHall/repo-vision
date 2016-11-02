const UTIL = require("./util.js");

function createNode(line, lineNumber, branchName){

  let [from, id, author, email, timeStamp, ...rest] = line.split(" ");
  email = email.replace("<", "").replace(">", "");
  timeStamp = parseInt(timeStamp) * 1000;
  const message = parseMessage(rest);

  let newId;

  switch(UTIL.classifyCommit(line)){
    case "INITIAL":
      id = `${id}_${branchName}`;
      break;
    case "COMMIT":
      if (lineNumber === 2){
        from = `${from}_${branchName}`;
      }
      break;
    case "BRANCH":
      from = id;
      id = `${id}_${branchName}`;
      break;
    case "MERGE":
      return {};
  }
  return { from, id, author, email, timeStamp, message, label: lineNumber, group: branchName };
}

function parseMessage(words){
  const leftBound = words.findIndex( el => el[el.length - 1] == ":");
  const message = words.splice(leftBound + 1);
  return message.join(" ");
}

module.exports = createNode;
