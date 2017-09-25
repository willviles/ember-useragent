/* eslint-env node */
'use strict';

const BroccoliDebug = require('broccoli-debug');
const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');
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

    app.import(this.treePaths.vendor + '/ua-parser-js/ua-parser.js');

    app.import('vendor/ua-parser-shim.js', {
      exports: {
        ['ua-parser-js']: ['default']
      }
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
