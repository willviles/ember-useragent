'use strict';

module.exports = {
  name: 'ember-useragent',

  included(app) {
    // https://github.com/rwjblue/ember-cli-cjs-transform/issues/23#issuecomment-408665511
    const modulePath = require.resolve('ua-parser-js').match(/node_modules(\/|\\).*$/)[0];
    app.import(modulePath, {
      using: [
        { transformation: 'cjs', as: 'ua-parser-js' }
      ]
    });

    return this._super.included.apply(this, arguments);
  }
};
