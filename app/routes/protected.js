import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';
import {get} from '@ember/object';

export default Route.extend({
  session: service(),
  currentUser: service(),

  beforeModel() {
    return this._loadCurrentUser();
  },

  _loadCurrentUser() {
    return this.get('currentUser')
      .load()
      .catch(_error => {
        this.get('session').invalidate();
        this.transitionTo('login');
      })
      .then(() => {
        let authed = get(this, 'session.isAuthenticated');
        if (!authed) {
          this.transitionTo('login');
        }
      });
  },
});
