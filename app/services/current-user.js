import Service from '@ember/service';
import {inject as service} from '@ember/service';
import {resolve} from 'rsvp';
import {get} from '@ember/object';

export default Service.extend({
  session: service(),
  store: service(),

  load() {
    let that = this;
    if (this.get('session.isAuthenticated')) {
      return this.get('store')
        .queryRecord('user', {me: true, include: 'profile'})
        .then(user => {
          that.set('user', user);
          that.updateUsersTimezone();
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      return resolve();
    }
  },

  reloadUser() {
    get(this, 'user').reload();
  },

  updateUsersTimezone() {
    let tz = moment.tz.guess();
    let u = this.user.currentTimeZone;
    if (this.user.currentTimeZone != tz) {
      this.user.set('currentTimeZone', tz);
      this.user.save();
    }
  },
});
