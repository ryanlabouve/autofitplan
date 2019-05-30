import DS from 'ember-data';
const {belongsTo, hasMany} = DS;

export default DS.Model.extend({
  macrocycle: belongsTo('macrocycle', {async: false}),
  createdAt: DS.attr(),
  loggedMesocycles: hasMany('logged-mesocycle', {async: false}),
});
