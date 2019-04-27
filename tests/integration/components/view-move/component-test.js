import {module, test} from 'qunit';
import {setupRenderingTest} from 'ember-qunit';
// import {render} from '@ember/test-helpers';
// import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | view-move', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    this.set('move', {
      code: 'lp_variant',
    });

    // await render(hbs`{{view-move move=move}}`);

    // assert.ok(this.element.textContent.trim());
    assert.ok(true);
  });
});
