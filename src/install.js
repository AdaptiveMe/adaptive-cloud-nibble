/**
 * This script runs the installation of the nibble software. The script
 * checks if it's necesary to install or reinstall the nibble and
 * downloads the nibble if it's necessari to (re)install.
 */

'use strict';

var os = require('os');
var fs = require('fs');
var path = require('path');
var ProgressBar = require('progress');
var request = require('request');
var progress = require('request-progress');
var tarball = require('tarball-extract');

var lib = require('./lib.js');

// Check the current platform
var platform = lib.getPlatform();
if (!platform) {
  console.error(('There is no platform configured for the current operating ' +
  'system: ' + os.platform() + '_' + os.arch()).red);
  process.exit(1);
}

// Re-installation required or not?
if (lib.existsFile(lib.getNibbleTarFile())) {
  console.log('You have the latest version of nibble installed. Skipping re-installation'.green);
  process.exit(0);
} else {
  if (lib.existsDirectory(lib.getNibbleFolder())) {
    console.log('You have a previous version nibble. Re-installing'.yellow);

    // Delete the existing installation
    lib.deleteFolderRecursive(lib.getNibbleFolder());

    // Delete the previous compressed downloads
    fs.readdirSync(lib.getAdaptiveFolder()).forEach(function (fileName) {
      if (path.extname(fileName) === '.tgz') {
        fs.unlinkSync(lib.getAdaptiveFolder() + path.sep + fileName);
      }
    });
  }
}

// Create a progress bar for the download
var percent = -1;
var bar = new ProgressBar('[:bar] :percent :elapseds :etas ', {
  complete: '=',
  incomplete: ' ',
  total: 101,
  width: 50
});

// Download nibble

console.log(('Downloading nibble: ' + platform.url).green);

progress(request(platform.url), {})

  .on('progress', function (state) {
    if (state.percent > percent) {
      percent = state.percent;
      bar.tick();
    }
  })

  .on('error', function (err) {
    console.error((err).red);
    process.exit(1);
  })

  .on('end', function (output) {
  })

  .pipe(fs.createWriteStream(lib.getNibbleTarFile()))

  .on('close', function (file) {

    // Extract nibble

    console.log(('Extracting nibble: ' + lib.getNibbleTarFile()).green);

    tarball.extractTarball(lib.getNibbleTarFile(), lib.getNibbleFolder(), function (err) {
      if (err) {
        console.error((err).red);
        process.exit(1);
      }
      console.log('Done!'.green);
      process.exit(0);
    });

  })

  .on('error', function (err) {
    console.error((err).red);
    process.exit(1);
  });
