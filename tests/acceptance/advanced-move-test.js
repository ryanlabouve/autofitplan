import {module, test} from 'qunit';
import {visit, click, pauseTest} from '@ember/test-helpers';
import {setupApplicationTest} from 'ember-qunit';
import {
  setupDefaultPrograms,
  startNewProgram,
} from 'autofitplan/tests/helpers/program-creator';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Acceptance | move history test', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('Can see advanced toggle', async function(assert) {
    await setupDefaultPrograms(this.server);
    let {firstLoggedSession} = await startNewProgram(this.server);

    await visit(`/logged-sessions/${firstLoggedSession.id}`);

    await click('[data-test-expand-advanced]');
    assert.dom('[data-test-advanced-option]').exists({count: 2});
  });

  test('Can see set information', async function(assert) {
    await setupDefaultPrograms(this.server);
    let {firstLoggedSession} = await startNewProgram(this.server);

    await visit(`/logged-sessions/${firstLoggedSession.id}`);

    await click('[data-test-expand-advanced]');
    await click('[data-test-set-information]');

    let firstExercise = firstLoggedSession.loggedExercises.models[0].exercise;
    assert.dom('[data-test-set]').exists({count: firstExercise.sets});
  });

  test('Load in default set information', async function(assert) {
    await setupDefaultPrograms(this.server);
    let {firstLoggedSession} = await startNewProgram(this.server);
    // TODO: How can we express this better?
    let firstLoggedExercise = firstLoggedSession.loggedExercises.models[0];

    let {weight} = firstLoggedExercise;
    let firstExercise = firstLoggedExercise.exercise;
    let {repsLow, repsHigh, rpe} = firstExercise;

    await visit(`/logged-sessions/${firstLoggedSession.id}`);

    await click('[data-test-expand-advanced]');
    await click('[data-test-set-information]');

    assert.dom('[data-test-set-weight]').hasText(`${weight}`);
    assert.dom('[data-test-set-reps-low]').hasText(`${repsLow}`);
    assert.dom('[data-test-set-reps-high]').hasText(`${repsHigh}`);
    assert.dom('[data-test-set-rpe]').hasText(`${rpe}`);

    // amrap, distance
  });

  test('Can edit weight --rl', async function(assert) {
    await setupDefaultPrograms(this.server);
    let {firstLoggedSession} = await startNewProgram(this.server);
    let firstLoggedExercise = firstLoggedSession.loggedExercises.models[0];
    let {weight} = firstLoggedExercise;

    await visit(`/logged-sessions/${firstLoggedSession.id}`);

    await click('[data-test-expand-advanced]');
    await click('[data-test-set-information]');

    assert
      .dom('[data-test-view-set="1"] [data-test-set-weight]')
      .hasText(`${weight}`);

    await click('[data-test-view-set="1"] [data-test-set-weight]');
    assert.dom('[data-test-edit-weight="1"]').exists();

    await click('[data-test-edit-weight="1"] [data-test-subtract-pound]');
    await click('[data-test-edit-weight="1"] [data-test-subtract-pound]');
    await click('[data-test-edit-weight="1"] [data-test-subtract-pound]');

    assert
      .dom('[data-test-view-set="1"] [data-test-set-weight]')
      .hasText(`${weight - 3}`);
    assert.equal(server.db.loggedSets.find(1).weight, weight - 3);

    await click('[data-test-edit-weight="1"] [data-test-add-pound]');
    await click('[data-test-edit-weight="1"] [data-test-add-pound]');
    await click('[data-test-edit-weight="1"] [data-test-add-pound]');
    await click('[data-test-edit-weight="1"] [data-test-add-pound]');
    await click('[data-test-edit-weight="1"] [data-test-add-pound]');
    await click('[data-test-edit-weight="1"] [data-test-add-pound]');

    assert
      .dom('[data-test-view-set="1"] [data-test-set-weight]')
      .hasText(`${weight + 3}`);
    assert.equal(server.db.loggedSets.find(1).weight, weight + 3);
  });

  // test('Can edit rep range' async function(assert){
  // test('Can edit when single rep range' async function(assert){
  // test('Can edit amrap total' async function(assert){
  // test('Can edit distance' async function(assert){
  // TODO: amrap, distance
});
