import Ember from 'ember';

const { get, isEqual, merge, setProperties } = Ember;

export default Ember.Service.extend({

  setupService: Ember.observer('_UAParser', function() {
    const parser = get(this, '_UAParser');

    const browser = parser.getBrowser();
    const device = parser.getDevice();
    const engine = parser.getEngine();
    const os = parser.getOS();

    setProperties(this, merge({

      browser: {
        info: browser,
        isChrome: isEqual(browser.name, 'Chrome'),
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

  })

});
