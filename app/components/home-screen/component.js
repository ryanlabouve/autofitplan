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
        'logged-macrocycle,performance-test,logged-session.session,daily-measurement',
    });
    let _items = set(this, 'homeScreenItems', homeScreenItems);
  }),

  logMacrosForToday: task(function*(homeScreenItem, e) {
    e.preventDefault();

    let store = get(this, 'store');
    let dm = get(homeScreenItem, 'dailyMeasurement');
    let flashMessages = get(this, 'flashMessages');

    try {
      if (!dm) {
        dm = yield store.createRecord('daily-measurement');
      }
    } catch (e) {
      flashMessages.danger('Fail!');
      console.error(e);
    }

    try {
      set(dm, 'fat', get(this, 'todaysFat'));
      set(dm, 'carb', get(this, 'todaysCarb'));
      set(dm, 'protein', get(this, 'todaysProtein'));

      yield dm.save();
      dm.get('homeScreenItems').pushObject(homeScreenItem);
      flashMessages.success('Successfully saved!');
    } catch (e) {
      flashMessages.danger('Fail!');
      console.error(e);
    }
  }),
});
