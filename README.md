# Ember UserAgent

Ember UserAgent is an Ember Addon for UserAgent parsing via UAParser.js.

The `userAgent` service makes it easy to detect **device type**, **device model**, **browser**, **operating system**, **layout engine** and **CPU architecture** in both browser and Ember Fastboot environments:

## Installation

`ember install ember-useragent`

### Requirements

**Ember CLI >=2.9.0**

The shim for UAParser.js uses `app.import`'s new [AMD transformation](https://github.com/ember-cli/ember-cli/pull/5976) feature released in Ember CLI [2.9.0](https://github.com/ember-cli/ember-cli/blob/master/CHANGELOG.md#290).

## Usage

Ember UserAgent exposes a service, which can be injected into controllers, components and routes. The service exposes all of UAParser's functions, but also adds some properties for quick access.

```javascript

const { get, inject: { service } } = Ember;

export default Ember.Component.extend({

  userAgent: service(),

  doSomeSortOfDetection() {
    const userAgent = get(this, 'userAgent');

    // Detect if device is mobile quickly using Ember UserAgent's property
    get(userAgent, 'browser.isChrome');

    // Get all device info...
    get(userAgent, 'device.info');

    // Which is the same as...
    userAgent.getDevice();

  }

})

```

### Service Properties

* browser
  * info
  * isChrome
  * isFirefox
  * isIE
  * isSafari

* device
  * info
  * isConsole
  * isDesktop
  * isMobile
  * isTablet

* engine
  * info
  * isWebkit

* os
  * info
  * isAndroid
  * isIOS
  * isLinux
  * isMacOS
  * isWindows

## Using UAParser.js

For more information on how to use UAParser.js, please refer to the [documentation](https://github.com/faisalman/ua-parser-js#methods).
