/* global FastBoot */

import Ember from 'ember';

const { assert, setProperties } = Ember;

export function initialize(appInstance) {

  let UAParser = FastBoot.require('ua-parser-js'),
      userAgent, headers;

  const service = appInstance.lookup('service:userAgent');
  const fastbootService = appInstance.lookup('service:fastboot');

  headers = fastbootService.get('request.headers');
  userAgent = headers.get('user-agent');

  assert('No userAgent present in ember-useragent/instance-initializers/fastboot', userAgent);

  setProperties(service, {
    _UAParser: new UAParser(userAgent),
    userAgent
  });

}

export default {
  name: 'ember-useragent-fastboot',
  initialize
};
