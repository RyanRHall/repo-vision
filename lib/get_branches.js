
const fs = require('fs');

const getBranches = directory => (
  new Promise( resolve => {
    const headsFolder = directory + '/.git/logs/refs/heads/';
    const branchNames = [];

    fs.readdir(headsFolder, (err, files) => {
      files.forEach(file => {
        branchNames.push(file);
      });
      resolve({branches: branchNames});
    });

  })
);

module.exports = getBranches;
