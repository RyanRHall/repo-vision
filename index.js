const server = require("./lib/server.js");

exports.start = function(path) {
  console.log("starting server");
  server.start(path);
  console.log("navigate to localhost:4000 to view");
};
