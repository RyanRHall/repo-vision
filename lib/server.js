const express = require('express');
const path = require("path");
const getBranches = require('./get_branches.js');
const getCommits = require('./get_commits.js');
const exec = require('child_process').exec;

function start(startDirectory){

  const app = express();
  app.use('/public', express.static(__dirname + '/public'));
  app.set('port', 4000);


  const merge = (objA, objB) => Object.assign(objA, objB);

  //  Controllers
  app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
  });

  app.get('/data', function (req, res) {
    const responseData = {};
    getBranches(startDirectory)
      .then(branchNames => {
        merge(responseData, branchNames);
        return getCommits(startDirectory, branchNames.branches);
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

  app.listen(app.get('port'));
}

module.exports = { start };
