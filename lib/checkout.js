const exec = require('child_process').exec;

const checkout = query => (
  _changeBranch(query)
  .then(_changeHead)
);

const _changeBranch = query => (
  new Promise( (resolve, reject) => {
    const cmd = `git checkout ${query.branch}`;
    exec(cmd, function(error, stdout, stderr) {
      _printLine();
      console.log("\n", stderr);
      if (error === null){
        resolve(query);
      } else {
        reject({message: "something went wrong"});
      }
    });
  })
);

const _changeHead = query => (
  new Promise ( (resolve, reject) => {
    const cmd = `git checkout ${query.hash}`;

    exec(cmd, function(error, stdout, stderr) {
      _printLine();
      console.log("\n", stderr);
      if (error === null){
        resolve({message: "success!"});
      } else {
        reject({message: "something went wrong"});
      }
    });
  })
);

function _printLine(){
  console.log("\n--------------------------------------------------\n");
}

module.exports = checkout;
