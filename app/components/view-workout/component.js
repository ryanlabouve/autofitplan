import Component from '@ember/component';
import {get, set} from '@ember/object';
import {inject as service} from '@ember/service';

export default Component.extend({
  loggedSessionService: service('logged-session'),

  async startSession() {
    let session = get(this, 'session');

    let loggedSessionService = get(this, 'loggedSessionService');
    let loggedSession = await loggedSessionService.createLoggedSession({
      session,
      week: get(this, 'week'),
    });

    set(this, 'loggedSession', loggedSession);
  },

  async endSession() {},
});
