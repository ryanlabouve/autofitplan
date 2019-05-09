import {Model, belongsTo, hasMany} from 'ember-cli-mirage';

export default Model.extend({
  performanceTest: belongsTo(),
  exercise: belongsTo('exercise', {async: false}),
  loggedSession: belongsTo(),
  loggedExerciseHistory: hasMany('logged-exercise'),
});
