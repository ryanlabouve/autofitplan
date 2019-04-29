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
    setupDefaultPrograms(this.server);
    startNewProgram(this.server);
    await authenticateSession();
    await visit('/');

    assert.dom('h2').hasText('Time to test your performance!');

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

    setupDefaultPrograms(this.server);
    startNewProgram(this.server);
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

    setupDefaultPrograms(this.server);
    startNewProgram(this.server);
    server.db.loggedSessions.update(1, {startedAt: new Date()});

    await authenticateSession();
    const {performanceTest} = startNewPerformanceTest(this.server);

    await visit(`/performance-tests/${performanceTest.id}`);

    await fillIn(
      '[data-test-performance-test-exercises]:first-child [data-test-exercise-weight]',
      200,
    );

    await click('[data-test-save-performance-test]');

    // TODO: why does this have to be 2?
    let lastLoggedExercise = server.db.loggedExercises[2];
    assert.equal(lastLoggedExercise.weight, 200);
    assert.equal(lastLoggedExercise.completed, true);
  });

  test('Can see a logged exercise for a performance test exercise', async function(assert) {
    assert.expect(0);
    // TODO
  });

  test('Can skip a logged exercise for a performance test exercise', async function(assert) {
    assert.expect(1);

    setupDefaultPrograms(this.server);
    startNewProgram(this.server);
    await authenticateSession();

    const {performanceTest} = startNewPerformanceTest(this.server);

    await visit(`/performance-tests/${performanceTest.id}`);

    await click('[data-test-skip-performance-test]');

    let lastLoggedExercise = server.db.loggedExercises[2];
    assert.equal(lastLoggedExercise.skipped, true);
  });

  test('Can fail a logged exercise for a performance test exercise', async function(assert) {
    assert.expect(1);

    setupDefaultPrograms(this.server);
    startNewProgram(this.server);
    await authenticateSession();

    const {performanceTest} = startNewPerformanceTest(this.server);

    await visit(`/performance-tests/${performanceTest.id}`);

    await click('[data-test-fail-performance-test]');

    let lastLoggedExercise = server.db.loggedExercises[2];
    assert.equal(lastLoggedExercise.failed, true);
  });
});
