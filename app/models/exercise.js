import DS from 'ember-data';
const {attr, belongsTo, hasMany} = DS;

export default DS.Model.extend({
  session: belongsTo('session', {async: false}),
  loggedExercises: hasMany('loggedExercises', {async: false}),
  code: attr('string'),
  sets: attr('number'),
  repsLow: attr('number'),
  repsHigh: attr('number'),
  percentRM: attr('number'),
  // TODO
  // pace: attr('number'),
  rpe: attr('number'),
  defaultExercise: attr('string'),
  family: attr('string'),
});
