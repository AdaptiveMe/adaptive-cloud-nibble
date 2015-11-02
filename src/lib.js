'use strict';

var constants = require('./constants.js');
var colors = require('colors');
var osHomedir = require('os-homedir');
var os = require('os');
var path = require('path');
var fs = require('fs');

// -------------------------------------------------------------------------- //
// PLATFORMS
// -------------------------------------------------------------------------- //

/**
 * Access method to all the paltforms defined in the system
 * @returns {*|platforms} Array of platforms
 */
var getPlatforms = function () {
  return constants.platforms;
};
exports.getPlatforms = getPlatforms;

/**
 * Return the current platform information for the running system. Null otherwise
 * @returns {*} Current platform
 */
var getPlatform = function () {

  var platform = null;

  constants.platforms.forEach(function (p) {
    if (p.name === os.platform() + '_' + os.arch()) {
      platform = p;
    }
  });

  return platform;
};
exports.getPlatform = getPlatform;

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
  return getAdaptiveFolder() + path.sep + 'nibble-' + constants.nibble_version + '.tgz';
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
