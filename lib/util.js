const UTIL = {
  classifyCommit(line){
    const commitData = line.split(" ");
    commitData.splice(0, 5);
    const edgeKey = commitData.find( el => el[el.length - 1] == ":");

    if (edgeKey.includes("(initial)")){
      return "INITIAL";
    } else if (edgeKey.includes("merge")) {
      return "MERGE";
    } else if (edgeKey.includes("branch")) {
      return "BRANCH";
    } else if (edgeKey.includes("reset")) {
      return "RESET";
    } else if (edgeKey.includes("clone")) {
      return "CLONE";
    } else {
      return "COMMIT";
    }
  },

  parseLine(line){
    let [from, hash, author, email, timeStamp, ...rest] = line.split(" ");

    email = email.replace("<", "").replace(">", "");
    timeStamp = parseInt(timeStamp) * 1000;
    const message = _parseMessage(rest);
    const type = UTIL.classifyCommit(line);

    return [from, hash, author, email, timeStamp, type, message];
  }
};

function _parseMessage(words){
  const leftBound = words.findIndex( el => el[el.length - 1] == ":");
  const message = words.splice(leftBound + 1);
  return message.join(" ");
}

module.exports = UTIL;
