/* eslint-env node:true */

(function() {
  /* globals define, self */

  function UAParserUndefined() {
    var error = "UAParser is not available.";

    function throwError() {
      throw Error(error);
    }

    throwError();
  }

  define('ua-parser-js', [], function() {
    'use strict';
    return { 'default': self['UAParser'] || UAParserUndefined };
  });

})();
