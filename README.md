Ember UserAgent [![Build Status](https://travis-ci.org/willviles/ember-useragent.svg)](https://travis-ci.org/willviles/ember-useragent) [![Ember Observer Score](http://emberobserver.com/badges/ember-useragent.svg)](http://emberobserver.com/addons/ember-useragent) ![Download count all time](https://img.shields.io/npm/dt/ember-useragent.svg) [![npm](https://img.shields.io/npm/v/ember-useragent.svg)](https://www.npmjs.com/package/ember-useragent)
======

Ember UserAgent is an Ember Addon for UserAgent parsing via [UAParser.js](https://github.com/faisalman/ua-parser-js).

The `userAgent` service works in both browser & Fastboot environments and makes it easy to detect:

* **Device Type**
* **Device Model**
* **Browser**
* **Operating System**
* **Layout Engine**
* **CPU architecture**

Installation
------------------------------------------------------------------------------

```
ember install ember-useragent
```

### Requirements

**Fastboot**

Should you be using Fastboot in your application, Ember UserAgent >=0.2.0 requires Ember CLI Fastboot >=1.0.0.

You must add `ua-parser-js` in your fastboot dependencies whitelist.

```json
// package.json
...
"fastbootDependencies": [
  "ua-parser-js"
],
```

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

| browser          | device    | engine   | os        | userAgent |
|------------------|-----------|----------|-----------|-----------|
| info             | info      | info     | info      |           |
| isChrome         | isConsole | isWebKit | isAndroid |           |
| isChromeHeadless | isDesktop |          | isIOS     |           |
| isEdge           | isMobile  |          | isLinux   |           |
| isFirefox        | isTablet  |          | isMacOS   |           |
| isIE             |           |          | isWindows |           |
| isSafari         |           |          | isWindows |           |

### Manual Usage

There aren't many use cases for using it manually, but Ember UserAgent shims UAParser.js into your application. Access it in one of two ways.

Module import:

```js
import UAParser from 'ua-parser-js';
```

Or from the service:

```js
{
  userAgent: service(),
  UAParser: alias('userAgent.UAParser')
}
```

### Injection

By default, this addon will generate an initializer in `app/initializers/user-agent.js` that injects the `userAgent` service app-wide. If the `userAgent` property conflicts with other addons or you wish to use manual injection (`Ember.service.inject`) you can override this file.

## Using UAParser.js

For more information on how to use UAParser.js, please refer to the [documentation](https://github.com/faisalman/ua-parser-js#methods).
