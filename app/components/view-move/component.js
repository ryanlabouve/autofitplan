import Component from '@ember/component';
import {computed, get, set} from '@ember/object';
import {task, timeout} from 'ember-concurrency';
import {inject as service} from '@ember/service';
import EXERCISE_MAP from 'autofitplan/utils/exercise-map';

export default Component.extend({
  loggedExerciseService: service('logged-exercise'),
  rawExercise: computed('exercise.code', function() {
    return EXERCISE_MAP[get(this, 'exercise.code')];
  }),

  didInsertElement() {
    set(
      this,
      'selectedExercise',
      get(this, 'rawExercise.exercises.firstObject'),
    );
  },

  name: computed('exercise.code', function() {
    return get(this, 'rawExercise').name;
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
  }),
});
