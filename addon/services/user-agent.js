import Service from '@ember/service';
import { computed, get, set } from '@ember/object';
import { getOwner } from '@ember/application';
import { deprecate } from '@ember/debug';
import UAParser from 'ua-parser-js';

export default Service.extend({
  _parser: computed({
    get() {
      if (this.__parser) {
        return this.__parser;
      } else {
        return new UAParser;
      }
    },
    set(key, value) {
      this.__parser = value;
      return this.__parser;
    }
  }),

  parser: computed('extensions', {
    get() {
      deprecate(
        'Usage of the private property `parser` is deprecated. If you need to fiddle around with this private property, please open an issue and we can discuss.',
        false,
        { id: 'ember-useragent.service.parser', until: '1.0.0' }
      );

      return get(this, '_parser');
    }
  }).readOnly(),

  UAParser: computed(function () {
    deprecate(
      'Usage of the property `UAParser` is deprecated. To get the UAParser class, import it as `import UAParser from \'ua-parser-js\';`. To get the instance of that class used by this service, as this property previously incorrectly returned, get the `parser` property.',
      false,
      { id: 'ember-useragent.service.UAParser', until: '1.0.0' }
    );

    return get(this, '_parser');
  }),

  userAgent: computed({
    get() {
      const parser = get(this, '_parser');
      return parser.getUA();
    },
    set(key, value) {
      const parser = get(this, '_parser');
      parser.setUA(value);
      set(this, '__parser', parser);

      return value;
    }
  }),

  fastboot: computed(function () {
    deprecate(
      'Usage of the private property `fastboot` is deprecated. Inject the `fastboot` service yourself instead.',
      false,
      { id: 'ember-useragent.service.fastboot', until: '1.0.0' }
    );

    return getOwner(this).lookup('service:fastboot');
  }),

  isFastBoot: computed(function () {
    deprecate(
      'Usage of the private property `isFastBoot` is deprecated. Inject the `fastboot` service yourself and get `fastboot.isFastBoot` instead.',
      false,
      { id: 'ember-useragent.service.isFastBoot', until: '1.0.0' }
    );

    const fastboot = getOwner(this).lookup('service:fastboot');
    return Boolean(fastboot && get(fastboot, 'isFastBoot'));
  }),

  browser: computed('_parser', function() {
    const browser = get(this, '_parser').getBrowser();

    return {
      info: browser,
      isChrome: browser.name === 'Chrome',
      isChromeHeadless: browser.name === 'Chrome Headless',
      isEdge: browser.name === 'Edge',
      isFirefox: browser.name === 'Firefox',
      isIE: browser.name === 'IE' ||
            browser.name === 'IE Mobile',
      isSafari: browser.name === 'Safari' ||
                browser.name === 'Mobile Safari'
    };
  }),

  cpu: computed('_parser', function() {
    return get(this, '_parser').getCPU();
  }),

  device: computed('_parser', function() {
    const device = get(this, '_parser').getDevice();

    return {
      info: device,
      isConsole: device.type === 'console',
      isDesktop: !device.type,
      isMobile: device.type === 'mobile',
      isTablet: device.type === 'tablet'
    };
  }),

  engine: computed('_parser', function() {
    const engine = get(this, '_parser').getEngine();

    return {
      info: engine,
      isWebkit: engine.name === 'WebKit'
    };
  }),

  os: computed('_parser', function() {
    const os = get(this, '_parser').getOS();

    return {
      info: os,
      isAndroid: os.name === 'Android',
      isIOS: os.name === 'iOS',
      isLinux: [
        'CentOS', 'Fedora', 'Linpus', 'Linux', 'MeeGo',
        'PCLinuxOS', 'RedHat', 'SUSE', 'Ubuntu', 'VectorLinux'
      ].indexOf(os.name) > -1,
      isMacOS: os.name === 'Mac OS',
      isWindows: [
        'Windows', 'Windows Phone', 'Windows Mobile'
      ].indexOf(os.name) > -1
    };
  }),

  setupService() {
    deprecate(
      'Usage of the private method `setupService` is deprecated. To force an update, set the `userAgent` property.',
      false,
      { id: 'ember-useragent.service.setupService', until: '1.0.0' }
    );

    this.notifyPropertyChange('userAgent');
  }
});
