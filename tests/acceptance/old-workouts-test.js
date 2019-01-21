import {module, test} from 'qunit';
import {
  visit,
  currentURL,
  pauseTest,
  findAll,
  fillIn,
} from '@ember/test-helpers';
import {setupApplicationTest} from 'ember-qunit';
import {
  setupBasicProgram,
  logSomeSessions,
} from 'autofitplan/tests/helpers/program-creator';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

import {
  authenticateSession,
  invalidateSession,
} from 'ember-simple-auth/test-support';

module('Acceptance | old workouts', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /old-workouts', async function(assert) {
    authenticateSession();
    setupBasicProgram(server);
    setupBasicProgram(server);
    setupBasicProgram(server);
    logSomeSessions(server);

    await visit('/');

    let programSelector = await findAll('[data-test-programs]');
    let programToSelect = programSelector[0].options[1].value;

    await fillIn('[data-test-programs]', programToSelect);

    assert.equal(
      findAll('[data-test-moves-hidden]').length,
      3,
      'Collapse workouts already done',
    );
  });
});
