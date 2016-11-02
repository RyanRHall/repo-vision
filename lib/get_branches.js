var path = require("path");
const fs = require('fs');

module.exports = () => (
  new Promise( resolve => {
    const headsFolder = path.join(__dirname+'/../.git/logs/refs/heads/');
    const branchNames = [];

    fs.readdir(headsFolder, (err, files) => {
      files.forEach(file => {
        branchNames.push(file);
      });
      resolve({branches: branchNames});
    });

  })
);
