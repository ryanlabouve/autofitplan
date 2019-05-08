import Component from '@ember/component';
import {computed, get, set} from '@ember/object';
import {task, timeout} from 'ember-concurrency';
import {inject as service} from '@ember/service';
import EXERCISE_MAP from 'autofitplan/utils/exercise-map';
import {assert} from '@ember/debug';

const SAVE_DELAY = 800;

export default Component.extend({
  loggedExerciseService: service('logged-exercise'),
  rawExercise: computed('exercise.code', function() {
    let code = get(this, 'exercise.code');
    let rawExercise = EXERCISE_MAP[code];

    assert(`We find an exercise for ${code}`, rawExercise);

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
    return get(this, 'rawExercise').name;
  }),

  updateLoggedExercise: task(function*(loggedExercise, weight) {
    yield timeout(SAVE_DELAY);
    yield get(this, 'loggedExerciseService').updateLoggedExercise(
      loggedExercise,
      {
        weight,
      },
    );
  }).restartable(),

  updateLoggedExerciseName: task(function*(name) {
    yield timeout(SAVE_DELAY);
    let loggedExercise = get(this, 'loggedExercise');
    if (loggedExercise) {
      loggedExercise.set('name', name);
      yield loggedExercise.save();
    }
  }),

  updateLoggedExerciseName: task(function*(name) {
    yield timeout(SAVE_DELAY);
    let loggedExercise = get(this, 'loggedExercise');
    if (loggedExercise) {
      loggedExercise.set('name', name);
      yield loggedExercise.save();
    }
  }),

  completeLoggedExercise: task(function*() {
    yield timeout(10);
    let loggedExercise = get(this, 'loggedExercise');
    if (loggedExercise) {
      loggedExercise.set('completed', true);
      loggedExercise.set('failed', false);
      loggedExercise.set('skipped', false);
      yield loggedExercise.save();
    }
  }),

  skipLoggedExercise: task(function*() {
    yield timeout(10);
    let loggedExercise = get(this, 'loggedExercise');
    if (loggedExercise) {
      loggedExercise.set('completed', false);
      loggedExercise.set('failed', false);
      loggedExercise.set('skipped', true);
      yield loggedExercise.save();
    }
  }),

  failLoggedExercise: task(function*() {
    yield timeout(10);
    let loggedExercise = get(this, 'loggedExercise');
    if (loggedExercise) {
      loggedExercise.set('completed', false);
      loggedExercise.set('failed', true);
      loggedExercise.set('skipped', false);
      yield loggedExercise.save();
    }
  }),

  color: computed('loggedExercise.{completed,skipped,failed}', function() {
    let loggedExercise = get(this, 'loggedExercise');
    if (loggedExercise.get('completed') === true) {
      return 'green';
    }

    if (loggedExercise.get('failed') === true) {
      return 'red';
    }

    if (loggedExercise.get('skipped') === true) {
      return 'yellow';
    }
  }),
});
