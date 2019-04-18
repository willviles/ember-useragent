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


Compatibility
------------------------------------------------------------------------------

* Ember.js v2.18 or above
* Ember CLI v2.13 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-useragent
```

## Usage

Ember UserAgent exposes a (1) service, which is automatically injected into controllers, components and routes, and a (2) template helper.

### Service

```javascript
const userAgent = this.get('userAgent');

userAgent.get('browser.isChrome'); // Boolean
userAgent.get('engine.isWebKit'); // Boolean
userAgent.get('os.info'); // => { name: 'Ubuntu', version: '11.10' }
userAgent.get('device.info'); // => { model: 'iPhone 7', type: 'mobile', vendor: 'Apple'}
```

### Helper

```handlebars
{{#if (user-agent "browser.isChrome")}}
  Chrome, here...
{{/if}}
```

### Service Properties

The service exposes all of UAParser's functions, but also adds some properties for quick access.

| browser          | device    | engine   | os        | cpu          |
|------------------|-----------|----------|-----------|--------------|
| info             | info      | info     | info      | architecture |
| isChrome         | isConsole | isWebKit | isAndroid |              |
| isChromeHeadless | isDesktop |          | isIOS     |              |
| isEdge           | isMobile  |          | isLinux   |              |
| isFirefox        | isTablet  |          | isMacOS   |              |
| isIE             |           |          | isWindows |              |
| isSafari         |           |          |           |              |

The service also exposes the `userAgent` property, which contains the user agent string.
You can overwrite this property, if you want to force a certain user agent string.
All of the properties described above will update in accordance.

### Manual Usage

Ember UserAgent auto imports `ua-parser-js` into your application using [ember-auto-import](https://github.com/ef4/ember-auto-import):

```js
import UAParser from 'ua-parser-js';
```

### Injection

By default, this addon will generate an initializer in `app/initializers/user-agent.js` that injects the `userAgent` service app-wide. If the `userAgent` property conflicts with other addons or you wish to use manual injection (`Ember.service.inject`) you can override this file.

## Using UAParser.js

For more information on how to use UAParser.js, please refer to the [documentation](https://github.com/faisalman/ua-parser-js#methods).
