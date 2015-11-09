'use strict';

var colors = require('colors');
var osHomedir = require('os-homedir');
var os = require('os');
var path = require('path');
var fs = require('fs');
var requestSync = require('sync-request');

var host = 'https://app.adaptive.me';
exports.host = host;

// -------------------------------------------------------------------------- //
// SYNC REQUEST
// -------------------------------------------------------------------------- //

/**
 * Method for executing a GET request in a syncronous way
 * @param url Url for querying the body
 */
var syncRequest = function (url) {

  var res = requestSync('GET', url);

  if (res.error) {
    console.error(('ERROR executing the request: ' + error).red);
    process.exit(1);
  } else if (res.statusCode != 200) {
    console.error(('ERROR (' + res.statusCode + ') executing the request: ' + error).red);
    process.exit(1);
  } else {
    return (JSON.parse(res.body))
  }
};
exports.syncRequest = syncRequest;

// -------------------------------------------------------------------------- //
// FOLDERS
// -------------------------------------------------------------------------- //

/**
 * Returns the absolute path for the adaptive folder
 * @returns {*} Absolute path for adaptive folder
 */
var getAdaptiveFolder = function () {
  return osHomedir() + path.sep + '.adaptive';
};
exports.getAdaptiveFolder = getAdaptiveFolder;

/**
 * Returns the absolute path for the nibble folder
 * @returns {*} Absolute path for nibble folder
 */
var getNibbleFolder = function () {
  return getAdaptiveFolder() + path.sep + '.nibble';
};
exports.getNibbleFolder = getNibbleFolder;

/**
 * Returns the absolute path for the nibble bin folder
 * @returns {*} Absolute path for nibble bin folder
 */
var getNibbleBinFolder = function () {
  return getNibbleFolder() + path.sep + 'bin';
};
exports.getNibbleBinFolder = getNibbleBinFolder;

// -------------------------------------------------------------------------- //
// FILES
// -------------------------------------------------------------------------- //
/**
 * Returns the absolute path for the nibble tar file
 * @returns {*} Absolute path for nibble tar file
 */
var getNibbleTarFile = function () {
  var nibble_version = syncRequest(host + '/api/env/release/nibble/latest').tag_name;
  return getAdaptiveFolder() + path.sep + 'nibble-' + nibble_version + '.tgz';
};
exports.getNibbleTarFile = getNibbleTarFile;

/**
 * Returns if a file exists or not. Handles the error
 * @param path File path
 * @returns {boolean} true if exists, false otherwise
 */
var existsFile = function (path) {
  try {
    return fs.statSync(path).isFile();
  }
  catch (err) {
    return false;
  }
};
exports.existsFile = existsFile;

/**
 * Returns if a directory exists or not. Handles the error
 * @param path Directory path
 * @returns {boolean} true if exists, false otherwise
 */
var existsDirectory = function (path) {
  try {
    return fs.statSync(path).isDirectory();
  }
  catch (err) {
    return false;
  }
};
exports.existsDirectory = existsDirectory;

/**
 * Deletes a folder recursivelly
 * @param folder_path Folder's path
 */
var deleteFolderRecursive = function (folder_path) {
  if (fs.existsSync(folder_path)) {
    fs.readdirSync(folder_path).forEach(function (file, index) {
      var curPath = folder_path + path.sep + file;
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(folder_path);
  }
};
exports.deleteFolderRecursive = deleteFolderRecursive;
