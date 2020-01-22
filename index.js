'use strict';

const Mocha = require('mocha');

const run = Mocha.prototype.run;
const each = Mocha.Suite.prototype.eachTest;

Mocha.prototype.run = function () {
    console.log(this.files);
    return run.apply(this, arguments);
};

// Mocha.Suite.prototype.eachTest = function () {
//     shuffle(this.tests);
//     shuffle(this.suites);
//     return each.apply(this, arguments);
// };
