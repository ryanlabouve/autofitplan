import DS from 'ember-data';
const {attr, belongsTo} = DS;

export default DS.Model.extend({
  session: belongsTo(),
  loggedExercise: belongsTo('loggedExercise', {async: false}),
  code: attr('string'),
  sets: attr('number'),
  repsLow: attr('number'),
  repsHigh: attr('number'),
  percentRM: attr('number'),
  rpe: attr('number'),
});
