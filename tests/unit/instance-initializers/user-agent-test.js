import Application from '@ember/application';

import { initialize } from 'dummy/instance-initializers/user-agent';
import { module, test } from 'qunit';
import { run } from '@ember/runloop';
import { get } from '@ember/object';
import Service from '@ember/service';

module('Unit | Instance Initializer | user-agent', function(hooks) {
  hooks.beforeEach(function() {
    this.TestApplication = Application.extend();
    this.TestApplication.instanceInitializer({
      name: 'initializer under test',
      initialize
    });
    this.application = this.TestApplication.create({ autoboot: false });
    this.application.register('service:user-agent', Service.extend());
    this.instance = this.application.buildInstance();
    this.service = this.instance.lookup('service:user-agent');
  });
  hooks.afterEach(function() {
    run(this.application, 'destroy');
    run(this.instance, 'destroy');
  });

  // Replace this with your real tests.
  test('it works', async function(assert) {
    await this.instance.boot();

    assert.strictEqual(get(this.service, 'userAgent'), window.navigator.userAgent);
  });
});
