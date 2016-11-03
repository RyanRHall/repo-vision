const express = require('express');
const getBranches = require('./get_branches.js');
const getCommits = require('./get_commits.js');
const exec = require('child_process').exec;
const checkout = require('./checkout');

function start(directory, port){

  const app = express();
  app.use('/public', express.static(__dirname + '/public'));

  const merge = (objA, objB) => Object.assign(objA, objB);

  //  Controllers
  app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
  });

  app.get('/data', function (req, res) {
    const responseData = {};
    getBranches(directory)
      .then(branchNames => {
        merge(responseData, branchNames);
        return getCommits(directory, branchNames.branches);
      })
      .then(commits => merge(responseData, commits))
      .then(() => res.json(responseData));
  });

  app.get('/checkout', (req, res) => {
    checkout(req.query)
    .then( message => {
        res.json(message);
      })
      .catch( message => {
        res.json(message);
      });
  });

  app.listen(port);
}

module.exports = { start };
