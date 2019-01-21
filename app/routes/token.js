import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';

export default Route.extend({
  session: service(),
  magicLink: service(),

  beforeModel({params}) {
    return this.get('magicLink')
      .authenticateMagicLink.perform(params.token.token)
      .then(_ => {
        console.log(_);
      })
      .catch(e => {
        console.error(e);
      });
  },

  model() {
    if (this.get('session.isAuthenticated')) {
      this.transitionTo('protected');
    } else {
      this.transitionTo('login');
    }
  },
});
