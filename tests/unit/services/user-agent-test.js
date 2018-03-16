import { moduleFor, test } from 'ember-qunit';

moduleFor('service:user-agent', 'Unit | Service | user agent', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

const tests = [
  {
    test: 'Device | iPhone',
    ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
    assertions: {
      'browser.isSafari': true,
      'device.isMobile': true,
      'os.isIOS': true
    }
  },
  {
    test: 'Device | iPad',
    ua: 'Mozilla/5.0 (iPad; CPU OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
    assertions: {
      'browser.isSafari': true,
      'device.isTablet': true,
      'os.isIOS': true
    }
  },
  {
    test: 'Device | Galaxy S5',
    ua: 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Mobile Safari/537.36',
    assertions: {
      'browser.isChrome': true,
      'device.isMobile': true,
      'os.isAndroid': true
    }
  },
  {
    test: 'Browser | Chrome OSX',
    ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36',
    assertions: {
      'browser.isChrome': true,
      'device.isDesktop': true,
      'os.isMacOS': true
    }
  },
  {
    test: 'Browser | Chrome Headless',
    ua: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome Safari/537.36',
    assertions: {
      'browser.isChromeHeadless': true
    }
  },
  {
    test: 'OS | Ubuntu',
    ua: 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:15.0) Gecko/20100101 Firefox/15.0',
    assertions: {
      'os.isLinux': true
    }
  }
];

tests.forEach(function(item) {
  test(item.test, function(assert) {
    let userAgent = item.ua;
    let subject = this.subject({
      userAgent
    });

    for (let key in item.assertions) {
      let actual = subject.get(key);
      let expected = item.assertions[key];
      assert.equal(actual, expected, `Property ${key} should be ${expected}, was ${actual}`);
    }
  });
});
