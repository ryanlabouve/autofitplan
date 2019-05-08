import {module, test} from 'qunit';
import {visit, findAll, fillIn, click, pauseTest} from '@ember/test-helpers';
import {setupApplicationTest} from 'ember-qunit';
import {
  setupDefaultPrograms,
  startNewProgram,
  setupBasicProgram,
  logSomeSessions,
} from 'autofitplan/tests/helpers/program-creator';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Acceptance | session ux test', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  // TODO
  test('collapsing workouts', async function(assert) {
    await setupDefaultPrograms(this.server);
    let {firstLoggedSession} = await startNewProgram(this.server);
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

  test('Marking an exercise as completed, skipped, or failed', async function(assert) {
    await setupDefaultPrograms(this.server);
    let {firstLoggedSession} = await startNewProgram(this.server);
    let firstLoggedExerciseId = firstLoggedSession.loggedExerciseIds[0];

    await visit(`/logged-sessions/${firstLoggedSession.id}`);
    await click('[data-test-dot-dot-dot]');
    await click('[data-test-dot-dot-complete]');

    assert.equal(
      server.schema.find('loggedExercise', 1).completed,
      true,
      'The first exercise is now marked as completed',
    );

    await click('[data-test-dot-dot-dot]');
    await click('[data-test-dot-dot-fail]');

    assert.equal(
      server.schema.find('loggedExercise', 1).failed,
      true,
      'The first exercise is now marked as completed',
    );

    await click('[data-test-dot-dot-dot]');
    await click('[data-test-dot-dot-skip]');

    assert.equal(
      server.schema.find('loggedExercise', 1).skipped,
      true,
      'The first exercise is now marked as completed',
    );
  });
});
