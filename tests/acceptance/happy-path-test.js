import {module, test} from 'qunit';
import {visit, fillIn, currentURL, pauseTest} from '@ember/test-helpers';
import {setupApplicationTest} from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Acceptance | happy path', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('Can switch programs', async function(assert) {
    await visit('/');

    await fillIn('[data-test-programs]', 'ryans-program');
    assert.equal(currentURL(), '/program/ryans-program');

    await fillIn('[data-test-programs]', 'robyns-program');
    assert.equal(currentURL(), '/program/robyns-program');
  });

  test('No program is loaded by default', async function(assert) {
    await visit('/');
    assert.dom('[data-test-programs]').hasValue('');
  });

  test('We can navigate directly to a program', async function(assert) {
    await visit('/program/robyns-program');
    assert.dom('[data-test-programs]').hasValue('robyns-program');
  });

  test('Can see the program', async function(assert) {
    await visit('/program/ryans-program');

    assert.dom('[data-test-program-name]').hasText(`Ryan's Program`);
  });
});
