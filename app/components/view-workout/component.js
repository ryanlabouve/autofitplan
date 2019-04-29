import Component from '@ember/component';
import {get, set} from '@ember/object';
import moment from 'moment';

export default Component.extend({
  isShowing: false,

  didInsertElement() {
    let loggedSession = get(this, 'loggedSession');
    let loggedSessionEndAt = get(this, 'loggedSession.endedAt');

    if (!loggedSession || !loggedSessionEndAt) {
      set(this, 'isShowing', true);
    }
  },

  async startSession() {
    let loggedSession = get(this, 'loggedSession');
    set(loggedSession, 'startedAt', moment().format());
    await loggedSession.save();
  },

  async endSession() {
    let loggedSession = get(this, 'loggedSession');
    set(loggedSession, 'endedAt', moment().format());
    loggedSession.save();
  },
});
