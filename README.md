Ember UserAgent ![Download count all time](https://img.shields.io/npm/dt/ember-useragent.svg) [![npm](https://img.shields.io/npm/v/ember-useragent.svg)](https://www.npmjs.com/package/ember-useragent)
======

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

Ember UserAgent exposes a service, which is automatically injected into controllers, components and routes.

```javascript
const userAgent = this.get('userAgent');

userAgent.get('browser.isChrome'); // Boolean
userAgent.get('engine.isWebKit'); // Boolean
userAgent.get('os.info'); // => { name: 'Ubuntu', version: '11.10' }
userAgent.getDevice(); // => { model: 'iPhone 7', type: 'mobile', vendor: 'Apple'}

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

### Injection

By default, this addon will generate an initializer in `app/initializers/user-agent.js` that injects the `userAgent` service app-wide. If the `userAgent` property conflicts with other addons or you wish to use manual injection (`Ember.service.inject`) you can override this file.

## Using UAParser.js

For more information on how to use UAParser.js, please refer to the [documentation](https://github.com/faisalman/ua-parser-js#methods).
