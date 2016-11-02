const server = require("./lib/server.js");

exports.start = function() {
  console.log("starting server");
  server.start();
  console.log("navigate to localhost:3000 to view");
};
