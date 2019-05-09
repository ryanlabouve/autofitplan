import {module, test} from 'qunit';
import {visit, click} from '@ember/test-helpers';
import {setupApplicationTest} from 'ember-qunit';
import {
  setupDefaultPrograms,
  startNewProgram,
} from 'autofitplan/tests/helpers/program-creator';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Acceptance | move history test', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('An exercise with no history', async function(assert) {
    await setupDefaultPrograms(this.server);
    let {firstLoggedSession} = await startNewProgram(this.server);

    await visit(`/logged-sessions/${firstLoggedSession.id}`);

    assert
      .dom('[data-test-move-history]')
      .hasText('View Leg-press Variation history');
    await click('[data-test-move-history]');
    assert.dom('[data-test-no-move-history-found]').exists();
  });

  test('An exercise with history', async function(assert) {
    await setupDefaultPrograms(this.server);
    let {firstLoggedSession, loggedSessions} = await startNewProgram(
      this.server,
    );

    let firstLoggedExercise = server.schema.loggedExercises.find(1);

    firstLoggedExercise.createLoggedExerciseHistory({
      name: 'Hack Squat',
      weight: 200,
      completed: true,
      exercise: firstLoggedExercise.exercise,
      loggedSession: loggedSessions[1],
    });

    firstLoggedExercise.createLoggedExerciseHistory({
      name: 'Hack Squat',
      weight: 205,
      completed: true,
      exercise: firstLoggedExercise.exercise,
      loggedSession: loggedSessions[2],
    });

    firstLoggedExercise.createLoggedExerciseHistory({
      name: 'Hack Squat',
      weight: 210,
      completed: true,
      exercise: firstLoggedExercise.exercise,
      loggedSession: loggedSessions[3],
    });

    await visit(`/logged-sessions/${firstLoggedSession.id}`);

    assert
      .dom('[data-test-move-history]')
      .hasText('View Leg-press Variation history');
    await click('[data-test-move-history]');
    assert.dom('[data-test-move-histories]').exists({count: 3});
  });
});
