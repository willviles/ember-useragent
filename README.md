# Ember UserAgent

Ember UserAgent is an Ember Addon for UserAgent parsing via [UAParser.js](https://github.com/faisalman/ua-parser-js).

The `userAgent` service works in both browser & Fastboot environments and makes it easy to detect:

* **Device Type**
* **Device Model**
* **Browser**
* **Operating System**
* **Layout Engine**
* **CPU architecture**

## Installation

`ember install ember-useragent`

### Requirements

**Ember CLI >=2.9.0**

The shim for UAParser.js uses `app.import`'s new [AMD transformation](https://github.com/ember-cli/ember-cli/pull/5976) feature released in Ember CLI [2.9.0](https://github.com/ember-cli/ember-cli/blob/master/CHANGELOG.md#290).

## Usage

Ember UserAgent exposes a service, which can be injected into controllers, components and routes.

```javascript

const { get, inject: { service } } = Ember;

export default Ember.Component.extend({

  userAgent: service(),

  doSomeSortOfDetection() {
    const userAgent = get(this, 'userAgent');

    // Detect if browser is Chrome
    get(userAgent, 'browser.isChrome');

    // Detect if OS is Windows
    get(userAgent, 'os.isWindows');

    // Get all device info
    get(userAgent, 'device.info');
    // { model: 'iPhone 7', type: 'mobile', vendor: 'Apple'}

    // Same as above
    userAgent.getDevice();

  }

})

```

### Service Properties

The service exposes all of UAParser's functions, but also adds some properties for quick access.

| browser   | device    | engine   | os        | userAgent |
|-----------|-----------|----------|-----------|-----------|
| info      | info      | info     | info      |           |
| isChrome  | isConsole | isWebKit | isAndroid |           |
| isFirefox | isDesktop |          | isIOS     |           |
| isIE      | isMobile  |          | isLinux   |           |
| isSafari  | isTablet  |          | isMacOS   |           |
|           |           |          | isWindows |           |

## Using UAParser.js

For more information on how to use UAParser.js, please refer to the [documentation](https://github.com/faisalman/ua-parser-js#methods).
