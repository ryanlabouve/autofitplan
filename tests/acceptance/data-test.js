import {module, test} from 'qunit';
import {visit, currentURL} from '@ember/test-helpers';
import {setupApplicationTest} from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Acceptance | data', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('Basic setup of mirage data', async function(assert) {
    let user = server.create('user', {
      name: 'ryan',
    });

    // plan
    let macrocycle = server.create('macrocycle', {
      user,
    });

    // block
    let mesocycle = server.create('mesocycle', {
      macrocycle,
    });

    // week
    let microcycle = server.create('microcycle', {
      mesocycle,
    });

    // session, workout
    let sessionMonday = server.create('session', {
      name: 'Day 1, Lower',
      microcycle,
    });

    server.create('exercise', {
      session: sessionMonday,
      code: 'lp_variant',
      sets: 3,
      repsLow: 5,
      repsHigh: 8,
      percentRM: 80,
      rpe: 8,
    });

    let code =
      user.macrocycles.models[0].mesocycles.models[0].microcycles.models[0]
        .sessions.models[0].exercises.models[0].code;
    assert.equal(code, 'lp_variant');
  });
});
