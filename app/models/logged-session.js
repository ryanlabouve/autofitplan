import DS from 'ember-data';
const {attr, belongsTo, hasMany} = DS;

export default DS.Model.extend({
  session: belongsTo('session', {async: false}),
  loggedExercises: hasMany('logged-exercises', {async: false}),
  week: attr('number'),

  loggedMicrocycle: belongsTo(),

  startedAt: attr('string'),
  endedAt: attr('string'),
});
