import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';

export default Route.extend({
  session: service(),
  magicLink: service(),

  model({token}) {
    this.get('magicLink')
      .authenticateMagicLink.perform(token)
      .then(_ => {
        console.error(_);
        if (this.get('session.isAuthenticated')) {
          this.transitionTo('protected');
        } else {
          this.transitionTo('login');
        }
      })
      .catch(e => {
        console.error(e);
      });
  },
});
