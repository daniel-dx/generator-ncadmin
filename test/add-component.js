'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-ncadmin:add-component', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/add-component'))
      .inDir(path.join(__dirname, '../temp'))
      .withPrompts({
        // name: 'sub',
      })
      .toPromise();
  });

  it('creates files', function () {
    assert.file([
      'dummyfile.txt'
    ]);
  });
});
