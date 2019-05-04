import {module, test} from 'qunit';
import {visit, click, currentURL, pauseTest} from '@ember/test-helpers';
import {setupApplicationTest} from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import {
  setupDefaultPrograms,
  startNewProgram,
} from 'autofitplan/tests/helpers/program-creator';

module('Acceptance | home screen test', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('Can start a new program', async function(assert) {
    await setupDefaultPrograms(this.server);

    server.db.profiles.update(1, {needsNewProgram: true});
    await visit(`/`);

    await click('[data-test-new-program-button]');

    await click('[data-test-start-program]');

    let {loggedMacrocycles} = server.db;
    assert.equal(loggedMacrocycles.length, 1, 'created a new macrocycle');

    let loggedMacrocycle = loggedMacrocycles[0];
    assert.equal(
      loggedMacrocycle.macrocycleId,
      1,
      'belongs to the correct macrocycle',
    );

    assert.equal(
      currentURL(),
      `/program/${loggedMacrocycle.id}`,
      'redirect to the program after created',
    );
  });

  test('doesnt ask to start new program when not necesssary', async function(assert) {
    await setupDefaultPrograms(this.server);

    server.db.profiles.update(1, {needsNewProgram: false});
    await visit(`/`);
    await assert.dom('[data-test-new-program-button]').doesNotExist();
  });

  test('doesnt ask to start new performance test when not necesssary', async function(assert) {
    await setupDefaultPrograms(this.server);

    server.db.profiles.update(1, {needsNewPerformanceTest: false});
    await visit(`/`);
    await assert.dom('[data-test-new-performance-test]').doesNotExist();
  });

  test('We can see programs on the home screen', async function(assert) {
    await setupDefaultPrograms(this.server);

    let {loggedMacrocycle} = await startNewProgram(this.server);

    let item = server.create('home-screen-item', {
      loggedMacrocycle,
    });

    await visit(`/`);

    await assert.dom('[data-test-home-screen-items]').exists();
    await assert.dom('[data-test-home-screen-item]').exists({count: 1});
    await click('[data-test-go-to-program]');

    assert.equal(
      currentURL(),
      `/program/${loggedMacrocycle.id}`,
      'We land on the correct program URL',
    );
  });

  test('We can see performance tests on the home screen', async function(assert) {
    await setupDefaultPrograms(this.server);
    await startNewProgram(this.server);

    let performanceTest = server.create('performanceTest');

    server.createList('exercise', 4, {
      performanceTest,
    });

    let item = server.create('home-screen-item', {
      performanceTest,
    });

    await visit(`/`);

    await assert.dom('[data-test-home-screen-items]').exists();
    await assert.dom('[data-test-home-screen-item]').exists({count: 1});
    await click('[data-test-go-to-performance-test]');

    assert.equal(
      currentURL(),
      `/performance-tests/${performanceTest.id}`,
      'We land on the correct performance test URL',
    );
  });
});
