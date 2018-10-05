import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { set } from '@ember/object';

module('Integration | Helper | user-agent', function(hooks) {
  setupRenderingTest(hooks);

  test('it proxies to the user agent service', async function(assert) {
    const service = this.owner.lookup('service:user-agent');
    set(service, 'userAgent', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome Safari/537.36');

    await render(hbs`{{#if (user-agent "browser.isChromeHeadless")}}isChromeHeadless{{/if}}`);
    assert.equal(this.element.textContent.trim(), 'isChromeHeadless');

    await render(hbs`{{#if (user-agent "browser.isEdge")}}isEdge{{/if}}`);
    assert.equal(this.element.textContent.trim(), '');
  });
});
