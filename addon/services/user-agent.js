/* global FastBoot */

import Service from '@ember/service';
import { computed, get, observer, setProperties } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { assign } from '@ember/polyfills';
import { isEqual } from '@ember/utils';
import { assert } from '@ember/debug';
import { getOwner } from '@ember/application';
import UAParser from 'ua-parser-js';

export default Service.extend({

  fastboot: computed(function() {
    return getOwner(this).lookup('service:fastboot');
  }),

  isFastBoot: readOnly('fastboot.isFastBoot'),

  userAgent: computed(function() {
    if (get(this, 'isFastBoot')) {
      let headers = get(this, 'fastboot.request.headers');
      let userAgent = headers.get('user-agent');

      assert('No userAgent present in ember-useragent/services/user-agent (FastBoot)', userAgent);
      return userAgent;
    } else {
      if (window && window.navigator) {
        let userAgent = window.navigator.userAgent;

        assert('No userAgent present in ember-useragent/services/user-agent (Browser)', userAgent);
        return userAgent;
      }
    }
  }),

  UAParser: computed('userAgent', function() {
    let userAgent = get(this, 'userAgent');

    if (get(this, 'isFastBoot')) {
      let UAParser = FastBoot.require('ua-parser-js');
      return new UAParser(userAgent);
    }

    return new UAParser(userAgent);
  }),

  setupService: observer('UAParser', function() {
    const parser = get(this, 'UAParser');

    const browser = parser.getBrowser();
    const device = parser.getDevice();
    const engine = parser.getEngine();
    const os = parser.getOS();

    setProperties(this, assign({

      browser: {
        info: browser,
        isChrome: isEqual(browser.name, 'Chrome'),
        isChromeHeadless: isEqual(browser.name, 'Chrome Headless'),
        isEdge: isEqual(browser.name, 'Edge'),
        isFirefox: isEqual(browser.name, 'Firefox'),
        isIE: isEqual(browser.name, 'IE') ||
              isEqual(browser.name, 'IE Mobile'),
        isSafari: isEqual(browser.name, 'Safari') ||
                  isEqual(browser.name, 'Mobile Safari')
      },

      device: {
        info: device,
        isConsole: isEqual(device.type, 'console'),
        isDesktop: !device.type,
        isMobile: isEqual(device.type, 'mobile'),
        isTablet: isEqual(device.type, 'tablet')
      },

      engine: {
        info: engine,
        isWebkit: isEqual(engine.name, 'WebKit')
      },

      os: {
        info: os,
        isAndroid: isEqual(os.name, 'Android'),
        isIOS: isEqual(os.name, 'iOS'),
        isLinux: isEqual(os.name, 'Linux'),
        isMacOS: isEqual(os.name, 'Mac OS'),
        isWindows: isEqual(os.name, 'Windows') ||
                   isEqual(os.name, 'Windows Phone') ||
                   isEqual(os.name, 'Windows Mobile')
      }

    }, parser));

  }),

  init() {
    this._super(...arguments);
    this.setupService();
  }

});
