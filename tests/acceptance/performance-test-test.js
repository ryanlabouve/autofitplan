import {module, test} from 'qunit';
import {visit, currentURL, click, fillIn} from '@ember/test-helpers';
import {setupApplicationTest} from 'ember-qunit';
import {authenticateSession} from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

import {
  setupDefaultPrograms,
  startNewProgram,
  startNewPerformanceTest,
} from 'autofitplan/tests/helpers/program-creator';

module('Acceptance | performance test', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('Starting a new performance test', async function(assert) {
    await setupDefaultPrograms(this.server);
    await startNewProgram(this.server);

    server.db.profiles.update(1, {needsNewPerformanceTest: true});

    await visit('/');

    await click('[data-test-new-performance-test]');

    assert.equal(
      server.db.performanceTests.length,
      1,
      `Created a performance test from CTA`,
    );

    let performanceTest = server.db.performanceTests.lastObject;

    assert.equal(
      currentURL(),
      `/performance-tests/${performanceTest.id}`,
      'We have transitioned ot the new performance test',
    );
  });

  test('We can see a performance test in progress', async function(assert) {
    assert.expect(1);

    await setupDefaultPrograms(this.server);
    await startNewProgram(this.server);
    await authenticateSession();

    let performanceTest = server.create('performanceTest');

    server.createList('exercise', 4, {
      performanceTest,
    });

    await visit(`/performance-tests/${performanceTest.id}`);

    assert.dom('[data-test-performance-test-exercises]').exists({count: 4});
  });

  test('Can log an exercise for a performance test exercise', async function(assert) {
    assert.expect(2);

    server.logging = true;

    await setupDefaultPrograms(this.server);
    await startNewProgram(this.server);
    server.db.loggedSessions.update(1, {startedAt: new Date()});

    await authenticateSession();
    const {performanceTest} = startNewPerformanceTest(this.server);

    let id = performanceTest.loggedExercises.models.firstObject.id;

    await visit(`/performance-tests/${performanceTest.id}`);

    await fillIn(
      `[data-test-performance-test-exercise-id="${id}"] [data-test-exercise-weight]`,
      200,
    );

    await click('[data-test-save-performance-test]');

    let exercise = performanceTest.loggedExercises.models.firstObject;
    exercise.reload();
    assert.equal(exercise.attrs.weight, 200);
    assert.equal(exercise.attrs.completed, true);
  });

  test('Can see a logged exercise for a performance test exercise', async function(assert) {
    assert.expect(0);
    // TODO
  });

  test('Can skip a logged exercise for a performance test exercise', async function(assert) {
    assert.expect(1);

    await setupDefaultPrograms(this.server);
    await startNewProgram(this.server);
    await authenticateSession();

    const {performanceTest} = startNewPerformanceTest(this.server);

    let id = performanceTest.loggedExercises.models.firstObject.id;

    await visit(`/performance-tests/${performanceTest.id}`);

    await click(
      `[data-test-performance-test-exercise-id="${id}"] [data-test-skip-performance-test]`,
    );

    let exercise = performanceTest.loggedExercises.models.firstObject;
    exercise.reload();
    assert.equal(exercise.attrs.skipped, true);
  });

  test('Can fail a logged exercise for a performance test exercise', async function(assert) {
    assert.expect(1);

    await setupDefaultPrograms(this.server);
    await startNewProgram(this.server);
    await authenticateSession();

    const {performanceTest} = startNewPerformanceTest(this.server);

    let id = performanceTest.loggedExercises.models.firstObject.id;
    await visit(`/performance-tests/${performanceTest.id}`);

    await click(
      `[data-test-performance-test-exercise-id="${id}"] [data-test-fail-performance-test]`,
    );

    let exercise = performanceTest.loggedExercises.models.firstObject;
    exercise.reload();
    assert.equal(exercise.attrs.failed, true);
  });
});
