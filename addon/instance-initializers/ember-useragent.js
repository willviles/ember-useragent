import Ember from 'ember';
import UAParser from 'ua-parser-js';

const { assert, setProperties } = Ember;

export function initialize(appInstance) {

  let userAgent;

  const service = appInstance.lookup('service:userAgent');

  if (window && window.navigator) {
    userAgent = window.navigator.userAgent;
  }

  assert('No userAgent present in ember-useragent/instance-initializers/ember-useragent', userAgent);

  setProperties(service, {
    _UAParser: new UAParser(userAgent),
    userAgent
  });

}

export default {
  name: 'ember-useragent-browser',
  initialize() {
    if (typeof FastBoot === 'undefined') {
      initialize(...arguments);
    }
  }
};
