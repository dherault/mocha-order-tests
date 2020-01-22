'use strict';

const fs = require('fs');
const path = require('path');
const Mocha = require('mocha');
const micromatch = require('micromatch');

const run = Mocha.prototype.run;
const each = Mocha.Suite.prototype.eachTest;

Mocha.prototype.run = function () {
  this.files = sortFiles(this.files);

  return run.apply(this, arguments);
};

function sortFiles(fileNames) {
  const testsOrderJsonFilePath = path.resolve(__dirname, '../../.tests-order.json');

  if (!fs.existsSync(testsOrderJsonFilePath)) {
    console.log('Error loading .tests-order.json file : file not found');

    return fileNames;
  }

  const testsOrderJsonFileContent = fs.readFileSync(testsOrderJsonFilePath, 'uft-8');
  let testsOrder;

  try {
    testsOrder = JSON.parse(testsOrderJsonFileContent);
  }
  catch (error) {
    console.log('Error loading .tests-order.json file : invalid JSON');

    return fileNames;
  }

  console.log(testOrder);
}
