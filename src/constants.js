'use strict';

var github_server = 'https://github.com/AdaptiveMe/adaptive-tools-nibble/releases/download/';
var nibble_version = '1.0-rc.1';

var platforms = [
  {
    name: 'darwin_x64',
    url: github_server + nibble_version + '/adaptive-nibble-darwin-x64-' + nibble_version + '.tgz'
  }, {
    name: 'win32_ia32',
    url: github_server + nibble_version + '/adaptive-nibble-windows-i586-' + nibble_version + '.zip'
  }, {
    name: 'win32_x64',
    url: github_server + nibble_version + '/adaptive-nibble-windows-x64-' + nibble_version + '.zip'
  }, {
    name: 'linux_ia32',
    url: github_server + nibble_version + '/adaptive-nibble-linux-i586-' + nibble_version + '.tgz'
  }, {
    name: 'linux_x64',
    url: github_server + nibble_version + '/adaptive-nibble-linux-x64-' + nibble_version + '.tgz'
  }
];
exports.platforms = platforms;
exports.nibble_version = nibble_version;
