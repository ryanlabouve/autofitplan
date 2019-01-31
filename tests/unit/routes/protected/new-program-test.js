import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | protected/new-program', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:protected/new-program');
    assert.ok(route);
  });
});
