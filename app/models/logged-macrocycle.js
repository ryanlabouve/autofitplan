import DS from 'ember-data';
const {belongsTo, hasMany} = DS;

export default DS.Model.extend({
  macrocycle: belongsTo('macrocycle', {async: false}),
  createdAt: DS.attr(),
  archived: DS.attr('boolean'),
  loggedMesocycles: hasMany('logged-mesocycle', {async: false}),
});
