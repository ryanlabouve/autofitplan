import DS from 'ember-data';

const {belongsTo, hasMany} = DS;

export default DS.Model.extend({
  microcycle: belongsTo(),
  loggedMesocycle: belongsTo(),
  loggedSessions: hasMany(),
});
