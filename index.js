require("colors");
const path = require("path");
const fs = require('fs');

const server = require("./lib/server.js");

exports.start = function(directory, port) {

  const gitPath = path.join(directory, ".git");
  fs.access(gitPath, err => {
    err ? _error() : _start();
  });

  function _start(){
    console.log("\nstarting server".green, "(CTL + C to stop)");
    server.start(directory, port);
    console.log("navigate to", `http://localhost:${port}`.magenta, "to view");
  }

  function _error(){
    console.log("\nERROR:".red, "no git repository in this directory\n");
  }

};
