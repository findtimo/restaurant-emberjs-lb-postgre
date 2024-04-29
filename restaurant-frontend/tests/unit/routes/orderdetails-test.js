import { module, test } from 'qunit';
import { setupTest } from 'restaurant/tests/helpers';

module('Unit | Route | orderdetails', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:orderdetails');
    assert.ok(route);
  });
});
