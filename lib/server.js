const express = require('express');
const path = require("path");
const getBranches = require('./get_branches.js');
const getCommits = require('./get_commits.js');
const exec = require('child_process').exec;

function start(){

  const app = express();
  app.use('/public', express.static(__dirname + '/public'));
  app.set('port', 4000);
  app.listen(app.get('port'));

  const merge = (objA, objB) => Object.assign(objA, objB);

  //  Controllers
  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname+'/public/index.html'));
  });

  app.get('/data', function (req, res) {
    const responseData = {};
    getBranches()
      .then(branchNames => {
        merge(responseData, branchNames);
        return getCommits(branchNames.branches);
      })
      .then(commits => merge(responseData, commits))
      .then(() => res.json(responseData));
  });

  app.get('/checkout', function (req, res) {
    const cmd = `git checkout ${req.query.branch}`;
    exec(cmd, function(error, stdout, stderr) {
      console.log("\n\n", stderr);
      if (error !== null){
        res.json({message: "you must commit your changes first!"});
        return;
      }
      const cmd = `git checkout ${req.query.hash}`;
      exec(cmd, function(error, stdout, stderr) {
        console.log("\n\n", stderr);
        if (error !== null){
          exec("git checkout HEAD", function(error, stdout, stderr) {
            console.log("\n\n", stderr);
          });
          res.json({message: "you must commit your changes first!"});
        } else {
          res.json({message: "success!"});
        }
      });
    });
  });

  app.listen(3000);
}

module.exports = { start };
