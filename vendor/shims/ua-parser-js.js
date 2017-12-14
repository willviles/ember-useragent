/* eslint-env node:true */
/* globals define, self */

(function() {
  function vendorModule() {
    'use strict';

    return {
      'default': self['UAParser'],
      __esModule: true,
    };
  }

  define('ua-parser-js', [], vendorModule);
})();
