/* jshint node: true */
'use strict';

const BroccoliDebug = require('broccoli-debug');
const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');
const VersionChecker = require('ember-cli-version-checker');
const path = require('path');
const fastbootTransform = require('fastboot-transform');

module.exports = {
  name: 'ember-useragent',

  included(app) {
    this.importDependencies(app);
    return this._super.included.apply(this, arguments);
  },

  importDependencies(app) {
    if (arguments.length < 1) {
      throw new Error('Application instance must be passed to import');
    }

    // `using: []` syntax isavailable for Ember 2.9.0 and above only
    new VersionChecker(this).for('ember-cli', 'npm').assertAbove('2.9.0');

    app.import(this.treePaths.vendor + '/ua-parser-js/ua-parser.js', {
      using: [
        { transformation: 'amd', as: 'ua-parser-js' }
      ]
    });

  },

  treeForVendor(vendorTree) {
    let debugTree = BroccoliDebug.buildDebugCallback(this.name),
        trees = [];

    if (vendorTree) {
      trees.push(
        debugTree(vendorTree, 'vendorTree')
      );
    }

    let js = fastbootTransform(
      moduleToFunnel('ua-parser-js')
    );

    trees.push(
      debugTree(js, 'js')
    );

    return mergeTrees(trees);
  }
};

function moduleToFunnel(moduleName, destination) {
  return new Funnel(resolveModulePath(moduleName), {
    destDir: destination || moduleName
  });
}

function resolveModulePath(moduleName) {
  return path.dirname(require.resolve(moduleName));
}
