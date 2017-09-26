/* global FastBoot */

import { assert } from '@ember/debug';
import { computed, get, set, setProperties } from '@ember/object';
import { inject as service } from '@ember/service';

import UAParser from 'ua-parser-js';

export function initialize(appInstance) {

  let userAgentService = appInstance.lookup('service:userAgent');

  setProperties(userAgentService, {
    _UAParser: computed(function() {
      let userAgent;

      if (window && window.navigator) {
        userAgent = window.navigator.userAgent;
      }

      assert('No userAgent present in ember-useragent/instance-initializers/ember-useragent (Browser)', userAgent);

      set(this, 'userAgent', userAgent);

      return new UAParser(userAgent);
    })
  });
}

export function initializeFastboot(appInstance) {

  let UAParser = FastBoot.require('ua-parser-js');
  let userAgentService = appInstance.lookup('service:userAgent');

  setProperties(userAgentService, {
    fastboot: service(),

    _UAParser: computed(function() {
      let headers = get(this, 'fastboot.request.headers'),
          userAgent = headers.get('user-agent');

      assert('No userAgent present in ember-useragent/instance-initializers/ember-useragent (Fastboot)', userAgent);

      set(this, 'userAgent', userAgent);

      return new UAParser(userAgent);
    })
  });

}

export default {
  name: 'ember-useragent',
  initialize() {
    if (typeof FastBoot === 'undefined') {
      initialize(...arguments);
    } else {
      initializeFastboot(...arguments);
    }
  }
};
