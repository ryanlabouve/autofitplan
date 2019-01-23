import {module, test} from 'qunit';
import {visit, currentURL, pauseTest} from '@ember/test-helpers';
import {setupApplicationTest} from 'ember-qunit';
import {authenticateSession} from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Acceptance | happier path', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /happier-path', async function(assert) {
    await authenticateSession();
    await visit('/');
    await pauseTest();

    assert.equal(currentURL(), '/');
  });
});
