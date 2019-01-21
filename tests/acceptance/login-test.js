import {module, test} from 'qunit';
import {visit, currentURL, click, fillIn, pauseTest} from '@ember/test-helpers';
import {setupApplicationTest} from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import {
  authenticateSession,
  invalidateSession,
} from 'ember-simple-auth/test-support';

module('Acceptance | login', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('already logged in', async function(assert) {
    await authenticateSession();
    await visit('/');
    assert.equal(currentURL(), '/');
  });

  test('not already logged in', async function(assert) {
    await invalidateSession();
    await visit('/');

    await click('[data-test-login-button]');
    assert.equal(currentURL(), '/login');

    await fillIn('[data-test-email]', 'mickey@mouse.clubhouse');
    await click('[data-test-login-button]');

    assert
      .dom('[data-test-login-success-message]')
      .hasText('Email sent to mickey@mouse.clubhouse');
  });

  test('smooshes with magic link token', async function(assert) {
    await invalidateSession();
    await visit('/token/hotdog');
    assert.equal(currentURL(), '/');
  });

  test('no smooshes with magic link and invalid token', async function(assert) {
    await invalidateSession();
    await visit('/token/nothotdog');
    assert.equal(currentURL(), '/login');
  });

  test('resolve token from previous session', async function(assert) {
    await invalidateSession();
    await visit('/token/hotdog');
    await visit('/');
    assert.equal(currentURL(), '/');
  });
});
