import Component from '@ember/component';
import {computed, get, set} from '@ember/object';
import {task, timeout} from 'ember-concurrency';
import {inject as service} from '@ember/service';
import EXERCISE_MAP from 'autofitplan/utils/exercise-map';

export default Component.extend({
  loggedExerciseService: service('logged-exercise'),
  rawExercise: computed('exercise.code', function() {
    let rawExercise = EXERCISE_MAP[get(this, 'exercise.code')];

    if (!rawExercise) {
      console.error('Could not find code', get(this, 'exercise.code'));
    }
    return rawExercise;
  }),

  didInsertElement() {
    set(
      this,
      'selectedExercise',
      get(this, 'rawExercise.exercises.firstObject'),
    );
  },

  name: computed('exercise.code', function() {
    let rawExercise = get(this, 'rawExercise');

    return rawExercise ? rawExercise.name : get(this, 'exercise.code');
  }),

  updateLoggedExercise: task(function*(loggedExercise, weight) {
    yield timeout(600);
    yield get(this, 'loggedExerciseService').updateLoggedExercise(
      loggedExercise,
      {
        weight,
      },
    );
  }).restartable(),

  updateLoggedExerciseName: task(function*(name) {
    yield timeout(600);
    let loggedExercise = get(this, 'loggedExercise');
    if (loggedExercise) {
      loggedExercise.set('name', name);
      loggedExercise.save();
    }
  }).restartable(),

  saveLoggedExercise: task(function*(loggedExercise) {
    yield timeout(600);
    try {
      loggedExercise.set('completed', true);
      yield loggedExercise.save();
    } catch (e) {
      console.error(e);
    }
  }),

  skipLoggedExercise: task(function*(loggedExercise) {
    yield timeout(600);
    try {
      loggedExercise.set('skipped', true);
      yield loggedExercise.save();
    } catch (e) {
      console.error(e);
    }
  }),

  failLoggedExercise: task(function*(loggedExercise) {
    yield timeout(600);
    try {
      loggedExercise.set('failed', true);
      yield loggedExercise.save();
    } catch (e) {
      console.error(e);
    }
  }),
});
