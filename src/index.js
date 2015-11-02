#!/usr/bin/env node

/**
 * Script for running the nibble as a global program defined by node.
 * The definition of the script is in package.json.
 *
 * This script passes all the parameters to nibble executable
 */

var os = require('os');
var shell = require('shelljs');
var path = require('path');
var updateNotifier = require('update-notifier');
var lib = require('./lib.js');
var constants = require('./constants.js');
var pkg = require('../package.json');

// Check for the project updates
var notifier = updateNotifier({
  pkg: pkg,
  updateCheckInterval: 1000 * 60 * 60 * 24 // 1 day
});
notifier.notify();

// Check the current platform
if (!lib.getPlatform()) {
  console.error(('There is no platform configured for the current operating ' +
  'system: ' + os.platform() + '_' + os.arch()).red);
  process.exit(1);
}

// Arguments -> Passed to the nibble bin
var args = '';
process.argv.slice(2).forEach(function (arg) {
  args += arg + ' ';
});

// Run nibble
process.exit(shell.exec(lib.getNibbleBinFolder() + path.sep + 'adaptive-nibble-emulator ' + args).code);
