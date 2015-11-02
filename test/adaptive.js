'use strict';

var lib = require('../src/lib.js');
var expect = require('expect.js');
var request = require('request');

describe('Nibble Releases Download url', function () {

  this.timeout(15000); // Increase the default timeout

  /**
   * Test to try a HEAD connection to Github. The expected result is a 403
   * (redirect). This behaviour is normal in Github.
   */
  lib.getPlatforms().forEach(function (platform) {

    it(platform.name + ' (' + platform.url + ')', function (done) {

      request.head(platform.url, function (err, res, body) {
        expect(res.statusCode).to.equal(403);
        done();
      });

    });

  });
});
