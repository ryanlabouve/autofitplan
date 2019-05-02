import {module, test} from 'qunit';
import {visit, click} from '@ember/test-helpers';
import {setupApplicationTest} from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import {setupDefaultPrograms} from 'autofitplan/tests/helpers/program-creator';

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
});
