import DS from 'ember-data';
const {attr, hasMany, belongsTo} = DS;

export default DS.Model.extend({
  microcycle: belongsTo('microcycle', {async: false}),
  exercises: hasMany(),
  name: attr('string'),
  loggedSessions: hasMany(),
});
