'use strict';

const fs = require('fs');
const path = require('path');
const Mocha = require('mocha');
const micromatch = require('micromatch');

const run = Mocha.prototype.run;
const each = Mocha.Suite.prototype.eachTest;

Mocha.prototype.run = function () {
  this.files = sortFiles(this.files);

  console.log(this.files);
  return run.apply(this, arguments);
};

function sortFiles(fileNames) {
  const testsOrderJsonFilePath = path.resolve(__dirname, '../../.tests-order.json');

  if (!fs.existsSync(testsOrderJsonFilePath)) {
    console.log('Error loading .tests-order.json file : file not found');

    return fileNames;
  }

  const testsOrderJsonFileContent = fs.readFileSync(testsOrderJsonFilePath, 'utf-8');
  let testsOrder;

  try {
    testsOrder = JSON.parse(testsOrderJsonFileContent);
  }
  catch (error) {
    console.log('Error loading .tests-order.json file : invalid JSON');

    return fileNames;
  }

  console.log(testsOrder);

  testsOrder = testsOrder.map(filePath => {
    if (filePath.startsWith('/**/')) {
      return filePath;
    }

    return `/**/${filePath}`;
  });

  const sortedTestsObject = {};

  testsOrder.forEach(filePath => {
    sortedTestsObject[filePath] = [];
  });

  sortedTestsObject._ = [];

  fileNames.forEach(fileName => {
    testsOrder.forEach(filePath => {
      if (micromatch.isMatch(filePath, fileName)) {
        sortedTestsObject[filePath].push(fileName);
      }
      else {
        sortedTestsObject._.push(fileName);
      }
    });
  });

  return Object.values(sortedTestsObject).reduce((a, b) => a.concat(...b), []);
}
