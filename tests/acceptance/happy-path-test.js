import {module, test} from 'qunit';
import {
  visit,
  fillIn,
  currentURL,
  pauseTest,
  findAll,
  click,
} from '@ember/test-helpers';
import {setupApplicationTest} from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import moment from 'moment';
import {setupDefaultPrograms} from 'autofitplan/tests/helpers/program-creator';
import {
  authenticateSession,
  invalidateSession,
} from 'ember-simple-auth/test-support';

module('Acceptance | happy path', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('Can switch programs', async function(assert) {
    await authenticateSession();
    setupDefaultPrograms(this.server);
    await visit('/');

    await fillIn('[data-test-programs]', 'ryans-program');
    assert.equal(currentURL(), '/program/ryans-program');

    await fillIn('[data-test-programs]', 'robyns-program');
    assert.equal(currentURL(), '/program/robyns-program');
  });

  test('We can navigate directly to a program', async function(assert) {
    await authenticateSession();
    setupDefaultPrograms(this.server);
    await visit('/program/robyns-program');
    assert.dom('[data-test-programs]').hasValue('robyns-program');
  });

  test('Can see the program', async function(assert) {
    await authenticateSession();
    setupDefaultPrograms(this.server);
    await visit('/program/ryans-program');

    assert.dom('[data-test-program-name]').hasText(`Ryan's Program`);
  });

  test('Can start a workout', async function(assert) {
    await authenticateSession();
    setupDefaultPrograms(this.server);
    await visit('/program/ryans-program');
    let session = findAll('[data-test-session]');
    let startSessionButton = session[0].querySelector(
      '[data-test-start-session-button]',
    );
    await click(startSessionButton);
    assert.equal(this.server.db.loggedSessions.length, 1);
    assert.equal(this.server.db.loggedSessions[0].sessionId, 1);

    let endSessionButton = session[0].querySelectorAll(
      '[data-test-end-session-button]',
    );

    assert.equal(endSessionButton.length, 1);
  });

  test('Can see worouts that have already been started', async function(assert) {
    await authenticateSession();
    let {sessionMonday, exerciseForSessionMonday} = setupDefaultPrograms(
      this.server,
    );

    let loggedSession = this.server.create('loggedSession', {
      session: sessionMonday,
      week: 1,
      startTime: moment(),
    });

    server.create('loggedExercise', {
      loggedSession,
      exercise: exerciseForSessionMonday,
      weight: 100,
    });

    await visit('/program/ryans-program');

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
    await visit('/program/ryans-program');
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
