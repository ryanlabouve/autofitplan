import {module, test} from 'qunit';
import {visit, currentURL, click, fillIn, pauseTest} from '@ember/test-helpers';
import {setupApplicationTest} from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import {
  authenticateSession,
  invalidateSession,
  currentSession,
} from 'ember-simple-auth/test-support';
import {setupDefaultPrograms} from 'autofitplan/tests/helpers/program-creator';

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

  test('logout', async function(assert) {
    await authenticateSession();
    await visit('/');
    await click('[data-test-nav]');
    await click('[data-test-logout]');
    assert.equal(currentSession().isAuthenticated, false);
    assert.equal(currentURL(), '/login');
  });

  test('logout button is not there when logged out', async function(assert) {
    await invalidateSession();
    await visit('/');
    await click('[data-test-nav]');
    assert.dom('[data-test-logout]').doesNotExist();
  });

  test('me', async function(assert) {
    await authenticateSession();

    server.create('user', {
      email: 'test@user.com',
    });

    // need to create user first
    await currentSession().set('data', {
      authenticated: {
        authenticator: 'authenticator:magic-link',
        token: 'hotdog',
      },
    });
    await visit('/');
    await click('[data-test-nav]');
    assert.dom('[data-test-current-user]').hasText('test@user.com');
  });
});
