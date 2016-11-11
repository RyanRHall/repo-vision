const exec = require('child_process').exec;

const checkout = hash => (
  new Promise ( (resolve, reject) => {
    const cmd = `git checkout ${hash}`;

    exec(cmd, function(error, stdout, stderr) {
      _printLine();
      console.log(stderr);
      if (error === null){
        resolve({success: true});
      } else {
        reject({success: false});
      }
    });
  })
);

function _printLine(){
  console.log("--------------------------------------------------\n");
}

module.exports = checkout;
