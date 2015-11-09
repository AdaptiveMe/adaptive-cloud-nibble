/**
 * This script runs the installation of the nibble software. The script
 * checks if it's necesary to install or reinstall the nibble and
 * downloads the nibble if it's necessary to (re)install.
 */

'use strict';

var os = require('os');
var fs = require('fs');
var path = require('path');
var ProgressBar = require('progress');
var request = require('request');
var progress = require('request-progress');
var tarball = require('tarball-extract');
var mkdirp = require('mkdirp');

var lib = require('./lib.js');

// -------------------------------------------------------------------------- //
// RE-INSTALLATION. REQUIRED OR NOT?
// -------------------------------------------------------------------------- //

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
// -------------------------------------------------------------------------- //
// .ADAPTIVE FOLDER
// -------------------------------------------------------------------------- //

if (!lib.existsDirectory(lib.getAdaptiveFolder())) {

  if (parseInt(process.env.SUDO_UID)) {
    console.error(('(WARN): You are running this command as sudo and the .adaptive folder is not created in your home directory').yellow);
    console.error(('Please create a folder <.adaptive> in your home directory\n\n\tmkdir ' + lib.getAdaptiveFolder() + '\n').yellow);
    process.exit(1);

  } else {
    // Create the .adaptive folder if it's not created
    mkdirp(lib.getAdaptiveFolder(), function (err) {
      if (err) {
        console.error(('(ERROR): Error creating the adaptive folder. ' + err).red);
        process.exit(1);
      }
    });
  }
}

// -------------------------------------------------------------------------- //
// DOWNLOAD
// -------------------------------------------------------------------------- //

// Retrieve the download url for nibble depending on the platform
var nibbleInfo = lib.syncRequest(lib.host + '/api/env/release/nibble/latest');

var osArch = os.arch() === 'ia32' ? 'i586' : 'x64'; // node.os.arch returns ia32 instead of i586
var platform = os.platform() + '-' + osArch;
var downloadURl = '';

nibbleInfo.assets.forEach(function (entry) {
  if (entry.name.indexOf(platform) > 0) {
    downloadURl = entry.browser_download_url;
  }
});

// Create a progress bar for the download
var percent = -1;
var bar = new ProgressBar('[:bar] :percent :elapseds :etas ', {complete: '=', incomplete: ' ', total: 101, width: 50});

console.log(('Downloading nibble: ' + downloadURl).green);

progress(request(downloadURl), {})

  .on('progress', function (state) {
    if (state.percent > percent) {
      percent = state.percent;
      bar.tick();
    }
  })

  .on('error', function (err) {
    console.error(('(ERROR): ' + err).red);
    process.exit(1);
  })

  .on('end', function (output) {
  })

  .pipe(fs.createWriteStream(lib.getNibbleTarFile()))

  .on('close', function (file) {

    // -------------------------------------------------------------------------- //
    // EXTRACT NIBBLE
    // -------------------------------------------------------------------------- //

    console.log(('Extracting nibble: ' + lib.getNibbleTarFile()).green);

    tarball.extractTarball(lib.getNibbleTarFile(), lib.getNibbleFolder(), function (err) {
      if (err) {
        console.error(('(ERROR): ' + err).red);
        process.exit(1);
      }
      console.log('Done!'.green);
      process.exit(0);
    });

  })

  .on('error', function (err) {
    console.error(('(ERROR): ' + err).red);
    process.exit(1);
  });
