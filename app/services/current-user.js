import Service from '@ember/service';
import {inject as service} from '@ember/service';
import {resolve} from 'rsvp';

export default Service.extend({
  session: service(),
  store: service(),

  load() {
    let that = this;
    if (this.get('session.isAuthenticated')) {
      return this.get('store')
        .queryRecord('user', {me: true})
        .then(user => {
          that.set('user', user);
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      return resolve();
    }
  },
});
