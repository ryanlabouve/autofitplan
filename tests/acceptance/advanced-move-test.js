import {module, test} from 'qunit';
import {visit, click, pauseTest} from '@ember/test-helpers';
import {setupApplicationTest} from 'ember-qunit';
import {
  setupDefaultPrograms,
  startNewProgram,
} from 'autofitplan/tests/helpers/program-creator';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Acceptance | move history test', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('Can see advanced set information', async function(assert) {
    await setupDefaultPrograms(this.server);
    let {firstLoggedSession} = await startNewProgram(this.server);

    await visit(`/logged-sessions/${firstLoggedSession.id}`);

    await click('[data-test-expand-advanced]');
    assert.dom('[data-test-advanced-option]').exists({count: 2});
  });
});
