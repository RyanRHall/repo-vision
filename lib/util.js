const C = require("./constants.js");

module.exports = {
  classifyCommit(line){
    const [from, to, author, email, timeStamp, ...rest] = line.split(" ");
    const edgeKey = rest.find( el => el[el.length - 1] == ":");
    
    if (edgeKey.includes("(initial)")){
      return "INITIAL";
    } else if (edgeKey.includes("commit")) {
      return "COMMIT";
    } else if (edgeKey.includes("branch")) {
      return "BRANCH";
    }
  }
};
