import Component from '@ember/component';
import {task} from 'ember-concurrency';
import {get, set, computed} from '@ember/object';
import {inject as service} from '@ember/service';

export default Component.extend({
  tagName: '',
  store: service(),
  flashMessages: service(),

  color: computed('isComplete', function() {
    if (get(this, 'isComplete') === true) {
      return 'green';
    }
  }),

  isComplete: computed(function() {
    let homeScreenItem = get(this, 'homeScreenItem');
    let dm = get(homeScreenItem, 'dailyMeasurement');
    return dm && dm.get('id') && dm.get('weight');
  }),

  logWeightForToday: task(function*(homeScreenItem, e) {
    e.preventDefault();

    let store = get(this, 'store');
    let flashMessages = get(this, 'flashMessages');
    let dm = get(homeScreenItem, 'dailyMeasurement');
    try {
      if (!dm) {
        dm = yield store.createRecord('daily-measurement');
      }

      set(dm, 'weight', get(this, 'todaysWeight'));
      yield dm.save();
      dm.get('homeScreenItems').pushObject(homeScreenItem);
      flashMessages.success('Successfully saved!');
    } catch (e) {
      flashMessages.danger('Fail!');
      console.error(e);
    }
  }),
});
