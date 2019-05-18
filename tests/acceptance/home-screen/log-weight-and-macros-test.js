import {module, test} from 'qunit';
import {visit, click, currentURL, fillIn} from '@ember/test-helpers';
import {setupApplicationTest} from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import {
  setupDefaultPrograms,
  startNewProgram,
} from 'autofitplan/tests/helpers/program-creator';

module('Acceptance | home screen | log weight test', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('Can log weight for a day (with no daily measurement created yet)', async function(assert) {
    await setupDefaultPrograms(this.server);
    await startNewProgram(this.server);

    let _item = server.create('home-screen-item', {
      duty: 'log-weight',
    });

    await visit('/');
    await assert
      .dom('[data-test-home-screen-item="log-weight"]')
      .exists({count: 1});

    await fillIn('[data-test-input-weight]', 230);
    await click('[data-test-log-weight]');

    assert.equal(server.db.dailyMeasurements.length, 1);
    assert.equal(server.db.dailyMeasurements.lastObject.weight, 230);
  });

  test('Can log weight for a day (with daily measurement already created)', async function(assert) {
    await setupDefaultPrograms(this.server);
    await startNewProgram(this.server);

    let dailyMeasurement = server.create('daily-measurement', {
      weight: 155,
    });

    let _item = server.create('home-screen-item', {
      duty: 'log-weight',
      dailyMeasurement,
    });

    await visit('/');
    await assert
      .dom('[data-test-home-screen-item="log-weight"]')
      .exists({count: 1});

    assert.dom('[data-test-input-weight]').hasValue('155.00');
    assert.dom('[data-test-logged-weight]').exists();

    await fillIn('[data-test-input-weight]', 154);
    await click('[data-test-log-weight]');

    assert.equal(server.db.dailyMeasurements.length, 1);
    dailyMeasurement.reload();
    assert.equal(dailyMeasurement.weight, 154);
  });

  test('Can log carb, fat, protein for a day (with no daily measurement created yet)', async function(assert) {
    await setupDefaultPrograms(this.server);
    await startNewProgram(this.server);

    let _item = server.create('home-screen-item', {
      duty: 'log-macros',
    });

    await visit('/');
    await assert
      .dom('[data-test-home-screen-item="log-macros"]')
      .exists({count: 1});

    await fillIn('[data-test-input-carb]', 200.0);
    await fillIn('[data-test-input-fat]', 80.0);
    await fillIn('[data-test-input-protein]', 190.0);

    await click('[data-test-log-macros]');

    assert.equal(server.db.dailyMeasurements.length, 1);
    assert.equal(server.db.dailyMeasurements.lastObject.carb, 200.0);
    assert.equal(server.db.dailyMeasurements.lastObject.fat, 80.0);
    assert.equal(server.db.dailyMeasurements.lastObject.protein, 190.0);
  });

  test('Can log macros for a day (with no daily measurement already created)', async function(assert) {
    await setupDefaultPrograms(this.server);
    await startNewProgram(this.server);

    let dailyMeasurement = server.create('daily-measurement', {
      carb: 300.0,
      fat: 100.0,
      protein: 180.0,
    });

    let _item = server.create('home-screen-item', {
      duty: 'log-macros',
      dailyMeasurement,
    });

    await visit('/');
    await assert
      .dom('[data-test-home-screen-item="log-macros"]')
      .exists({count: 1});

    assert.dom('[data-test-input-carb]').hasValue('300');
    assert.dom('[data-test-input-fat]').hasValue('100');
    assert.dom('[data-test-input-protein]').hasValue('180');

    await fillIn('[data-test-input-carb]', 330.0);
    await fillIn('[data-test-input-fat]', 120.0);
    await fillIn('[data-test-input-protein]', 220.0);

    await click('[data-test-log-macros]');

    assert.equal(server.db.dailyMeasurements.length, 1);
    dailyMeasurement.reload();
    assert.equal(dailyMeasurement.carb, 330.0);
    assert.equal(dailyMeasurement.fat, 120.0);
    assert.equal(dailyMeasurement.protein, 220.0);
  });
});
