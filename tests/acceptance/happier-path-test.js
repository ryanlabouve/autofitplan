import {module, test} from 'qunit';
import {visit, currentURL, pauseTest, click} from '@ember/test-helpers';
import {setupApplicationTest} from 'ember-qunit';
import {authenticateSession} from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

import {
  setupDefaultPrograms,
  startNewProgram,
} from 'autofitplan/tests/helpers/program-creator';

module('Acceptance | happier path', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('Starting a new program', async function(assert) {
    setupDefaultPrograms(this.server);
    startNewProgram(this.server);
    await authenticateSession();
    await visit('/');
    await click('[data-test-new-program-button]');

    await pauseTest();
    assert.equal(currentURL(), '/new-program');
  });
});
