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

  addPound: task(function*(loggedSet) {
    let currentWeight = loggedSet.get('weight');
    loggedSet.set('weight', currentWeight + 1);
    yield loggedSet.save();
  }),

  subtractPound: task(function*(loggedSet) {
    let currentWeight = loggedSet.get('weight');
    loggedSet.set('weight', currentWeight - 1);
    yield loggedSet.save();
  }),

  addRep: task(function*(loggedSet) {
    let currentReps = loggedSet.get('reps');
    loggedSet.set('reps', currentReps + 1);
    yield loggedSet.save();
  }),

  subtractRep: task(function*(loggedSet) {
    let currentReps = loggedSet.get('reps');
    loggedSet.set('reps', currentReps - 1);
    yield loggedSet.save();
  }),

  completeSet: task(function*(loggedSet) {
    loggedSet.set('completed', true);
    loggedSet.set('skipped', false);
    loggedSet.set('failed', false);
    yield loggedSet.save();
  }),

  skipSet: task(function*(loggedSet) {
    loggedSet.set('completed', false);
    loggedSet.set('skipped', true);
    loggedSet.set('failed', false);
    yield loggedSet.save();
  }),

  failSet: task(function*(loggedSet) {
    loggedSet.set('completed', false);
    loggedSet.set('skipped', false);
    loggedSet.set('failed', true);
    yield loggedSet.save();
  }),
});
