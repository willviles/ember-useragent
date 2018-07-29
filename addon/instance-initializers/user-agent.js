/* global FastBoot */

import { get, set } from '@ember/object';
import { assert } from '@ember/debug';

function getUserAgent(appInstance) {
  if (typeof FastBoot === 'undefined') {
    const userAgent = get(window, 'navigator.userAgent');
    assert('No `userAgent` present in window.navigator', userAgent);
    return userAgent;
  } else {
    const fastboot = appInstance.lookup('service:fastboot');
    const headers = get(fastboot, 'request.headers');
    const userAgent = headers.get('user-agent');
    assert('No `user-agent` present in FastBoot headers.', userAgent);
    return userAgent;
  }
}

export function initialize(appInstance) {
  const service = appInstance.lookup('service:user-agent');
  set(service, 'userAgent', getUserAgent(appInstance));
}

export default {
  initialize
};
