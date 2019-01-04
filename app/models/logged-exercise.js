import DS from 'ember-data';
const {belongsTo, attr} = DS;

export default DS.Model.extend({
  exercise: belongsTo(),
  loggedSession: belongsTo(),
  weight: attr('number'),
});
