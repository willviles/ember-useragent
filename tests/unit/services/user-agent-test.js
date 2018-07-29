import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { get, set } from '@ember/object';

module('Unit | Service | user agent', function(hooks) {
  setupTest(hooks);

  const tests = [
    {
      name: 'Device | iPhone',
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
      assertions: {
        'browser.isSafari': true,
        'device.isMobile': true,
        'os.isIOS': true
      }
    },
    {
      name: 'Device | iPad',
      userAgent: 'Mozilla/5.0 (iPad; CPU OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
      assertions: {
        'browser.isSafari': true,
        'device.isTablet': true,
        'os.isIOS': true
      }
    },
    {
      name: 'Device | Galaxy S5',
      userAgent: 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Mobile Safari/537.36',
      assertions: {
        'browser.isChrome': true,
        'device.isMobile': true,
        'os.isAndroid': true
      }
    },
    {
      name: 'Browser | Chrome OSX',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36',
      assertions: {
        'browser.isChrome': true,
        'device.isDesktop': true,
        'os.isMacOS': true
      }
    },
    {
      name: 'Browser | Chrome Headless',
      userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome Safari/537.36',
      assertions: {
        'browser.isChromeHeadless': true
      }
    },
    {
      name: 'OS | Ubuntu',
      userAgent: 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:15.0) Gecko/20100101 Firefox/15.0',
      assertions: {
        'os.isLinux': true
      }
    }
  ];

  for (const { name, userAgent, assertions } of tests) {
    test(name, function(assert) {
      const service = this.owner.lookup('service:user-agent');
      set(service, 'userAgent', userAgent);

      for (const [key, expected] in Object.entries(assertions)) {
        const actual = get(service, key);
        assert.strictEqual(actual, expected, `Property ${key} should be ${expected}, was ${actual}`);
      }
    });
  }
});
