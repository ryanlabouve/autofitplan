import Component from '@ember/component';
import {get, set} from '@ember/object';
import {inject as service} from '@ember/service';
import moment from 'moment';

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

  async endSession() {
    let loggedSession = get(this, 'loggedSession');
    loggedSession.set('endedAt', moment().format());
    loggedSession.save();
  },
});
