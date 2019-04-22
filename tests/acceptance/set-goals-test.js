import {module, test} from 'qunit';
import {visit, currentURL, pauseTest, click} from '@ember/test-helpers';
import {setupApplicationTest} from 'ember-qunit';
import {authenticateSession} from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

import {
  setupDefaultPrograms,
  startNewProgram,
} from 'autofitplan/tests/helpers/program-creator';

module('Acceptance | set goals', function(hooks) {
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
    assert.expect(2);

    setupDefaultPrograms(this.server);
    startNewProgram(this.server);
    await authenticateSession();

    let performanceTest = server.create('performanceTest');

    server.createList('exercise', 4, {
      performanceTest,
    });

    await visit(`/performance-tests/${performanceTest.id}`);

    assert.dom('[data-test-performance-test-exercises]').exists({count: 4});

    await pauseTest();
  });
});
