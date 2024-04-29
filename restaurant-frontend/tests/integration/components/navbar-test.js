import { module, test } from 'qunit';
import { setupRenderingTest } from 'restaurant/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | navbar', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Navbar />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <Navbar>
        template block text
      </Navbar>
    `);

    assert.dom().hasText('template block text');
  });
});
