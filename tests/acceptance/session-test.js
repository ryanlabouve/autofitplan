import {module, test} from 'qunit';
import {visit, fillIn, findAll, click} from '@ember/test-helpers';
import {setupApplicationTest} from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import {
  setupDefaultPrograms,
  startNewProgram,
} from 'autofitplan/tests/helpers/program-creator';

import {authenticateSession} from 'ember-simple-auth/test-support';

module('Acceptance | session test', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('Can start a workout', async function(assert) {
    await authenticateSession();
    setupDefaultPrograms(this.server);
    let {loggedMacrocycle} = startNewProgram(this.server);

    await visit(`/program/${loggedMacrocycle.id}`);
    let session = findAll('[data-test-session]');
    let startSessionButton = session[0].querySelector(
      '[data-test-start-session-button]',
    );

    await click(startSessionButton);
    assert.ok(
      server.db.loggedSessions.firstObject.startedAt,
      'We started the session',
    );

    let endSessionButton = session[0].querySelectorAll(
      '[data-test-end-session-button]',
    );

    assert.equal(endSessionButton.length, 1);
  });

  test('Can see worouts that have already been started', async function(assert) {
    await authenticateSession();

    setupDefaultPrograms(this.server);
    let {loggedMacrocycle} = startNewProgram(this.server);

    server.db.loggedSessions.update(1, {startedAt: new Date()});
    server.db.loggedExercises.update(1, {weight: 100});

    await visit(`/program/${loggedMacrocycle.id}`);

    let session = findAll('[data-test-session]');
    let endSessionButton = session[0].querySelectorAll(
      '[data-test-end-session-button]',
    );

    assert.equal(
      endSessionButton.length,
      1,
      'since the session has been started, we see a button to end the session',
    );

    assert.equal(
      findAll('[data-test-end-session-button]').length,
      1,
      'And there are no other stray end buttons on the screen',
    );
  });

  test('Does a workout', async function(assert) {
    await authenticateSession();
    setupDefaultPrograms(this.server);
    let {loggedMacrocycle} = startNewProgram(this.server);

    await visit(`/program/${loggedMacrocycle.id}`);
    let firstSession = findAll('[data-test-session]')[0];
    let startSessionButton = firstSession.querySelector(
      '[data-test-start-session-button]',
    );
    await click(startSessionButton);

    let weightInput = firstSession.querySelectorAll(
      '[data-test-exercise-weight]',
    )[0];

    await fillIn(weightInput, 224);

    assert.equal(server.db.loggedExercises[0].weight, 224, 'Saved weight');
  });
});
