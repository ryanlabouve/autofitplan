import {module, test} from 'qunit';
import {visit, click} from '@ember/test-helpers';
import {setupApplicationTest} from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import {
  setupDefaultPrograms,
  startNewProgram,
} from 'autofitplan/tests/helpers/program-creator';

module('Acceptance | home screen | delete program', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('Delete a program', async function(assert) {
    await setupDefaultPrograms(this.server);
    let {loggedMacrocycle} = await startNewProgram(this.server);

    let _item = server.create('home-screen-item', {
      loggedMacrocycle,
    });

    await visit('/');

    assert.equal(server.db.loggedMacrocycles.length, 1);

    await click('[data-test-show-menu]');
    await click('[data-test-delete-logged-macrocycle]');
    await click('[data-test-confirm-delete-logged-macrocycle]');

    assert.equal(server.db.loggedMacrocycles.length, 0);
  });

  test('Archive a program', async function(assert) {
    await setupDefaultPrograms(this.server);
    let {loggedMacrocycle} = await startNewProgram(this.server);

    let _item = server.create('home-screen-item', {
      loggedMacrocycle,
    });

    await visit('/');

    assert.equal(loggedMacrocycle.archived, false);

    await click('[data-test-show-menu]');
    await click('[data-test-archive-logged-macrocycle]');
    await click('[data-test-confirm-archive-logged-macrocycle]');

    assert.equal(loggedMacrocycle.archived, true);
  });
});
