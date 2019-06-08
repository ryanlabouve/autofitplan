import Component from '@ember/component';
import {task} from 'ember-concurrency';
import {alias} from '@ember/object/computed';
import {get} from '@ember/object';
import {inject as service} from '@ember/service';

export default Component.extend({
  store: service(),

  didInsertElement() {
    get(this, 'loadLoggedSets').perform();
  },

  loggedSets: alias('loadLoggedSets.lastSuccessful.value'),

  loadLoggedSets: task(function*() {
    let loggedExercise = get(this, 'loggedExercise');
    let loggedSets = yield this.store.query('logged-set', {
      filter: {
        logged_exercise_id: loggedExercise.id,
      },
    });

    return loggedSets;
  }),
});
