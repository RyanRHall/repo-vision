#! /usr/bin/env node
const argv = require('argv');
const path = require('path');

argv.option([
  {
    name: 'port',
    type: 'int',
    description: "Sets the local port"
  },
]);

const args = argv.run();
const pwd = process.env.PWD;
const suppliedPath = args.targets[0];

const setPort = args.options.port || 4000
const directory = suppliedPath ? path.join(pwd, suppliedPath) : pwd;

require("../index.js").start(directory, setPort);
