import Component from '@ember/component';
import {task} from 'ember-concurrency';
import {get, set, computed} from '@ember/object';
import {inject as service} from '@ember/service';

export default Component.extend({
  tagName: '',
  store: service(),
  flashMessages: service(),

  didInsertElement() {
    if (get(this, 'isComplete')) {
      set(this, 'isCollapsed', true);
    }
  },

  color: computed('isComplete', function() {
    if (get(this, 'isComplete') === true) {
      return 'green';
    }
  }),

  isComplete: computed('dailyMeasurement.{id,carb,fat,protein}', function() {
    let homeScreenItem = get(this, 'homeScreenItem');
    let dm = get(homeScreenItem, 'dailyMeasurement');
    return dm &&
      dm.get('id') &&
      dm.get('carb') &&
      dm.get('fat') &&
      dm.get('protein')
      ? true
      : false;
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
      if (get(this, 'todaysFat')) {
        set(dm, 'fat', get(this, 'todaysFat'));
      }

      if (get(this, 'todaysCarb')) {
        set(dm, 'carb', get(this, 'todaysCarb'));
      }

      if (get(this, 'todaysProtein')) {
        set(dm, 'protein', get(this, 'todaysProtein'));
      }

      yield dm.save();
      dm.get('homeScreenItems').pushObject(homeScreenItem);
      flashMessages.success('Successfully saved!');
    } catch (e) {
      flashMessages.danger('Fail!');
      console.error(e);
    }
  }),
});
