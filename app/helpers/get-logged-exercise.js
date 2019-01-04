import {helper} from '@ember/component/helper';
import {get} from '@ember/object';

export function getLoggedExercise(params) {
  let loggedExercises = params[0];
  let exercise = params[1];

  if (!loggedExercises || !exercise) {
    return;
  }

  return loggedExercises.find(loggedExercise => {
    return get(loggedExercise, 'exercise.id') == get(exercise, 'id');
  });
}

export default helper(getLoggedExercise);
