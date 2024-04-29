import { module, test } from 'qunit';
import { setupTest } from 'restaurant/tests/helpers';

module('Unit | Route | history', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:history');
    assert.ok(route);
  });
});
