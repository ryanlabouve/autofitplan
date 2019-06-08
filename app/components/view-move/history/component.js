import Component from '@ember/component';
import {task} from 'ember-concurrency';
import {alias} from '@ember/object/computed';
import {get} from '@ember/object';

export default Component.extend({
  didInsertElement() {
    get(this, 'loadLoggedExerciseHistory').perform();
  },

  loggedExerciseHistory: alias(
    'loadLoggedExerciseHistory.lastSuccessful.value',
  ),

  loadLoggedExerciseHistory: task(function*() {
    let loggedExercise = get(this, 'loggedExercise');
    let oldLoggedExercises = yield loggedExercise.get('loggedExerciseHistory');
    return oldLoggedExercises;
  }),
});
