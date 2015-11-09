'use strict';

var lib = require('../src/lib.js');
var expect = require('expect.js');
var request = require('request');

describe('Nibble Releases Download url', function () {

  this.timeout(15000); // Increase the default timeout

  // Test the connection with the Adaptive Host
  it('Adaptive Cloud API Host', function (done) {

    request.get(lib.host, function (err, res, body) {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });


});
