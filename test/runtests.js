//run all tests in node.js environment

process.argv[2] = 'config=' + __dirname + '/intern';
require('intern/client');
