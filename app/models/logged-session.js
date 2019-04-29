import DS from 'ember-data';
const {attr, belongsTo, hasMany} = DS;

export default DS.Model.extend({
  session: belongsTo(),
  loggedExercises: hasMany(),
  week: attr('number'),

  startedAt: attr(),
  endedAt: attr('string'),
});
