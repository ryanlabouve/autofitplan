import {module, test} from 'qunit';
import {visit, fillIn, currentURL, pauseTest} from '@ember/test-helpers';
import {setupApplicationTest} from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

let setupDefaultPrograms = server => {
  let user = server.create('user', {
    name: 'ryan',
  });

  let macrocycle = server.create('macrocycle', {
    user,
    name: "Ryan's Program",
    slug: 'ryans-program',
  });

  let mesocycle = server.create('mesocycle', {
    macrocycle,
  });

  let microcycle = server.create('microcycle', {
    mesocycle,
  });

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

  let macrocycle2 = server.create('macrocycle', {
    user,
    name: "Robyn's Program",
    slug: 'robyns-program',
  });

  let mesocycle2 = server.create('mesocycle', {
    macrocycle,
  });

  let microcycle2 = server.create('microcycle', {
    mesocycle,
  });

  let sessionMonday2 = server.create('session', {
    name: 'Day 1, Lower (second)',
    microcycle: microcycle2,
  });

  server.create('exercise', {
    session: sessionMonday2,
    code: 'lp_variant',
    sets: 3,
    repsLow: 5,
    repsHigh: 8,
    percentRM: 80,
    rpe: 8,
  });
};

module('Acceptance | happy path', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('Can switch programs', async function(assert) {
    setupDefaultPrograms(this.server);
    await visit('/');

    await fillIn('[data-test-programs]', 'ryans-program');
    assert.equal(currentURL(), '/program/ryans-program');

    await fillIn('[data-test-programs]', 'robyns-program');
    assert.equal(currentURL(), '/program/robyns-program');
  });

  test('No program is loaded by default', async function(assert) {
    setupDefaultPrograms(this.server);
    await visit('/');
    assert.dom('[data-test-programs]').hasValue('');
  });

  test('We can navigate directly to a program', async function(assert) {
    setupDefaultPrograms(this.server);
    await visit('/program/robyns-program');
    assert.dom('[data-test-programs]').hasValue('robyns-program');
  });

  test('Can see the program', async function(assert) {
    setupDefaultPrograms(this.server);
    await visit('/program/ryans-program');

    assert.dom('[data-test-program-name]').hasText(`Ryan's Program`);
  });

  test('Can start a workout', async function(assert) {
    setupDefaultPrograms(this.server);
    await visit('/program/ryans-program');
    await pauseTest();
  });
});
