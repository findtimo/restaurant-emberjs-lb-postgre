import { module, test } from 'qunit';
import { setupTest } from 'restaurant/tests/helpers';

module('Unit | Controller | login', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:login');
    assert.ok(controller);
  });
});
