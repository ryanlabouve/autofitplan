import DS from 'ember-data';
const {attr, belongsTo} = DS;

export default DS.Model.extend({
  session: belongsTo('session', {async: false}),
  loggedExercise: belongsTo('loggedExercise', {async: false}),
  code: attr('string'),
  sets: attr('number'),
  repsLow: attr('number'),
  repsHigh: attr('number'),
  percentRM: attr('number'),
  rpe: attr('number'),
});
