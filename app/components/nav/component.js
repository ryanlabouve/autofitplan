import Component from '@ember/component';
import {inject as service} from '@ember/service';
import {computed} from '@ember/object';
import config from 'autofitplan/config/environment';

export default Component.extend({
  session: service(),
  closeMenu: () => {},
  logout: () => {},
  currentUser: null,

  renderInPlace: computed('config.environment', function() {
    return config.environment === 'test';
  }),
});
