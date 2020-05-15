import { module, test } from 'qunit';
import { setup, visit } from 'ember-cli-fastboot-testing/test-support';

module('FastBoot | index', function(hooks) {
  setup(hooks);

  test('it renders', async function(assert) {
    await visit('/', {
      headers: {
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome Safari/537.36'
      }
    });

    assert.dom('.user-agent').hasText('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome Safari/537.36');
    assert.dom('.browser').hasText('Chrome Headless');
    assert.dom('.device-type').hasText('Desktop');
    assert.dom('.device-model').hasText('');
    assert.dom('.engine').hasText('WebKit');
    assert.dom('.os').hasText('Linux');
  });
});
