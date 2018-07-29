import Application from '@ember/application';
import { run } from '@ember/runloop';

import { initialize } from 'dummy/initializers/user-agent';
import { module, test } from 'qunit';

module('Unit | Initializer | user-agent', function(hooks) {
  hooks.beforeEach(function() {
    run(() => {
      this.application = Application.create();
      this.application.deferReadiness();
    });
  });

  hooks.afterEach(function() {
    run(this.application, 'destroy');
  });

  // Replace this with your real tests.
  test('it works', function(assert) {
    initialize(this.application);

    // you would normally confirm the results of the initializer here
    assert.ok(true);
  });
});
