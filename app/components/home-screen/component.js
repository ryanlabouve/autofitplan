import Component from '@ember/component';
import {task} from 'ember-concurrency';
import {get, set} from '@ember/object';
import {inject as service} from '@ember/service';

export default Component.extend({
  tagName: '',
  store: service(),
  flashMessages: service(),

  init() {
    this._super(...arguments);
    // can I do this instead of set now?
    this.homeScreenItems = [];
    this.loadHomeScreenItems.perform();
  },

  loadHomeScreenItems: task(function*() {
    let store = get(this, 'store');
    let homeScreenItems = yield store.query('home-screen-item', {
      include:
        'logged-macrocycle.macrocycle.mesocycle.microcycle,performance-test,logged-session.session.microcycle.mesocycle,daily-measurement',
    });
    let _items = set(this, 'homeScreenItems', homeScreenItems);
  }),
});
